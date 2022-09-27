import Image, { StaticImageData } from "next/image";
import { FC, Fragment, ReactNode, useContext } from "react";
import {
  StyledNavAnchors,
  StyledSideBarMenu,
} from "./styles/sideBarMenu.styled";
import sidemenu_1 from "../public/sidemenu-1.png";
import sidemenu_2 from "../public/sidemenu-2.png";
import sidemenu_3 from "../public/sidemenu-3.png";
import sidemenu_4 from "../public/sidemenu-4.png";
import clock from "../public/icon-clock.png";
import progression from "../public/icon-progression.png";
import achievement from "../public/icon-cup.png";
import Link from "next/link";
import { SideBarHiddenContext } from "./sideBarContext";
import { useRouter } from "next/router";

type item = {
  image: StaticImageData;
  path: string | null;
  name: string;
  nestList?: {
    image: StaticImageData;
    path: string;
    name: string;
  }[];
};

const menuList: item[] = [
  {
    image: sidemenu_1,
    path: "/dashboard/overview",
    name: "Overview",
  },
  {
    image: sidemenu_2,
    path: null,
    name: "Analyses",
    nestList: [
      {
        image: clock,
        path: "/dashboard/analyses/journals",
        name: "Time Passed",
      },
      {
        image: progression,
        path: "/dashboard/analyses/progression",
        name: "Progreesion",
      },
      {
        image: achievement,
        path: "/dashboard/analyses/achievements",
        name: "Achievements",
      },
    ],
  },
  {
    image: sidemenu_3,
    path: "/dashboard/controls",
    name: "Parent Control",
  },
  {
    image: sidemenu_4,
    path: "/dashboard/settings",
    name: "Settings",
  },
];

interface Props {}

const SideBarMenu: FC<Props> = ({}) => {
  const { hidden, setHidden } = useContext(SideBarHiddenContext);

  const router = useRouter();

  return (
    <StyledSideBarMenu displayed={hidden}>
      {menuList.map((el, index) => (
        <Fragment key={index}>
          <li
            onClick={() => {
              if (el.name === "Analyses" && typeof setHidden !== "undefined") {
                setHidden(!hidden);
              }
            }}
          >
            <Linking path={el.path}>
              <StyledNavAnchors clicked={router.pathname == el.path}>
                <figure>
                  <Image src={el.image} alt="" />
                </figure>
                <span>{el.name}</span>
              </StyledNavAnchors>
            </Linking>
          </li>
          {el.name === "Analyses" && (
            <div>
              <ul>
                {el.nestList?.map((nel, index) => (
                  <li key={index}>
                    <Link href={nel.path}>
                      <StyledNavAnchors clicked={router.pathname == nel.path}>
                        <figure>
                          <Image src={nel.image} alt="" />
                        </figure>
                        <span>{nel.name}</span>
                      </StyledNavAnchors>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Fragment>
      ))}
    </StyledSideBarMenu>
  );
};

interface LinkingProps {
  path: string | null;
  children: ReactNode;
}
const Linking: FC<LinkingProps> = ({ path, children }) => {
  return path ? <Link href={path}>{children}</Link> : <>{children}</>;
};

export default SideBarMenu;
