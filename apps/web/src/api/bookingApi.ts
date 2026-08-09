import { api } from "@stylesync/api";

export const bookingApi = {
    bookAppointment: async (payload: {}) => {
        const response = await api.post("/book/appointment", payload);
        return response.data;
    },
};
