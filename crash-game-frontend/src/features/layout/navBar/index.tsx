import { useApp } from "@context/AppContext";
import S from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { DashboardMenu, SidebarMenu } from "@utils/dataUtils";
import { MainButton } from "@features/ui";
import { DepositButton } from "./depositButton";

export const NavBar = () => {
  const { app, setApp } = useApp();
  const navigate = useNavigate();

  const handleClick = (url: string) => {
    if (app.link !== "dashboard") {
      setApp((prevState) => ({ ...prevState, game: url, link: "" }));
      navigate(url);
    } else {
      setApp((prevState) => ({ ...prevState, activeDashLink: url }));
      if (url !== "overview") {
        navigate(`dashboard/${url}`);
      } else {
        navigate(`dashboard`);
      }
    }
  };

  return (
    <div className={clsx(S.body, app.link !== "dashboard" ? S.nomal : S.dash)}>
      {app.link !== "dashboard" ? (
        <>
          <div className={S.wrapper}>
            <span>Casino</span>
            {SidebarMenu.casino.map((item, index) => (
              <MainButton
                key={index}
                $padding="8px"
                $width="100%"
                $fontFamily="Saira"
                $fontSize="16px"
                $fontWeight="400"
                $lineHeight="25px"
                $textTransform="uppercase"
                $icon={item.icon}
                $title={item.title}
                $active={app.game === item.url}
                $activeBgColor="hsla(42, 100%, 88%, 1)"
                $activeEffect="2.5px 2.5px black inset"
                onClick={() => {
                  if (app.game !== item.url) {
                    handleClick(item.url);
                  }
                }}
                $filterWidth="1.5px"
                className={S.navItem}
              >
                <div className={S.notification}>
                  <div className={S.arrow}>
                    <div className={S.drop}>{item.title}</div>
                  </div>
                </div>
              </MainButton>
            ))}
          </div>
          <div className={clsx(S.border, S.visible)} />
          <div className={S.wrapper}>
            <span>Mini Games</span>
            {SidebarMenu.mini.map((item, index) => (
              <MainButton
                key={index}
                $padding="8px"
                $width="100%"
                $fontFamily="Saira"
                $fontSize="16px"
                $fontWeight="400"
                $lineHeight="25px"
                $textTransform="uppercase"
                $icon={item.icon}
                $title={item.title}
                $active={app.game === item.url}
                $activeBgColor="hsla(42, 100%, 88%, 1)"
                $activeEffect="2.5px 2.5px black inset"
                onClick={() => {
                  if (app.game !== item.url) {
                    handleClick(item.url);
                  }
                }}
                $filterWidth="1.5px"
                className={S.navItem}
              >
                <div className={S.notification}>
                  <div className={S.arrow}>
                    <div className={S.drop}>{item.title}</div>
                  </div>
                </div>
              </MainButton>
            ))}
          </div>
          <div className={S.border} />
          <div className={S.wrapper}>
            <span>Menu</span>
            {SidebarMenu.menu.map((item, index) => (
              <MainButton
                key={index}
                $padding="8px"
                $width="100%"
                $fontFamily="Saira"
                $fontSize="16px"
                $fontWeight="400"
                $lineHeight="25px"
                $textTransform="uppercase"
                $title={item.title}
                $icon={item.icon}
                $active={app.game === item.url}
                $activeBgColor="hsla(42, 100%, 88%, 1)"
                $activeEffect="2.5px 2.5px black inset"
                onClick={() => {
                  if (app.game !== item.url) {
                    handleClick(item.url);
                  }
                }}
                $filterWidth="1.5px"
                className={S.navItem}
              >
                <div className={S.notification}>
                  <div className={S.arrow}>
                    <div className={S.drop}>{item.title}</div>
                  </div>
                </div>
              </MainButton>
            ))}
          </div>
        </>
      ) : (
        <div className={S.wrapper}>
          {DashboardMenu.map((item, index) => (
            <MainButton
              key={index}
              $padding="8px"
              $width="100%"
              $fontFamily="Saira"
              $fontSize="16px"
              $fontWeight="400"
              $lineHeight="25px"
              $textTransform="uppercase"
              $title={item.title}
              $icon={item.icon}
              $active={app.activeDashLink === item.url}
              $activeBgColor="hsla(42, 100%, 88%, 1)"
              $activeEffect="2.5px 2.5px black inset"
              onClick={() => {
                if (app.activeDashLink !== item.url) {
                  handleClick(item.url);
                }
              }}
              $filterWidth="1.5px"
            />
          ))}
        </div>
      )}
      <DepositButton />
    </div>
  );
};
