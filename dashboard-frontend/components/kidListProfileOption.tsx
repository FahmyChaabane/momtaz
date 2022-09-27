import { FC, useState } from "react";
import Button from "./button";
import { Flex } from "./styles/flex.styled";
import Image from "next/image";
import trash from "../public/icon-trash.png";
import DeleteKidPopup from "./DeleteKidPopup";
import { ChildDto } from "../lib/interfaces";
import { StyledAvatar } from "./styles/profileAvatar";

interface Props {
  childs: ChildDto[];
}

const KidListProfileOption: FC<Props> = ({ childs }) => {
  const haveChildren = Boolean(childs.length);

  return (
    <>
      {haveChildren && (
        <ul>
          {childs.map((entry) => (
            <ChildOptionElement key={entry._id} entry={entry} />
          ))}
        </ul>
      )}
    </>
  );
};

export default KidListProfileOption;

interface PropsCOE {
  entry: ChildDto;
}

const ChildOptionElement: FC<PropsCOE> = ({ entry }) => {
  const [hidden, sethidden] = useState<boolean>(true);
  const hidePopup = () => {
    sethidden(true);
  };

  return (
    <li>
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
        <Button
          text="Delete Profile"
          br="5rem"
          width="20rem"
          bglg1="#FFF"
          bglg2="transparent"
          imgsrc={trash}
          color="#fc0b03"
          padding="0.5rem"
          onClick={() => sethidden(false)}
        />
      </Flex>
      {!hidden && <DeleteKidPopup child={entry} closePopup={hidePopup} />}
    </li>
  );
};
