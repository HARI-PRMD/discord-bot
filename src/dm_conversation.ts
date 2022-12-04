import { Message } from "discord.js";
var spawn = require("child_process").spawn;

export async function dmConversation(message: Message) {
  let botReply: string;
  var process = spawn("python3", [
    "./src/hehe-chan-ai/pytorch-chatbot/chat.py",
    message.content,
  ]);

  process.stdout.on("data", function (data: any) {
    botReply = data.toString();
  });

  process.on("close", (code: any) => {
    message.channel.sendTyping();
    console.log();
    setTimeout(() => {
      message.channel.send(botReply);
    }, 500);
  });
}
