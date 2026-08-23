import { bookings, customer, services } from "@stylesync/db/schema";
import { eq } from "@stylesync/db/orm";
import { getDb } from "@stylesync/db";
import { Booking } from "../src/booking.types";
import { AppError } from "@stylesync/middleware";
import {
    BookingAvailabilityChecker,
    BookingServiceHelper,
} from "./bookings.helpers";
import { randomInt } from "crypto";

type Database = ReturnType<typeof getDb>["db"];

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
        const refCode = this.generateBookingRefCode();

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
                refCode,
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
}

const { db } = getDb();
const bookingAvailability = new BookingServiceHelper(db);

export const customerBookings = new Bookings(db, bookingAvailability);
