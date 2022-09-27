import React, { useContext } from "react";
import Button from "../../components/button";
import FromInput from "../../components/input";
import Auth from "../../components/layout/auth";
import fox from "../../public/fox-4.png";
import { Form } from "../../components/styles/form.styled";
import { GetServerSideProps, NextPage } from "next";
import { useMutation } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { RESET_PASSWORD_MUTATION } from "../../lib/mutations";
import { useRouter } from "next/router";
import { NotificationContext } from "../../components/alertContext";
import { ParentDto } from "../../lib/interfaces";

type Props = {
  id: string;
};
export interface ResetPasswordForm {
  password: string;
  reset_password: string;
}
interface ResetPwdDtoInput {
  password: string;
}

const ResetAction: NextPage<Props> = ({ id }) => {
  const { setNotificationAlert } = useContext(NotificationContext);
  const { register, handleSubmit, reset } = useForm<ResetPasswordForm>();
  const router = useRouter();

  const [resetpassword] = useMutation<
    { resetpassword: ParentDto },
    { resetPwdDtoInput: ResetPwdDtoInput; resetPasswordToken: string }
  >(RESET_PASSWORD_MUTATION, {
    onCompleted: ({ resetpassword }) => {
      reset();
      setNotificationAlert({
        show: true,
        msg: `Congrats, your password has been successfully reset.`,
        type: "success",
      });
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    },
    onError: (error) => {
      setNotificationAlert({
        show: true,
        msg: error.message,
        type: "error",
      });
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordForm> = (data) => {
    if (data.password !== data.reset_password) {
      setNotificationAlert({
        show: true,
        msg: "passwords don't match",
        type: "error",
      });
      return;
    }
    resetpassword({
      variables: {
        resetPwdDtoInput: { password: data.password },
        resetPasswordToken: id,
      },
    });
  };

  return (
    <Auth title="Reset password" foxImage={fox}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FromInput
          label="Password"
          type="password"
          name="password"
          register={register}
          required
        />
        <FromInput
          label="Repeat Password"
          type="password"
          name="reset_password"
          register={register}
          required
        />
        <Button type="submit" text="Reset password" br="1rem" width="20rem" />
      </Form>
    </Auth>
  );
};

export default ResetAction;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return { props: { id } };
};
