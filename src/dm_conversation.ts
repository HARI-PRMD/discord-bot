import { Message } from "discord.js";
import { goodMorningRegex } from "./contants";
// import { goodMorningStory } from "./conversation_trees";

export async function goodMorningConversation(message: Message): Promise<any> {
  var spawn = require("child_process").spawn;

  var process = spawn("python3", [
    "./src/hehe-chan-ai/pytorch-chatbot/chat.py ",
    message.content,
  ]);
  let reply: string[] = [];

  process.stdout.on("data", function (data: any) {
    reply.push(data.toString());
  });

  console.log("message: " + message.content);
  console.log("reply: " + reply);
  return "Hehe";
}
