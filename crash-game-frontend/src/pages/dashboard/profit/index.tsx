import { CasinoBtn, MiniBtn, TotalInfo } from "@features/ui";
import S from "./index.module.scss";
import { HiBriefcase } from "react-icons/hi";
import BOMB from "@assets/resources/bomb.png";
import { Icon } from "@features/icon";
// import { FakeTransactionHistory } from "@utils/dataUtils";

const Profit = () => {
  return (
    <div className={S.body}>
      <div className={S.header}>
        <TotalInfo
          icon={<HiBriefcase size={40} className="icon" />}
          title="Total Profit"
          amount={5600}
        />
        <TotalInfo
          icon={<HiBriefcase size={40} className="icon" />}
          title="Totla Loss"
          amount={13300}
        />
      </div>
      <div className={S.casino}>
        <h3>Casino Games</h3>
        <div className={S.btnGroup}>
          <CasinoBtn
            bgColor="#80eed3"
            icon={
              <Icon
                name="CrashDash"
                height={32}
                width={32}
                viewBox="0 0 32 32"
              />
            }
            name="Crash"
            amount={2000}
          />
          <CasinoBtn
            bgColor="#F2D07F"
            icon={
              <Icon
                name="FlipDash"
                height={32}
                width={32}
                viewBox="0 0 32 32"
              />
            }
            name="CoinFlip"
            amount={0}
          />
          <CasinoBtn
            bgColor="#FF868E"
            icon={<img src={BOMB} />}
            name="Mines"
            amount={4000}
          />
        </div>
      </div>
      <div className={S.mini}>
        <h3>Mini Games</h3>
        <div className={S.btnGroup}>
          <MiniBtn
            bgColor="#60DCFD"
            icon={
              <Icon
                name="CrashDash"
                height={32}
                width={32}
                viewBox="0 0 32 32"
              />
            }
            name="Chrome Run"
            amount={45}
          />
          <MiniBtn
            bgColor="#F5B6A7"
            icon={
              <Icon
                name="CrashDash"
                height={32}
                width={32}
                viewBox="0 0 32 32"
              />
            }
            name="Chrome Run"
            amount={45}
          />
        </div>
      </div>
      <div className={S.transactions}>
        <h3>Recent Transactions</h3>
        <div className={S.wrapper}>
          <div className={S.header}>
            <span>Game</span>
            <span>Time</span>
            <span>Bet</span>
            <span>Multipler</span>
            <span>Payout</span>
          </div>
          <div className={S.list}>
            {/* {FakeTransactionHistory.map((history, index) => (
              <TransactionItem
                key={index}
                data={{
                  ...history,
                  layout:
                    "minmax(auto, 200px) minmax(auto, 200px) minmax(auto, 200px) minmax(auto, 100px) minmax(auto, 120px)",
                }}
              />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profit;
