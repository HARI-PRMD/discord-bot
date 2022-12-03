import { ActivityType, Message } from "discord.js";
import { client } from "./index";
import { goodMorningRegex, goodNightRegex } from "./contants";
import { matchStatus } from "./dating_functions";
import { help } from "./help";
import { jealousBot } from "./jealous";
import {
  messageAddMe,
  messageBalance,
  messageHi,
  messageRule,
  messageWork,
} from "./messages";
import { loadMap } from "./data";
import { goodMorningConversation } from "./dm_conversation";
var colors = require("colors/safe");

export function runOnStart() {
  // client.user?.setAvatar('./assets/hehe_chan_pfp.jpg');
  client.user?.setPresence({
    activities: [
      {
        name: "Hehe cry while coding 👨‍💻",
        type: ActivityType.Watching,
        url: "https://github.com/HARI-PRMD",
      },
    ],
    status: "online",
  });
  console.log(
    colors.inverse.brightGreen(" LOGGED IN ") +
      colors.brightGreen(`   Logged in as ${client.user!.tag}!`)
  );
  loadMap();
}

// guild functions
export function guildFunctions(message: Message) {
  const messageLower = message.content.toLowerCase();
  if (messageLower.startsWith("!hi")) {
    messageHi(message);
  }

  if (messageLower.startsWith("!addme")) {
    messageAddMe(message);
  }

  if (messageLower.startsWith("!work") || messageLower === "!w") {
    messageWork(message);
  }

  // if (message.content.toLowerCase().startsWith("!matchpfp")) {
  //   matchPFP(message);
  // }

  if (messageLower.startsWith("!status")) {
    matchStatus(message);
  }

  if (messageLower.startsWith("!balance") || messageLower.startsWith("!bal")) {
    messageBalance(message);
  }

  if (messageLower.startsWith("!help")) {
    help(message);
  }

  if (messageLower.startsWith("!rule")) {
    messageRule(message);
  }

  if (messageLower.startsWith("!gm")) {
    message.react("💞");
    message.react("🌅");
    message.reply(`Goood Morning ${message.author.username} 😘`);
  }

  if (
    messageLower.includes("when") &&
    messageLower.includes("feature") &&
    messageLower.includes("chan")
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
}

export async function DMfunctions(message: Message) {
  try {
    if (message.channel.id != message.channelId) return;
    let res = await goodMorningConversation(message);
    message.channel.send(res);
  } catch {
    console.log(`Bot error, please try again!`, message);
  }
  // if (message.content.search(goodMorningRegex) !== -1) {
  //   console.log(
  //     `started good morning conversation with ${message.author.username} 😎`
  //   );
  //   message.reply(`good morning ${message.author.username} 😎`);
  //   return;
  // }
  if (message.content.search(goodNightRegex) !== -1) {
    console.log(`good night ${message.author.username} 😴`);
    message.reply(`good night ${message.author.username} 😴`);
    return;
  }
}
