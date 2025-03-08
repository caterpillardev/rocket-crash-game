import { IMineProps } from "@utils/typeUtils";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IMineContextType {
  mine: IMineProps;
  setMine: Dispatch<SetStateAction<IMineProps>>;
}

const MineContext = createContext<IMineContextType | undefined>(undefined);

const MineProvider = ({ children }: { children: ReactNode }) => {
  const [mine, setMine] = useState<IMineProps>({
    scene: null,
    cashout: 0,
    state: "end",
    delayEndSituation: false,
  });

  return (
    <MineContext.Provider value={{ mine, setMine }}>
      {children}
    </MineContext.Provider>
  );
};

const useMine = () => {
  const context = useContext(MineContext);

  if (!context) {
    throw new Error("Error of useMine");
  }

  return context;
};

export { MineProvider, useMine };
