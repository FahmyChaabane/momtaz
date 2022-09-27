import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import { Flex } from "./styles/flex.styled";
import fail from "../public/icon-fail.png";
import time from "../public/icon-time.png";
import console from "../public/icon-console.png";
import { ProgressionStatisticDto } from "../lib/interfaces";
import { secondsToHms } from "../lib/utils";
interface Props {
  progressionStatistic: ProgressionStatisticDto | undefined;
}

const ProgressionStatistics: FC<Props> = ({ progressionStatistic }) => {
  return progressionStatistic ? (
    <Flex direction="column" justify="space-between" align="center">
      <ul>
        <li>
          <Flex align="center">
            <Image src={fail} alt="" width={50} height={50} />
            <Flex direction="column" justify="space-between">
              <h2>Average fail per level</h2>
              <b>{progressionStatistic?.failPerLevelAVG} times</b>
            </Flex>
          </Flex>
        </li>
        <li>
          <Flex align="center">
            <Image src={time} alt="" width={50} height={50} />
            <Flex direction="column" justify="space-between">
              <h2>Average time per level</h2>
              <b>{secondsToHms(progressionStatistic?.timePerLevelAVG) || 0}</b>
            </Flex>
          </Flex>
        </li>
        <li>
          <Flex align="center">
            <Image src={console} alt="" width={50} height={50} />
            <Flex direction="column" justify="space-between">
              <h2>Average time per game</h2>
              <b>No Data</b>
            </Flex>
          </Flex>
        </li>
      </ul>
      <em>More details on later updates</em>
    </Flex>
  ) : (
    <Flex align="center" justify="center">
      <p>No Progression Registered</p>
    </Flex>
  );
};

export default ProgressionStatistics;
