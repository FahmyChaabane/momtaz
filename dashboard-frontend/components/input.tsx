import { FC } from "react";
import { Path, UseFormRegister } from "react-hook-form";
import { LoginForm } from "../pages/login";
import { ForgotPasswordForm } from "../pages/reset";
import { ResetPasswordForm } from "../pages/reset/[id]";
import { SignupForm } from "../pages/signup";
import { StyledInput } from "./styles/input.styled";

type Props = {
  label: string;
  type: string;
  name: Path<LoginForm | SignupForm | ForgotPasswordForm | ResetPasswordForm>;
  register: UseFormRegister<any>;
  required: boolean;
};

const FromInput: FC<Props> = ({ label, type, name, register, required }) => {
  return (
    <StyledInput>
      <label>{label}</label>
      <input type={type} {...register(name, { required })} />
    </StyledInput>
  );
};

export default FromInput;
