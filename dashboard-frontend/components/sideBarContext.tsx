import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

interface ISideBarHiddenContext {
  hidden: boolean;
  setHidden?: Dispatch<SetStateAction<boolean>>;
}

export const SideBarHiddenContext = createContext<ISideBarHiddenContext>({
  hidden: false,
});

const SideBarProvider: FC<Props> = ({ children }) => {
  const [hidden, setHidden] = useState<boolean>(false);

  return (
    <SideBarHiddenContext.Provider value={{ hidden, setHidden }}>
      {children}
    </SideBarHiddenContext.Provider>
  );
};

export default SideBarProvider;
