import { bookings, customer, services } from "@stylesync/db/schema";
import { eq } from "@stylesync/db/orm";
import { getDb } from "@stylesync/db";
import { Booking, BookingUpdate } from "../src/booking.types";
import { AppError } from "@stylesync/middleware";
import {
    BookingAvailabilityChecker,
    BookingServiceHelper,
} from "./bookings.helpers";
import { randomInt } from "crypto";

type Database = ReturnType<typeof getDb>["db"];
type TransactionCallback = Parameters<Database["transaction"]>[0];
type Transaction = Parameters<TransactionCallback>[0];
type ExistingAppointment = {
    id: string;
    customerId: string;
    serviceId: string;
    schedTime: string;
    schedDate: string;
};
type ServiceUpdate =
    | {
          serviceId: string;
          serviceName: string;
          priceSnapshot: string;
      }
    | undefined;

class Bookings {
    constructor(
        private readonly db: Database,
        private readonly availability: BookingAvailabilityChecker,
    ) {}

    async bookAppointment(payload: Booking) {
        // contains the selected time & date
        const schedule = await this.availability.checkBookingState({
            selectedTime: payload.selectedTime,
            selectedDate: payload.selectedDate,
        });

        // contains the remaining payload from the user
        const customerRecord = await this.createCustomerRecord(payload);
        const [service] = await this.db
            .select({
                serviceId: services.id,
                serviceName: services.package,
            })
            .from(services)
            .where(eq(services.id, payload.serviceId))
            .limit(1);

        if (!service) {
            throw new AppError(404, "Service selected is not found");
        }

        const [customerAppointment] = await this.db
            .insert(bookings)
            .values({
                serviceId: service.serviceId,
                serviceName: service.serviceName,
                schedTime: schedule.selectedTime,
                schedDate: schedule.selectedDate,
                customerId: customerRecord.id,
                refCode: this.generateBookingRefCode(),
            })
            .returning({
                date: bookings.schedDate,
                time: bookings.schedTime,
            });

        if (!customerAppointment) {
            throw new AppError(500, "Failed to create your appointment");
        }

        return { ...customerRecord, ...customerAppointment };
    }

    async updateAppointment(bookingId: string, payload: BookingUpdate) {
        return this.db.transaction(async (tx) => {
            const [existingAppointment] = await tx
                .select({
                    id: bookings.id,
                    customerId: bookings.customerId,
                    serviceId: bookings.serviceId,
                    schedTime: bookings.schedTime,
                    schedDate: bookings.schedDate,
                })
                .from(bookings)
                .where(eq(bookings.id, bookingId))
                .limit(1);

            if (!existingAppointment) {
                throw new AppError(404, "Appointment not found");
            }

            const hasCustomerUpdate = [
                payload.customerName,
                payload.phoneNum,
                payload.email,
                payload.notes,
            ].some((value) => value !== undefined);

            const hasBookingUpdate = [
                payload.serviceId,
                payload.selectedTime,
                payload.selectedDate,
            ].some((value) => value !== undefined);

            const updatedCustomer = hasCustomerUpdate
                ? await this.updateCustomerRecord(
                      tx,
                      existingAppointment.customerId,
                      payload,
                  )
                : undefined;

            const updatedBooking = hasBookingUpdate
                ? await this.updateBookingRecord(
                      tx,
                      existingAppointment,
                      payload,
                  )
                : existingAppointment;

            return {
                booking: updatedBooking,
                customer: updatedCustomer,
            };
        });
    }

    private async createCustomerRecord(customerDetails: Booking) {
        const { customerName, phoneNum, email, notes } = customerDetails;

        const [customerData] = await this.db
            .insert(customer)
            .values({
                customerName,
                phoneNum,
                email,
                notes,
            })
            .returning({ id: customer.id, fullname: customer.customerName });

        if (!customerData) {
            throw new AppError(500, "Failed to create the customer record.");
        }

        return customerData;
    }

    private generateBookingRefCode() {
        const REF_CODE_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let refCode = "BKD-";

        for (let i = 0; i < 10; i++) {
            refCode += REF_CODE_ALPHABET[randomInt(REF_CODE_ALPHABET.length)];
        }

        return refCode;
    }

    private async updateCustomerRecord(
        tx: Transaction,
        customerId: string,
        payload: BookingUpdate,
    ) {
        const [updatedCustomer] = await tx
            .update(customer)
            .set({
                customerName: payload.customerName,
                email: payload.email,
                phoneNum: payload.phoneNum,
                notes: payload.notes,
            })
            .where(eq(customer.id, customerId))
            .returning({
                id: customer.id,
                name: customer.customerName,
            });

        if (!updatedCustomer) {
            throw new AppError(404, "Customer not found");
        }

        return updatedCustomer;
    }

    private async updateBookingRecord(
        tx: Transaction,
        existingAppointment: ExistingAppointment,
        payload: BookingUpdate,
    ) {
        const newTime = payload.selectedTime ?? existingAppointment.schedTime;
        const newDate = payload.selectedDate ?? existingAppointment.schedDate;

        if (
            payload.selectedTime !== undefined ||
            payload.selectedDate !== undefined
        ) {
            await this.availability.checkBookingState({
                selectedTime: newTime,
                selectedDate: newDate,
            });
        }

        let serviceUpdate: ServiceUpdate;

        if (payload.serviceId !== undefined) {
            const [service] = await tx
                .select({
                    id: services.id,
                    name: services.package,
                    price: services.priceRange,
                })
                .from(services)
                .where(eq(services.id, payload.serviceId))
                .limit(1);

            if (!service) {
                throw new AppError(404, "Service not found");
            }

            serviceUpdate = {
                serviceId: service.id,
                serviceName: service.name,
                priceSnapshot: service.price,
            };
        }

        const [updatedAppointment] = await tx
            .update(bookings)
            .set({
                ...serviceUpdate,
                schedTime: payload.selectedTime,
                schedDate: payload.selectedDate,
                updatedAt: new Date(),
            })
            .where(eq(bookings.id, existingAppointment.id))
            .returning({
                id: bookings.id,
                serviceId: bookings.serviceId,
                date: bookings.schedDate,
                time: bookings.schedTime,
            });

        if (!updatedAppointment) {
            throw new AppError(404, "Appointment not found");
        }

        return updatedAppointment;
    }
}

const { db } = getDb();
const bookingAvailability = new BookingServiceHelper(db);

export const customerBookings = new Bookings(db, bookingAvailability);
