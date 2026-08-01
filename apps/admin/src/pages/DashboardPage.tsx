import { useLogout } from "../features/auth/auth.hooks";
import { useAuthStore } from "../features/auth/auth.store";

export function DashboardPage() {
	const user = useAuthStore((state) => state.user);
	const logout = useLogout();

	if (!user) {
		return null;
	}

	return (
		<div className="dashboard">
			<header className="dashboard-header">
				<h1>StyleSync Admin</h1>
				<div className="dashboard-user">
					<span>
						{user.fullname} <em>({user.role})</em>
					</span>
					<button
						type="button"
						onClick={() => logout.mutate()}
						disabled={logout.isPending}
					>
						{logout.isPending ? "Signing out…" : "Sign out"}
					</button>
				</div>
			</header>

			<main className="dashboard-main">
				<h2>Welcome back, {user.fullname}</h2>
				<p>
					You are signed in as <strong>{user.username}</strong> ({user.email}).
				</p>
			</main>
		</div>
	);
}
