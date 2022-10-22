import { Message } from "discord.js";
// import "./data/nameList.csv";
import { writeFileSync, readFileSync } from "fs";

export function jealousBot(message: Message): boolean {
  try {
    const fileData = readFileSync("./data/nameList.csv");
    if (!fileData) {
      console.log("no names in ./data/namesList.csv");
    }
    const stringData = fileData.toString().toLowerCase().split("\n");
    console.log(stringData);
    for (let name of stringData) {
      if (message.content.toLowerCase().includes(name)) {
        console.log(name);
        console.log(`YOU SAID THE FUNNTY NAME IM JEALOUSSSS!!!`);
        message.react("😠");
        return true;
      }
    }
  } catch (error) {
    console.error("Error occurred while loading file:", error);
  }
  return false;
}
