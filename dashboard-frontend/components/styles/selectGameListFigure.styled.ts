import styled from "styled-components";

interface StyledSelectGameListFigureProps {
  selected: boolean;
}

export const StyledSelectGameListFigure = styled.figure<StyledSelectGameListFigureProps>`
  border-radius: 2rem;
  position: relative;
  cursor: pointer;
  z-index: 1;

  section {
    border-radius: 0 0 2rem 2rem;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    bottom: 0;
    left: 0;
    height: 50%;
    width: 100%;
    transition: all 0.2s;
    opacity: 0;
  }

  &:hover section {
    filter: blur(0.1rem);
    opacity: 1;
  }

  ${({ selected }) =>
    selected &&
    `
  &:after {
    content: "";
    position: absolute;
    top: -0.4rem;
    bottom: -0.4rem;
    left: -0.4rem;
    right: -0.4rem;
    background: linear-gradient(
      to bottom right,
      #b827fc 0%,
      #2c90fc 25%,
      #b8fd33 50%,
      #fec837 75%,
      #fd1892 100%
    );
    border-image-slice: 1;
    z-index: -1;
    border-radius: 2rem;
  }
  `}

  div {
    position: absolute;
    height: 50%;
    width: 100%;
    left: 0;
    bottom: 0;
    transition: all 0.2s;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    color: #fff;

    h3 {
      font-size: 2rem;
    }
  }

  &:hover > div {
    opacity: 1;
  }
`;
