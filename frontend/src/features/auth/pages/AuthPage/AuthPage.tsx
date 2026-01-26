import css from "./AuthPage.module.css";

import { Navigate, useParams } from "react-router";

import type { AuthModes } from "../../types/auth";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import LoginForm from "../../components/LoginForm/LoginForm";

function AuthPage() {
    const { mode } = useParams<{ mode: AuthModes }>();

    if (mode !== "login" && mode !== "register") {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <section className={css.section}>
            <div className="container">
                <div className={css.formWrapper}>
                    {mode === "register" && <RegisterForm />}
                    {mode === "login" && <LoginForm />}
                </div>
            </div>
        </section>
    );
}

export default AuthPage;
