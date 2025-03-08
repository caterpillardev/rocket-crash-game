import { lazy } from "react";
import {
  IAdvertisementDataType,
  IGameRankType,
  ILinkType,
  IRouterType,
  ISideMenuType,
  TGameLogo,
} from "./typeUtils";
import {
  HiChartBar,
  HiHome,
  HiOutlineCalendar,
  HiOutlineChartBar,
  HiOutlineChartSquareBar,
  HiOutlineCog,
  HiOutlineDatabase,
  HiOutlineHome,
  HiOutlineSupport,
} from "react-icons/hi";
import { Icon } from "@features/icon";
import runImg from "@assets/resources/chrome_run.svg";
import rocketImg from "@assets/resources/rocket.svg";

const LazyPageLayout = lazy(() => import("@features/layout/pageLayout"));
const LazyHomePage = lazy(() => import("@pages/home"));
const LazyCrashPage = lazy(() => import("@pages/crashGame"));
const LazyMinePage = lazy(() => import("@pages/mineGame"));
const LazyCoinflipPage = lazy(() => import("@pages/coinflipGame"));
const LazyLeaderboardPage = lazy(() => import("@pages/leaderboard"));
const LazyDashboardLayout = lazy(
  () => import("@features/layout/dashboardLayout")
);
const LazyOverviewPage = lazy(() => import("@pages/dashboard/overview"));
const LazyProfitPage = lazy(() => import("@pages/dashboard/profit"));
const LazyHistoryPage = lazy(() => import("@pages/dashboard/history"));

const PAGE_DATA: IRouterType[] = [
  {
    title: "Main layout",
    path: "/",
    element: <LazyPageLayout />,
    children: [
      { title: "Home Page", path: "", element: <LazyHomePage /> },
      { title: "Crash Page", path: "/crash", element: <LazyCrashPage /> },
      { title: "Mine Page", path: "/mine", element: <LazyMinePage /> },
      { title: "Coinflip Page", path: "/flip", element: <LazyCoinflipPage /> },
      {
        title: "Leaderboard",
        path: "/leaderboard",
        element: <LazyLeaderboardPage />,
      },
      {
        title: "Dashboard",
        path: "/dashboard",
        element: <LazyDashboardLayout />,
        children: [
          {
            title: "Overview Page",
            path: "",
            element: <LazyOverviewPage />,
          },
          {
            title: "Profit Page",
            path: "profit",
            element: <LazyProfitPage />,
          },
          {
            title: "History Page",
            path: "history",
            element: <LazyHistoryPage />,
          },
        ],
      },
    ],
  },
];

const HeaderLinks: ILinkType[] = [
  {
    title: "Home",
    url: "",
    icon: <HiOutlineHome size={20} />,
    activeIcon: <HiHome size={20} />,
  },
  {
    title: "Leaderboard",
    url: "leaderboard",
    icon: <Icon name="Trophy" width={20} height={20} viewBox="0 0 20 20 " />,
    activeIcon: (
      <Icon name="TrophyActive" width={20} height={20} viewBox="0 0 20 20" />
    ),
  },
  {
    title: "Dashboard",
    url: "dashboard",
    icon: <HiOutlineChartBar size={20} />,
    activeIcon: <HiChartBar size={20} />,
  },
];

const UnauthLinks: ILinkType[] = HeaderLinks.slice(0, 2);

const SidebarMenu: ISideMenuType = {
  menu: [
    {
      title: "settings",
      url: "setting",
      icon: <HiOutlineCog size={20} />,
    },
    {
      title: "help & support",
      url: "support",
      icon: <HiOutlineSupport size={20} />,
    },
  ],
  casino: [
    {
      title: "crash",
      url: "crash",
      icon: <Icon name="Crash" width={21} height={21} viewBox="0 0 21 21" />,
    },
    {
      title: "mines",
      url: "mine",
      icon: <Icon name="Bomb" width={21} height={21} viewBox="0 0 21 21" />,
    },
    {
      title: "coin flip",
      url: "flip",
      icon: <Icon name="Flip" width={21} height={21} viewBox="0 0 21 21" />,
    },
  ],
  mini: [
    {
      title: "rocket rush",
      url: "rush",
      icon: <Icon name="Rush" width={21} height={21} viewBox="0 0 21 21" />,
    },
    {
      title: "chrome run",
      url: "chrome",
      icon: <Icon name="Chrome" width={21} height={21} viewBox="0 0 21 21" />,
    },
  ],
};

const DashboardMenu: ILinkType[] = [
  {
    title: "overview",
    url: "overview",
    icon: <HiOutlineChartSquareBar size={20} />,
  },
  {
    title: "profit & loss",
    url: "profit",
    icon: <HiOutlineDatabase size={20} />,
  },
  {
    title: "history",
    url: "history",
    icon: <HiOutlineCalendar size={20} />,
  },
];

const CasinoAdvertisementDatas: IAdvertisementDataType[] = [
  {
    title: "Crash",
    activeNotice:
      "Crash games are a category of game that define all Bitcoin casinos and separate them from traditional iGaming sites.",
    miniNotice: "Crash game",
    bgColor: "hsla(165, 76%, 72%, 1)",
    firstColor: "#ffffff4c",
    secondColor: "#ffffff4c",
    miniLogo: (
      <Icon name="CrashLogo" width={60} height={60} viewBox="0 0 60 60" />
    ),
    activeLogo: (
      <Icon name="CrashLogo" width={128} height={128} viewBox="0 0 128 128" />
    ),
    url: "crash",
  },
  {
    title: "CoinFlip",
    activeNotice:
      "Crash games are a category of game that define all Bitcoin casinos and separate them from traditional iGaming sites.",
    miniNotice: "Flip your life",
    bgColor: "hsla(42, 82%, 72%, 1)",
    firstColor: "#ffffff4c",
    secondColor: "#ffffff4c",
    miniLogo: (
      <Icon name="FlipLogo" width={60} height={60} viewBox="0 0 60 60" />
    ),
    activeLogo: (
      <Icon name="FlipLogo" width={128} height={128} viewBox="0 0 128 128" />
    ),
    url: "flip",
  },
  {
    title: "Mines",
    activeNotice:
      "Crash games are a category of game that define all Bitcoin casinos and separate them from traditional iGaming sites.",
    miniNotice: "Play & Get Bonus Bomb!",
    bgColor: "hsla(356, 100%, 76%, 1)",
    firstColor: "#ffffff4c",
    secondColor: "#ffffff4c",
    miniLogo: (
      <Icon name="BombLogo" width={60} height={60} viewBox="0 0 60 60" />
    ),
    activeLogo: (
      <Icon name="BombLogo" width={128} height={128} viewBox="0 0 128 128" />
    ),
    url: "mine",
  },
];

const MiniAdvertisementDatas: IAdvertisementDataType[] = [
  {
    title: "DesertRun",
    activeNotice:
      "Rush up to the sky in a rocket. Just play online, no download or installation required.",
    miniNotice: "Run & Bonus Now!!",
    bgColor: "hsla(193, 98%, 68%, 1)",
    firstColor: "#ffffff4c",
    secondColor: "#ffffff4c",
    miniLogo: (
      <img src={runImg} alt="" style={{ width: "60px", height: "60px" }} />
    ),
    activeLogo: (
      <img src={runImg} alt="" style={{ width: "138px", height: "138px" }} />
    ),
    url: "chrome",
  },
  {
    title: "RocketRush",
    activeNotice:
      "Rush up to the sky in a rocket. Just play online, no download or installation required.",
    miniNotice: "Rocket Rush",
    bgColor: "hsla(11, 45%, 61%, 1)",
    firstColor: "#ffffff4c",
    secondColor: "#ffffff4c",
    miniLogo: (
      <img src={rocketImg} alt="" style={{ width: "60px", height: "60px" }} />
    ),
    activeLogo: (
      <img src={rocketImg} alt="" style={{ width: "138px", height: "138px" }} />
    ),
    url: "rush",
  },
];

export const GameList: IGameRankType[] = [
  { title: "Crash", path: "crash", color: "#80EED3" },
  { title: "Mines", path: "mine", color: "#FF868E" },
  { title: "Coin Flip", path: "flip", color: "#F2D07F" },
  // { title: "Chrome Run", path: "chrome", color: "#60DCFD" },
  // { title: "Rocket Rush", path: "rush", color: "#F5B6A7" },
];

const GameLogos: TGameLogo = {
  crash: <HiOutlineHome />,
  coinflip: <HiOutlineCalendar />,
  "chrome rush": <HiOutlineCog />,
  mines: <HiOutlineSupport />,
};

export {
  PAGE_DATA,
  HeaderLinks,
  UnauthLinks,
  SidebarMenu,
  DashboardMenu,
  CasinoAdvertisementDatas,
  MiniAdvertisementDatas,
  GameLogos,
};
