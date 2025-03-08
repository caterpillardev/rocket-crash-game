import { IComponentStylesType } from "@utils/typeUtils";
import styled from "styled-components";

const Container = styled.div<IComponentStylesType>`
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: ${({ $padding }) => $padding};
  background-color: ${({ $backgroundColor, $active, $activeBgColor }) =>
    $active ? $activeBgColor : $backgroundColor};
  border: 1px solid black;
  border-radius: ${({ $borderRadius }) => $borderRadius};
  display: flex;
  align-items: center;
  justify-content: ${({ $justifyContent }) => $justifyContent};
  gap: ${({ $icon, $title }) => $icon && $title && "8px"};
  box-shadow: ${({ $active, $activeEffect }) => $active && $activeEffect};

  & > span {
    text-transform: ${({ $textTransform }) => $textTransform} !important;
    text-align: ${({ $textAlign }) => $textAlign} !important;
    font-family: ${({ $fontFamily }) => $fontFamily} !important;
    font-weight: ${({ $fontWeight }) => $fontWeight} !important;
    font-size: ${({ $fontSize }) => $fontSize} !important;
    line-height: ${({ $lineHeight }) => $lineHeight} !important;
    color: black;
  }
`;

export { Container };
