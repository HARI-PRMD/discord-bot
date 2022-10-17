import { Client, GatewayIntentBits } from "discord.js";
import { writeFileSync, readFileSync } from "fs";
import { saveMap, loadMap } from "./data";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

export function messageHi(message: any, mapOfUsers: Map<string, string>): void {
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

export function messageAddMe(
  message: any,
  mapOfUsers: Map<string, string>
): void {
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
