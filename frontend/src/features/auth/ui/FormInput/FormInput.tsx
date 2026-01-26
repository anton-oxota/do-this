import css from "./FormInput.module.css";
import type { FieldError } from "react-hook-form";

type FormInputType = React.ComponentProps<"input"> & {
    labelText: string;
    inputError?: FieldError;
};

function FormInput({ labelText, inputError, ...inputProps }: FormInputType) {
    let inputWrapperClasses = css.inputWrapper;

    if (inputError) inputWrapperClasses += ` ${css.error}`;

    return (
        <div className={inputWrapperClasses}>
            <label htmlFor={inputProps.name}>{labelText}</label>
            <input id={inputProps.name} {...inputProps} />
            {inputError && <p>{inputError.message}</p>}
        </div>
    );
}

export default FormInput;
