import { useQuery } from "@tanstack/react-query";
import css from "./VerifyEmailPage.module.css";
import ClientApi from "../../../../api/clientApi";
import { Link, useSearchParams } from "react-router";

function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const { isPending, isSuccess, isError, error, refetch } = useQuery({
        queryKey: ["verify-email"],
        queryFn: () => ClientApi.verifyEmail(token!),
        refetchOnWindowFocus: false,
        enabled: !!token,
        retry: false,
    });

    return (
        <section>
            <div className="container">
                <div className={css.wrapper}>
                    <h1>Email Verification</h1>
                    {isPending && <p>Verifying your email...</p>}

                    {isSuccess && (
                        <>
                            <p>Your email has been successfully verified!</p>
                        </>
                    )}

                    {isError && (
                        <>
                            <p>
                                Ops... Email verification failed{" "}
                                <button onClick={() => refetch()}>
                                    Refetch
                                </button>
                            </p>
                            <p>{error.message}</p>
                        </>
                    )}
                    <Link to="/auth/login">Login</Link>
                </div>
            </div>
        </section>
    );
}

export default VerifyEmailPage;
