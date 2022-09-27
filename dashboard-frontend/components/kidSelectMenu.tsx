import Image from "next/image";
import { FC, useState } from "react";
import { ChildDto } from "../lib/interfaces";
import { Flex } from "./styles/flex.styled";
import { StyledAvatar } from "./styles/profileAvatar";
import { StyledSelectKidsNav } from "./styles/selectKidsNav.styled";

interface Props {
  childs: ChildDto[];
  selectedKid: ChildDto | null;
  onChangeSelectedKid: Function;
}

const KidSelectMenu: FC<Props> = ({
  childs,
  selectedKid,
  onChangeSelectedKid,
}) => {
  const [hidden, setHidden] = useState<boolean>(false);
  // const children = useMemo(
  //   () => data?.getProfile?.children.map((child: ChildDto) => child) || [],
  //   [data]
  // );
  const haveChildren = Boolean(childs.length);

  return (
    <StyledSelectKidsNav elarge={hidden}>
      {haveChildren ? (
        selectedKid && (
          <Flex onClick={() => setHidden(!hidden)} align="center">
            <StyledAvatar height="2.5rem" width="2.5rem">
              <Image
                src={`${process.env.NEXT_PUBLIC_CORE_HOST}/${selectedKid.avatar}`}
                alt="profile"
                layout="fill"
              />
            </StyledAvatar>
            <p>{selectedKid.name}</p>
            <article></article>
          </Flex>
        )
      ) : (
        <Flex align="center" justify="center">
          <p>No Child Registered</p>
        </Flex>
      )}

      <section>
        {childs.map((el, index) => (
          <Flex
            align="center"
            key={index}
            onClick={() => {
              onChangeSelectedKid(el);
              setHidden(!hidden);
            }}
          >
            <StyledAvatar height="2.5rem" width="2.5rem">
              <Image
                src={`${process.env.NEXT_PUBLIC_CORE_HOST}/${el.avatar}`}
                alt="profile"
                layout="fill"
              />
            </StyledAvatar>
            <p>{el.name}</p>
          </Flex>
        ))}
      </section>
    </StyledSelectKidsNav>
  );
};

export default KidSelectMenu;
