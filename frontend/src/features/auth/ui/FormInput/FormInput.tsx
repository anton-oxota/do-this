import css from "./FormInput.module.css";

type FormInputType = {
    labelText: string;
    isTouched: boolean;
    errorMessage: string | null;
} & React.ComponentProps<"input">;

function FormInput({
    labelText,
    id,
    isTouched,
    errorMessage,
    ...inputProps
}: FormInputType) {
    const isErrorVisible = isTouched && errorMessage;
    let inputWrapperClasses = css.inputWrapper;
    if (isErrorVisible) inputWrapperClasses += ` ${css.error}`;

    return (
        <div className={inputWrapperClasses}>
            <label htmlFor={id}>{labelText}</label>
            <input className={css.input} {...inputProps} />
            {isTouched && errorMessage && (
                <span style={{ color: "red" }}>{errorMessage}</span>
            )}
        </div>
    );
}

export default FormInput;
