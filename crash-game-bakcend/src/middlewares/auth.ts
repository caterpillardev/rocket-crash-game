import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest, JwtPayload } from "types";

export const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(403).send("Access denied");
  }

  try {
    const decoded = jwt.verify(token, "secret") as JwtPayload;
    req.user = decoded;
  } catch (error) {
    return res.status(403).send("Invalid token");
  }
};
