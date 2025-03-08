import { MainButton, PageControl, PageCount, PageNumber } from "@features/ui";
import S from "./index.module.scss";
import { useApp } from "@context/AppContext";
import { useEffect, useState } from "react";
import { axiosPost } from "@utils/axiosUtils";
import { IUser } from "@utils/typeUtils";
import { Itme } from "./item";

const historyList = ["betting", "withdrawal", "deposit"];

export interface IHistoryType {
  amount: number;
  created: Date;
  game: number;
  user: IUser;
  tranType: number;
}

const History = () => {
  const [histories, setHistories] = useState<IHistoryType[]>([]);
  const [pageInfo, setPageInfo] = useState<{
    pageNumber: number;
    pageCount: number;
    totalPages: number;
  }>({ pageNumber: 1, pageCount: 10, totalPages: 0 });
  const { app, setApp } = useApp();

  useEffect(() => {
    const getHistories = async () => {
      const res = await axiosPost([
        "/transaction/history",
        {
          data: {
            type:
              app.activeHistoryType === "betting"
                ? 3
                : app.activeHistoryType === "deposit"
                ? 1
                : 2,
            pageNumber: pageInfo.pageNumber,
            pageCount: pageInfo.pageCount,
          },
        },
      ]);

      setPageInfo((prevState) => ({
        ...prevState,
        pageNumber:
          prevState.pageNumber > res.totalPages ? 1 : prevState.pageNumber,
        totalPages: res.totalPages,
      }));

      setHistories(res.data);
    };

    getHistories();
  }, [app.activeHistoryType, pageInfo]);

  return (
    <div className={S.body}>
      <div className={S.header}>
        <h2>betting history</h2>
        <div className={S.btnGroup}>
          {historyList.map((history, index) => (
            <MainButton
              key={index}
              $title={history}
              $textTransform="capitalize"
              $fontSize="14px"
              $fontFamily="Manrope"
              $lineHeight="20px"
              $fontWeight="500"
              $backgroundColor="white"
              $filterWidth="1px"
              $padding="8px 16px"
              $activeBgColor="#FFEDC2"
              $active={app.activeHistoryType === history}
              onClick={() => {
                if (app.activeHistoryType !== history) {
                  setApp((prevState) => ({
                    ...prevState,
                    activeHistoryType: history,
                  }));
                }
              }}
            />
          ))}
        </div>
      </div>
      <div className={S.wrapper}>
        <div>
          <div className={S.header}>
            <span>User</span>
            <span>Time</span>
            <span>Bet</span>
            <span>Type</span>
          </div>
          <div className={S.border} />
        </div>
        <div className={S.list}>
          {histories.map((history, index) => (
            <Itme key={index} data={history} />
          ))}
        </div>
        <div className={S.footer}>
          <PageCount pageInfo={pageInfo} setPageInfo={setPageInfo} />
          <PageNumber pageInfo={pageInfo} setPageInfo={setPageInfo} />
          <PageControl pageInfo={pageInfo} setPageInfo={setPageInfo} />
        </div>
      </div>
    </div>
  );
};

export default History;
