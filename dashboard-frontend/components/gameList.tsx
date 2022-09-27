import Image from "next/image";
import { FC } from "react";
import { GameDto } from "../lib/interfaces";
import { Flex } from "./styles/flex.styled";
import { StyledSelectGameListFigure } from "./styles/selectGameListFigure.styled";

interface Props {
  games: GameDto[];
  selectedGame: GameDto | null;
  onChangeSelectedGame: Function;
}

const GameList: FC<Props> = ({ games, selectedGame, onChangeSelectedGame }) => {
  const haveGames = Boolean(games.length);

  return (
    <Flex justify="space-evenly">
      {haveGames ? (
        games.map((entry) => (
          <StyledSelectGameListFigure
            key={entry._id}
            selected={entry == selectedGame}
            onClick={() => onChangeSelectedGame(entry)}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_CORE_HOST}/${entry.avatar}`}
              alt="game"
              height={160}
              width={160}
            />

            <section></section>
            <div>
              <h3>{entry.name}</h3>
              {/* {router.pathname.includes("overview") && (
              <p>{`+ ${el.gameTime}`}</p>
            )} */}
            </div>
          </StyledSelectGameListFigure>
        ))
      ) : (
        <p>No Game Registered</p>
      )}
    </Flex>
  );
};

export default GameList;
