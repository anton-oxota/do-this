import { useMutation } from "@tanstack/react-query";
import css from "./RegistrationSuccessPage.module.css";

import { Link, Navigate, useLocation } from "react-router";
import ClientApi from "../../../../api/clientApi";

function RegistrationSuccessPage() {
    const locationState = useLocation().state;

    const { mutate, isPending } = useMutation({
        mutationFn: (email: string) => ClientApi.resendVerificationEmail(email),
    });

    if (
        !locationState ||
        !locationState.email ||
        !locationState.emailVerificationUrl
    ) {
        return <Navigate to="/auth/register" replace />;
    }

    function handleResendVerificationEmail() {
        const email = locationState.email as string;
        mutate(email);
    }

    return (
        <section>
            <div className="container">
                <div className={css.wrapper}>
                    <h1>User Created</h1>
                    <p>Please, verify your email</p>
                    <p>
                        Don't have mail ?{" "}
                        <button
                            onClick={handleResendVerificationEmail}
                            disabled={isPending}
                        >
                            {isPending ? "Resending...." : "Resend"}
                        </button>
                    </p>
                    <Link to="/auth/login">Login</Link>
                </div>
            </div>
        </section>
    );
}

export default RegistrationSuccessPage;
