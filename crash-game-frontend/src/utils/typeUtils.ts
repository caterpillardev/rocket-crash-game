import { Connector, WcWallet } from "@web3modal/core";
import { ReactNode } from "react";
import { Game, Scene } from "phaser";
import { Socket } from "socket.io-client";

interface IAppProps {
  logged: boolean;
  activeProfile: boolean;
  link: string;
  user: IUser | null;
  activeChat: boolean;
  activeDashLink: string;
  activeGame: string;
  activeMiniGame: string;
  activeHistoryType: string;
  game: string;
  openDeposit: boolean;
  liveSocket: Socket | undefined;
}

interface ICrashProps {
  gameMode: string;
  betState: boolean;
  betAmount: number;
  cashout: number;
  numberRound: number;
  gameStep: string;
  getCoin: boolean;
  nextRound: boolean;
  socketAuth: boolean;
  socket: Socket | undefined;
  players: { [userId: string]: IPlayer };
  scene: Scene | null;
  gameStartTime: Date;
}

interface IMineProps {
  scene: Scene | null;
  cashout: number;
  state: string;
  delayEndSituation: boolean;
}

interface ICoinflipProps {
  coinAmount: number;
  heads: number;
  auto: number;
  coinType: boolean;
  socket: Socket | undefined;
  autobet: boolean;
}

interface IRouterType {
  title: string;
  path: string;
  element: JSX.Element;
  children?: IRouterType[];
}

interface ILinkType {
  title: string;
  url: string;
  icon: JSX.Element;
  activeIcon?: JSX.Element;
}

interface ISideMenuType {
  menu: ILinkType[];
  casino: ILinkType[];
  mini: ILinkType[];
}

interface IAdvertisementDataType {
  title: string;
  activeNotice: string;
  miniNotice: string;
  miniLogo?: JSX.Element;
  activeLogo?: JSX.Element;
  bgColor: string;
  firstColor: string;
  secondColor: string;
  url: string;
}

interface ISVGStylesType {
  width: number;
  height: number;
  viewBox: string;
  color: string;
}

interface IUser {
  id?: string;
  amount: number;
  crypto: string;
  avatar: string;
  nickname: string;
  username: string;
}

interface IComponentStylesType {
  $width?: string;
  $height?: string;
  $backgroundColor?: string;
  $padding?: string;
  $fontFamily?: string;
  $fontWeight?: string;
  $fontSize?: string;
  $textAlign?: string;
  $lineHeight?: string;
  $textTransform?: string;
  $icon?: JSX.Element;
  $title?: string | number;
  $filterWidth?: string;
  $active?: boolean;
  $activeBgColor?: string;
  $activeEffect?: string;
  $justifyContent?: string;
  $borderRadius?: string;
  onClick?: any;
  className?: string;
  children?: ReactNode;
}

interface IWalletStoreType {
  data: WcWallet | Connector;
  type: string;
  img: string;
  title: string;
}

interface IMessage {
  message: string;
  sentAt: number;
  user: IUser;
}

interface IRefPhaserGame {
  game: Game | null;
  scene: Scene | null;
}

interface IPlayer {
  avatar: string;
  betAmount: number;
  level: any;
  playerID: string;
  status: number;
  stoppedAt: string | number;
  username: string;
  crypto: string;
  winningAmount: number;
}

interface IHistory {
  crashPoint: number;
}

interface ICrashGame extends IPlayer {
  layout?: string;
}

interface IGameRankType {
  title: string;
  path: string;
  color: string;
}

interface ITransactionType {
  amount?: number;
  bet?: number;
  game?: string;
  multi?: number;
  payout?: number;
  type: string;
  time: string;
  layout?: string;
}

type TGameLogo = {
  crash: JSX.Element;
  coinflip: JSX.Element;
  "chrome rush": JSX.Element;
  mines: JSX.Element;
};

interface IRankType {
  avatar: string;
  score: number;
  username: string;
  crypto: string;
  nickname: string;
}

export type {
  IRouterType,
  IAppProps,
  ICrashProps,
  IMineProps,
  ICoinflipProps,
  ILinkType,
  IUser,
  IComponentStylesType,
  IWalletStoreType,
  ISideMenuType,
  IMessage,
  IAdvertisementDataType,
  ISVGStylesType,
  IRefPhaserGame,
  IPlayer,
  IHistory,
  ICrashGame,
  IGameRankType,
  ITransactionType,
  TGameLogo,
  IRankType,
};
