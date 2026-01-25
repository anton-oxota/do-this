import { useState } from "react";

type RegisterOptions = {
    pattern: RegExp | string;
    errorMessage: string;
};

export default function useForm() {
    const [values, setValues] = useState<Record<string, string>>({});
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const rules: Record<string, RegisterOptions> = {};

    function validate(name: string, value: string) {
        const pattern = rules[name].pattern;
        if (!pattern) return true;

        const isValid = new RegExp(pattern).test(value ?? "");

        setErrors((prev) => ({
            ...prev,
            [name]: isValid ? null : rules[name].errorMessage,
        }));

        if (!isValid) return false;

        return true;
    }

    function register(name: string, options: RegisterOptions) {
        rules[name] = options;

        return {
            name,
            value: values[name] ?? "",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target;

                setValues((prev) => ({
                    ...prev,
                    [name]: value,
                }));

                if (touched[name]) {
                    validate(name, value);
                }
            },
            onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
                const { value } = e.target;

                setTouched((prev) => ({
                    ...prev,
                    [name]: true,
                }));

                validate(name, value);
            },
        };
    }

    function reset() {
        setValues({});
        setErrors({});
        setTouched({});
    }

    function onSubmit(cb: (values: Record<string, string>) => void) {
        let isValid = true;

        const nextTouched: Record<string, boolean> = {};

        Object.entries(rules).forEach(([name]) => {
            nextTouched[name] = true;
            const validationResult = validate(name, values[name]);
            if (isValid) isValid = validationResult;
        });

        setTouched(nextTouched);

        if (isValid) cb(values);
    }

    return {
        values,
        errors,
        touched,
        register,
        reset,
        onSubmit,
    };
}
