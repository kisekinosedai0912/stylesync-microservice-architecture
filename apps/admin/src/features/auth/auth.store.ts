import { create } from "zustand";
import type { AuthUser } from "./auth.types";

type AuthState = {
	user: AuthUser | null;
	setUser: (user: AuthUser) => void;
	clearUser: () => void;
};

// In-memory only: the JWT lives in an httpOnly cookie, and the auth API has
// no session endpoint yet, so a page refresh returns to the login screen.
export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
	clearUser: () => set({ user: null }),
}));
