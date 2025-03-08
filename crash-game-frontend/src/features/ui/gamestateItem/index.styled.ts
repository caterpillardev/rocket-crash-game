import styled, { css } from "styled-components";

const Container = styled.div<{
  $layout: string;
  $avatarColor: string;
  $user: boolean;
}>`
  ${({ $user }) =>
    $user
      ? css`
          position: sticky;
          z-index: 150;
          top: 0;
          bottom: 0;
        `
      : css`
          position: relative;
        `}
  font-family: "Manrope";
  &::before {
    content: "";
    box-shadow: inset 0 0 0 1px black;
    position: absolute;
    background-color: "white";
    top: 1.5px;
    left: 1.5px;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .wrapper {
    display: grid;
    grid-template-columns: ${({ $layout }) => $layout};
    gap: 8px;
    padding: 8px;
    align-items: center;
    background-color: ${({ $user }) => ($user ? "#aa7" : "white")};
    box-shadow: inset 0 0 0 1px black;
    z-index: 2;
    position: relative;

    .userInfo {
      display: flex;
      align-items: center;
      gap: 12px;

      .avatar {
        width: 24px;
        aspect-ratio: 1/1;
        box-shadow: inset 0 0 0 1px black;
        /* background-color: ${({ $avatarColor }) => $avatarColor}; */
        background-color: #f7f7f7;
      }

      p {
        font-family: Manrope;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
      }
    }

    span {
      /* &:nth-child(2) {
        color: #f7405e;
      } */

      &:last-child {
        justify-self: end;
      }

      font-size: 12px;
      font-weight: 500;
      line-height: 18px;
      letter-spacing: 0.15px;
    }

    .multi {
      display: flex;
    }
  }
`;

export { Container };
