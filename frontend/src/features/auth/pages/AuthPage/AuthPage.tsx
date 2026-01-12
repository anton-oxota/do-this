import css from "./AuthPage.module.css";

import { Navigate, useParams } from "react-router";

import AuthForm from "../../components/AuthForm/AuthForm";
import type { AuthModes } from "../../types/auth";

function AuthPage() {
    const { mode } = useParams<{ mode: AuthModes }>();

    if (mode !== "login" && mode !== "register") {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <section className={css.section}>
            <div className="container">
                <AuthForm mode={mode} />
            </div>
        </section>
    );
}

export default AuthPage;
