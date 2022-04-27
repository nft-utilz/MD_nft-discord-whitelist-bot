import { MessageEmbed } from "discord.js";
import jwt from "jsonwebtoken";
export const createToken = (discord_id: string) => {
  const token = jwt.sign({ discord_id }, process.env.JWT_SECRET!, {
    expiresIn: "1m",
  });
  return token;
};

export const getTime = (date: number) => {
  const time = new Date(date);
  const _hour = time.getHours();
  const _minute = time.getMinutes();
  const _date = time.getDate();
  const _month = time.getMonth() + 1;
  const _year = time.getFullYear();
  return `${_year}.${_month}.${_date} ${_hour}h${_minute}m`;
};

export const normalEmbed = (title: string, message: string) =>
  new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(`**${title}**`)
    .setDescription(message)
    .setTimestamp()
    .setFooter({ text: "GMS" });
