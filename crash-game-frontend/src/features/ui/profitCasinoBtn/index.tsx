import { DropBox } from "../dropBox";
import * as S from "./index.styled";

export const CasinoBtn = ({
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
        </div>
      </S.Container>
    </DropBox>
  );
};
