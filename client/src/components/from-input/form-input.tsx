import { FC, InputHTMLAttributes } from "react";

export type FormInputProps = {
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input {...otherProps} />
      {label && <div className="form-input-label">{label}</div>}
    </div>
  );
};

export default FormInput;
