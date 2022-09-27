import { useMutation } from "@apollo/client";
import { GetServerSideProps } from "next";
import { FC, useContext, useEffect } from "react";
import { NotificationContext } from "../../components/alertContext";
import Loader from "../../components/loader";
import { CONFIRM_USER_MUTATION } from "../../lib/mutations";

type Props = {
  id: string;
};

const CorfirmationAccount: FC<Props> = ({ id }) => {
  const { setNotificationAlert } = useContext(NotificationContext);
  const [confirmUser] = useMutation<
    { confirmUser: boolean },
    { confirmationCode: string }
  >(CONFIRM_USER_MUTATION, {
    onCompleted: ({ confirmUser }) => {
      setNotificationAlert({
        show: true,
        msg: `Congrats, your account has been activated.`,
        type: "success",
      });
      setTimeout(() => {
        window.location.replace("/login");
      }, 3000);
    },
    onError: (error) => {
      setNotificationAlert({
        show: true,
        msg: error.message,
        type: "error",
      });
      setTimeout(() => {
        window.location.replace("/login");
      }, 3000);
    },
  });

  useEffect(() => {
    confirmUser({
      variables: {
        confirmationCode: id,
      },
    });
  }, [confirmUser, id]);

  return <Loader />;
};

export default CorfirmationAccount;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return { props: { id } };
};
