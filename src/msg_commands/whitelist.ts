import { Message } from "discord.js";
import { normalEmbed } from "../utils";
export const passCondition = (message: Message) => {
  const InviteTrackerId = "720351927581278219";
  return message.webhookId === InviteTrackerId;
};

export const execute = async (message: Message) => {
  if (!message.embeds[0].description || !message.interaction) return;
  const inviteNumber = Number(
    message.embeds[0].description
      .split("invites.")[0]
      .split("have")[1]
      .replace(/\*/g, "")
  );

  const isWhitelist = inviteNumber >= 10;
  const role = getRole("WHITELIST", message);

  if (!role || !message.guild) return;
  const userObj = message.interaction.user;
  const guildUser = await message.guild.members.fetch(userObj.id);
  const title = `${userObj.username}#${userObj.discriminator}`;

  if (isWhitelist) {
    const msg = `You need **${10 - inviteNumber}** invites more!`;
    return message.channel.send({ embeds: [normalEmbed(title, msg)] });
  } else {
    guildUser.roles.add(role);
    const msg = `You have been whitelisted  🎉`;
    return message.channel.send({ embeds: [normalEmbed(title, msg)] });
  }
};

const getRole = (_role: string, message: Message) => {
  if (!message.guild) return;
  return message.guild.roles.cache.find((r) => r.name === _role);
};
