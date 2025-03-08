import { useState } from "react";
import { DropBox } from "../dropBox";
import S from "./index.module.scss";
import { GameList } from "@utils/dataUtils";
import styled from "styled-components";
import clsx from "clsx";
import { formatNumber } from "@utils/formatUtils";

const Icon = styled.div<{ $color: string }>`
  padding: 6px;

  div {
    width: 9px;
    height: 9px;
    box-shadow: inset 0 0 0 1px black;
    background-color: ${({ $color }) => $color};
  }
`;

export const TotalInfo = ({
  icon,
  title,
  amount,
  className,
}: {
  icon: JSX.Element;
  title: string;
  amount: number;
  className?: string;
}) => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <DropBox $filter="2px" className={className}>
      <div
        className={S.body}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        {icon}
        <h3>{title}</h3>
        <h4>
          {formatNumber(amount)} <span>$coin</span>
        </h4>
        <p>
          ~$
          {(1539.723).toLocaleString("en-US", {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          })}
        </p>
        <DropBox $filter="2px" className={clsx(S.hover, active && S.active)}>
          <div className={S.wrapper}>
            {GameList.map((game, index) => (
              <div key={index} className={S.gameInfo}>
                <div className={S.gameTitle}>
                  <Icon $color={game.color}>
                    <div />
                  </Icon>
                  {game.title}
                </div>
                <h4>{"220"} $coin</h4>
              </div>
            ))}
          </div>
        </DropBox>
      </div>
    </DropBox>
  );
};
