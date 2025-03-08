import { Request, Response } from "express";
import SiteTransaction from "models/SiteTransaction";

export const getSiteHistory = async (req: Request, res: Response) => {
  const list = await SiteTransaction.find()
    .sort({ time: -1 })
    .populate("userId");

  res.status(201).send(list);
};
