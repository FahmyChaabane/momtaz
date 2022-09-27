import styled from "styled-components";

interface StyledArrowContainerProps {
  overflowed: boolean;
}

export const StyledArrowContainer = styled.div<StyledArrowContainerProps>`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  background: ${({ theme, overflowed }) =>
    overflowed ? theme.colors.secondary : theme.colors.bg_orange};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  margin: 2rem;

  &:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
    transform: translateY(-0.1px);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }
`;

export const Styledleft = styled.span`
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-right: 1.5rem solid black;
  display: inline-block;
  width: 0;
  height: 0;
  position: absolute;
  top: 50%;
  right: 25%;
  transform: translateY(-50%);
`;

export const StyledRight = styled.span`
  border-top: 1rem solid transparent;
  border-bottom: 1rem solid transparent;
  border-left: 1.5rem solid black;
  display: inline-block;
  width: 0;
  height: 0;
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translateY(-50%);
`;
