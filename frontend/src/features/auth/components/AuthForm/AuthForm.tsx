import css from "./AuthForm.module.css";

import { Link } from "react-router";

import FormInput from "../../ui/FormInput/FormInput";
import type { AuthModes } from "../../types/auth";

type AuthFormProps = {
    mode: AuthModes;
};

function AuthForm({ mode }: AuthFormProps) {
    const isRegistration = mode === "register";

    const linkTo = isRegistration ? "/auth/login" : "/auth/register";
    const linkText = isRegistration
        ? "I already have account"
        : "Create account";

    return (
        <>
            <form className={css.form}>
                <h1>&bull; DoThis &bull;</h1>

                <div className={css.formInputs}>
                    {isRegistration && (
                        <FormInput labelText="Name" type="text" />
                    )}
                    <FormInput labelText="Email" type="email" />
                    <FormInput labelText="Password" type="password" />
                    {isRegistration && (
                        <FormInput
                            labelText="Confirm Password"
                            type="password"
                        />
                    )}
                </div>

                <Link className={css.formLink} to={linkTo}>
                    {linkText}
                </Link>
                <button type="submit">
                    {isRegistration ? "Sign Up" : "Login"}
                </button>
            </form>
        </>
    );
}

export default AuthForm;
