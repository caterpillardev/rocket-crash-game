import { IconNames, Icons } from "./icons";

export const Icon = ({
  width,
  height,
  viewBox,
  name,
  className,
}: {
  width?: number;
  height?: number;
  viewBox?: string;
  name?: IconNames;
  className?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {Icons[name!](width)}
    </svg>
  );
};
