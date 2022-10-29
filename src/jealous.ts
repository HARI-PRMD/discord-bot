import { Message } from "discord.js";
import { userData, girlsNames } from "./data";

export function jealousBot(message: Message): boolean {
  let user = userData.users.find((x) => x.userId === message.author.id);
  let nickname = user?.nickname;
  if (
    message.content
      .toLowerCase()
      .split(" ")
      .some((x) => girlsNames.has(x)) &&
    nickname !== undefined
  ) {
    message.react("😠");
    message.reply(
      `Baka ${nickname} stop talking about other girls all the time!! You have me...😔💔`
    );
    return true;
  }
  return false;
}
