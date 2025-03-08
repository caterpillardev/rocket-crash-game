import { FC, ReactNode } from "react";
import * as S from "./index.styled";

interface IProps {
  children: ReactNode;
  $filter: string;
  $active?: boolean;
  className?: string;
  onClick?: () => void;
}

export const DropButton: FC<IProps> = ({
  children,
  $filter,
  $active,
  className,
  onClick,
}) => {
  return (
    <S.Container
      $filter={$filter}
      $active={$active}
      className={className}
      onClick={onClick}
    >
      {children}
    </S.Container>
  );
};
