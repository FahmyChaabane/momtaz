import { FC, useContext, useEffect, useState } from "react";
import { Box } from "./styles/box.styled";
import { StyledBoxContent } from "./styles/boxContent.styled";
import { StyledJournal } from "./styles/journal.styled";
import { StyledJournalContent } from "./styles/journalContent.styled";
import BoxHeader from "./boxHeader";
import GameList from "./gameList";
import KidSelectMenu from "./kidSelectMenu";
import clock from "../public/icon-clock.png";
import JournalList from "./journalList";
import JournalSummary from "./journalSummary";
import { ChildDto, GameDto, ParentDto } from "../lib/interfaces";
import { GET_GAME_INFO_QUERY } from "../lib/queries";
import { useLazyQuery } from "@apollo/client";
import Loader from "./loader";
import { NotificationContext } from "./alertContext";

interface Props {
  profile: { getProfile: ParentDto } | undefined;
  selectedKid: ChildDto | null;
  selectedGame: GameDto | null;
  onChangeSelectedKid: (child: ChildDto) => void;
  onChangeSelectedGame: (game: GameDto) => void;
}

const JournalContent: FC<Props> = ({
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
    <StyledJournalContent>
      <Box padding={2}>
        <BoxHeader headerTitle="Time spent on games" headerLogo={clock}>
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
        <BoxHeader headerTitle="Log in journal" headerLogo={clock}></BoxHeader>
        {loading ? (
          <Loader />
        ) : (
          <StyledBoxContent>
            <StyledJournal>
              <JournalSummary journalStatistic={gameInfo?.journalStatistic} />
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Login Time</th>
                    <th>Time Spent</th>
                  </tr>
                </thead>

                <JournalList journals={gameInfo?.journals || []} />
              </table>
            </StyledJournal>
          </StyledBoxContent>
        )}
      </Box>
    </StyledJournalContent>
  );
};

export default JournalContent;
