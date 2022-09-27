import { useQuery } from "@apollo/client";
import { FC, ReactNode, useEffect, useState } from "react";
import { ChildDto, GameDto, ParentDto } from "../../lib/interfaces";
import { GET_PROFILE_QUERY } from "../../lib/queries";
import DashboardHeader from "../dashboardHeader";
import SideBar from "../sideBar";
import { Flex } from "../styles/flex.styled";
import { MainContainer } from "../styles/mainContainer.styled";

interface Props {
  children: (
    profile: { getProfile: ParentDto } | undefined,
    selectedKid: ChildDto | null,
    selectedGame: GameDto | null,
    onChangeSelectedKid: (child: ChildDto) => void,
    onChangeSelectedGame: (game: GameDto) => void
  ) => ReactNode;
}

const Dashboard: FC<Props> = ({ children }) => {
  const [selectedKid, setSelectedKid] = useState<ChildDto | null>(null);
  const [selectedGame, setSelectedGame] = useState<GameDto | null>(null);

  const { data: profile } = useQuery<{ getProfile: ParentDto }>(
    GET_PROFILE_QUERY
  );

  useEffect(() => {
    setSelectedKid(profile?.getProfile.children[0] || null);
  }, [profile]);

  useEffect(() => {
    setSelectedGame(selectedKid?.games[0] || null);
  }, [selectedKid]);

  const onChangeSelectedKid = (child: ChildDto) => {
    setSelectedKid(child);
  };

  const onChangeSelectedGame = (game: GameDto) => {
    setSelectedGame(game);
  };

  return (
    <Flex>
      <SideBar />
      <MainContainer>
        <DashboardHeader />
        {children(
          profile,
          selectedKid,
          selectedGame,
          onChangeSelectedKid,
          onChangeSelectedGame
        )}
      </MainContainer>
    </Flex>
  );
};

export default Dashboard;
