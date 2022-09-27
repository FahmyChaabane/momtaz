import Logo from "../logo";
import logo from "../../public/logo.png";
import Image, { StaticImageData } from "next/image";
import { FC, ReactNode } from "react";
import { Box } from "../styles/box.styled";
import { DividedLayout } from "../styles/dividedLayout.styled";
import { DividedLayoutPart } from "../styles/dividedLayoutPart.styled";
import { PrimaryBoxHeading } from "../styles/primaryBoxHeading.styled";

interface Props {
  title: string;
  foxImage: StaticImageData;
  children: ReactNode;
}

const Auth: FC<Props> = ({ title, foxImage, children }) => {
  return (
    <DividedLayout>
      <DividedLayoutPart>
        <Logo src={logo} />
        <Box padding={6}>
          <>
            <PrimaryBoxHeading>{title}</PrimaryBoxHeading>
            {children}
          </>
        </Box>
      </DividedLayoutPart>
      <DividedLayoutPart bg="#FFF2E4">
        <Image src={foxImage} alt="" />
      </DividedLayoutPart>
    </DividedLayout>
  );
};

export default Auth;
