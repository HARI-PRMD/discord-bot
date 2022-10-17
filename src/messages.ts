import { Client, GatewayIntentBits } from "discord.js";
import { writeFileSync, readFileSync } from "fs";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

export function messageHi(message: any, mapOfUsers) {
  if (message.content.includes("hi")) {
    let nickname = mapOfUsers.get(message.author.id);
    if (nickname === undefined) {
      message.reply("hiiii person");
    } else {
      message.reply(`hiiii ${nickname}`);
    }
    console.log("recieved message");
  }
}
