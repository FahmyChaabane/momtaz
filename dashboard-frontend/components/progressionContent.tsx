import { FC, useContext, useEffect, useState } from "react";
import BoxHeader from "./boxHeader";
import { Box } from "./styles/box.styled";
import { StyledProgressionContent } from "./styles/progressionContent.styled";
import progreesion from "../public/icon-progression.png";
import KidSelectMenu from "./kidSelectMenu";
import { StyledBoxContent } from "./styles/boxContent.styled";
import GameList from "./gameList";
import Chart from "./chart";
import { StyledChart } from "./styles/chart.styled";
import ProgressionLevelSummary from "./progressionLevelSummary";
import ProgressionStatistics from "./progressionStatistics";
import Image from "next/image";
import info from "../public/icon-info-circle.png";
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

const ProgressionContent: FC<Props> = ({
  profile,
  selectedKid,
  selectedGame,
  onChangeSelectedKid,
  onChangeSelectedGame,
}) => {
  const { setNotificationAlert } = useContext(NotificationContext);
  const [gameInfo, setGameInfo] = useState<GameDto | null>(null);

  const [getGameInfo, { loading, error, data }] = useLazyQuery<
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
    <StyledProgressionContent>
      <Box padding={2}>
        <BoxHeader headerTitle="Progression" headerLogo={progreesion}>
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
      {/* line chart */}
      <Box padding={2} gridrow="2 / 3" gridcolumn="1 / 2">
        <BoxHeader
          headerTitle="Graphical View"
          headerLogo={progreesion}
        ></BoxHeader>
        {loading ? (
          <Loader />
        ) : (
          <StyledBoxContent>
            <Chart gameInfo={gameInfo} type="line" />
            <ProgressionLevelSummary
              progressionStatistic={gameInfo?.progressionStatistic}
            />
          </StyledBoxContent>
        )}
      </Box>
      {/* statistics data */}
      <Box padding={2} gridrow="2 / 3" gridcolumn="2 / 3">
        <BoxHeader
          headerTitle="In Game Progress Details"
          headerLogo={progreesion}
        ></BoxHeader>
        {loading ? (
          <Loader />
        ) : (
          <StyledBoxContent>
            <ProgressionStatistics
              progressionStatistic={gameInfo?.progressionStatistic}
            />
          </StyledBoxContent>
        )}
      </Box>
      {/* bar chart */}
      <Box padding={2} gridrow="3 / 4" gridcolumn="1 / 2">
        <BoxHeader
          headerTitle="Comparison"
          headerLogo={progreesion}
        ></BoxHeader>
        {loading ? (
          <Loader />
        ) : (
          <StyledBoxContent>
            <StyledChart>
              <Chart gameInfo={gameInfo} type="bar" />
            </StyledChart>
            <Image src={info} alt="warning" />
            <p style={{ display: "inline", marginLeft: "1rem" }}>
              This is the avg time needed to end a single level on comparison
              with 3 factors avg time of users and avg detected by momtaz team.
            </p>
          </StyledBoxContent>
        )}
      </Box>
    </StyledProgressionContent>
  );
};

export default ProgressionContent;
