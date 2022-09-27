import { FC } from "react";
import Logo from "./logo";
import { StyledSideBar } from "./styles/sideBar.styled";
import logo from "../public/logo.png";
import { Flex } from "./styles/flex.styled";
import SideBarMenu from "./sideBarMenu";
import crown from "../public/icon-crown.png";
import Link from "next/link";
import { AnchorPremium } from "./styles/anchorPremium.styled";
import Image from "next/image";

interface Props {}

const SideBar: FC<Props> = ({}) => {
  return (
    <StyledSideBar>
      <>
        <Logo src={logo} />
        <Flex direction="column">
          <SideBarMenu />
        </Flex>
      </>
      <Link href="/premium">
        <AnchorPremium>
          <figure>
            <Image src={crown} alt="" />
          </figure>
          <span>Pass to Premium</span>
        </AnchorPremium>
      </Link>
    </StyledSideBar>
  );
};

export default SideBar;
