import { GameList } from "@utils/dataUtils";
import S from "./index.module.scss";
import { MainButton, RankItem } from "@features/ui";
import { useEffect, useState } from "react";
import { IRankType } from "@utils/typeUtils";
import { axiosGet } from "@utils/axiosUtils";

const Leaderboard = () => {
  const [gameType, setGameType] = useState<string>("crash");
  const [rankData, setRankData] = useState<IRankType[]>([]);

  useEffect(() => {
    const getData = async () => {
      if (gameType === "crash") {
        const res = await axiosGet("/user/getCrashRank");
        const data = res.map((user: any) => ({
          avatar: user.avatar,
          score: user.crash,
          username: user.username,
          crypto: user.crypto,
          nickname: user.nickname || "",
        }));
        setRankData(data);
      } else if (gameType === "mine") {
        const res = await axiosGet("/user/getMineRank");
        const data = res.map((user: any) => ({
          avatar: user.avatar,
          score: user.mine,
          username: user.username,
          crypto: user.crypto,
          nickname: user.nickname || "",
        }));
        setRankData(data);
      } else if (gameType === "flip") {
        const res = await axiosGet("/user/getFlipRank");
        const data = res.map((user: any) => ({
          avatar: user.avatar,
          score: user.coinflip,
          username: user.username,
          crypto: user.crypto,
          nickname: user.nickname || "",
        }));
        setRankData(data);
      }
    };

    getData();
  }, [gameType]);

  return (
    <div className={S.body}>
      <div className={S.wrapper}>
        <div className={S.header}>
          <h3>leaderboard</h3>
          <div className={S.btnGroup}>
            {GameList.map((item, index) => (
              <MainButton
                key={index}
                $padding="8px 16px"
                $title={item.title}
                $fontFamily="Manrope"
                $fontSize="14px"
                $fontWeight="500"
                $lineHeight="20px"
                $active={gameType === item.path}
                $activeBgColor="#FFEDC2"
                onClick={() => {
                  if (gameType !== item.path) {
                    setGameType(item.path);
                  }
                }}
                $filterWidth="1px"
              />
            ))}
          </div>
        </div>
        <div className={S.rankList}>
          <div className={S.rankHeader}>
            <span>User</span>
            <span>Score</span>
          </div>
          <div className={S.rankPanel}>
            {rankData.map((user, id) => (
              <RankItem
                key={id}
                rank={id + 1}
                avatar={user.avatar}
                username={user.username}
                nickname={user.nickname}
                crypto={user.crypto}
                score={user.score}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
