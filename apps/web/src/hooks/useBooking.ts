import { useQueryClient, useMutation } from "@tanstack/react-query";
import { bookingApi } from "../api/bookingApi";

export function useBooking() {
    const queryClient = useQueryClient();

    const useAppointmentBook = useMutation({
        mutationFn: bookingApi.bookAppointment,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["user-booking"],
            });
        },
    });

    return { useAppointmentBook };
}
