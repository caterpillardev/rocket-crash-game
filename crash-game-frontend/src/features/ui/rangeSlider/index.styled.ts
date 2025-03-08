import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 32px;
  padding: 8px;
  align-items: center;

  & > span {
    font-family: "MS Sans Serif 1";
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin-right: 8px;
  }

  & > p {
    font-family: "Manrope";
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    justify-self: end;
  }

  input[type="range"] {
    font-size: 1.5rem;
    width: 100%;
    cursor: pointer;
  }

  input[type="range"] {
    color: #f49129;
    --thumb-height: 1.125em;
    --track-height: 9px;
    --track-color: rgba(0, 0, 0, 0.2);
    --brightness-hover: 140%;
    --brightness-down: 80%;
    --clip-edges: 0.125em;
  }

  input[type="range"] {
    position: relative;
    background: #fff0;
    overflow: hidden;
  }

  input[type="range"]:active {
    cursor: grabbing;
  }

  input[type="range"],
  input[type="range"]::-webkit-slider-runnable-track,
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    transition: all ease 100ms;
    height: var(--thumb-height);
  }

  input[type="range"]::-webkit-slider-runnable-track,
  input[type="range"]::-webkit-slider-thumb {
    position: relative;
  }

  input[type="range"]::-webkit-slider-thumb {
    --thumb-radius: calc((var(--thumb-height) * 0.5) - 1px);
    --clip-top: calc((var(--thumb-height) - var(--track-height)) * 0.5 - 0.5px);
    --clip-bottom: calc(var(--thumb-height) - var(--clip-top));
    --clip-further: calc(100% + 1px);
    --box-fill: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0
      100vmax currentColor;

    width: var(--thumb-width, var(--thumb-height));
    background: linear-gradient(currentColor 0 0) scroll no-repeat left center /
      50% calc(var(--track-height) + 1px);
    /* background-color: red; */
    background-image: url("/handler.svg");
    background-size: cover;
    box-shadow: var(--box-fill);
    border-radius: var(--thumb-width, var(--thumb-height));

    filter: brightness(100%);
    clip-path: polygon(
      100% -1px,
      var(--clip-edges) -1px,
      0 var(--clip-top),
      -100vmax var(--clip-top),
      -100vmax var(--clip-bottom),
      0 var(--clip-bottom),
      var(--clip-edges) 100%,
      var(--clip-further) var(--clip-further)
    );
  }

  input[type="range"]:hover::-webkit-slider-thumb {
    filter: brightness(var(--brightness-hover));
    cursor: grab;
  }

  input[type="range"]:active::-webkit-slider-thumb {
    filter: brightness(var(--brightness-down));
    cursor: grabbing;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    background: linear-gradient(var(--track-color) 0 0) scroll no-repeat center /
      100% calc(var(--track-height) + 1px);
  }
`;

const Line = styled.div<{ $width: string }>`
  position: absolute;
  left: 0;
  right: 0;
  height: 9px;
  border-radius: inherit;
  background-color: #f49129;
  width: ${({ $width }) => $width}%;
`;

const Handler = styled.div<{ $position: string }>`
  position: absolute;
  cursor: pointer;

  left: ${({ $position }) => $position}%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export { Container, Line, Handler };
