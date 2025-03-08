import {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import S from "./index.module.scss";

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

export const PageNumber: FC<IProps> = ({ pageInfo, setPageInfo }) => {
  const [pages, setPages] = useState<number>();

  useEffect(() => {
    setPages(pageInfo.pageNumber);
  }, [pageInfo.pageNumber]);

  const changePageNumber = (index: number) => {
    if (
      (pageInfo.pageNumber > 1 && index === -1) ||
      (index === 1 && pageInfo.pageNumber < pageInfo.totalPages)
    ) {
      setPageInfo((prevState) => ({
        ...prevState,
        pageNumber: prevState.pageNumber + index,
      }));
    }
  };

  const inputPageNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value >= 0) {
      setPages(value);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = Number(e.currentTarget.value);
      if (value > 0) {
        setPageInfo((prevState) => ({
          ...prevState,
          pageNumber: value,
        }));
      }
    }
  };

  return (
    <div className={S.root}>
      <button type="button" onClick={() => changePageNumber(-1)}>
        {"<"}
      </button>
      <input
        type="text"
        id=""
        value={pages || ""}
        onChange={inputPageNumber}
        onKeyPress={handleKeyPress}
      />
      <button type="button" onClick={() => changePageNumber(1)}>
        {">"}
      </button>
    </div>
  );
};
