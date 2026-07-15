import { FormEvent, useState } from "react";
import { useLogin } from "./auth.hooks";

export function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [validationError, setValidationError] = useState<string | null>(null);
	const login = useLogin();

	const errorMessage =
		validationError ?? (login.isError ? login.error.message : null);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!username.trim() || !password) {
			setValidationError("Please enter your username and password.");
			return;
		}

		setValidationError(null);
		login.mutate({ username: username.trim(), password });
	}

	return (
		<main className="login-page">
			<div className="login-card">
				<header className="login-header">
					<span className="login-logo" aria-hidden="true">
						S
					</span>
					<h1>StyleSync Admin</h1>
					<p>Sign in with your staff account</p>
				</header>

				<form onSubmit={handleSubmit} noValidate>
					<div className="login-field">
						<label htmlFor="username">Username</label>
						<input
							id="username"
							name="username"
							type="text"
							autoComplete="username"
							autoFocus
							value={username}
							onChange={(event) => setUsername(event.target.value)}
							disabled={login.isPending}
						/>
					</div>

					<div className="login-field">
						<label htmlFor="password">Password</label>
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							value={password}
							onChange={(event) => setPassword(event.target.value)}
							disabled={login.isPending}
						/>
					</div>

					{errorMessage && (
						<p className="login-error" role="alert">
							{errorMessage}
						</p>
					)}

					<button
						type="submit"
						className="login-submit"
						disabled={login.isPending}
					>
						{login.isPending ? "Signing in…" : "Sign in"}
					</button>
				</form>
			</div>
		</main>
	);
}
