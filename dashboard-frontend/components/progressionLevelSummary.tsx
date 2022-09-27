import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import { Flex } from "./styles/flex.styled";
import check from "../public/icon-tick-circle.png";
import pause from "../public/icon-timer-pause.png";
import start from "../public/icon-timer-start.png";
import {
  StyledLevelSumSection,
  StyledProgressionLevelSummary,
} from "./styles/progressionLevelSummary.styled";
import { ProgressionStatisticDto } from "../lib/interfaces";

const data: {
  bg: string;
  color: string;
  icon: StaticImageData;
  value: number;
  text: string;
}[] = [
  {
    bg: "#e0ffe9",
    color: "#00A82F",
    icon: check,
    value: 12,
    text: "Level Completed",
  },
  {
    bg: "#FFF8E0",
    color: "#E7B200",
    icon: pause,
    value: 12,
    text: "Level in Progress",
  },
  {
    bg: "#DBF8FF",
    color: "#0DD0FF",
    icon: start,
    value: 12,
    text: "Level Rest",
  },
];

interface Props {
  progressionStatistic: ProgressionStatisticDto | undefined;
}

const ProgressionLevelSummary: FC<Props> = ({ progressionStatistic }) => {
  return (
    <>
      {progressionStatistic && (
        <StyledProgressionLevelSummary>
          <Flex align="center" justify="space-evenly">
            <Flex direction="column" align="center" justify="center">
              <StyledLevelSumSection bg="#e0ffe9" color="#00A82F">
                <Flex justify="space-evenly">
                  <p>{progressionStatistic?.levelCompletedNumber}</p>{" "}
                  <Image src={check} alt="" />
                </Flex>
              </StyledLevelSumSection>
              <p>Level Completed</p>
            </Flex>

            <Flex direction="column" align="center" justify="center">
              <StyledLevelSumSection bg="#FFF8E0" color="#E7B200">
                <Flex justify="space-evenly">
                  <p>{progressionStatistic?.levelInProgressNumber}</p>{" "}
                  <Image src={pause} alt="" />
                </Flex>
              </StyledLevelSumSection>
              <p>Level in Progress</p>
            </Flex>

            <Flex direction="column" align="center" justify="center">
              <StyledLevelSumSection bg="#DBF8FF" color="#0DD0FF">
                <Flex justify="space-evenly">
                  <p>{progressionStatistic?.levelRestNumber}</p>{" "}
                  <Image src={start} alt="" />
                </Flex>
              </StyledLevelSumSection>
              <p>Level Rest</p>
            </Flex>
          </Flex>
        </StyledProgressionLevelSummary>
      )}
    </>
  );
};

export default ProgressionLevelSummary;
