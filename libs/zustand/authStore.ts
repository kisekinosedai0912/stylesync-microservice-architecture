import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type User = {
    id: string;
    fullname: string;
    email: string;
    role: string;
};

type AuthState = {
    user: User | null;
    isAuthenticated: boolean;
    _hasHydrated: boolean;
    setHasHydrated: (hasHydrated: boolean) => void;
    setUser: (user: User) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            _hasHydrated: false,
            setHasHydrated: (hasHydrated: boolean) => {
                set({ _hasHydrated: hasHydrated });
            },
            setUser: (user: User) => {
                set({ user, isAuthenticated: true });
            },
            logout: () => {
                set({ user: null, isAuthenticated: false });
            },
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => {
                return (state, error) => {
                    if (error) {
                        console.error("Failed to hydrate auth store:", error);
                        return;
                    }

                    state?.setHasHydrated(true);
                };
            },
        },
    ),
);
