import { Dispatch, FC, SetStateAction } from "react";
import S from "./index.module.scss";
import clsx from "clsx";

const countNumbers = [5, 10, 15];

interface IProps {
  pageInfo: { pageNumber: number; pageCount: number; totalPages: number };
  setPageInfo: Dispatch<
    SetStateAction<{
      pageNumber: number;
      pageCount: number;
      totalPages: number;
    }>
  >;
}

export const PageCount: FC<IProps> = ({ pageInfo, setPageInfo }) => {
  const changePageCount = (count: number) => {
    setPageInfo((prevState) => ({ ...prevState, pageCount: count }));
  };

  return (
    <div className={S.root}>
      {countNumbers.map((item, index) => (
        <button
          type="button"
          key={index}
          className={clsx(item === pageInfo.pageCount && S.active)}
          onClick={() => changePageCount(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
