import styled from "styled-components";

interface StyledAvatar {
  width: string;
  height: string;
}

export const StyledAvatar = styled.div<StyledAvatar>`
  border-radius: 50%;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  overflow: hidden;
  position: relative;
`;
