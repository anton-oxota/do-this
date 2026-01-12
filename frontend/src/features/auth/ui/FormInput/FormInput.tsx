import css from "./FormInput.module.css";

type FormInputType = {
    labelText: string;
} & React.ComponentProps<"input">;

function FormInput({ labelText, id, ...inputProps }: FormInputType) {
    return (
        <div className={css.inputWrapper}>
            <label htmlFor={id}>{labelText}</label>
            <input className={css.input} {...inputProps} />
        </div>
    );
}

export default FormInput;
