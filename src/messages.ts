import { Client, GatewayIntentBits, Message } from "discord.js";
import { saveMap, userData } from "./data";
var colors = require('colors/safe');


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

////////////////////////////////////////////////////////////////////////////////
export function messageHi(message: Message): void {
  let user = userData.users.find((x) => x.userId === message.author.id);
  if (user === undefined) {
    message.reply(`I DMed you something 😉`)
    message.author.send(`Hiiii I don't think I've met you before 👀, please type \`!addme ${message.author.username}\` or any nickname you would like me to call you in the server chat 💞`);
    console.log(colors.inverse.brightYellow(' HI ') + colors.brightYellow(` Said hi to new user: ${message.author.username}`))
  } else {
    message.reply(`Hiiii ${user.nickname} ❤️ nice seeing you online again`);
    console.log(colors.inverse.brightGreen(' HI ') + colors.brightGreen(`          Said hi to: ${message.author.username}`))
  }
}
////////////////////////////////////////////////////////////////////////////////
export function messageAddMe(message: Message): void {
  let nickname = message.content.replace("!addme", "");
  let user = userData.users.find((x) => x.userId === message.author.id);
  if (nickname.length < 1) {
    message.reply("Why are you so silent 😔, you don't want me to call you by any nickname 🥺 ?");
    console.log(colors.inverse.brightYellow(' WRONG INPUT ') + colors.brightYellow(` ${message.author.username} did not specify a username`));
    return;
  } else if (nickname.length > 30) {
    message.reply(
      "are you sure you want me to call your that 🫣, isn't that nickname a little too long?"
      );
      console.log(colors.inverse.brightYellow(' WRONG INPUT ') + colors.brightYellow(` ${message.author.username} did not specify a username`));
    return;
  }
  nickname = nickname.substring(1);
  if (user === undefined) {
    console.log("\t" + colors.inverse.brightGreen(' ADD ME ') + colors.brightGreen(`      Creating new user for ${message.author.username}`));
    // creates new user
    userData.users.push({
      userId: message.author.id,
      nickname,
      money: 0,
    });
  } else {
    console.log(colors.inverse.brightGreen(' ADD ME ') + colors.brightGreen(`      Updated nickname for ${message.author.username}`));
    user.userId = message.author.id;
    user.nickname = nickname;
    user.money = user.money;
  }
  message.reply(`Haiii ${nickname}, nice to meet you! ❤️`);
  saveMap();
}
////////////////////////////////////////////////////////////////////////////////
export function messageWork(message: Message): void {
  let user = userData.users.find((x) => x.userId === message.author.id);
  if (user === undefined) {
    message.reply(
      `You haven't even told me your name yet ${message.author.username} 😭`
    );
    console.log(colors.inverse.brightYellow(' WORK ') + colors.brightYellow(`        ${message.author.username} worked without account`));
  } else {
    user.money += 10;
    message.reply(
      `You coded at Jared's typing speed for 16 hours and now have $${user.money}`
    );
    console.log(colors.inverse.brightGreen(' WORK ') + colors.brightGreen(`        ${message.author.username} --> $${user.money}`));
  }
}
////////////////////////////////////////////////////////////////////////////////
export function messageBalance(message: Message): void {
  let user = userData.users.find((x) => x.userId === message.author.id);
  if (user === undefined) {
    message;
    message.reply(
      `You haven't setup an account with your local simp bank ${message.author.username} 😭`
    );
    console.log(colors.inverse.brightYellow(' BALANCE ') + colors.brightYellow(`     ${message.author.username} Checked balance without account`));
  } else {
    message.reply(`Your current bank balance is $${user.money}.`);
    console.log(colors.inverse.brightYellow(' BALANCE ') + colors.brightGreen(`     ${message.author.username} Checked balance`));
  }
}

////////////////////////////////////////////////////////////////////////////////
