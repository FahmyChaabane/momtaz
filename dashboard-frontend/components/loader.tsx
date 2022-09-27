import { FC } from "react";
import { Flex } from "./styles/flex.styled";
import { StyledLoader } from "./styles/loader.styled";

interface Props {}

const Loader: FC<Props> = ({}) => {
  return (
    <Flex align="center" justify="center">
      <StyledLoader></StyledLoader>
    </Flex>
  );
};

export default Loader;
