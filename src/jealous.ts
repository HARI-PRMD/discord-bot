import { Message } from "discord.js";
import { readFileSync } from "fs";
import { userData } from "./data";

export function jealousBot(message: Message): boolean {
  let user = userData.users.find((x) => x.userId === message.author.id);
  let nickname = user?.nickname;
  const fileData = readFileSync("./data/nameList.csv");
  if (!fileData) {
    console.log("no names in ./data/namesList.csv");
    return false;
  }
  const stringData = new Set(fileData.toString().toLowerCase().split("\n"));

  if (
    message.content.split(" ").some((x) => stringData.has(x)) &&
    nickname !== undefined
  ) {
    message.react("😠");
    message.reply(
      `Baka stop talking about other girls all the time!! You have me...😔💔`
    );
    return true;
  }
  return false;
}
