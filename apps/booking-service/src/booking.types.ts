import { z } from "zod";

export const bookingSchema = z.object({
    serviceId: z.string().uuid("Invalid service ID"),
    selectedTime: z.string().trim().min(1, "Booking time is required"),
    selectedDate: z.string().trim().min(1, "Booking date is required"),
    customerName: z.string().trim().min(1, "Customer name is required"),
    phoneNum: z.string().trim().min(1, "Phone number cannot be empty"),
    email: z.string().trim().email("Invalid email address"),
    notes: z.string().trim(),
});

export const updateBookingSchema = bookingSchema
    .partial()
    .refine(
        (data) => Object.values(data).some((value) => value !== undefined),
        {
            message: "At least one field must be provided.",
        },
    );

export type Booking = z.infer<typeof bookingSchema>;
export type BookingUpdate = z.infer<typeof updateBookingSchema>;
