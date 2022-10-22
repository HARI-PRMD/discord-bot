// bot code time !
// import * as dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js"
import {
  messageAddMe,
  messageBalance,
  messageHi,
  messageWork,
} from "./messages"
import { saveMap, loadMap, userData } from "./data"
import { help } from "./help"

require("dotenv").config()

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
})
////////////////////////////////////////////////////////////////////////////////
client.login(process.env.TOKEN)

client.on("ready", () => {
  console.log(`Logged in as ${client.user!.tag}!`)
  loadMap()
})

client.on("messageCreate", (message) => {
  if (message.content.startsWith("!hi")) {
    messageHi(message)
  }

  if (message.content.startsWith("!addme")) {
    messageAddMe(message)
  }

  if (message.content.startsWith("!work")) {
    messageWork(message)
  }

  if (message.content.startsWith("!balance")) {
    messageBalance(message)
  }

  if (message.content.startsWith("!help")) {
    help(message)
  }
  // if (message.mentions.has("1031072718570922014")) {
  // }
})

// client.on("interactionCreate", async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === "ping") {
//     await interaction.reply("Pong!");
//   }
// });

////////////////////////////////////////////////////////////////////////////////
