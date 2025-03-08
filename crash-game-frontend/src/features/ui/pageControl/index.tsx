import { Dispatch, FC, SetStateAction } from "react";
import S from "./index.module.scss";
import clsx from "clsx";

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

export const PageControl: FC<IProps> = ({ pageInfo, setPageInfo }) => {
  const setActivePage = (index: number) => {
    setPageInfo((prevState) => ({ ...prevState, pageNumber: index }));
  };

  return (
    <div className={S.root}>
      {pageInfo.totalPages < 6 ? (
        <>
          {Array.from({ length: pageInfo.totalPages }, (_, index) => (
            <button
              type="button"
              className={clsx(pageInfo.pageNumber === index + 1 && S.active)}
              onClick={() => setActivePage(index + 1)}
              key={index}
            >
              {index + 1}
            </button>
          ))}
        </>
      ) : pageInfo.pageNumber < 3 ? (
        <>
          {Array.from({ length: 2 }, (_, index) => (
            <button
              type="button"
              className={clsx(pageInfo.pageNumber === index + 1 && S.active)}
              onClick={() => setActivePage(index + 1)}
              key={index}
            >
              {index + 1}
            </button>
          ))}
          ...
          <button
            type="button"
            onClick={() => setActivePage(pageInfo.totalPages)}
          >
            {pageInfo.totalPages}
          </button>
        </>
      ) : pageInfo.pageNumber > pageInfo.totalPages - 2 ? (
        <>
          <button type="button" onClick={() => setActivePage(1)}>
            1
          </button>
          ...
          {Array.from({ length: 2 }, (_, index) => (
            <button
              type="button"
              className={clsx(
                pageInfo.pageNumber === pageInfo.totalPages - 1 + index &&
                  S.active
              )}
              onClick={() => setActivePage(pageInfo.totalPages - 1 + index)}
              key={index}
            >
              {pageInfo.totalPages - 1 + index}
            </button>
          ))}
        </>
      ) : (
        <>
          <button type="button" onClick={() => setActivePage(1)}>
            1
          </button>
          ...
          {Array.from({ length: 3 }, (_, index) => (
            <button
              type="button"
              className={clsx(
                pageInfo.pageNumber === pageInfo.pageNumber - 1 + index &&
                  S.active
              )}
              onClick={() => setActivePage(pageInfo.pageNumber - 1 + index)}
              key={index}
            >
              {pageInfo.pageNumber - 1 + index}
            </button>
          ))}
          ...
          <button
            type="button"
            onClick={() => setActivePage(pageInfo.totalPages)}
          >
            {pageInfo.totalPages}
          </button>
        </>
      )}
    </div>
  );
};
