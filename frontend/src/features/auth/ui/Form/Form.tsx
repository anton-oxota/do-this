import css from "./Form.module.css";
import FormInput from "../FormInput/FormInput";

type FormType = React.ComponentProps<"form"> & {
    children: React.ReactNode;
};

function Form({ children, ...formProps }: FormType) {
    return (
        <form className={css.form} {...formProps}>
            {children}
        </form>
    );
}

Form.Input = FormInput;

export default Form;
