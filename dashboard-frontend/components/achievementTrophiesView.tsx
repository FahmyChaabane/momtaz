import { FC } from "react";
import { Flex } from "./styles/flex.styled";
import { StyledAchievementImage } from "./styles/achievementImage.styled";
import Image from "next/image";
import { StyledAchievementTrophiesView } from "./styles/achievementTrophiesView.styled";
import randomColor from "randomcolor";
import { AchievementDto } from "../lib/interfaces";
import { convertDate } from "../lib/utils";

interface Props {
  achievements: AchievementDto[];
}

const AchievementTrophiesView: FC<Props> = ({ achievements }) => {
  const haveAchievements = Boolean(achievements.length);

  return haveAchievements ? (
    <Flex align="center" wrap="wrap">
      {achievements.map((entry) => (
        <StyledAchievementTrophiesView key={entry._id}>
          <StyledAchievementImage bg={randomColor()}>
            <Image
              src={`${process.env.NEXT_PUBLIC_CORE_HOST}/${entry.trophyAvatar}`}
              alt=""
              width={50}
              height={50}
            />
          </StyledAchievementImage>
          <p>{entry.trophyName}</p>
          <em>{convertDate(entry.gainDate)}</em>
        </StyledAchievementTrophiesView>
      ))}
    </Flex>
  ) : (
    <Flex align="center" justify="center">
      <p>No Trophy Registered</p>
    </Flex>
  );
};

export default AchievementTrophiesView;
