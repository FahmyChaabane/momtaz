import styled from "styled-components";

interface StyledProgressionLevelSummaryProps {
  bg: string;
  color: string;
}

export const StyledProgressionLevelSummary = styled.div``;

export const StyledLevelSumSection = styled.section<StyledProgressionLevelSummaryProps>`
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
  padding: 1.5rem;
  border-radius: 1rem;
  width: 12rem;
  border: 0.1rem solid #ededea;

  p {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;
