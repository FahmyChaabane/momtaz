import styled from "styled-components";

interface BoxContentProps {
  readonly active?: string;
  readonly bg?: string;
}

export const StyledBoxContent = styled.div<BoxContentProps>`
  ul {
    font-size: 1rem;
    list-style: none;
    margin-bottom: 1rem;
    width: 100%;

    li {
      padding: 1rem 0rem;
      position: relative;

      h2 {
        margin-left: 0.75rem;
      }

      &:not(:last-child) {
        margin-bottom: 0.4rem;

        ${({ active }) =>
          active &&
          `
          &:before {
            content: "";
            position: absolute;
            left: 17.5%;
            bottom: 0;
            width: 60%;
            border-bottom: 0.1rem solid #ededea;
          }
        `}
      }
    }
  }

  em {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  p {
    font-size: 1.25rem;
  }

  b {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-left: 0.75rem;
  }
`;
