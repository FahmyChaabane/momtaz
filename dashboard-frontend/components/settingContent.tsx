import { FC, useState } from "react";
import { ParentDto } from "../lib/interfaces";
import { Box } from "./styles/box.styled";
import { StyledBoxContent } from "./styles/boxContent.styled";
import { StyledSettingContent } from "./styles/settingContent.styled";

interface Props {
  profile: { getProfile: ParentDto } | undefined;
}

const SettingContent: FC<Props> = ({ profile }) => {
  return (
    <StyledSettingContent>
      <Box padding={2}>
        <StyledBoxContent>
          <button onClick={() => alert(profile?.getProfile.username)}>
            suck it
          </button>
        </StyledBoxContent>
      </Box>
    </StyledSettingContent>
  );
};

export default SettingContent;
