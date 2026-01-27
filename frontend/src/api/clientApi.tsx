import type { UserRegisterData } from "../features/auth/types/auth";

// Register User Types
export type RegisterUserResponse = {
    message: string;
    emailVerificationUrl: string;
    user: {
        name: string;
        email: string;
        passowrd: string;
        isEmailVerified: false;
        emailVerificationToken: string;
        emailVerificationExpires: Date;
        _id: string;
        createdAt: Date;
        updatedAt: Date;
    };
};

export type RegisterUserValidationError = {
    type: string;
    value: string;
    msg: string;
    path: keyof UserRegisterData;
    location: string;
};

export type RegisterUserErrorResponse = {
    message: string;
    error: RegisterUserValidationError[];
};

// Resend Validation Types
type ResendVerificationEmailResponse = {
    emailVerificationUrl: string;
    message: string;
};

type ResendVerificationEmailErrorResponse = {
    message: string;
};

// Verify Email Types
type VerifyEmailResponse = {
    id: string;
    name: string;
    email: string;
    passowrd: string;
    isEmailVerified: boolean;
    emailVerificationToken?: string | null | undefined;
    refreshToken?: string | null | undefined;
    emailVerificationExpires?: Date;
};

class ClientApi {
    static readonly API_BASE_URL = "http://localhost:3000";

    static async registerUser(data: UserRegisterData) {
        const res = await fetch(this.API_BASE_URL + "/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorResponse: RegisterUserErrorResponse = await res.json();
            throw errorResponse;
        }

        return (await res.json()) as RegisterUserResponse;
    }

    static async resendVerificationEmail(email: string) {
        const res = await fetch(
            this.API_BASE_URL + "/auth/resend-verification-email",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            },
        );

        if (!res.ok) {
            const errorResponse: ResendVerificationEmailErrorResponse =
                await res.json();

            throw new Error(errorResponse.message);
        }

        return (await res.json()) as ResendVerificationEmailResponse;
    }

    static async verifyEmail(token: string) {
        const res = await fetch(
            this.API_BASE_URL + `/auth/verify-email?token=${token}`,
        );

        if (!res.ok) {
            const errorResponse = (await res.json()) as { message: string };
            throw new Error(errorResponse.message);
        }

        return (await res.json()) as VerifyEmailResponse;
    }
}

export default ClientApi;
