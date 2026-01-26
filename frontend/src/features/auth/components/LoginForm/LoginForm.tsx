import { useForm, type RegisterOptions } from "react-hook-form";
import Form from "../../ui/Form/Form";
import { Link } from "react-router";

type UserLoginData = {
    email: string;
    password: string;
};

const inputEmailOptions: RegisterOptions<UserLoginData> = {
    required: "Email is required",
    pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter valid email",
    },
};

const inputPasswordOptions: RegisterOptions<UserLoginData> = {
    required: "Password is required",
    minLength: {
        value: 6,
        message: "Password min length is 6",
    },
};

function LoginForm() {
    const {
        register,
        formState: { errors },
    } = useForm<UserLoginData>({ mode: "onTouched" });

    return (
        <Form>
            <h1>Login</h1>
            <Form.Input
                labelText="Email"
                placeholder="example@mail.com"
                {...register("email", inputEmailOptions)}
                inputError={errors["email"]}
            />
            <Form.Input
                labelText="Password"
                placeholder="••••••••••••"
                type="password"
                {...register("password", inputPasswordOptions)}
                inputError={errors["password"]}
            />
            <Link to="/auth/register">Create account</Link>
            <button type="submit">Sign In</button>
        </Form>
    );
}

export default LoginForm;
