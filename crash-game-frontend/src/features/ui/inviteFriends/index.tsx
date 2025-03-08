import { MainButton } from "../button";
import { DropBox } from "../dropBox";
import S from "./index.module.scss";

export const InviteFriends = () => {
  return (
    <DropBox $filter="2px">
      <div className={S.body}>
        {/* <div className={S.bg}></div> */}
        <h3>Invite your friends</h3>
        <span>Join the Affiliate and get reward up to $100</span>
        <div className={S.button}>
          <MainButton
            $fontFamily="MS Sans Serif Bold"
            $fontWeight="400"
            $fontSize="16px"
            $lineHeight="17px"
            $title="Invite Friends"
            $padding="16px 24px"
            $filterWidth="2px"
          />
        </div>
      </div>
    </DropBox>
  );
};
