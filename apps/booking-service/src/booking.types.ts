import { z } from "zod";

export const bookingSchema = z.object({
    serviceId: z
        .string()
        .nonempty("service must be within the list of services, service id"),
    selectedTime: z
        .string()
        .nonempty("user must have a selected time of booking"),
    selectedDate: z
        .string()
        .nonempty("user must have a selected date of booking"),
    customerName: z
        .string()
        .nonempty("To create a booking, user must provide his/her name."),
    phoneNum: z.string(),
    email: z.string(),
    notes: z.string(),
});

export const updateBookingSchema = bookingSchema.partial();

export type Booking = z.infer<typeof bookingSchema>;
export type BookingUpdate = z.infer<typeof updateBookingSchema>;
