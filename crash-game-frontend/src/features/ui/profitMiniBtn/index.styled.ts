import { IComponentStylesType } from "@utils/typeUtils";
import styled from "styled-components";

const Container = styled.div<IComponentStylesType>`
  border-radius: 8px;
  box-shadow: 0 0 0 1px black inset;
  background: ${({ $backgroundColor }) => $backgroundColor};
  padding: 8px 16px 8px 12px;
  display: flex;
  gap: 12px;

  & > .title {
    display: flex;
    flex-direction: column;
    width: 100%;

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

    & > .score {
      margin-top: 12px;
      padding: 8px;
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 0 0 1px inset black;

      & > .box {
        padding: 6px;

        & > .marker {
          box-shadow: 0 0 0 1px inset black;
          width: 9px;
          height: 9px;
          background-color: ${({ $backgroundColor }) => $backgroundColor};
        }
      }

      font-family: Manrope;
      font-size: 12px;

      & > span {
        font-weight: 500;
        line-height: 20px;
      }

      & > p {
        font-weight: 700;
        line-height: 18px;
      }
    }
  }
`;

export { Container };
