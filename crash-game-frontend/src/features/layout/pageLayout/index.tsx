import clsx from "clsx";
import Header from "../header";
import S from "./index.module.scss";
import { Outlet } from "react-router-dom";
import { useApp } from "@context/AppContext";
import { NavBar } from "../navBar";
import { LiveChat } from "../liveChat";

const PageLayout = () => {
  const { app } = useApp();

  return (
    <div className={S.body}>
      <Header />
      <div className={clsx(S.wrapper, app.activeChat && S.active)}>
        <NavBar />
        <Outlet />
        <LiveChat />
      </div>
    </div>
  );
};

export default PageLayout;
