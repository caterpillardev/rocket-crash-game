import bcrypt from "bcryptjs";
import { faker } from "@faker-js/faker";
import shortid from "shortid";
import { Request, Response } from "express";
import AIUser from "models/AIUser";

const getUserAvatar = (identifier: string) => {
  return `https://api.dicebear.com/8.x/avataaars/svg?seed=${identifier}`;
};

const passwordHash = bcrypt.hashSync("password123", 10);

const createFakerUserWithName = () => {
  const wallet = faker.finance.ethereumAddress();
  const id = shortid();
  return {
    crypto: wallet,
    wallet: faker.number.float({
      fractionDigits: 2,
      min: 300,
      max: 2000,
    }),
    username: faker.internet.userName(),
    password: passwordHash,
    email: faker.internet.email(),
    avatar: getUserAvatar(id),
  };
};

const createFakerUser = () => {
  const wallet = faker.finance.ethereumAddress();
  const id = shortid();
  return {
    crypto: wallet,
    wallet: faker.number.float({
      fractionDigits: 2,
      min: 500,
      max: 2000,
    }),
    avatar: getUserAvatar(id),
  };
};

export const generateFakers = async (req: Request, res: Response) => {
  const { number } = req.body;

  try {
    for (let i = 0; i < number; i++) {
      let user;
      if (i % 2 === 0) {
        user = createFakerUserWithName();
      } else {
        user = createFakerUser();
      }
      const newUser = new AIUser(user);

      newUser.save();
    }
  } catch (error) {}
};
