import styled from "styled-components";

interface StyledButtonProps {
  readonly br: string;
  readonly bglg1?: string;
  readonly bglg2?: string;
  readonly color?: string;
  readonly padding?: string;
  readonly width: string;
  readonly flexed: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>`
  font-size: 1.5rem;
  text-transform: uppercase;
  text-decoration: none;
  padding: ${({ padding }) => padding || "1.5rem"};
  margin-bottom: 0.5rem;
  border-radius: ${({ br }) => br};
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  background-image: linear-gradient(
    to right,
    ${({ bglg1, theme }) => bglg1 || theme.colors.primary},
    ${({ bglg2, theme }) => bglg2 || theme.colors.secondary}
  );
  color: ${({ color }) => color || "#FFF"};
  width: ${({ width }) => width};

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    transform: translateY(-0.1rem);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }

  figure {
    margin-right: 2rem;
    display: inline-block;
  }
`;
