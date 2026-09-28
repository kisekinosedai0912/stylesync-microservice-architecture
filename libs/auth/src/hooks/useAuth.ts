import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { useAuthStore } from "@stylesync/zustand";
import { useNavigate } from "react-router-dom";

export function useAuth() {
    const queryClient = useQueryClient();
    const { setUser, logout } = useAuthStore();
    const navigate = useNavigate();

    const useLogin = useMutation({
        mutationFn: authApi.login,
        onSuccess: async (userData) => {
            await queryClient.invalidateQueries({
                queryKey: ["user-authentication"],
            });
            setUser(userData);
            navigate("/home");
        },
        onError: (error) => {
            console.error("Login failed: ", error);
        },
    });

    const useSignup = useMutation({
        mutationFn: authApi.signup,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["user-authentication"],
            });
            navigate("/login");
        },
        onError: (error) => {
            console.error("Signup failed: ", error);
        },
    });

    const useLogout = useMutation({
        mutationFn: authApi.logout,
        onSuccess: async () => {
            logout();
            await queryClient.invalidateQueries({
                queryKey: ["user-authentication"],
            });
        },
        onError: (error) => {
            console.error("Error logging out: ", error);
        },
    });

    return { useLogin, useSignup, useLogout };
}
