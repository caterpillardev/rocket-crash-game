import styled from "styled-components";

const Container = styled.div<{ $layout: string }>`
  position: relative;
  font-family: "Manrope";
  &::before {
    content: "";
    box-shadow: inset 0 0 0 1px black;
    position: absolute;
    background-color: white;
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
    background-color: white;
    box-shadow: inset 0 0 0 1px black;
    z-index: 2;
    position: relative;

    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      text-transform: capitalize;

      font-size: 14px;
      font-weight: 500;
      line-height: 20px;

      img {
        width: 32px;
        aspect-ratio: 1/1;
      }
    }

    span {
      &:nth-child(2) {
        color: #f7405e;
      }

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
