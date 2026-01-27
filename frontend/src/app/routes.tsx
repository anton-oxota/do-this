import { createBrowserRouter, Navigate } from "react-router";

// Pages
import AuthPage from "../features/auth/pages/AuthPage/AuthPage";
import RegistrationSuccessPage from "../features/auth/pages/RegistrationSuccessPage/RegistrationSuccessPage";
import VerifyEmailPage from "../features/auth/pages/VerifyEmailPage/VerifyEmailPage";

const router = createBrowserRouter([
    {
        index: true,
        element: <h1>HomePage</h1>,
    },

    {
        path: "/auth",
        children: [
            {
                index: true,
                element: <Navigate to="login" replace />,
            },
            {
                path: ":mode?",
                element: <AuthPage />,
            },
            {
                path: "registration-success",
                element: <RegistrationSuccessPage />,
            },
            { path: "verify-email", element: <VerifyEmailPage /> },
        ],
    },
]);

export default router;
