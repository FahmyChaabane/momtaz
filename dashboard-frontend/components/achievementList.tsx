import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import randomColor from "randomcolor";
import { StyledAchievementImage } from "./styles/achievementImage.styled";
import { Flex } from "./styles/flex.styled";
import { useQuery } from "@apollo/client";
import { GET_CHILDREN_ACHIEVEMENT_QUERY } from "../lib/queries";
import { ChildrenAchievementDto } from "../lib/interfaces";
import Loader from "./loader";
import Button from "./button";
import { useRouter } from "next/router";

interface Props {}

const AchievementList: FC<Props> = ({}) => {
  const router = useRouter();

  const { data, loading } = useQuery<{
    getChildrenAchievements: ChildrenAchievementDto[];
  }>(GET_CHILDREN_ACHIEVEMENT_QUERY);

  const achievements = data?.getChildrenAchievements || [];
  const haveAchievements = Boolean(achievements.length);

  if (loading) {
    return <Loader />;
  }

  return haveAchievements ? (
    <>
      <ul>
        {achievements.map((el, index) => (
          <li key={index}>
            <Flex align="center">
              <StyledAchievementImage bg={randomColor()}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_CORE_HOST}/${el.trophyAvatar}`}
                  alt="trophy"
                  width={40}
                  height={40}
                />
              </StyledAchievementImage>
              <Flex direction="column" justify="space-between">
                <p>{el.childName} have just unlocked a new achievement</p>
                <em>{el.trophyName}</em>
                <Link href="/dashboard/analyses/achievements">
                  <a>see more</a>
                </Link>
              </Flex>
            </Flex>
          </li>
        ))}
      </ul>
      <Button
        br="5rem"
        text="See all Achievements"
        width="100%"
        bglg1="blue"
        bglg2="purple"
        onClick={() => router.push("/dashboard/analyses/achievements")}
      />
    </>
  ) : (
    <Flex align="center" justify="center">
      <p>No Achievement Registered</p>
    </Flex>
  );
};

export default AchievementList;
