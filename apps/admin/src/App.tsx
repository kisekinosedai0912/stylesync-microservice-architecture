import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./features/auth/auth.store";
import { LoginPage } from "./features/auth/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";

export function App() {
	const user = useAuthStore((state) => state.user);

	return (
		<Routes>
			<Route
				path="/login"
				element={user ? <Navigate to="/" replace /> : <LoginPage />}
			/>
			<Route
				path="/"
				element={user ? <DashboardPage /> : <Navigate to="/login" replace />}
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	);
}

export default App;
