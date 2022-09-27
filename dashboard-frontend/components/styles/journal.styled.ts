import styled from "styled-components";

export const StyledJournal = styled.div`
  font-size: 1.5rem;
  section {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    margin-bottom: 2rem;

    div {
      width: 100%;
      text-align: center;
      color: ${({ theme }) => theme.colors.primary};

      p {
        font-size: inherit;
        color: #000;
      }

      span {
        font-size: 1.75rem;
      }

      &:not(:last-child) {
        border-right: 0.3rem solid #ededea;
      }
    }
  }

  table {
    width: 100%;
    text-align: center;
    table-layout: fixed;
    background: ${({ theme }) => theme.colors.bg_orange};
    border-radius: 2rem;
    padding: 2rem 0rem;

    tr {
      th {
        color: ${({ theme }) => theme.colors.primary};
        font-weight: 400;
        padding: 1rem 0rem;
      }

      td {
        &:not(:last-child) {
          border-right: 0.3rem solid #ededea;
        }
      }
    }
  }
`;
