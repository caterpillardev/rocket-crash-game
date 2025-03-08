import { MainButton } from "@features/ui";
import S from "./index.module.scss";

export const HomeMainBanner = () => {
  return (
    <div className={S.body}>
      <div className={S.firstBG} />
      <div className={S.secondBG} />
      <div className={S.adver}>
        <h2>Reffer to your friends & get reward up to $100</h2>
        <p>Join the Affiliate and get reward up to $100.</p>
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
    </div>
  );
};
