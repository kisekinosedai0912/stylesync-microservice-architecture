import { bookingSchema, updateBookingSchema } from "./booking.types";
import { AppError, asyncHandler } from "@stylesync/middleware";
import type { Request, Response, NextFunction, RequestHandler } from "express";
import { customerBookings } from "../services/booking.services";
import { created } from "../../../libs/shared/api";
import { ok } from "assert";

export const createBooking: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const bookingPayload = bookingSchema.safeParse(req.body);
        if (!bookingPayload.success) {
            throw new AppError(400, bookingPayload.error.message);
        }

        const bookingData = await customerBookings.bookAppointment(
            bookingPayload.data,
        );
        return created(res, "Appointment created successfully", bookingData);
    },
);

// export const updateBooking: RequestHandler = asyncHandler(
//     async (req: Request, res: Response, next: NextFunction) => {
//         const updateBookingPayload = updateBookingSchema.safeParse(req.body);
//         if (!updateBookingPayload.success) {
//             throw new AppError(400, updateBookingPayload.error.message);
//         }

//         const updateData = await customerBookings.updateAppointment(
//             updateBookingPayload.data,
//         );
//         return ok(res, "Appointment updated successfully", updateData);
//     },
// );
