// bot code time !
// import * as dotenv from "dotenv";
import {
  Client,
  GatewayIntentBits,
  ActivityType,
  Partials,
  Message,
} from "discord.js";
// my functions:
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
import { goodMorningRegex, goodNightRegex } from "./contants";
import { DMfunctions, guildFunctions } from "./bot_functions_list";
var colors = require("colors/safe");

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
  // client.user?.setAvatar('./assets/hehe_chan_pfp.jpg');
  client.user?.setPresence({
    activities: [
      {
        name: "Hehe code 👨‍💻",
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
});

client.on("messageCreate", (message: Message) => {
  if (message.channel.isDMBased()) {
    DMfunctions(message);
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
