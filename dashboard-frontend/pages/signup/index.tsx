import { useContext } from "react";
import Button from "../../components/button";
import FromInput from "../../components/input";
import fox from "../../public/fox-2.png";
import Auth from "../../components/layout/auth";
import { NextPage } from "next";
import { Form } from "../../components/styles/form.styled";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { REGISTER_PARENT_MUTATION } from "../../lib/mutations";
import Link from "next/link";
import { NotificationContext } from "../../components/alertContext";
import { ParentDto } from "../../lib/interfaces";

type Props = {};

export interface SignupForm {
  username: string;
  email: string;
  password: string;
}

interface RegisterParentInput {
  username: string;
  email: string;
  password: string;
}

const Signup: NextPage = ({}: Props) => {
  const { setNotificationAlert } = useContext(NotificationContext);
  const { register, handleSubmit, reset } = useForm<SignupForm>();

  const [registerParent] = useMutation<
    { registerParent: ParentDto },
    { registerParentInput: RegisterParentInput }
  >(REGISTER_PARENT_MUTATION, {
    onCompleted: ({ registerParent }) => {
      reset();
      setNotificationAlert({
        show: true,
        msg: `We sent an email to '${registerParent.email}', please check it out in order to activate your account`,
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

  const onSubmit: SubmitHandler<SignupForm> = (data) => {
    registerParent({
      variables: {
        registerParentInput: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      },
    });
  };

  return (
    <Auth title="Sign up" foxImage={fox}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FromInput
          label="Username"
          name="username"
          type="text"
          register={register}
          required
        />
        <FromInput
          label="Email"
          name="email"
          type="text"
          register={register}
          required
        />
        <FromInput
          label="Password"
          name="password"
          type="password"
          register={register}
          required
        />
        <Button type="submit" text="Sign up" br="1rem" width="40rem" />
      </Form>
      <p>
        You already own an account ?{" "}
        <Link href="/login">
          <a>Sign in</a>
        </Link>
      </p>
    </Auth>
  );
};

export default Signup;
