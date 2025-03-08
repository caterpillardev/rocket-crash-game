import { MainButton } from "@features/ui";
import * as S from "./item.styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAdvertisementDataType } from "@utils/typeUtils";
import { useApp } from "@context/AppContext";
import { Vector } from "@assets/resources/Vector";

export const GameItem = ({
  data,
  type,
}: {
  data: IAdvertisementDataType;
  type: string;
}) => {
  const { app, setApp } = useApp();
  //   const state = ActiveContext.useSelector((state) => state);
  //   const { send } = ActiveContext.useActorRef();
  const [active, setActive] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (type === "casino") {
      setActive(data.url === app.activeGame);
    } else {
      setActive(data.url === app.activeMiniGame);
    }
  }, [app]);

  const handleClick = () => {
    setApp((prevState) => ({ ...prevState, game: data.url }));
    navigate(data.url);
  };

  return (
    <S.Container
      $active={active}
      $backgroundColor={data.bgColor}
      className={active ? "active" : ""}
      onClick={() => {
        if (type === "casino") {
          setApp((prevState) => ({ ...prevState, activeGame: data.url }));
        } else {
          setApp((prevState) => ({ ...prevState, activeMiniGame: data.url }));
        }
      }}
    >
      <div className="firstBG">
        <Vector
          width={876}
          height={220}
          viewBox="0 0 876 220"
          color={data.firstColor}
        />
      </div>
      <div className="secondBG">
        <Vector
          width={876}
          height={110}
          viewBox="0 0 876 110"
          color={data.firstColor}
        />
      </div>
      <div className="logo">{active ? data.activeLogo : data.miniLogo}</div>
      <div className="title">
        <h3>{data.title}</h3>
        <p>{active ? data.activeNotice : data.miniNotice}</p>
      </div>
      <div className="button">
        <MainButton
          $title="Play Now"
          $padding="10px 16px"
          $fontFamily="MS Sans Serif Bold"
          $fontSize="16px"
          $fontWeight="400"
          $lineHeight="17px"
          $filterWidth="2px"
          onClick={handleClick}
        />
      </div>
    </S.Container>
  );
};
