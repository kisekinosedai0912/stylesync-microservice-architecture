import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./features/auth/auth.store";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage, SignUpPage } from "../../../libs/auth/src";

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
                element={
                    user ? <Dashboard /> : <Navigate to="/login" replace />
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

function AdminApp() {}

export default App;
