import { TotalInfo } from "@features/ui";
import S from "./index.module.scss";
import { HiBriefcase } from "react-icons/hi";
import { Icon } from "@features/icon";

export const OverviewChart = () => {
  return (
    <div className={S.body}>
      <TotalInfo
        icon={<HiBriefcase size={24} className="icon" />}
        title="Total Balance"
        amount={5600}
        className={S.balance}
      />
      <TotalInfo
        icon={
          <Icon
            name="Bonus"
            width={32}
            height={32}
            viewBox="0 0 32 32"
            className="icon"
          />
        }
        title="Total Bonus"
        amount={13300}
        className={S.bonus}
      />
      {/* <Chart className={S.chart} /> */}
    </div>
  );
};
