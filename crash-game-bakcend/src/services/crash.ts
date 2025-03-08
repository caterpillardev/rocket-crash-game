import _, { multiply } from "lodash";
import Crash from "models/Crash";
import SiteTransaction from "models/SiteTransaction";
import User from "models/User";
import { Server } from "socket.io";
import {
  IBetType,
  ICrash,
  IGameStateType,
  IPendingBetType,
  IUser,
  TFormattedPlayerBetType,
} from "types";
import { generateCrashRandom, generatePrivateSeedHashPair } from "utils/random";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import Transaction from "models/Transaction";
import AIUser from "models/AIUser";

const inverseGrowth = (result: number) =>
  16666.666667 * Math.log(0.01 * result);

const formatPlayerBet = (bet: IBetType): IPendingBetType => {
  
  };

  if (bet.status !== BET_STATES.Playing) {
    formatted.stoppedAt = bet.stoppedAt;
    formatted.winningAmount = bet.winningAmount;
  }

  return formatted;
};

const START_WAIT_TIME = 4000;
const RESTART_WAIT_TIME = 6000;
const TICK_RATE = 150;

const BET_STATES = {
  Playing: 1,
  CashedOut: 2,
};

const GAME_STATES = {

};

const GAME_STATE: IGameStateType = {
 
};

const growthFunc = (ms: number) =>
  Math.floor(100 * Math.pow(Math.E, 0.00006 * ms));

const calculateGamePayout = (ms: number) => {
  const gamePayout = Math.floor(100 * growthFunc(ms)) / 100;
  return Math.max(gamePayout, 1);
};

export const setupCrashServer = (io: Server) => {
  

  const createNewGame = () => {
    return
    // create game
  };

  const runGame = async () => {
    const game: any = await createNewGame();

    // Override local state
    GAME_STATE._id = game._id;
    GAME_STATE.status = GAME_STATES.Starting;
    GAME_STATE.privateSeed = game.privateSeed;
    GAME_STATE.privateHash = game.privateHash;
    GAME_STATE.publicSeed = null;
    GAME_STATE.startedAt = new Date(Date.now() + RESTART_WAIT_TIME);
    GAME_STATE.players = {};

    // Update startedAt in db
    game.startedAt = GAME_STATE.startedAt;

    await game.save();

    // Function to get a random subset of an array
    const getRandomSubset = (array: any, subsetSize: number) => {
      const shuffledArray = array.sort(() => 0.5 - Math.random());
      return shuffledArray.slice(0, subsetSize);
    };

    // Function to generate a random bet amount between 0.1 and 120.2
    const getRandomBetAmount = () => {
      const randomNumber = Math.random();
      let betAmount;

      if (randomNumber <= 0.95) {
        // 95% chance for bets between 0.1 and 8
        if (Math.random() <= 0.65) {
          // 65% chance for bets without decimals (full numbers)
          betAmount = Math.floor(Math.random() * 8) + 1; // Generates a random integer between 1 and 8 (inclusive)
        } else {
          // 35% chance for bets with decimals
          betAmount = Math.random() * (8 - 0.1) + 0.1; // Generates a random decimal number between 0.1 and 8
        }
      } else {
        // 5% chance for bets between 8 and 120.2
        if (Math.random() <= 0.65) {
          // 65% chance for bets without decimals (full numbers)
          betAmount = Math.floor(Math.random() * (120.2 - 8)) + 8; // Generates a random integer number between 8 and 120.2
        } else {
          // 35% chance for bets with decimals
          betAmount = Math.random() * (120.2 - 8) + 8; // Generates a random decimal number between 8 and 120.2
        }
      }

      return parseFloat(betAmount.toFixed(2));
    };

    try {
      // Get a random subset of players
      const allPlayers = await AIUser.find({});
      const randomNumberOfPlayers = Math.floor(Math.random() * 4) + 8;
      const selectedPlayers = getRandomSubset(
        allPlayers,
        randomNumberOfPlayers
      );

      // Fake players joining
      selectedPlayers.forEach((fakeUser: IUser, _index: number) => {
        const { username, avatar, _id: userId, crypto } = fakeUser;
        const betAmount = getRandomBetAmount();
        const delay = Math.floor(Math.random() * 7 + 2) * 1000; // Generate a random delay between 2-8 seconds
        function generateRandomNumber() {
          const min = 105;
          const max = 2000;

          // Generate a random number between 0 and 1
          const random = Math.random();

          let randomNumber;

          if (random < 0.3) {
            // 30% chance of a number below 150
            randomNumber = min + Math.random() * (150 - min);
          } else if (random < 0.5) {
            // 20% chance of a number below 200
            randomNumber = min + Math.random() * (200 - min);
          } else if (random < 0.7) {
            // 20% chance of a number below 300
            randomNumber = min + Math.random() * (300 - min);
          } else {
            // Remaining 30% can be any value below 2000
            randomNumber = min + Math.random() * (max - min);
          }

          return randomNumber;
        }

        setTimeout(async () => {
          const CASHOUTNUMBER = generateRandomNumber();
          const userIdStr = userId as string;
          GAME_STATE.pending[userIdStr] = {
            playerID: userIdStr,
            betAmount,
            autoCashOut: CASHOUTNUMBER,
            username: username,
            avatar: fakeUser.avatar,
            crypto: fakeUser.crypto,
          };

          GAME_STATE.pendingCount++;

          // Creating new bet object
          const newBet = {
            autoCashOut: CASHOUTNUMBER,
            betAmount,
            createdAt: new Date(),
            playerID: userIdStr,
            username: username,
            avatar: avatar,
            // level: getVipLevelFromWager(wager),
            status: BET_STATES.Playing,
            forcedCashout: true,
            crypto: crypto,
          };

          // Remove bet amount from user's balance
          // await AIUser.updateOne(
          //   { _id: userIdStr },
          //   {
          //     $inc: {
          //       wager: Math.abs(parseFloat(betAmount.toFixed(2))),
          //     },
          //   }
          // );

          // await checkAndEnterRace(
          //   _id,
          //   Math.abs(parseFloat(betAmount.toFixed(2)))
          // );

          // Updating in db
          const updateParam = { $set: {} as Record<string, any> }; // Allow dynamic keys
          updateParam.$set["players." + userIdStr] = newBet;
          await Crash.updateOne({ _id: GAME_STATE._id }, updateParam);

          // Assign to state
          GAME_STATE.players[userIdStr] = newBet;
          GAME_STATE.pendingCount--;

          const formattedBet = formatPlayerBet(newBet);
          GAME_STATE.pendingBets.push(formattedBet);
          return emitPlayerBets();

          //console.log(`Player ${username} joined with a delay of ${delay / 1000} seconds`);
        }, delay);
      });
    } catch (error) {
      console.log("ERROR ROULETTE", error);
      GAME_STATE.pendingCount--;
    }

    emitStarting();
  };
// crash game logic here

  const endGame = async () => {
    console.log(`Crash >> Ending game at`, GAME_STATE.crashPoint! / 100);

    const crashTime = Date.now();

    GAME_STATE.status = GAME_STATES.Over;

    // Notify clients
    crashNamespace.emit("game-end", {
      game: {
        _id: GAME_STATE._id,
        privateHash: GAME_STATE.privateHash,
        privateSeed: GAME_STATE.privateSeed,
        publicSeed: GAME_STATE.publicSeed,
        crashPoint: GAME_STATE.crashPoint! / 100,
      },
    });

    // Run new game after start wait time
    setTimeout(() => {
      runGame();
    }, crashTime + START_WAIT_TIME - Date.now());

    // Updating in db
    await Crash.updateOne(
      { _id: GAME_STATE._id },
      {
        status: GAME_STATES.Over,
      }
    );
  };

  const refundGames = async (games: ICrash[]) => {
    for (let game of games) {
      console.log(`Crash >> Refunding game ${game._id}`);

      const refundedPlayers = [];

      try {
        for (let playerID in game.players) {
          // const bet = game.players[playerID];
          // if (bet.status == BET_STATES.Playing) {
          //   // Push Player ID to the refunded players
          //   refundedPlayers.push(playerID);
          //   console.log(
          //     `Crash >> Refunding player ${playerID} for ${bet.betAmount}`
          //   );
          //   // Refund player
          //   await User.updateOne(
          //     { _id: playerID },
          //     {
          //       $inc: {
          //         wallet: Math.abs(bet.betAmount),
          //       },
          //     }
          //   );
          //   insertNewWalletTransaction(
          //     playerID,
          //     Math.abs(bet.betAmount),
          //     "Crash refund",
          //     { crashGameId: game._id }
          //   );
          // }
        }

        // game.refundedPlayers = refundedPlayers;
        // game.status = GAME_STATES.Refunded;
        // await game.save();
      } catch (error) {
        console
          .log
          // `Crash >> Error while refunding crash game ${GAME_STATE._id}: ${error}`
          ();
      }
    }
  };

  const initGame = async () => {
    console.log("Crash >> Starting up");

    const unfinishedGames = await Crash.find({
      $or: [
        { status: GAME_STATES.Starting },
        { status: GAME_STATES.Blocking },
        { status: GAME_STATES.InProgress },
      ],
    });

    if (unfinishedGames.length > 0) {
      console.log(`Crash >> Ending ${unfinishedGames.length} unfinished games`);
      await refundGames(unfinishedGames);
    }

    runGame();
  };

  initGame();

  crashNamespace.on("connection", (socket) => {
    console.log("Crash game user connected");

    socket.on("auth", async (data) => {
      try {
        const decoded = jwt.verify(data.token, "540skeh2006h2kl34jzzsd23") as {
          address: string;
        };

        if (data.address !== decoded.address) {
          return socket.emit(
            "auth-error",
            "Your token isn't an approved token."
          );
        }

        user = await User.findOne({ crypto: data.address });
        logged = true;
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          return socket.emit(
            "expire-error",
            "Token has expired. Please log in again."
          );
        }
        return socket.emit("error", "Authentication failed.");
      }
    });

    socket.on("get-history", async () => {
      try {
        const histories = await Crash.aggregate([
          { $match: { status: 4 } },
          { $sort: { createdAt: -1 } },
          { $limit: 8 },
        ]);
        socket.emit("crashgame-history", histories);
      } catch (error) {
        console.error("Error fetching previous crash game history:", error);
        socket.emit(
          "error",
          "Error occurred when fetching previous crash game history!"
        );
      }
    });

    socket.on("game-data", () => {
      socket.emit("game-user-list", GAME_STATE.players);
    });

    socket.on("current-state", () => {
      console.log(GAME_STATE.status);
      socket.emit("currrent-crash-state", GAME_STATE.status);
    });

    socket.on("join-game", async (target: number, betAmount: number) => {
      if (!user) return;

      if (isNaN(betAmount)) {
        return socket.emit("game-join-error", "Invalid betAmount type!");
      }

      // More validation on the bet value
      if (
        parseFloat(betAmount.toFixed(2)) < 0.1 ||
        parseFloat(betAmount.toFixed(2)) > 500
      ) {
        return socket.emit(
          "game-join-error",
          `Your bet must be a minimum of ${0.1} credits and a maximum of ${500} credits!`
        );
      }

      // Check if game accepts bets
      if (GAME_STATE.status !== GAME_STATES.Starting)
        return socket.emit("game-join-error", "Game is currently in progress!");

      // Check if user already betted
      if (GAME_STATE.pending![user.id!] || GAME_STATE.players[user.id!])
        return socket.emit(
          "game-join-error",
          "You have already joined this game!"
        );

      let autoCashOut = -1;

      // Validation on the target value, if acceptable assign to auto cashout
      if (typeof target === "number" && !isNaN(target) && target > 0) {
        autoCashOut = target * 100;
      }

      GAME_STATE.pending![user.id!] = {
        playerID: user.id,
        betAmount,
        autoCashOut,
        username: user.username ? user.username : user.crypto,
        crypto: user.crypto,
        avatar: user.avatar,
      };

      GAME_STATE.pendingCount!++;

      try {
        if (user.wallet! < parseFloat(betAmount.toFixed(2))) {
          delete GAME_STATE.pending![user.id!];
          GAME_STATE.pendingCount!--;
          return socket.emit("game-join-error", "You can't afford this bet!");
        }

        // Remove bet amount from user's balance
        if (user) {
          await User.updateOne(
            { crypto: user.crypto },
            {
              $inc: {
                wallet: -Math.abs(parseFloat(betAmount.toFixed(2))),
              },
            }
          );

          // const newTransaction = {
          //   userId: user._id,
          //   amount: -Math.abs(parseFloat(betAmount.toFixed(2))),
          //   reason: "Crash Bet",
          //   crashGameId: GAME_STATE._id,
          // };

          // await SiteTransaction.create(newTransaction);

          const newTransaction = new Transaction({
            user: user._id,
            tranType: 3,
            walletAddress: user.crypto,
            amount: Number(betAmount),
            game: 1,
          });
          await newTransaction.save();

          crashNamespace.emit("update_wallet", {
            amount: -betAmount,
            address: user?.crypto,
          });
        }

        const newBet: IBetType = {
          autoCashOut,
          betAmount,
          playerID: user?.id!,
          username: user?.username ? user.username : "",
          avatar: user?.avatar ? user.avatar : "",
          status: BET_STATES.Playing,
          forcedCashout: false,
          crypto: user.crypto,
        };

        const updateParam: { $set: { [key: string]: any } } = { $set: {} };
        updateParam.$set["players." + user.id] = newBet;
        await Crash.updateOne({ _id: GAME_STATE._id }, updateParam);

        // Assign to state
        GAME_STATE.players[user.id] = newBet;
        GAME_STATE.pendingCount!--;

        const formattedBet = formatPlayerBet(newBet);
        GAME_STATE.pendingBets!.push(formattedBet);
        emitPlayerBets();

        // return socket.emit("game-join-success", formattedBet);
      } catch (error) {
        console.error(error);

        delete GAME_STATE.pending![user?.id!];
        GAME_STATE.pendingCount!--;

        return socket.emit(
          "game-join-error",
          "There was an error while proccessing your bet"
        );
      }
    });

    socket.on("bet-cashout", async () => {
      if (!logged)
        return socket.emit("bet-cashout-error", "You are not logged in!");

      if (GAME_STATE.status !== GAME_STATES.InProgress)
        return socket.emit(
          "bet-cashout-error",
          "There is no game in progress!"
        );

      const elapsed = new Date().getTime() - GAME_STATE.startedAt!.getTime();
      let at = growthFunc(elapsed);

      if (at < 101)
        return socket.emit(
          "bet-cashout-error",
          "The minimum cashout is 1.01x!"
        );

      const bet = GAME_STATE.players[user?.id!];

      if (!bet)
        return socket.emit("bet-cashout-error", "Coudn't find your bet!");

      if (bet.autoCashOut > 100 && bet.autoCashOut <= at) {
        at = bet.autoCashOut;
      }

      if (at > GAME_STATE.crashPoint!)
        return socket.emit("bet-cashout-error", "The game has already ended!");

      if (bet.status !== BET_STATES.Playing)
        return socket.emit("bet-cashout-error", "You have already cashed out!");

      doCashOut(bet.playerID, at, false, (err: any, result: any) => {
        if (err) {
          console.log(
            `Crash >> There was an error while trying to cashout a player`,
            err
          );

          return socket.emit(
            "bet-cashout-error",
            "There was an error while cashing out!"
          );
        }

        socket.emit("bet-cashout-success", result);
      });
    });
  });
};
