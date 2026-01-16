import css from "./AuthForm.module.css";

import { Link } from "react-router";

import FormInput from "../../ui/FormInput/FormInput";
import type { AuthModes } from "../../types/auth";
import useForm from "../../../../shared/hooks/useForm";

type AuthFormProps = {
    mode: AuthModes;
};

function AuthForm({ mode }: AuthFormProps) {
    const { errors, touched, values, register, reset, onSubmit } = useForm();

    const isRegistration = mode === "register";

    const linkTo = isRegistration ? "/auth/login" : "/auth/register";
    const linkText = isRegistration
        ? "I already have account"
        : "Create account";

    return (
        <>
            <form
                className={css.form}
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit((data) => {
                        console.log(data);
                    });
                }}
            >
                <h1>&bull; DoThis &bull;</h1>

                <div className={css.formInputs}>
                    {isRegistration && (
                        <FormInput
                            labelText="Name"
                            type="text"
                            isTouched={touched["name"]}
                            errorMessage={errors["name"]}
                            {...register("name", {
                                pattern: /^[A-Za-z\s'-]{2,50}$/,
                                errorMessage:
                                    "Name must be at least 2 character",
                            })}
                        />
                    )}
                    <FormInput
                        labelText="Email"
                        type="email"
                        isTouched={touched["email"]}
                        errorMessage={errors["email"]}
                        {...register("email", {
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            errorMessage: "Enter valid email",
                        })}
                    />
                    <FormInput
                        labelText="Password"
                        type="password"
                        isTouched={touched["password"]}
                        errorMessage={errors["password"]}
                        {...register("password", {
                            pattern: /^.{6,}$/,
                            errorMessage:
                                "Passowrd must be at least 6 character",
                        })}
                    />
                    {isRegistration && (
                        <FormInput
                            labelText="Confirm Password"
                            type="password"
                            isTouched={touched["confirmPassowrd"]}
                            errorMessage={errors["confirmPassowrd"]}
                            {...register("confirmPassowrd", {
                                pattern: values["password"],
                                errorMessage: "Passwords must be equal",
                            })}
                        />
                    )}
                </div>

                <Link className={css.formLink} to={linkTo} onClick={reset}>
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
