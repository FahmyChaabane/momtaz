import Image, { StaticImageData } from "next/image";
import React from "react";
import { StyledButton } from "./styles/button.styled";

type Props = {
  type?: "button" | "submit" | "reset" | undefined;
  text: string;
  br: string;
  bglg1?: string;
  bglg2?: string;
  color?: string;
  padding?: string;
  width: string;
  imgsrc?: StaticImageData;
  onClick?: () => void;
};

const Button = ({ text, imgsrc, ...rest }: Props) => {
  return (
    <StyledButton flexed={typeof imgsrc !== "undefined"} {...rest}>
      {imgsrc && (
        <figure>
          <Image src={imgsrc} alt="" width={20} height={20} />
        </figure>
      )}
      <>{text}</>
    </StyledButton>
  );
};

export default Button;
