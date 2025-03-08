import { Request, Response } from "express";
import User from "models/User";
import { IUser } from "types";
import jwt from "jsonwebtoken";

export const test = (_req: Request, res: Response) => {
  res.status(200).send("Test auth router");
};

export const signIn = async (req: Request, res: Response) => {
  const { address } = req.body;

  const user: IUser | null = await User.findOne({ crypto: address });
  if (!user) {
    const avatars = [
      "https://i.imgur.com/GZx07Tc.png",
      "https://i.imgur.com/u43Wujr.png",
      "https://i.imgur.com/apOrNq9.png",
      "https://i.imgur.com/FCgT9XI.png",
      "https://i.imgur.com/J8sbtgK.png",
    ];

    const random_avatar = avatars.sort(() => 0.5 - Math.random())[0];

    try {
      const newUser = new User({
        crypto: address,
        wallet: 0,
        avatar: random_avatar,
      });
      await newUser.save();

      const token = jwt.sign({ address }, "540skeh2006h2kl34jzzsd23", {
        expiresIn: "1h",
      });

      return res.status(200).send({
        walletAddress: newUser.crypto,
        amount: newUser.wallet,
        avatar: newUser.avatar,
        auth: token,
      });
    } catch (error) {
      return console.log("error", error);
    }
  }

  const token = jwt.sign({ address }, "540skeh2006h2kl34jzzsd23", {
    expiresIn: "1h",
  });

  res.status(200).send({
    walletAddress: user.crypto,
    amount: user.wallet,
    avatar: user.avatar,
    auth: token,
  });
};
