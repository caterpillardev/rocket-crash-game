import { DropBox } from "@features/ui";
import * as S from "./item.styled";
import { IMessage } from "@utils/typeUtils";
import { formatUsername } from "@utils/formatUtils";
import { useEffect } from "react";

export const ChatItem = ({ data }: { data: IMessage }) => {
  useEffect(() => {
    console.log("data", data);
  }, [data]);
  if (data) {
    return (
      <S.Container>
        <DropBox $filter="2px">
          <img src={data.user.avatar} alt="" className="avatar" />
        </DropBox>
        <div className="text">
          <span>
            {formatUsername(
              data.user.username ? data.user.username : data.user.crypto,
              6
            )}
          </span>
          <p>{data.message}</p>
        </div>
      </S.Container>
    );
  } else {
    return <></>;
  }
};
