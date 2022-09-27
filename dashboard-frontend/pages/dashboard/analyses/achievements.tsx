import { NextPage } from "next";
import React from "react";
import AchievementContent from "../../../components/achievementContent";
import Dashboard from "../../../components/layout/dashboard";
import { withAuthServerSideProps } from "../../../lib/utils";

type Props = {};

const Achievements: NextPage = ({}: Props) => {
  return (
    <Dashboard>
      {(
        profile,
        selectedKid,
        selectedGame,
        onChangeSelectedKid,
        onChangeSelectedGame
      ) => (
        <AchievementContent
          profile={profile}
          selectedKid={selectedKid}
          selectedGame={selectedGame}
          onChangeSelectedKid={onChangeSelectedKid}
          onChangeSelectedGame={onChangeSelectedGame}
        />
      )}
    </Dashboard>
  );
};

export default Achievements;

export const getServerSideProps = withAuthServerSideProps();
