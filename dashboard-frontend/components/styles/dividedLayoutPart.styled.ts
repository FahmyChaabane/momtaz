import Image from "next/image";
import styled from "styled-components";

interface DividedLayoutPartProps {
  readonly bg?: string;
}

export const DividedLayoutPart = styled.div<DividedLayoutPartProps>`
  flex: 1;
  padding: 6rem;
  background: ${({ bg }) => bg || ""};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled(Image)`
  margin-bottom: 2.5rem;
`;
