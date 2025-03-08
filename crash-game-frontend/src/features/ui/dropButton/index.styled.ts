import styled, { css } from "styled-components";

const Container = styled.div<{ $filter: string; $active?: boolean }>`
  cursor: pointer;
  ${({ $filter, $active }) =>
    !$active &&
    css`
      filter: drop-shadow(${$filter} ${$filter} 0 black);
      transition: all 0.15s ease-in-out;

      &:active {
        filter: drop-shadow(0 0 0);
        transform: translate(${$filter}, ${$filter});
      }
    `}
`;

export { Container };
