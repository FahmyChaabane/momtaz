import { NextPage } from "next";
import Dashboard from "../../components/layout/dashboard";
import { withAuthServerSideProps } from "../../lib/utils";

type Props = {};

const Premium: NextPage = ({}: Props) => {
  return <Dashboard>{() => <h1>Premium</h1>}</Dashboard>;
};

export default Premium;

export const getServerSideProps = withAuthServerSideProps();
