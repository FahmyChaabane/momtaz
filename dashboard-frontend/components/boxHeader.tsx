import Image, { StaticImageData } from "next/image";
import { FC, ReactNode } from "react";
import { StyledBoxHeader } from "./styles/boxHeader.styled";
import { Flex } from "./styles/flex.styled";

interface Props {
  headerTitle: string;
  headerLogo: StaticImageData;
  children?: ReactNode;
}

const BoxHeader: FC<Props> = ({ headerTitle, headerLogo, children }) => {
  return (
    <StyledBoxHeader>
      <Flex align="center">
        <Image src={headerLogo} alt="" />
        <h3>{headerTitle}</h3>
      </Flex>
      {children}
    </StyledBoxHeader>
  );
};

export default BoxHeader;
