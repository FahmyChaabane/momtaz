import styled from "styled-components";

export const StyledAchievementImage = styled.div<{ bg: string }>`
  border: none;
  padding: 1rem;
  border-radius: 1rem;
  border: 0.1rem solid #ededea;
  margin-right: 1rem;
  background: ${({ bg }) => bg || ""};
`;
