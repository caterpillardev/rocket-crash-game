import * as S from "./index.styled";
import styled from "styled-components";
import { DropBox } from "../dropBox";
import { formatUsername } from "@utils/formatUtils";
import { ICrashGame } from "@utils/typeUtils";
import { useApp } from "@context/AppContext";

const MultiItem = styled.span<{ $color: string }>`
  background-color: ${({ $color }) => $color};
  border-radius: 2px;
  box-shadow: 0 0 0 1px black;
  padding: 4px;
`;

export const GamestateItem = ({ data }: { data: ICrashGame }) => {
  const { app } = useApp();

  return (
    <S.Container
      $layout={data.layout!}
      $avatarColor={data.level?.levelColor}
      $user={data.crypto === app.user?.crypto}
    >
      <div className="wrapper">
        <div className="userInfo">
          <DropBox $filter="2px">
            <img src={data.avatar} alt="" className="avatar" />
          </DropBox>
          <p>
            {formatUsername(data.username ? data.username : data.crypto, 6)}
          </p>
        </div>
        {/* <span>time</span> */}
        <span>$ {data.betAmount}</span>
        <div className="multi">
          {typeof data.stoppedAt === "number" && (
            <MultiItem $color="#80EED3">
              x{(data.stoppedAt / 100).toFixed(2)}
            </MultiItem>
          )}
        </div>
        {data.winningAmount && <span>$ {data.winningAmount.toFixed(2)}</span>}
      </div>
    </S.Container>
  );
};
