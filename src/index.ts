// bot code time !
// import * as dotenv from "dotenv";
import {
  Client,
  GatewayIntentBits,
  ActivityType,
  Partials,
  Message,
} from "discord.js";
import { DMfunctions, guildFunctions, runOnStart } from "./bot_functions_list";
import { goodMorningConversation } from "./dm_conversation";

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

// client.on("message", async (message: Message) => {
//   if (!message.guild) return;
//   if (message.author.bot) return;
//   try {
//     if (message.channel.id != "1031080328753840242") return;
//     let response: string = await goodMorningConversation(message);
//     message.reply(response);
//   } catch (err) {
//     throw new Error(`error occured: ${err}`);
//   }
// });

// client.on("messageCreate", async (message: Message) => {
//   if (!message.guild) return;
//   if (message.author.bot) return;
//   try {
//     if (message.channel.id != message.channelId) return;
//     let res = await goodMorningConversation(message);
//     // let res = "Hi";
//     console.log(message);
//     message.reply(res);
//   } catch {
//     console.log(`Bot error, please try again!`, message);
//   }
// });

// client.on("messageCreate", async (message: Message) => {
//   if (message.author.bot) return;
//   // if (message.channel.isDMBased()) {
//   //   await DMfunctions(message);
//   //   return;
//   // }
//   if (!message.channel.isDMBased()) {
//     await guildFunctions(message);
//     return;
//   }
// });
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
