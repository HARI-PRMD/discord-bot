// bot code time !

import { Client, GatewayIntentBits } from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user!.tag}!`);
});

const MapofUsers: Map<string, string> = new Map();

client.on("messageCreate", (message) => {
  if (message.content.startsWith("!")) {
    if (message.content.includes("hi")) {
      let nickname = MapofUsers.get(message.author.id);
      if (nickname === undefined) {
        message.reply("hiiii baka");
      } else {
        message.reply(`hiiii ${nickname}`);
      }
      console.log("recieved message");
    }
  }
  if (message.content.startsWith("!addme")) {
    let messageArr = message.content.split(" ");
    if (messageArr.length < 2) {
      message.reply("You did not specify a nickname!");
      return;
    }
    let nickname = messageArr[1];

    console.log("Map before:", MapofUsers);
    MapofUsers.set(message.author.id, nickname);
    console.log(`added ${nickname}`);
    console.log("Map after:", MapofUsers);

    // nicknames have to be 1 word long
    message.reply(`Haiii ${nickname}`);
    // If you want to send a message to the same channel without a reply
    // message.channel.send("some value")
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

client.login(
  "MTAzMTA3MjcxODU3MDkyMjAxNA.Gvn2qc.l4CW3ITUZF84DSk-HRmntNHmaDH-PWPY4r1JYw"
);
