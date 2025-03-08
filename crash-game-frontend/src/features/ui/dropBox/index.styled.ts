import styled, { css } from "styled-components";

const Container = styled.div<{
  $filter: string;
  $passive?: boolean;
  $user?: boolean;
}>`
  ${({ $filter, $passive }) =>
    !$passive &&
    css`
      filter: drop-shadow(${$filter} ${$filter} 0 black);
    `}

  ${({ $user }) =>
    $user &&
    css`
      position: sticky;
      bottom: 0;
      top: 0;
      z-index: 999;
    `}
`;

export { Container };
