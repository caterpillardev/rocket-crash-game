import { Audio } from "./Audio";
import { Bomb } from "./Bomb";
import { BombLogo } from "./BombLogo";
import { Bonus } from "./Bonus";
import { Chrome } from "./Chrome";
import { Crash } from "./Crash";
import { CrashDash } from "./CrashDash";
import { CrashLogo } from "./CrashLogo";
import { Deposit } from "./Deposit";
import { Flag } from "./Flag";
import { Flip } from "./Flip";
import { FlipDash } from "./FlipDash";
import { FlipLogo } from "./FlipLogo";
import { Handler } from "./Handler";
import { Hold } from "./Hold";
import { Logo } from "./Logo";
import { Notification } from "./Notification";
import { Rush } from "./Rush";
import { Trophy } from "./Trophy";
import { TrophyActive } from "./TrophyActive";
import { Wallet } from "./Wallet";

export const Icons = {
  Audio,
  Bomb,
  BombLogo,
  Bonus,
  Crash,
  CrashDash,
  CrashLogo,
  Chrome,
  Deposit,
  Flag,
  Flip,
  FlipDash,
  FlipLogo,
  Handler,
  Hold,
  Logo,
  Notification,
  Rush,
  Trophy,
  TrophyActive,
  Wallet,
} as const;

export type IconNames = keyof typeof Icons;
