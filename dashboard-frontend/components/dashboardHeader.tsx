import { FC } from "react";
import search from "../public/icon-search.png";
import notification from "../public/icon-notification.png";
import exit from "../public/icon-exit.png";
import { GET_PROFILE_QUERY } from "../lib/queries";
import { useQuery } from "@apollo/client";
import { ParentDto } from "../lib/interfaces";
import { StyledDashboardHeader } from "./styles/dashboardHeader.styled";
import { Flex } from "./styles/flex.styled";
import Image from "next/image";
import { StyledProfileFigure } from "./styles/profileFigure.styled";
import { useRouter } from "next/router";
import { StyledAvatar } from "./styles/profileAvatar";
import Button from "./button";
import Cookies from "universal-cookie";

interface Props {}

const DashboardHeader: FC<Props> = ({}) => {
  const router = useRouter();
  const { data } = useQuery<{ getProfile: ParentDto }>(GET_PROFILE_QUERY);

  const name = data?.getProfile?.username || "";
  const avatar = data?.getProfile?.avatar || "";
  const usingOauthService = data?.getProfile?.usingOauthService || false;

  const displayTitle = () => {
    return router.pathname.includes("overview")
      ? "Overview"
      : router.pathname.includes("journals")
      ? "Time Passed"
      : router.pathname.includes("progression")
      ? "Progression"
      : router.pathname.includes("achievements")
      ? "Achievements"
      : router.pathname.includes("controls")
      ? "Parent Control"
      : router.pathname.includes("premium")
      ? "Premium"
      : "Settings";
  };

  return (
    <StyledDashboardHeader>
      <h1>{displayTitle()}</h1>
      <Flex align="center">
        <Image src={search} alt="" />
        <input placeholder="Search for someting..." />
      </Flex>

      <Image src={notification} alt="bell" />

      <StyledProfileFigure onClick={() => router.push("/dashboard/settings")}>
        <Flex align="center" justify="center">
          <StyledAvatar height="3.5rem" width="3.5rem">
            {usingOauthService ? (
              <Image src={avatar} alt="profile" layout="fill" />
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_CORE_HOST}/${avatar}`}
                alt="profile"
                layout="fill"
              />
            )}
          </StyledAvatar>
          <h2>{name}</h2>
        </Flex>
      </StyledProfileFigure>
      <Button
        text="logout"
        br="5rem"
        width="15rem"
        imgsrc={exit}
        padding="1rem"
        onClick={() => {
          new Cookies().remove("token", { path: "/" });
          window.location.replace("/login");
        }}
      />
    </StyledDashboardHeader>
  );
};

export default DashboardHeader;
