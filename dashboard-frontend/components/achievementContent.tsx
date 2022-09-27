import { FC, useContext, useEffect, useState } from "react";
import BoxHeader from "./boxHeader";
import GameList from "./gameList";
import KidSelectMenu from "./kidSelectMenu";
import { Box } from "./styles/box.styled";
import { StyledBoxContent } from "./styles/boxContent.styled";
import achievement from "../public/icon-cup.png";
import { StyledAchievementContent } from "./styles/achievementContent.styled";
import AchievementTrophiesView from "./achievementTrophiesView";
import { NotificationContext } from "./alertContext";
import { ChildDto, GameDto, ParentDto } from "../lib/interfaces";
import { useLazyQuery } from "@apollo/client";
import { GET_GAME_INFO_QUERY } from "../lib/queries";
import Loader from "./loader";

interface Props {
  profile: { getProfile: ParentDto } | undefined;
  selectedKid: ChildDto | null;
  selectedGame: GameDto | null;
  onChangeSelectedKid: (child: ChildDto) => void;
  onChangeSelectedGame: (game: GameDto) => void;
}

const AchievementContent: FC<Props> = ({
  profile,
  selectedKid,
  selectedGame,
  onChangeSelectedKid,
  onChangeSelectedGame,
}) => {
  const { setNotificationAlert } = useContext(NotificationContext);
  const [gameInfo, setGameInfo] = useState<GameDto | null>(null);

  const [getGameInfo, { loading }] = useLazyQuery<
    {
      getGameInfo: GameDto;
    },
    {
      gameId: string;
      childId: string;
    }
  >(GET_GAME_INFO_QUERY, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      setGameInfo(data.getGameInfo);
    },
    onError: (error) => {
      setNotificationAlert({
        show: true,
        msg: error.message,
        type: "error",
      });
    },
  });

  useEffect(() => {
    if (selectedKid !== null && selectedGame === null) {
      setGameInfo(null);
    }

    if (selectedKid !== null && selectedGame !== null) {
      getGameInfo({
        variables: {
          childId: selectedKid?._id,
          gameId: selectedGame?._id,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGame]);

  return (
    <StyledAchievementContent>
      <Box padding={2}>
        <BoxHeader headerTitle="Achievement" headerLogo={achievement}>
          <KidSelectMenu
            childs={profile?.getProfile.children || []}
            selectedKid={selectedKid}
            onChangeSelectedKid={onChangeSelectedKid}
          />
        </BoxHeader>
        <StyledBoxContent>
          <GameList
            games={selectedKid?.games || []}
            selectedGame={selectedGame}
            onChangeSelectedGame={onChangeSelectedGame}
          />
        </StyledBoxContent>
      </Box>
      <Box padding={2}>
        <BoxHeader
          headerTitle="Graphical View"
          headerLogo={achievement}
        ></BoxHeader>
        {loading ? (
          <Loader />
        ) : (
          <StyledBoxContent>
            <AchievementTrophiesView
              achievements={gameInfo?.achievements || []}
            />
          </StyledBoxContent>
        )}
      </Box>
    </StyledAchievementContent>
  );
};

export default AchievementContent;
