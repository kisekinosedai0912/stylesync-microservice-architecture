import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/api/authApi";

type RequestParams = {
    page?: string;
    limit?: string;
    search?: string;
};

export function useAuth(
    page: RequestParams,
    limit: RequestParams,
    search: RequestParams,
) {
    const queryClient = useQueryClient();

    const useLogin = useMutation({
        mutationFn: authApi.login,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["user-authentication"],
            });
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
        },
        onError: (error) => {
            console.error("Signup failed: ", error);
        },
    });

    const useLogout = useMutation({
        mutationFn: authApi.login,
        onSuccess: async () => {
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
