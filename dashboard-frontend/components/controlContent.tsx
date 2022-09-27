import { FC, useState } from "react";
import BoxHeader from "./boxHeader";
import GameList from "./gameList";
import { Box } from "./styles/box.styled";
import { StyledBoxContent } from "./styles/boxContent.styled";
import options from "../public/icon-category-control.png";
import { StyledControlContent } from "./styles/controlContent.styled";
import { Flex } from "./styles/flex.styled";
import Button from "./button";
import add from "../public/icon-add-circle.png";
import KidListProfileOption from "./kidListProfileOption";
import AddKidPopup from "./addKidPopup";
import { ChildDto, GameDto, ParentDto } from "../lib/interfaces";
import KidSelectMenu from "./kidSelectMenu";

interface Props {
  profile: { getProfile: ParentDto } | undefined;
  selectedKid: ChildDto | null;
  selectedGame: GameDto | null;
  onChangeSelectedKid: (child: ChildDto) => void;
  onChangeSelectedGame: (game: GameDto) => void;
}

const ControlContent: FC<Props> = ({
  profile,
  selectedKid,
  selectedGame,
  onChangeSelectedKid,
  onChangeSelectedGame,
}) => {
  const [hidden, sethidden] = useState<boolean>(true);
  const hidePopup = () => {
    sethidden(true);
  };

  return (
    <StyledControlContent>
      <Box padding={2}>
        <BoxHeader headerTitle="Control your kids" headerLogo={options}>
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
          headerTitle="Profile Options"
          headerLogo={options}
        ></BoxHeader>
        <StyledBoxContent>
          <KidListProfileOption childs={profile?.getProfile.children || []} />
          <Flex justify="center" align="center">
            <Button
              text="Add Profile"
              br="5rem"
              width="20rem"
              bglg1="transparent"
              bglg2="#FFF"
              imgsrc={add}
              color="blue"
              padding="1rem"
              onClick={() => sethidden(false)}
            />
            {!hidden && <AddKidPopup closePopup={hidePopup} />}
          </Flex>
        </StyledBoxContent>
      </Box>
    </StyledControlContent>
  );
};

export default ControlContent;
