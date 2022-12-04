import { Message } from "discord.js";
import { goodMorningRegex } from "./contants";
// import { goodMorningStory } from "./conversation_trees";

export async function goodMorningConversation(message: Message): Promise<any> {
  var spawn = require("child_process").spawn;

  var process = spawn("python", [
    "./src/hehe-chan-ai/pytorch-chatbot/chat.py ",
    message.content,
  ]);
  let reply = "";
  process.stdout.on("data", function (data: any) {
    reply = data.toString();
  });

  // const sensor = spawn("python", [
  //   "./hehe-chan-ai/pytorch-chatbot/chat.py",
  //   message.content,
  // ]);

  // sensor.stdout.on("data", function (data: string) {
  //   // convert Buffer object to String
  //   reply.push(JSON.stringify(data));
  // });

  console.log(message.content);
  console.log(reply);
  return "Hehe";
}
