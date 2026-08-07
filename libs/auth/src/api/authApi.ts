import { api } from "@stylesync/api";
import { LoginPayload, SignupPayload } from "../types/payloads";

export const authApi = {
    login: async (payload: LoginPayload) => {
        const response = await api.post("/api/login", payload);
        return response.data;
    },

    signup: async (payload: SignupPayload) => {
        const response = await api.post("/api/signup", payload);
        return response.data;
    },

    logout: async () => {
        const response = await api.post("/api/logout");
        return response.data;
    },
};
