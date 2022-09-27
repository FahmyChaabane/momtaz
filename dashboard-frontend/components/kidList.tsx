import Image from "next/image";
import { FC } from "react";
import { ChildDto } from "../lib/interfaces";
import { timeSince } from "../lib/utils";
import { Flex } from "./styles/flex.styled";
import { StyledAvatar } from "./styles/profileAvatar";

interface Props {
  childs: ChildDto[];
}

const KidList: FC<Props> = ({ childs }) => {
  const haveChildren = Boolean(childs.length);

  return haveChildren ? (
    <ul>
      {childs.map((entry) => (
        <li key={entry._id}>
          <Flex align="center" justify="space-between">
            <Flex align="center">
              <StyledAvatar height="4rem" width="4rem">
                <Image
                  src={`${process.env.NEXT_PUBLIC_CORE_HOST}/${entry.avatar}`}
                  alt="profile"
                  layout="fill"
                />
              </StyledAvatar>
              <h2>{entry.name}</h2>
            </Flex>
            <em>{timeSince(entry.lastLoginDate)} ago</em>
          </Flex>
        </li>
      ))}
    </ul>
  ) : (
    <Flex align="center" justify="center">
      <p>No Registered Child</p>
    </Flex>
  );
};

export default KidList;
