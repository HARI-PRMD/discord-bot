// bot code time !
// import * as dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { messageAddMe, messageHi } from "./messages";
import { saveMap, loadMap, mapOfUsers } from "./data";

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user!.tag}!`);
  loadMap(mapOfUsers);
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith("!hi")) {
    messageHi(message, mapOfUsers);
  }
  if (message.content.startsWith("!addme")) {
    messageAddMe(message, mapOfUsers);
  }

  // if (message.mentions.has("1031072718570922014")) {
  // }
});

// client.on("interactionCreate", async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === "ping") {
//     await interaction.reply("Pong!");
//   }
// });

client.login(process.env.TOKEN);
