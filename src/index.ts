// bot code time !
// import * as dotenv from "dotenv";
import { Client, EmbedBuilder, GatewayIntentBits } from "discord.js";
const { MessageAttachment } = require('discord.js')
import { writeFileSync, readFileSync } from "fs";
const path = require('path')
import {
  messageAddMe,
  messageBalance,
  messageHi,
  messageWork,
} from "./messages";
import { saveMap, loadMap, userData } from "./data";
import { help } from "./help";
import { jealousBot } from "./jealous";
var colors = require('colors/safe');

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});
////////////////////////////////////////////////////////////////////////////////
client.login(process.env.TOKEN);

client.on("ready", () => {
  console.log(colors.inverse.brightGreen(' LOGGED IN ') + colors.brightGreen(`   Logged in as ${client.user!.tag}!`))
  loadMap();
});

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

  if (message.content.startsWith("!balance")) {
    messageBalance(message);
  }

  if (message.content.startsWith("!help")) {
    help(message);
  }
  
  if (message.content.startsWith("!rule")) {
    // message.channel.send("./assets/image0.png")
    // message.reply("Our Lord Hehe  only wants u to follow 1 rule 🥺💞", rule)
    const ruleEmbed = new EmbedBuilder()
    .setColor([229, 161, 162])
    .setTitle("Our Lord Hehe  only wants u to follow 1 rule 🥺💞",)
    .setImage('https://media.discordapp.net/attachments/1026635306868412498/1039344224086282310/image0.jpg')
    .setTimestamp()
      message.channel.send({ embeds: [ruleEmbed] });
    
  //   message.channel.send('Message that goes above image', {
  //     files: [
  //         "./image-to-send.png"
  //     ]
  // });
  }

  
  jealousBot(message)

  if (message.mentions.has("1031072718570922014")) {
    message.channel.send(
      `Baka ${message.author.username} 🏓🤨 I'm not ready yet!`
    );
  }
});
////////////////////////////////////////////////////////////////////////////////
