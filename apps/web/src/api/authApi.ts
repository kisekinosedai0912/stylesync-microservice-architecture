import { api } from "@stylesync/api";

type UserData = {
    id: string;
    username: string;
    email?: string;
    password: string;
    fullname: string;
};
type LoginPayload = Omit<UserData, "id" | "fullname">;

export const authApi = {
    login: async (payload: LoginPayload) => {
        const response = await api.post("/api/login", payload);
        return response.data;
    },

    signup: async (payload: UserData) => {
        const response = await api.post("/api/signup", payload);
        return response.data;
    },

    logout: async () => {
        const response = await api.post("/api/logout");
        return response.data;
    },
};
