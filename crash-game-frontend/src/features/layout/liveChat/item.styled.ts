import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;

  .avatar {
    width: 30px;
    aspect-ratio: 1/1;
    background-color: rgba(25, 222, 110);
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 4px;

    span {
      font-family: "MS Sans Serif Bold";
      font-weight: 400;
      font-size: 12px;
      line-height: 13px;
    }

    p {
      font-family: "Saira";
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
    }
  }
`;

export { Container };
