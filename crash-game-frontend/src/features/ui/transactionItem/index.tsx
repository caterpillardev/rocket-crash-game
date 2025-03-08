import { ITransactionType, TGameLogo } from "@utils/typeUtils";
import * as S from "./index.styled";
import { GameLogos } from "@utils/dataUtils";
import styled from "styled-components";

const MultiItem = styled.span<{ $color: string }>`
  background-color: ${({ $color }) => $color};
  border-radius: 2px;
  box-shadow: 0 0 0 1px black;
  padding: 4px;
`;

export const TransactionItem = ({ data }: { data: ITransactionType }) => {
  return (
    <S.Container $layout={data.layout!}>
      <div className="wrapper">
        <div className="logo">
          {GameLogos[data.game as keyof TGameLogo]}
          {data.game}
        </div>
        <span>{data.time}</span>
        <span>$ {data.bet}</span>
        <div className="multi">
          <MultiItem $color="#80EED3">x{(Number(data.multi) / 100).toFixed(2)}</MultiItem>
        </div>
        <span>$ {data.payout}</span>
      </div>
    </S.Container>
  );
};
