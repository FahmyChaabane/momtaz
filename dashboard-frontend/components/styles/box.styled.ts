import styled from "styled-components";

interface BoxProps {
  readonly padding: number;
  readonly gridrow?: string;
  readonly gridcolumn?: string;
}

export const Box = styled.div<BoxProps>`
  overflow: hidden;
  background: #fff;
  min-width: 80%;
  padding: ${({ padding }) => padding}rem;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.3);
  min-height: 20rem;

  ${({ gridrow, gridcolumn }) =>
    gridrow &&
    gridcolumn &&
    `
    grid-row: ${gridrow}; 
    grid-column: ${gridcolumn}; 
  `}

  p {
    font-size: 1.25rem;
  }

  a {
    &,
    &:link,
    &:visited {
      text-decoration: none;
      font-size: inherit;
      cursor: pointer;
      color: blue;
    }
  }

  span {
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 1.25rem;
  }
`;
