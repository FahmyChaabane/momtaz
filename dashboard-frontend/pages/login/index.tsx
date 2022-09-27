import { useContext } from "react";
import Button from "../../components/button";
import fox from "../../public/fox-1.png";
import google from "../../public/icon-google.png";
import apple from "../../public/icon-apple.png";
import Auth from "../../components/layout/auth";
import { NextPage } from "next";
import { Form } from "../../components/styles/form.styled";
import FromInput from "../../components/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../lib/mutations";
import { useRouter } from "next/router";
import Link from "next/link";
import { NotificationContext } from "../../components/alertContext";
import Cookies from "universal-cookie";

type Props = {};

export interface LoginForm {
  email: string;
  password: string;
}

interface LoginInput {
  username: string;
  password: string;
}

const Login: NextPage = ({}: Props) => {
  const { setNotificationAlert } = useContext(NotificationContext);
  const { register, handleSubmit } = useForm<LoginForm>();
  const router = useRouter();

  const [login] = useMutation<{ login: string }, { loginInput: LoginInput }>(
    LOGIN_MUTATION,
    {
      onCompleted: ({ login }) => {
        new Cookies().set("token", login, { path: "/" });
        router.push("/dashboard/overview");
      },
      onError: (error) => {
        setNotificationAlert({
          show: true,
          msg: error.message,
          type: "error",
        });
      },
    }
  );

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    login({
      variables: {
        loginInput: {
          username: data.email,
          password: data.password,
        },
      },
    });
  };

  const redirectToGoogleOAuth = () => {
    const googleLoginURL = `${process.env.NEXT_PUBLIC_CORE_HOST}/api/auth/google`;
    window.open(googleLoginURL, "_self");
  };

  return (
    <Auth title="Login Now" foxImage={fox}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FromInput
          label="Email"
          type="text"
          name="email"
          register={register}
          required
        />
        <FromInput
          label="Password"
          type="password"
          name="password"
          register={register}
          required
        />
        <Button type="submit" text="Login" br="1rem" width={"40rem"} />
        <span>
          <Link href="/reset">
            <a>Forgot Password?</a>
          </Link>
        </span>
      </Form>
      <span>You can also login with :</span>
      <Button
        type="submit"
        text="Google"
        br="1rem"
        width="40rem"
        bglg1="blue"
        bglg2="blue"
        imgsrc={google}
        onClick={redirectToGoogleOAuth}
      />

      <Button
        text="Apple"
        br="1rem"
        width="40rem"
        bglg1="black"
        bglg2="grey"
        imgsrc={apple}
      />

      <span>
        If you do not have an account, you can{" "}
        <Link href="/signup">
          <a>Create one</a>
        </Link>
      </span>
    </Auth>
  );
};

export default Login;
