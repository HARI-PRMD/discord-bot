// bot code time !

import { Client, GatewayIntentBits } from "discord.js";
import { writeFileSync, readFileSync } from "fs";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

const mapOfUsers: Map<string, string> = new Map();

client.on("ready", () => {
  console.log(`Logged in as ${client.user!.tag}!`);
  loadMap(mapOfUsers);
});

function saveMap(map: Map<string, string>) {
  const finalObject: { [key: string]: string } = {};
  for (const [key, value] of map.entries()) {
    finalObject[key] = value;
  }
  const stringifiedObject = JSON.stringify(finalObject);

  // write to file
  writeFileSync("names.json", stringifiedObject);
}

function loadMap(map: Map<string, string>) {
  try {
    const fileData = readFileSync("./data/names.json");
    if (!fileData) return;
    const stringData = fileData.toString();
    const parsedData = JSON.parse(stringData) as { [key: string]: string };
    for (const [key, value] of Object.entries(parsedData)) {
      map.set(key, value);
    }
    console.log(`Loaded ${Object.keys(parsedData).length} names from file!`);
  } catch (error) {
    console.error("Error occurred while loading file:", error);
  }
}

client.on("messageCreate", (message) => {
  if (message.content.startsWith("!hi")) {
  }
  if (message.content.startsWith("!addme")) {
    let messageArr = message.content.split(" ");
    if (messageArr.length < 2) {
      message.reply("You did not specify a nickname!");
      return;
    }
    let nickname = messageArr[1];

    console.log("Map before:", mapOfUsers);
    mapOfUsers.set(message.author.id, nickname);
    console.log(`added ${nickname}`);
    console.log("Map after:", mapOfUsers);

    // nicknames have to be 1 word long
    message.reply(`Haiii ${nickname}`);
    // If you want to send a message to the same channel without a reply
    // message.channel.send("some value")
    saveMap(mapOfUsers);
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
