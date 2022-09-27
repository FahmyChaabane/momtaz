import styled from "styled-components";

interface AddKidAvatarFigureProps {
  selected: boolean;
}

export const AddKidAvatarFigure = styled.figure<AddKidAvatarFigureProps>`
  padding: 1.5rem 1rem;
  cursor: pointer;
  border-bottom: ${({ selected }) => (selected ? "0.2rem solid blue" : "")};
`;
