import { AuthField } from "./AuthField";
import { AuthShell } from "./AuthShell";
import { useActionState, useCallback } from "react";
import { useAuth } from "../hooks";
import { toast } from "@stylesync/ui";

interface LoginValues {
    username: string;
    password: string;
}

interface LoginPageProps {
    signUpHref?: string;
}

export function LoginPage({ signUpHref = "/sign-up" }: LoginPageProps) {
    const { useLogin } = useAuth();

    const handleLogin = useCallback(
        async (prevState: unknown, formData: FormData) => {
            try {
                const username = formData.get("username");
                const password = formData.get("password");

                if (
                    typeof username !== "string" ||
                    typeof password !== "string"
                ) {
                    console.error("Invalid username/password!");
                    return;
                }

                if (!username.trim() || !password.trim()) {
                    console.error(
                        "Username & password fields must not be empty!",
                    );
                }

                const userData: LoginValues = { username, password };
                const user = await useLogin.mutateAsync(userData);

                toast.add({
                    title: "Login successful!",
                    description: `Welcome back ${user.fullname ?? user.username}`,
                });

                return { fieldData: { username, password } };
            } catch (error) {
                console.error("Login error: ", error);
                toast.add({
                    title: "Login failed " + error,
                    description: "Internal server error",
                });
            }
        },
        [useLogin],
    );

    const [state, action, isSubmitting] = useActionState(
        handleLogin,
        undefined,
    );

    return (
        <AuthShell
            eyebrow="Welcome back"
            title="Login in to your account."
            description="Manage your visits and keep your salon experience close at hand."
        >
            <form className="ss-auth__form" action={action}>
                <AuthField
                    label="Username"
                    defaultValue={state?.fieldData.username}
                    type="text"
                    name="username"
                    autoComplete="username"
                    placeholder="Enter your username"
                    required
                />
                <AuthField
                    label="Password"
                    defaultValue={state?.fieldData.password}
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    required
                />

                {/* <div className="ss-auth__form-options">
                    <label className="ss-auth__check">
                        <input type="checkbox" name="remember" />
                        <span>Remember me</span>
                    </label>
                    <a href={forgotPasswordHref}>Forgot password?</a>
                </div> */}

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
