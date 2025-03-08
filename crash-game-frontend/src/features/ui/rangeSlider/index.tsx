import * as S from "./index.styled.ts";
import { FC } from "react";

interface IProps {
  title: string;
  name: string;
  step: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  disable?: boolean;
}

export const RangeSlider: FC<IProps> = ({
  title,
  name,
  step,
  value,
  onChange,
  className,
  disable,
}) => {
  return (
    <S.Container className={className}>
      <span>{title}</span>
      <input
        type="range"
        name={name}
        id={name}
        min={1}
        max={10}
        step={step}
        value={value}
        onChange={(e) => {
          onChange(Number(e.target.value));
        }}
        disabled={disable}
      />
      <p>{value}x</p>
    </S.Container>
  );
};
