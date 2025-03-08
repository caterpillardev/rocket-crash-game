import { formatNumber } from "@utils/formatUtils";
import { DropBox } from "../dropBox";
import * as S from "./index.styled";

export const MiniBtn = ({
  bgColor,
  icon,
  name,
  amount,
}: {
  bgColor: string;
  icon: JSX.Element;
  name: string;
  amount: number;
}) => {
  return (
    <DropBox $filter="2px">
      <S.Container $backgroundColor={bgColor}>
        {icon}
        <div className="title">
          <div className="name">{name}</div>
          <p>
            {amount}
            <span> $coin</span>
          </p>
          <div className="score">
            <div className="box">
              <div className="marker"></div>
            </div>
            <span>Best Score</span>
            <p>{formatNumber(2800)}</p>
          </div>
        </div>
      </S.Container>
    </DropBox>
  );
};
