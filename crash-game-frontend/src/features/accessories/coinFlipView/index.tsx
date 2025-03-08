import { CoinFlipGame, IRefCoinGame } from "@features/games";
import S from "./index.module.scss";
import { useEffect, useRef } from "react";
import { CoinflipGame } from "@features/games/coinflip/scenes";
import { useCoinflip } from "@context/CoinflipContext";

export const CoinFlipView = () => {
  const phaserRef = useRef<IRefCoinGame | null>(null);
  const { coinflip } = useCoinflip();

  const currentScene = () => {};

  useEffect(() => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as CoinflipGame;

      if (scene && scene.sys.config === "CoinflipGame") {
        scene.setCoinNumber(
          coinflip.coinAmount,
          coinflip.heads,
          coinflip.coinType
        );
      }
    }
  }, [coinflip.coinAmount, coinflip.heads, coinflip.coinType]);

  return (
    <div className={S.body}>
      <CoinFlipGame ref={phaserRef} currentActiveScene={currentScene} />
    </div>
  );
};
