import { ICrashProps } from "@utils/typeUtils";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ICrashContextType {
  crash: ICrashProps;
  setCrash: Dispatch<SetStateAction<ICrashProps>>;
}

const CrashContext = createContext<ICrashContextType | undefined>(undefined);

const CrashProvider = ({ children }: { children: ReactNode }) => {
  const [crash, setCrash] = useState<ICrashProps>({
    gameMode: "manual",
    betState: false,
    betAmount: 0.1,
    cashout: 0,
    numberRound: 0,
    gameStep: "before",
    getCoin: false,
    nextRound: false,
    socket: undefined,
    socketAuth: false,
    players: {},
    scene: null,
    gameStartTime: new Date(),
  });

  return (
    <CrashContext.Provider value={{ crash, setCrash }}>
      {children}
    </CrashContext.Provider>
  );
};

const useCrash = () => {
  const context = useContext(CrashContext);

  if (!context) {
    throw new Error("Error of useCrash");
  }

  return context;
};

export { CrashProvider, useCrash };
