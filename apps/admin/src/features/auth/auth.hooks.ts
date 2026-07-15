import { useMutation } from "@tanstack/react-query";
import { loginRequest, logoutRequest } from "./auth.api";
import { useAuthStore } from "./auth.store";

export function useLogin() {
	const setUser = useAuthStore((state) => state.setUser);

	return useMutation({
		mutationFn: loginRequest,
		onSuccess: (user) => setUser(user),
	});
}

export function useLogout() {
	const clearUser = useAuthStore((state) => state.clearUser);

	return useMutation({
		mutationFn: logoutRequest,
		// Clear local state even if the server call fails (e.g. expired
		// token already returns 401) so the user is never stuck logged in.
		onSettled: () => clearUser(),
	});
}
