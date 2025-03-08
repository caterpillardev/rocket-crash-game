import { OverviewChart, TransactionHistory } from "@features/accessories";
import S from "./index.module.scss";
// import { InviteFriends } from "@features/ui";

const Overview = () => {
  return (
    <div className={S.body}>
      <OverviewChart />
      <TransactionHistory />
      {/* <InviteFriends /> */}
    </div>
  );
};

export default Overview;
