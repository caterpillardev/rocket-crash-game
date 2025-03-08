import { ICoinflipProps } from "@utils/typeUtils";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ICoinflipContextType {
  coinflip: ICoinflipProps;
  setCoinflip: Dispatch<SetStateAction<ICoinflipProps>>;
}

const CoinflipContext = createContext<ICoinflipContextType | undefined>(
  undefined
);

const CoinflipProvider = ({ children }: { children: ReactNode }) => {
  const [coinflip, setCoinflip] = useState<ICoinflipProps>({
    coinAmount: 1,
    heads: 1,
    auto: 1,
    coinType: true,
    socket: undefined,
    autobet: false,
  });

  return (
    <CoinflipContext.Provider value={{ coinflip, setCoinflip }}>
      {children}
    </CoinflipContext.Provider>
  );
};

const useCoinflip = () => {
  const context = useContext(CoinflipContext);

  if (!context) {
    throw new Error("Error of useCoinflip");
  }

  return context;
};

export { CoinflipProvider, useCoinflip };
