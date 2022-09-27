import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
  createContext,
} from "react";
import PopupAlert from "./popupAlert";

interface Props {
  children: ReactNode;
}

interface INotificationContent {
  show: boolean;
  type: string;
  msg: string;
}
interface INotificationContext {
  setNotificationAlert: Dispatch<SetStateAction<INotificationContent>>;
}

export const NotificationContext = createContext<INotificationContext>({
  setNotificationAlert: () => {},
});

const AlertContext: FC<Props> = ({ children }) => {
  const [notificationAlert, setNotificationAlert] =
    useState<INotificationContent>({
      show: false,
      type: "",
      msg: "",
    });

  return (
    <NotificationContext.Provider value={{ setNotificationAlert }}>
      {children}
      {notificationAlert.show && (
        <PopupAlert type={notificationAlert.type} msg={notificationAlert.msg} />
      )}
    </NotificationContext.Provider>
  );
};

export default AlertContext;
