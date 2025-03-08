import { IRankType } from "@utils/typeUtils";
import * as S from "./index.styled";
import { DropBox } from "../dropBox";
import { FC, useEffect, useState } from "react";
import { formatUsername } from "@utils/formatUtils";
import { Icon } from "@features/icon";
import { useApp } from "@context/AppContext";

interface IProps extends IRankType {
  key: number;
  rank: number;
}

export const RankItem: FC<IProps> = (data) => {
  const [name, setName] = useState<string>("");
  const [certainName, setCertainName] = useState<string>("");
  const { app } = useApp();

  useEffect(() => {
    setName(data.nickname ? data.nickname : data.crypto);
    if (app.user) {
      setCertainName(app.user.nickname ? app.user.nickname : app.user.crypto);
    }
  }, [app, data]);

  return (
    <DropBox
      $filter="2px"
      $passive={data.rank > 3}
      $user={name === certainName}
    >
      <S.Container $user={name === certainName}>
        <p className="rank">
          <span>
            {data.rank === 1
              ? "🥇"
              : data.rank === 2
              ? "🥈"
              : data.rank === 3
              ? "🥉"
              : ""}
          </span>
          {data.rank}
        </p>
        <div className="name">
          <DropBox $filter="2px">
            <img
              src={data.avatar}
              alt={`User avatar ${data.crypto}`}
              className="avatar"
            />
          </DropBox>
          <h4>{formatUsername(name, 6)}</h4>
        </div>
        <div className="score">
          <Icon name="Flag" width={16} height={16} viewBox="0 0 16 16" />
          <span>{data.score.toFixed(2)}</span>
        </div>
      </S.Container>
    </DropBox>
  );
};
