import * as S from "./item.styled";
import { IHistoryType } from ".";
import { useEffect, useState } from "react";
import { formatUsername } from "@utils/formatUtils";

export const Itme = ({ data }: { data: IHistoryType }) => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    setName(data.user.nickname ? data.user.nickname : data.user.crypto);
  }, [data]);

  const formattedDate = new Date(data.created).toLocaleDateString();

  return (
    <S.Container $layout="minmax(auto, 200px) minmax(auto, 200px) minmax(auto, 200px) minmax(auto, 100px) minmax(auto, 120px)">
      <div className="wrapper">
        <div className="logo">
          <img src={data.user.avatar} alt={`${data.user.crypto} avatar`} />
          {formatUsername(name, 6)}
        </div>
        <span>{formattedDate}</span>
        <span>$ {data.amount}</span>
        <span>
          {data.tranType === 3
            ? "Betting"
            : data.tranType === 2
            ? "Withdrawal"
            : "Deposit"}
        </span>
      </div>
    </S.Container>
  );
};
