import { IComponentStylesType } from "@utils/typeUtils";
import styled, { css } from "styled-components";

const Container = styled.div<IComponentStylesType>`
  width: 100%;
  padding: 24px;
  border: 1px solid black;
  cursor: pointer;
  display: ${({ $active }) => ($active ? "flex" : "grid")};
  grid-template-rows: auto 1fr auto;
  gap: 16px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  position: relative;
  height: 231px;
  position: relative;
  overflow: hidden;

  .firstBG {
    position: absolute;
    left: 0;
    top: 70px;
  }

  .secondBG {
    position: absolute;
    left: 0;
    bottom: -20px;
  }

  &.active {
    padding: 24px 32px;
  }

  ${({ $active }) =>
    $active &&
    css`
      & {
        flex-direction: column;
        justify-content: flex-end;
      }

      .logo {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
      }

      .title {
        max-width: 55%;

        @media (max-width: 1440px) {
          max-width: 70%;
        }
      }
    `}

  .title {
    position: relative;
    z-index: 5;

    h3 {
      font-family: "Press Start 2P";
      font-weight: 400;
      font-size: ${({ $active }) => ($active ? "24px" : "18px")};
      line-height: 24px;
    }

    p {
      font-family: "Saira";
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
  }

  .button {
    display: flex;
  }

  .logo {
    z-index: 5;
  }
`;

export { Container };
