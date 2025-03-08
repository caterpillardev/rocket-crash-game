import { FC, ReactNode } from "react";
import * as S from "./index.styled";

interface IProps {
  children: ReactNode;
  $filter: string;
  $passive?: boolean;
  $user?: boolean;
  className?: string;
  onClick?: () => void;
}

export const DropBox: FC<IProps> = ({
  children,
  $filter,
  $passive,
  $user,
  className,
  onClick,
}) => {
  return (
    <S.Container
      $filter={$filter}
      $passive={$passive}
      $user={$user}
      className={className}
      onClick={onClick}
    >
      {children}
    </S.Container>
  );
};
