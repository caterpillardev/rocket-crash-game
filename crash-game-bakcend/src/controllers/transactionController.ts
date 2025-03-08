import { Request, Response } from "express";
import Transaction from "models/Transaction";

export const getHistory = async (req: Request, res: Response) => {
  const { type } = req.body;
  const list = await Transaction.find({ tranType: type })
    .sort({ created: -1 })
    .populate("user");

  res.status(201).send(list);
};
