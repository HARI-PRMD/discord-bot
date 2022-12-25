// bot code time !
// import * as dotenv from "dotenv";
import {
  Client,
  GatewayIntentBits,
  ActivityType,
  Partials,
  Message,
} from "discord.js";
import {
  DMfunctions,
  guildFunctions,
  runOnStart,
} from "./bot-functions/bot_functions_list";

require("dotenv").config();

export const client = new Client({
  partials: [Partials.Channel, Partials.User, Partials.Message],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageTyping,
  ],
});
////////////////////////////////////////////////////////////////////////////////
client.login(process.env.TOKEN);
client.on("ready", () => {
  runOnStart();
});

client.on("messageCreate", async (message: Message) => {
  if (message.author.bot) return;
  if (message.channel.isDMBased()) {
    await DMfunctions(message);
  }
  if (!message.channel.isDMBased()) {
    guildFunctions(message);
  }
});
////////////////////////////////////////////////////////////////////////////////
// process.on("SIGINT", () => {
//   saveMap();
//   console.log("Shutting down bot gracefully.");
// });
