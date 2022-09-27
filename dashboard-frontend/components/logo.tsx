import Image, { StaticImageData } from "next/image";
import React from "react";
import { StyledLogoContainer } from "./styles/logo.styled";

type Props = {
  src: StaticImageData;
};

export default function Logo({ src }: Props) {
  return (
    <StyledLogoContainer>
      <Image src={src} alt="" />
    </StyledLogoContainer>
  );
}
