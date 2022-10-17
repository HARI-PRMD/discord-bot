import { Client, GatewayIntentBits, Message } from "discord.js";
import { saveMap, loadMap, UserData, userData, User } from "./data";

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
  console.log(userData);
  if (user === undefined) {
    message.reply(
      `Hiiii I don't think I've met you before 👀, whats your name ${message.author.username} ?`
    );
  } else {
    message.reply(`Hiiii ${user.nickname} ❤️ nice seeing you online again`);
  }
}

export function messageAddMe(message: Message): void {
  let nickname = message.content.replace("!addme", "");
  let user = userData.users.find((x) => x.userId === message.author.id);
  if (nickname.length < 1) {
    message.reply("You did not specify a nickname!");
    return;
  }
  nickname = nickname.substring(1);
  if (user === undefined) {
    console.log(`creating new user for ${message.author.username}`);
    // creates new user
    userData.users.push({
      userId: message.author.id,
      nickname,
      money: 0,
    });
  } else {
    user.userId = message.author.id;
    user.nickname = nickname;
    user.money = user.money;
  }
  message.reply(`Haiii ${nickname}, nice to meet you! ❤️`);
  saveMap();
}

export function messageWork(message: Message): void {
  let user = userData.users.find((x) => x.userId === message.author.id);
  if (user === undefined) {
    message.reply(
      `You haven't even told me your name yet ${message.author.username} 😭`
    );
  } else {
    user.money += 10;
    message.reply(
      `You coded at Jareds typing speed for 16 hours and now have $${user.money}`
    );
  }
}

export function messageBalance(message: Message): void {
  let user = userData.users.find((x) => x.userId === message.author.id);
  if (user === undefined) {
    message;
    message.reply(
      `You haven't setup an account with your local simp bank ${message.author.username} 😭`
    );
  } else {
    message.reply(`Your current bank balance is $${user.money}.`);
  }
}

////////////////////////////////////////////////////////////////////////////////
