import styled from "styled-components";

const Container = styled.div<{ $user: boolean }>`
  width: 100%;
  padding: 12px 8px;
  display: grid;
  grid-template-columns: 40px 1fr 120px;
  background-color: ${({ $user }) => ($user ? "#FFEDC2" : "white")};
  border: 1px solid black;
  align-items: center;
  gap: 8px;

  p.rank {
    text-align: center;
    font-family: "Press Start 2P";
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.15px;

    span {
      font-family: "Press Start 2P";
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0.15px;
    }
  }

  .name {
    display: flex;
    align-items: center;
    gap: 12px;

    .avatar {
      width: 36px;
      aspect-ratio: 1;
      background-color: #4f8533;
    }

    h4 {
      font-family: "Manrope";
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
    }
  }

  .score {
    display: flex;
    align-items: center;
    justify-self: end;
    gap: 10px;

    & > span {
      font-family: "MS Sans Serif Bold";
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0.15px;
    }
  }
`;

export { Container };
