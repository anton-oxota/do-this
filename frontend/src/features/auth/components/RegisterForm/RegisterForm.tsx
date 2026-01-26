import { Link } from "react-router";

import { useForm, type RegisterOptions } from "react-hook-form";
import Form from "../../ui/Form/Form";

type UserRegisterData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

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
        formState: { errors },
    } = useForm<UserRegisterData>({ mode: "onTouched" });

    console.log(getValues("password"));

    function handleRegister(data: UserRegisterData) {
        console.log(data);
    }

    return (
        <div>
            <Form onSubmit={handleSubmit(handleRegister)}>
                <h1>Register</h1>
                <Form.Input
                    labelText="Name"
                    placeholder="John Doe"
                    {...register("name", inputNameOptions)}
                    inputError={errors["name"]}
                />
                <Form.Input
                    labelText="Email"
                    placeholder="example@mail.com"
                    {...register("email", inputEmailOptions)}
                    inputError={errors["email"]}
                />

                <Form.Input
                    labelText="Password"
                    type="password"
                    placeholder="••••••••••••"
                    {...register("password", inputPasswordOptions)}
                    inputError={errors["password"]}
                />

                <Form.Input
                    labelText="Confirm password"
                    type="password"
                    placeholder="••••••••••••"
                    {...register(
                        "confirmPassword",
                        inputConfirmPasswordOptions(getValues("password")),
                    )}
                    inputError={errors["confirmPassword"]}
                />
                <Link to="/auth/login">I already have account</Link>
                <button type="submit">Sing Up</button>
            </Form>
        </div>
    );
}

export default RegisterForm;
