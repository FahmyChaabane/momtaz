import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import Loader from "../../components/loader";

type Props = {
  token: string;
};

const OauthRedirect: NextPage<Props> = ({ token }: Props) => {
  new Cookies().set("token", token, { path: "/" });
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/overview");
  }, [router]);

  return <Loader />;
};

export default OauthRedirect;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.query;
  return { props: { token } };
};
