import { NextPage } from "next";
import React from "react";
import ControlContent from "../../components/controlContent";
import Dashboard from "../../components/layout/dashboard";
import { withAuthServerSideProps } from "../../lib/utils";

type Props = {};

const Controls: NextPage = ({}: Props) => {
  return (
    <Dashboard>
      {(
        profile,
        selectedKid,
        selectedGame,
        onChangeSelectedKid,
        onChangeSelectedGame
      ) => (
        <ControlContent
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

export default Controls;

export const getServerSideProps = withAuthServerSideProps();
