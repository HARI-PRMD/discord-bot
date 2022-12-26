import { Message } from "discord.js";
import { collectDmData } from "./data_collection";
var spawn = require("child_process").spawn;
var colors = require("colors/safe");

export async function dmConversation(message: Message) {
  let botReply: string;
  var process = spawn("python3", [
    "./src/hehe-chan-ai/chat.py",
    message.content,
  ]);

  process.stdout.on("data", function (data: any) {
    botReply = data.toString();
  });

  process.on("close", (code: any) => {
    message.channel.sendTyping();

    console.log(`talking with ${message.author.username}.`);
    if (botReply === "") {
      message.channel.send(
        "Encountered error while fetching reply, issue has automatically been sent to developer"
      );
      console.log(
        colors.inverse.brightRed(" AI  ") +
          colors.brightRed(
            `         ${message.author.username} Encountered error while fetching reply message: ${message.content}, reply: ${botReply}`
          )
      );
      return;
    }
    setTimeout(() => {
      message.channel.send(botReply);
    }, 500);
    collectDmData(message.content, botReply);
  });
}
