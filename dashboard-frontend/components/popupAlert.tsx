import { FC, RefObject, useContext, useEffect, useRef } from "react";
import { NotificationContext } from "./alertContext";
import {
  StyledAlert,
  StyledAlertContent,
  StyledAlertHeader,
} from "./styles/alert.styled";

interface Props {
  msg: string;
  type: string;
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(
  ref: RefObject<HTMLDivElement>,
  setNotificationAlert: any
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setNotificationAlert({
          show: false,
          msg: "",
          type: "",
        });
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setNotificationAlert]);
}

const PopupAlert: FC<Props> = ({ msg, type }) => {
  const { setNotificationAlert } = useContext(NotificationContext);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(wrapperRef, setNotificationAlert);

  return (
    <StyledAlert>
      <StyledAlertContent ref={wrapperRef} type={type}>
        <StyledAlertHeader type={type}>
          <h3>{type === "error" ? "Oups" : "Good News"}</h3>
        </StyledAlertHeader>
        <p>{msg}</p>
      </StyledAlertContent>
    </StyledAlert>
  );
};

export default PopupAlert;
