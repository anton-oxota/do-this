import { createBrowserRouter, Navigate } from "react-router";

// Pages
import AuthPage from "../features/auth/pages/AuthPage/AuthPage";

const router = createBrowserRouter([
    {
        index: true,
        element: <h1>HomePage</h1>,
    },
    { path: "/auth", element: <Navigate to="/auth/login" replace /> },
    {
        path: "/auth/:mode?",
        element: <AuthPage />,
    },
]);

export default router;
