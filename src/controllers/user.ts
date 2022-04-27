import { db } from "../models";
import { Request, Response } from "express";
import { client } from "../bot";
export const createWhiteList = async (req: Request, res: Response) => {
  console.log("createWhiteList");
  const userInfo = req.body;
  const discord_id = req.decodedData?.discord_id;

  const oldUser = await db.User.findOne({ discord_id });

  const isNotExistFn = async () => {
    const update = { ...userInfo, discord_id };
    const newWhitelist = new db.User(update);
    await newWhitelist.save();
    res.status(201).json(newWhitelist);
  };

  const isExistFn = async () => {
    const update = { $set: { wallet_address: userInfo.wallet_address } };
    await db.User.updateOne({ discord_id }, update);
    res.status(200).json(oldUser);
  };

  try {
    !oldUser && (await isNotExistFn());
    oldUser && (await isExistFn());
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const getWhiteList = async (req: Request, res: Response) => {
  client;
};
