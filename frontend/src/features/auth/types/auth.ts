export type AuthModes = "login" | "register";

export type UserRegisterData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};
