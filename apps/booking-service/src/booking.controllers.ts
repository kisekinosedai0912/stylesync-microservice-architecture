import { bookingSchema, updateBookingSchema } from "./booking.types";
import { AppError, asyncHandler } from "@stylesync/middleware";
import { customerBookings } from "../services/booking.services";
import { created } from "../../../libs/shared/api";
import { ok } from "assert";
import type { Request, Response, NextFunction, RequestHandler } from "express";

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

export const updateBooking: RequestHandler = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id: bookingId } = req.params;
        const updateBookingPayload = updateBookingSchema.safeParse(req.body);
        if (!updateBookingPayload.success) {
            throw new AppError(400, updateBookingPayload.error.message);
        }

        const updateData = await customerBookings.updateAppointment(
            bookingId,
            updateBookingPayload.data,
        );
        return ok(res, "Appointment updated successfully", updateData);
    },
);
