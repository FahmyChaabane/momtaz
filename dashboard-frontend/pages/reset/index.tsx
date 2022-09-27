import React, { useContext } from "react";
import Button from "../../components/button";
import FromInput from "../../components/input";
import Auth from "../../components/layout/auth";
import fox from "../../public/fox-3.png";
import { NextPage } from "next";
import { Form } from "../../components/styles/form.styled";
import { useMutation } from "@apollo/client";
import { FORGOT_PASSWORD_MUTATION } from "../../lib/mutations";
import { SubmitHandler, useForm } from "react-hook-form";
import { NotificationContext } from "../../components/alertContext";
import { ParentDto } from "../../lib/interfaces";

type Props = {};
export interface ForgotPasswordForm {
  email: string;
}
interface ForgotPwdDtoInput {
  email: string;
}

const Reset: NextPage = ({}: Props) => {
  const { setNotificationAlert } = useContext(NotificationContext);
  const { register, handleSubmit, reset } = useForm<ForgotPasswordForm>();

  const [forgotpassword] = useMutation<
    { forgotpassword: ParentDto },
    { forgotPwdDtoInput: ForgotPwdDtoInput }
  >(FORGOT_PASSWORD_MUTATION, {
    onCompleted: ({ forgotpassword }) => {
      reset();
      setNotificationAlert({
        show: true,
        msg: `We sent an email to '${forgotpassword.email}', please check it out in order to complete the procedure`,
        type: "success",
      });
    },
    onError: (error) => {
      setNotificationAlert({
        show: true,
        msg: error.message,
        type: "error",
      });
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordForm> = (data) => {
    forgotpassword({
      variables: {
        forgotPwdDtoInput: {
          email: data.email,
        },
      },
    });
  };

  return (
    <Auth title="Reset Password" foxImage={fox}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FromInput
          label="Email"
          name="email"
          type="text"
          register={register}
          required
        />
        <Button type="submit" text="Send reset link" br="1rem" width="20rem" />
      </Form>
      <p>Enter your email to receive a reset password link</p>
    </Auth>
  );
};

export default Reset;
