import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

export interface InputFormProps {
    label: string;
    name: string;
    register: UseFormRegister<any>;
    errors?: FieldError;
    type?: string;
    placeholder?: string;
    validationRules?: RegisterOptions;

}