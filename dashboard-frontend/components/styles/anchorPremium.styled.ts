import styled from "styled-components";

export const AnchorPremium = styled.a`
  padding: 1rem 1.5rem;
  color: #fff;
  background-image: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  border-radius: 1rem;
  font-size: 1.3rem;
  font-weight: 500;
  text-transform: uppercase;
  display: flex;
  align-items: center;

  &:hover {
    transform: translateY(-0.2rem);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
  }
  figure {
    margin-right: 1rem;
  }
`;
