import type { FormEvent } from "react";
import { AuthField } from "./AuthField";
import { AuthShell } from "./AuthShell";

export interface LoginValues {
    email: string;
    password: string;
    remember: boolean;
}

export interface LoginPageProps {
    onSubmit?: (values: LoginValues) => void | Promise<void>;
    isSubmitting?: boolean;
    error?: string;
    forgotPasswordHref?: string;
    signUpHref?: string;
}

export function LoginPage({
    onSubmit,
    isSubmitting = false,
    error,
    forgotPasswordHref = "/forgot-password",
    signUpHref = "/sign-up",
}: LoginPageProps) {
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        void onSubmit?.({
            email: String(data.get("email") ?? ""),
            password: String(data.get("password") ?? ""),
            remember: data.get("remember") === "on",
        });
    }

    return (
        <AuthShell
            eyebrow="Welcome back"
            title="Login in to your account."
            description="Manage your visits and keep your salon experience close at hand."
        >
            <form className="ss-auth__form" onSubmit={handleSubmit}>
                {error ? (
                    <p className="ss-auth__error" role="alert">
                        {error}
                    </p>
                ) : null}

                <AuthField
                    label="Email address"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                />
                <AuthField
                    label="Password"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    required
                />

                <div className="ss-auth__form-options">
                    <label className="ss-auth__check">
                        <input type="checkbox" name="remember" />
                        <span>Remember me</span>
                    </label>
                    <a href={forgotPasswordHref}>Forgot password?</a>
                </div>

                <button
                    className="ss-auth__submit"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Logging in…" : "Login"}
                    <span aria-hidden="true">↗</span>
                </button>
            </form>

            <p className="ss-auth__alternate">
                New to Dahling&apos;s?{" "}
                <a href={signUpHref}>Create an account</a>
            </p>
        </AuthShell>
    );
}
