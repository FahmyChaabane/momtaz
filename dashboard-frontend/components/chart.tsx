import { ChartData, ChartOptions } from "chart.js";
import { FC } from "react";
import { Bar, Line } from "react-chartjs-2";
import { GameDto } from "../lib/interfaces";
import { convertSecMin } from "../lib/utils";
import { StyledChart } from "./styles/chart.styled";
import { Flex } from "./styles/flex.styled";

interface Props {
  type: string;
  gameInfo?: GameDto | null;
}

const Chart: FC<Props> = ({ type, gameInfo }) => {
  const lineCharOptions: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Minutes",
        },
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
      x: {
        title: {
          display: true,
          text: "Levels",
        },
      },
    },
    elements: {
      point: {
        radius: 2,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  const lineChartData: ChartData<"line"> = {
    labels: Array.from({ length: gameInfo?.numLevels || 0 }, (_, i) => i + 1),
    datasets: [
      {
        label: gameInfo?.name,
        data:
          gameInfo?.progressions.map((entry) =>
            convertSecMin(entry.spentTime)
          ) || [],
        borderColor: "rgba(	0,	168,	47)",
        borderWidth: 2,
        backgroundColor: "rgba(224,	255,	233, 0.5)",
        tension: 0.2,
        fill: true,
      },
    ],
  };

  const barChartOptions: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Minutes",
        },
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  const barChartData: ChartData<"bar"> = {
    labels: ["users per time(min) average"],
    datasets: [
      {
        label: "User AVG",
        data: [4, 2],
        backgroundColor: "rgba(0, 0, 255, 0.6)",
      },
      {
        label: `Your kid AVG`,
        data: [
          convertSecMin(gameInfo?.progressionStatistic.timePerLevelAVG || 0),
        ],
        backgroundColor: "rgba(255, 128, 0, 0.6)",
      },
      {
        label: "Momtaz team AVG",
        data: [1.5],
        backgroundColor: "rgba(0, 204, 0, 0.6)",
      },
    ],
  };

  return (
    <StyledChart>
      {gameInfo ? (
        type === "bar" ? (
          <Bar options={barChartOptions} data={barChartData} />
        ) : (
          <Line
            options={lineCharOptions}
            data={lineChartData}
            width={500}
            height={300}
          />
        )
      ) : (
        <Flex align="center" justify="center">
          <p>No Data Registered</p>
        </Flex>
      )}
    </StyledChart>
  );
};

export default Chart;
