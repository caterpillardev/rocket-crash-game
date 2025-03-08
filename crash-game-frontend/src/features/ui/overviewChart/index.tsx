import { DropBox } from "../dropBox";
import S from "./index.module.scss";

export const Chart = ({ className }: { className: string }) => {
  return (
    <DropBox $filter="2px" className={className}>
      <div className={S.body}>
        <h3>Overview</h3>
      </div>
    </DropBox>
  );
};
