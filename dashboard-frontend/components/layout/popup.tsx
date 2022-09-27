import { FC, ReactNode, RefObject, useEffect, useRef } from "react";
import {
  StyledPopup,
  StyledPopupContent,
  StyledPopupHeader,
} from "../styles/popup.styled";

interface Props {
  title: string;
  children: ReactNode;
  closePopup: () => void;
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(
  ref: RefObject<HTMLDivElement>,
  closePopup: () => void
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closePopup();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closePopup, ref]);
}

const Popup: FC<Props> = ({ title, children, closePopup }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(wrapperRef, closePopup);

  return (
    <StyledPopup>
      <StyledPopupContent ref={wrapperRef}>
        <StyledPopupHeader>
          <h3>{title}</h3>
        </StyledPopupHeader>
        {children}
      </StyledPopupContent>
    </StyledPopup>
  );
};

export default Popup;
