import { ILinkType } from "@utils/typeUtils";
import S from "./item.module.scss";
import { FC, useEffect, useState } from "react";
import { useApp } from "@context/AppContext";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

interface IProps {
  data: ILinkType;
}

export const HeaderItem: FC<IProps> = ({ data }) => {
  const { app, setApp } = useApp();
  const [active, setActive] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClick = () => {
    if (!app.activeProfile) {
      setApp((prevState) => ({ ...prevState, link: data.url }));
      navigate(`${data.url}`);
    }
  };

  useEffect(() => {
    if (app.link === data.url && !app.activeProfile) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [app.link, app.activeProfile]);

  return (
    <div
      className={clsx(
        S.root,
        active && S.active,
        active && (data.url === "" ? S.right : S.both)
      )}
      onClick={handleClick}
    >
      {active ? data.activeIcon : data.icon}
      <span>{data.title}</span>
    </div>
  );
};
