import {
  HomeCasinoAdvertisement,
  HomeMainBanner,
  HomeMiniAdvertisement,
} from "@features/accessories";
import S from "./index.module.scss";
import useTimeout from "@hooks/useTimeout";

const HomePage = () => {
  useTimeout(4000);

  return (
    <div className={S.body}>
      <HomeMainBanner />
      <HomeCasinoAdvertisement />
      <HomeMiniAdvertisement />
    </div>
  );
};

export default HomePage;
