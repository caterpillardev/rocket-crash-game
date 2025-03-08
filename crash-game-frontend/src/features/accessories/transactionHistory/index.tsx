import S from "./index.module.scss";
import { useEffect, useState } from "react";
import {
  PageControl,
  PageCount,
  PageNumber,
  TransactionItem,
} from "@features/ui";
import { ITransactionType } from "@utils/typeUtils";
import { axiosPost } from "@utils/axiosUtils";

export const TransactionHistory = () => {
  const [history, setHistory] = useState<ITransactionType[]>([]);
  const [pageInfo, setPageInfo] = useState<{
    pageNumber: number;
    pageCount: number;
    totalPages: number;
  }>({ pageNumber: 1, pageCount: 10, totalPages: 0 });

  useEffect(() => {
    const getHistories = async () => {
      const res = await axiosPost([
        "/transaction/sitehistory",
        {
          data: {
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

      setHistory(res.data);
    };

    getHistories();
  }, [pageInfo]);

  return (
    <div className={S.body}>
      <h2>Recent transactions</h2>
      <div className={S.wrapper}>
        <div className={S.header}>
          <span>Game</span>
          <span>Time</span>
          <span>Bet</span>
          <span>Multipler</span>
          <span>Payout</span>
        </div>
        <div className={S.list}>
          {history.map((history, index) => (
            <TransactionItem
              key={index}
              data={{
                ...history,
                layout:
                  "minmax(auto, 200px) minmax(auto, 200px) minmax(auto, 200px) minmax(auto, 100px) minmax(auto, 120px)",
              }}
            />
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
