import { NextPage } from "next";
import React from "react";
import Dashboard from "../../components/layout/dashboard";
import SettingContent from "../../components/settingContent";
import { withAuthServerSideProps } from "../../lib/utils";

type Props = {};

const Settings: NextPage = ({}: Props) => {
  return (
    <Dashboard>{(profile) => <SettingContent profile={profile} />}</Dashboard>
  );
};

export default Settings;

export const getServerSideProps = withAuthServerSideProps();
