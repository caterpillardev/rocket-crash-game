import S from "./index.module.scss";

const renderSpan = (className: string, text: string) => (
  <span className={className}>{text}</span>
);

const renderStartBet = (gameMode: string) => (
  <>
    <span className={S.start}>
      {gameMode === "auto" ? "start autobet" : "start bet"}
    </span>
    <p className={S.start}>for next round</p>
  </>
);

const renderGamingContent = (
  betState: boolean,
  getCoin: boolean,
  nextRound: boolean,
  gameMode: string,
  cashout: number
) => {
  if (betState) {
    return getCoin ? (
      renderSpan(S.cancel, "cancel")
    ) : (
      <>
        <p className={S.amount}>Cashout</p>
        <span className={S.amount}>{cashout.toFixed(2)} $coin</span>
      </>
    );
  } else {
    return nextRound
      ? renderSpan(S.cancel, "cancel")
      : renderStartBet(gameMode);
  }
};

export const TextRender = (
  step: string,
  nextRound: boolean,
  betState: boolean,
  gameMode: string,
  getCoin: boolean,
  cashout: number,
  betAmount: number
) => {
  if (step === "before") {
    if (betState || nextRound) {
      return renderSpan(S.cancel, "cancel");
    } else {
      return renderSpan(
        S.start,
        gameMode === "auto" ? "start autobet" : "start bet"
      );
    }
  } else if (step === "gaming") {
    return renderGamingContent(
      betState,
      getCoin,
      nextRound,
      gameMode,
      cashout * betAmount
    );
  } else {
    return nextRound || betState
      ? renderSpan(S.cancel, "cancel")
      : renderStartBet(gameMode);
  }
};
