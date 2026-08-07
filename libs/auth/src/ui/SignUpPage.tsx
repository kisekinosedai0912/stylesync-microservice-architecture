import type { FormEvent } from "react";
import { AuthField } from "./AuthField";
import { AuthShell } from "./AuthShell";

export interface SignUpValues {
    fullName: string;
    email: string;
    password: string;
    acceptedTerms: boolean;
}

export interface SignUpPageProps {
    onSubmit?: (values: SignUpValues) => void | Promise<void>;
    isSubmitting?: boolean;
    error?: string;
    loginHref?: string;
    termsHref?: string;
    privacyHref?: string;
}

export function SignUpPage({
    onSubmit,
    isSubmitting = false,
    error,
    loginHref = "/login",
    termsHref = "/terms",
    privacyHref = "/privacy",
}: SignUpPageProps) {
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        void onSubmit?.({
            fullName: String(data.get("fullName") ?? ""),
            email: String(data.get("email") ?? ""),
            password: String(data.get("password") ?? ""),
            acceptedTerms: data.get("terms") === "on",
        });
    }

    return (
        <AuthShell
            eyebrow="Your salon, your way"
            title="Create your account."
            description="Save your details for a simpler, more personal salon experience."
        >
            <form className="ss-auth__form" onSubmit={handleSubmit}>
                {error ? (
                    <p className="ss-auth__error" role="alert">
                        {error}
                    </p>
                ) : null}

                <AuthField
                    label="Full name"
                    type="text"
                    name="fullName"
                    autoComplete="name"
                    placeholder="Your full name"
                    required
                />
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
                    autoComplete="new-password"
                    placeholder="Create a password"
                    minLength={8}
                    hint="Use at least 8 characters."
                    required
                />

                <label className="ss-auth__check ss-auth__terms">
                    <input type="checkbox" name="terms" required />
                    <span>
                        I agree to the <a href={termsHref}>Terms</a> and{" "}
                        <a href={privacyHref}>Privacy Policy</a>.
                    </span>
                </label>

                <button
                    className="ss-auth__submit"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Creating account…" : "Create account"}
                    <span aria-hidden="true">↗</span>
                </button>
            </form>

            <p className="ss-auth__alternate">
                Already have an account? <a href={loginHref}>Login</a>
            </p>
        </AuthShell>
    );
}
