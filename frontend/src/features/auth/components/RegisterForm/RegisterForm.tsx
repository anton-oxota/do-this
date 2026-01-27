import { Link, useNavigate } from "react-router";

import { useForm, type RegisterOptions } from "react-hook-form";
import Form from "../../ui/Form/Form";

import type { UserRegisterData } from "../../types/auth";
import { useMutation } from "@tanstack/react-query";
import ClientApi, {
    type RegisterUserErrorResponse,
    type RegisterUserResponse,
} from "../../../../api/clientApi";

const inputNameOptions: RegisterOptions<UserRegisterData> = {
    required: "Name is required",
    minLength: {
        value: 2,
        message: "Min name length is 2",
    },
    maxLength: {
        value: 50,
        message: "Max name length is 50",
    },
    pattern: {
        value: /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
        message: "Enter valid name",
    },
};

const inputEmailOptions: RegisterOptions<UserRegisterData> = {
    required: "Email is required",
    pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter valid email",
    },
};

const inputPasswordOptions: RegisterOptions<UserRegisterData> = {
    required: "Password is required",
    minLength: {
        value: 6,
        message: "Password min length is 6",
    },
};

const inputConfirmPasswordOptions = (
    password: string,
): RegisterOptions<UserRegisterData> => {
    return {
        required: "Confirm your password",
        validate: (value) => value === password || "Passwords do not match",
    };
};

function RegisterForm() {
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors },
    } = useForm<UserRegisterData>({ mode: "onTouched" });

    const { mutate, isPending } = useMutation({
        mutationFn: (data: UserRegisterData) => ClientApi.registerUser(data),
        onSuccess: (value: RegisterUserResponse) => {
            navigate("/auth/registration-success", {
                state: {
                    emailVerificationUrl: value.emailVerificationUrl,
                    email: getValues("email"),
                },
            });
        },
        onError: (error: RegisterUserErrorResponse) => {
            error.error.forEach(({ path, msg }) =>
                setError(path, { message: msg }),
            );
        },
    });

    const navigate = useNavigate();

    function handleRegister(data: UserRegisterData) {
        mutate(data);
    }

    return (
        <div>
            <Form onSubmit={handleSubmit(handleRegister)}>
                <h1>Register</h1>
                <Form.Input
                    labelText="Name"
                    placeholder="John Doe"
                    defaultValue={"John Doe"}
                    {...register("name", inputNameOptions)}
                    inputError={errors["name"]}
                />
                <Form.Input
                    labelText="Email"
                    placeholder="example@mail.com"
                    defaultValue={"example@mail.com"}
                    {...register("email", inputEmailOptions)}
                    inputError={errors["email"]}
                />

                <Form.Input
                    labelText="Password"
                    type="password"
                    placeholder="••••••••••••"
                    defaultValue={"123456"}
                    {...register("password", inputPasswordOptions)}
                    inputError={errors["password"]}
                />

                <Form.Input
                    labelText="Confirm password"
                    type="password"
                    placeholder="••••••••••••"
                    defaultValue={"123456"}
                    {...register(
                        "confirmPassword",
                        inputConfirmPasswordOptions(getValues("password")),
                    )}
                    inputError={errors["confirmPassword"]}
                />
                <Link to="/auth/login">I already have account</Link>

                <button type="submit" disabled={isPending}>
                    {isPending ? "Loading..." : "Sing Up"}
                </button>
            </Form>
        </div>
    );
}

export default RegisterForm;
