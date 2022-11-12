// bot code time !
// import * as dotenv from "dotenv";
import { Client, GatewayIntentBits, ActivityType } from "discord.js";
import {
  messageAddMe,
  messageBalance,
  messageHi,
  messageRule,
  messageWork,
} from "./messages";
import { loadMap } from "./data";
import { help } from "./help";
import { jealousBot } from "./jealous";
import { matchPFP, matchStatus } from "./dating_functions";
var colors = require("colors/safe");

require("dotenv").config();

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});
////////////////////////////////////////////////////////////////////////////////
client.login(process.env.TOKEN);
// https://user-images.githubusercontent.com/100102134/197337179-c1b74c16-f2e1-46cd-85eb-6e686b5e8939.JPG
client.on("ready", () => {
  // client.user?.setAvatar('./assets/hehe_chan_pfp.jpg');
  client.user?.setPresence({
    activities: [{ 
      name: "with your feelings",
      type: ActivityType.Playing,
      url: 'https://github.com/HARI-PRMD'
   }],
    status: "online",
  });
  console.log(
    colors.inverse.brightGreen(" LOGGED IN ") +
      colors.brightGreen(`   Logged in as ${client.user!.tag}!`)
  );
  loadMap();
});
// process.on("SIGINT", () => {
//   console.log("LMAO");
//   server.close()

// })

client.on("messageCreate", (message) => {
  if (message.content.startsWith("!hi")) {
    messageHi(message);
  }

  if (message.content.startsWith("!addme")) {
    messageAddMe(message);
  }

  if (message.content.startsWith("!work")) {
    messageWork(message);
  }
  
  if (message.content.startsWith("!matchPFP")) {
    console.log(message.author.avatar)
    matchPFP(message);
  }
  
  if (message.content.startsWith("!status")) {
    matchStatus(message);
  }

  if (message.content.startsWith("!balance")) {
    messageBalance(message);
  }

  if (message.content.startsWith("!help")) {
    help(message);
  }

  if (message.content.startsWith("!rule")) {
    messageRule(message);
  }

  if (message.content.startsWith("!gm")) {
    message.react("💞");
    message.react("🌅");
    message.reply(`Goood Morning ${message.author.username} 😘`);
  }

  if (
    message.content.toLowerCase().includes("when") &&
    message.content.toLowerCase().includes("feature") &&
    message.content.toLowerCase().includes("chan")
  ) {
    message.reply(
      `Hehe is working very hard on my features I will be ready soon 🥺. Here is some live footage of him https://cdn.discordapp.com/attachments/724735616490668072/1039072709818204190/Work.mp4`
    );
  }

  jealousBot(message);

  if (message.mentions.has("1031072718570922014")) {
    message.channel.send(
      `Baka ${message.author.username} 🏓🤨 I'm not ready yet!`
    );
  }
});
////////////////////////////////////////////////////////////////////////////////
// process.on("SIGINT", () => {
//   saveMap();
//   console.log("Shutting down bot gracefully.");
// });
