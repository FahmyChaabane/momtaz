import { NextPage } from "next";
import React from "react";
import JournalContent from "../../../components/journalContent";
import Dashboard from "../../../components/layout/dashboard";
import { withAuthServerSideProps } from "../../../lib/utils";

type Props = {};

const Journal: NextPage = ({}: Props) => {
  return (
    <Dashboard>
      {(
        profile,
        selectedKid,
        selectedGame,
        onChangeSelectedKid,
        onChangeSelectedGame
      ) => (
        <JournalContent
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

export default Journal;

export const getServerSideProps = withAuthServerSideProps();
