import ErrorMessage from "../ErrorMessage";
import { InputFormProps } from "./types";

export const InputForm = ({
  label,
  name,
  register,
  errors,
  type = "text",
  placeholder,
  validationRules,
}: InputFormProps) => {
  return (
    <div className="mb-4">
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 pl-2"
        type={type}
        id={name}
        placeholder={placeholder}
        {...register(name, validationRules)}
      />
      {errors && <ErrorMessage>{errors.message}</ErrorMessage>}
    </div>
  );
};
