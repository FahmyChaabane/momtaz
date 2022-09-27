import styled from "styled-components";

interface FlexProps {
  readonly direction?: string;
  readonly align?: string;
  readonly justify?: string;
  readonly wrap?: string;
}

export const Flex = styled.div<FlexProps>`
  height: 100%;
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: ${({ align }) => align || ""};
  justify-content: ${({ justify }) => justify || ""};
  flex-wrap: ${({ wrap }) => wrap || "nowrap"};
`;
