import { bookings } from "@stylesync/db/schema";
import { and, eq, inArray } from "@stylesync/db/orm";
import { getDb } from "@stylesync/db";
import { AppError } from "@stylesync/middleware";

type Database = ReturnType<typeof getDb>["db"];
type NewBooking = typeof bookings.$inferInsert;

export type DateSched = {
    selectedTime: NewBooking["schedTime"];
    selectedDate: NewBooking["schedDate"];
};

export interface BookingAvailabilityChecker {
    checkBookingState(schedule: DateSched): Promise<DateSched>;
}

const WORKING_HOURS = new Set([
    "09:00:00",
    "10:00:00",
    "11:00:00",
    "12:00:00",
    "13:00:00",
    "14:00:00",
    "15:00:00",
    "16:00:00",
    "17:00:00",
    "18:00:00",
    "19:00:00",
]);

export class BookingServiceHelper implements BookingAvailabilityChecker {
    constructor(private readonly db: Database) {}

    async checkBookingState({
        selectedTime,
        selectedDate,
    }: DateSched): Promise<DateSched> {
        const normalizedTime = this.toPostgresTime(selectedTime);

        if (!WORKING_HOURS.has(normalizedTime)) {
            throw new AppError(
                422,
                "The selected time is outside the store's working hours.",
            );
        }

        const [existingBooking] = await this.db
            .select({
                bookingId: bookings.id,
            })
            .from(bookings)
            .where(
                and(
                    eq(bookings.schedTime, normalizedTime),
                    eq(bookings.schedDate, selectedDate),
                    inArray(bookings.status, ["pending", "confirmed"]),
                ),
            )
            .limit(1);

        if (existingBooking) {
            throw new AppError(
                409,
                "The selected date and time are already booked.",
            );
        }

        return {
            selectedTime: normalizedTime,
            selectedDate,
        };
    }

    private toPostgresTime(value: string): string {
        const match = /^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/.exec(value);

        if (!match) {
            throw new AppError(
                422,
                "Invalid time format. Expected HH:mm or HH:mm:ss.",
            );
        }

        const [, hours, minutes, seconds = "00"] = match;

        return `${hours}:${minutes}:${seconds}`;
    }
}
