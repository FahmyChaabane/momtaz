import type { NextPage } from "next";

const Home: NextPage = () => {
  return <h1>Home</h1>;
};

export default Home;

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};
