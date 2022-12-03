import { Message } from "discord.js";
import { goodMorningRegex } from "./contants";
import { goodMorningStory } from "./conversation_trees";
var dialogue = require("dialoguejs");

let currLine: number = -1;
export async function goodMorningConversation(
  message: Message
): Promise<string> {
  if (message.content.search(goodMorningRegex) !== -1) {
    currLine = 1;
    console.log(
      `started good morning conversation with ${message.author.username} 😎`
    );
    return goodMorningStory[0].text + `\n` + goodMorningStory[1].text;
  }
  if (currLine === 1) {
    if (message.content.toLowerCase() === "yes") {
      currLine = 2;
      return goodMorningStory[2].text;
    } else {
      currLine = 3;
      return goodMorningStory[3].text;
    }
  }
  if (currLine === 2 || currLine === 3) {
    currLine = -1;
    return goodMorningStory[4].text;
  }
  return "bad input";
}
