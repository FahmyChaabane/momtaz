import { NextPage } from "next";
import React from "react";
import Dashboard from "../../components/layout/dashboard";
import OverviewContent from "../../components/overviewContent";
import { withAuthServerSideProps } from "../../lib/utils";

type Props = {};

const Overview: NextPage = ({}: Props) => {
  return (
    <Dashboard>
      {(
        profile,
        selectedKid,
        selectedGame,
        onChangeSelectedKid,
        onChangeSelectedGame
      ) => (
        <OverviewContent
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

export default Overview;

export const getServerSideProps = withAuthServerSideProps();
