import { NextPage } from "next";
import React from "react";
import Dashboard from "../../../components/layout/dashboard";
import ProgressionContent from "../../../components/progressionContent";
import { withAuthServerSideProps } from "../../../lib/utils";

type Props = {};

const Proression: NextPage = ({}: Props) => {
  return (
    <Dashboard>
      {(
        profile,
        selectedKid,
        selectedGame,
        onChangeSelectedKid,
        onChangeSelectedGame
      ) => (
        <ProgressionContent
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

export default Proression;

export const getServerSideProps = withAuthServerSideProps();
