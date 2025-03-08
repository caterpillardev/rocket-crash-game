import { IComponentStylesType } from "@utils/typeUtils";
import styled from "styled-components";

const Container = styled.div<IComponentStylesType>`
  border-radius: 8px;
  box-shadow: 0 0 0 1px black inset;
  background: ${({ $backgroundColor }) => $backgroundColor};
  padding: 8px 16px 8px 12px;
  display: flex;
  gap: 12px;
  align-items: center;

  & > .title {
    display: flex;
    flex-direction: column;

    & > .name {
      font-family: "Manrope";
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
    }

    & > p {
      font-family: "Manrope";
      font-size: 20px;
      font-weight: 700;
      line-height: 30px;

      & > span {
        font-family: "Manrope";
        font-size: 16px;
        font-weight: 700;
        line-height: 30px;
        text-transform: uppercase;
      }
    }
  }
`;

export { Container };
