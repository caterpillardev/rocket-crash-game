import { IComponentStylesType } from "@utils/typeUtils";
import { FC } from "react";
import * as S from "./index.styled";
import { DropButton } from "../dropButton";

interface IProps extends IComponentStylesType {}

export const MainButton: FC<IProps> = ({
  $width,
  $height,
  $backgroundColor = "white",
  $padding,
  $fontFamily,
  $fontSize,
  $fontWeight,
  $lineHeight,
  $textTransform,
  $textAlign,
  $icon,
  $title,
  $active,
  $activeBgColor,
  $activeEffect,
  $justifyContent,
  $borderRadius,
  $filterWidth,
  onClick,
  className,
  children,
}) => {
  return (
    <DropButton $filter={$filterWidth!} $active={$active}>
      <S.Container
        className={className}
        $borderRadius={$borderRadius}
        $width={$width}
        $height={$height}
        $padding={$padding}
        $icon={$icon}
        $fontFamily={$fontFamily}
        $fontWeight={$fontWeight}
        $fontSize={$fontSize}
        $backgroundColor={$backgroundColor}
        $lineHeight={$lineHeight}
        $textTransform={$textTransform}
        $textAlign={$textAlign}
        $title={$title}
        $activeBgColor={$activeBgColor}
        $active={$active}
        $activeEffect={$activeEffect}
        $justifyContent={$justifyContent}
        onClick={onClick}
      >
        {children}
        {$icon}
        <span>{$title}</span>
      </S.Container>
    </DropButton>
  );
};
