import Image from "next/image";
import clock from "../public/icon-clock.png";
import arrow from "../public/icon-augmentation.png";
import progression from "../public/icon-progression.png";
import cup from "../public/icon-cup.png";
import Button from "./button";
import BoxHeader from "./boxHeader";
import Chart from "./chart";
import GameList from "./gameList";
import AchievmentList from "./achievementList";
import KidList from "./kidList";
import { FC } from "react";
import { Box } from "./styles/box.styled";
import { Flex } from "./styles/flex.styled";
import { StyledOverviewContent } from "./styles/overviewContent.styled";
import { StyledBoxContent } from "./styles/boxContent.styled";
import KidSelectMenu from "./kidSelectMenu";
import { ChartData, ChartOptions } from "chart.js";
import { ChildDto, GameDto, ParentDto } from "../lib/interfaces";
import { useRouter } from "next/router";

const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: 1,
    },
  },
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

const labels = ["Lvl 1", "Lvl 2", "Lvl 3", "Lvl 4", "Lvl 5", "Lvl 6"];

const data: ChartData = {
  labels,
  datasets: [
    {
      label: "Game 1",
      data: [25, 56, 85, 27, 80],
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Game 2",
      data: [50, 67, 40, 67, 27],
      borderColor: "rgb(53, 162, 235)",
      borderWidth: 2,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      label: "Game 3",
      data: [68, 47, 15, 20, 46],
      borderColor: "rgb(34, 123, 51, 0.5)",
      borderWidth: 2,
      backgroundColor: "rgba(34, 123, 51, 0.5)",

      fill: false,
    },
  ],
};

interface Props {
  profile: { getProfile: ParentDto } | undefined;
  selectedKid: ChildDto | null;
  selectedGame: GameDto | null;
  onChangeSelectedKid: (child: ChildDto) => void;
  onChangeSelectedGame: (game: GameDto) => void;
}

const OverviewContent: FC<Props> = ({
  profile,
  selectedKid,
  selectedGame,
  onChangeSelectedKid,
  onChangeSelectedGame,
}) => {
  const router = useRouter();

  return (
    <StyledOverviewContent>
      {/* top left games list */}
      <Box padding={2}>
        <BoxHeader headerTitle="Time spent on games" headerLogo={clock}>
          <section>
            <Flex align="center">
              <Image src={arrow} alt="" />
              <p>+7 hours this week</p>
            </Flex>
          </section>
        </BoxHeader>
        <StyledBoxContent>
          <GameList
            games={selectedKid?.games || []}
            selectedGame={selectedGame}
            onChangeSelectedGame={onChangeSelectedGame}
          />
        </StyledBoxContent>
      </Box>
      {/* top right kids list */}
      <Box padding={2}>
        <BoxHeader headerTitle="Kids List" headerLogo={clock}>
          <em>Last Seen</em>
        </BoxHeader>
        <StyledBoxContent active="true">
          <KidList childs={profile?.getProfile.children || []} />
        </StyledBoxContent>
      </Box>
      {/* bottom left line chart */}
      <Box padding={2}>
        <BoxHeader headerTitle="Progress per week" headerLogo={progression}>
          <KidSelectMenu
            childs={profile?.getProfile.children || []}
            selectedKid={selectedKid}
            onChangeSelectedKid={onChangeSelectedKid}
          />
        </BoxHeader>
        <StyledBoxContent>
          <Chart gameInfo={null} type="line" />
          <Flex justify="center">
            <Button
              text="Details"
              width="40%"
              br="4rem"
              bglg1="orange"
              bglg2="#FFA23F"
              onClick={() => router.push("/dashboard/analyses/progression")}
            />
          </Flex>
        </StyledBoxContent>
      </Box>
      {/* bottom right achievements list */}
      <Box padding={2}>
        <BoxHeader headerTitle="Achievments" headerLogo={cup}></BoxHeader>
        <StyledBoxContent>
          <AchievmentList />
        </StyledBoxContent>
      </Box>
    </StyledOverviewContent>
  );
};

export default OverviewContent;
