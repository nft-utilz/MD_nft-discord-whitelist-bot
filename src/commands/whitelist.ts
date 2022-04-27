import { SlashCommandBuilder } from "@discordjs/builders";
import { CacheType, Client, CommandInteraction, TextChannel } from "discord.js";
import { fetchAddress } from "../api";
import { normalEmbed } from "../utils";

export const data = new SlashCommandBuilder()
  .setName("whitelist")
  .setDescription("send your wallet address")
  .addStringOption((option) =>
    option
      .setName("wallet_address")
      .setDescription("send your wallet address")
      .setRequired(true)
  );

export async function execute(interaction: CommandInteraction, client: Client) {
  if (!interaction?.channelId) return;
  const { user } = interaction;

  const whitelist_channel_Id = "966594211212312616";
  const whitelist_channel = getChannel("invite-logs", client);
  // console.log("whitelist_channel:", whitelist_channel);
  const channel = await client.channels.fetch(interaction.channelId);

  // get role

  if (!channel || channel.type !== "GUILD_TEXT") return;

  const whitelistRole = getRole("WHITELIST", channel as TextChannel);

  const member = channel.guild?.members.cache.get(user.id);

  if (whitelist_channel_Id !== channel.id)
    return privateMsg(
      interaction,
      `**❗this command is only for whitelist channel**`
    );

  if (!member?.roles.cache.has(whitelistRole?.id!)) {
    const msg = `you're not  whitelisted yet! \nyou need **10** invites to join the whitelist.`;
    const title = `${user.username}#${user.discriminator}`;
    channel.send({ embeds: [normalEmbed(title, msg)] });
    return privateMsg(interaction, `${user}`);
  }

  const wallet = interaction.options.getString("wallet_address")!;

  const post = {
    discord_id: user.id,
    username: user.username,
    discriminator: user.discriminator,
    wallet_address: wallet,
  };

  await fetchAddress(post);

  return interaction.reply({
    content: `**${user}** **${wallet}** is added to whitelist`,
    ephemeral: true,
  });
}

const getRole = (_role: string, channel: TextChannel) =>
  channel?.guild?.roles.cache.find((r) => r.name === "WHITELIST");

const getChannel = (channelName: string, client: Client) => {
  return client.channels.cache.find((c) => {
    if (c.type === "DM") return false;
    return c?.name === channelName;
  });
};

const privateMsg = (
  interaction: CommandInteraction<CacheType>,
  message: string
) => interaction.reply({ content: message, ephemeral: true });
