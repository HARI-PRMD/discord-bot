import { ActivityType, Constants, EmbedBuilder, Message } from "discord.js";
import { pfpDetails, saveMap, userData } from "./data";
import { client } from "../index";
var colors = require("colors/safe");
import { pfpPrice, statusPrice } from "./contants";
import {
  addHours,
  addMinutes,
  differenceInHours,
  differenceInMinutes,
  isPast,
} from "date-fns";
import { statusDetails } from "./data";

export function matchPFP(message: Message) {
  let user = userData.users.find((x) => x.userId === message.author.id);
  if (user === undefined) {
    message.reply(
      `Hiiii I don't think I've met you before 👀, please type \`!addme ${message.author.username}\` or any nickname you would like me to call you in the server chat 💞`
    );
    console.log(
      colors.inverse.brightYellow(" PFP ") +
        colors.brightYellow(
          `         ${message.author.username} ran pfp command as invalid user`
        )
    );
    return;
  }

  if (user.money.balance < 50) {
    message.reply(
      `maybe next time, you don't have enough balance in your account`
    );
    return;
  }

  if (isPast(pfpDetails.endTime) || pfpDetails.user === null) {
    // if the end time is in the past then set a new start and end time
    // from current moment in time
    pfpDetails.startTime = new Date();
    pfpDetails.endTime = addHours(statusDetails.startTime, 2);
    pfpDetails.user = message.author.username;
    console.log(
      `${statusDetails.user} : ${statusDetails.startTime} --> ${statusDetails.endTime}`
    );
  } else {
    // if the status period is still running and end time is in the future
    let timeLeft = differenceInMinutes(pfpDetails.endTime, new Date());
    if (timeLeft > 60) {
      timeLeft = differenceInHours(pfpDetails.endTime, new Date());
    }
    message.reply(
      `I'm still ${pfpDetails.user}'s turn in my status, please try again in ${timeLeft} minutes.`
    );
    return;
  }

  user.money.balance = user.money.balance - pfpPrice;
  client.user?.setAvatar(message.author.displayAvatarURL());
  client.user?.setPresence({
    activities: [
      {
        name: `with ${message.author.username} 💞`,
        type: ActivityType.Playing,
      },
    ],
    status: "online",
  });
  message.channel.send(
    `Matching pfp and status with ${message.author.username} 🥰`
  );

  const balanceEmbed = new EmbedBuilder()
    .setColor([229, 161, 162])
    .setTitle(`Receipt`)
    .setDescription(`Thank you for your purchase 💞`)
    .addFields({
      name: "You bought",
      value: ` 2 hours of matching pfp time for $${pfpPrice}.`,
    })
    .setTimestamp();

  message.author
    .send({ embeds: [balanceEmbed] })
    .then(() => {
      console.log(
        colors.inverse.brightGreen(" PFP ") +
          colors.brightGreen(
            `         ${message.author.username} bought pfp time for $${pfpPrice}`
          )
      );
    })
    .catch(() => {
      console.log(
        colors.inverse.brightYellow(" PFP ") +
          colors.brightYellow(
            `         tried DMing ${message.author.username} receipt for pfp time for $${pfpPrice}`
          )
      );
      message.channel.send(
        `Your DMs are disabled ${user?.nickname} 😔, guess you don't want me to talk to u privately 💔`
      );
    });
  saveMap();
  return;
}

export function matchStatus(message: Message) {
  let user = userData.users.find((x) => x.userId === message.author.id);
  if (user === undefined) {
    message.reply(
      `Hiiii I don't think I've met you before 👀, please type \`!addme ${message.author.username}\` or any nickname you would like me to call you in the server chat 💞`
    );
    console.log(
      colors.inverse.brightYellow(" PFP ") +
        colors.brightYellow(
          `         ${message.author.username} ran match pfp command as invalid user`
        )
    );
    return;
  }

  if (user.money.balance < 20) {
    message.reply(
      `maybe next time, you don't have enough balance in your account`
    );
    return;
  }

  if (isPast(statusDetails.endTime) || statusDetails.user === null) {
    // if the end time is in the past then set a new start and end time
    // from current moment in time
    statusDetails.startTime = new Date();
    statusDetails.endTime = addMinutes(statusDetails.startTime, 30);
    statusDetails.user = message.author.username;
    console.log(
      `${statusDetails.user} : ${statusDetails.startTime} --> ${statusDetails.endTime}`
    );
  } else {
    // if the status period is still running and end time is in the future
    let timeLeft = differenceInMinutes(statusDetails.endTime, new Date());
    message.reply(
      `I'm still matching with ${statusDetails.user}, please try again in ${timeLeft} minutes.`
    );
    return;
  }

  user.money.balance = user.money.balance - statusPrice;
  client.user?.setPresence({
    activities: [
      {
        name: `with ${message.author.username} 💞`,
        type: ActivityType.Playing,
      },
    ],
    status: "online",
  });
  message.reply(`Got U in my status 🥰`);
  asyncResetStatus();

  const balanceEmbed = new EmbedBuilder()
    .setColor([229, 161, 162])
    .setTitle(`Receipt`)
    .setDescription(`Thank you for your purchase 💞`)
    .addFields({
      name: "You bought",
      value: `status time for $${statusPrice}.`,
    })
    .setTimestamp();

  message.author
    .send({ embeds: [balanceEmbed] })
    .then(() => {
      console.log(
        colors.inverse.brightGreen(" STATUS ") +
          colors.brightGreen(
            `      ${message.author.username} bought status time for $${statusPrice}`
          )
      );
    })
    .catch(() => {
      console.log(
        colors.inverse.brightYellow(" STATUS ") +
          colors.brightYellow(
            `      tried DMing ${message.author.username} receipt for status time for $${statusPrice}`
          )
      );
      message.channel.send(
        `Your DMs are disabled ${user?.nickname} 😔, guess you don't want me to talk to u privately 💔`
      );
    });
  saveMap();
  return;
}

export async function asyncResetStatus() {
  await resetStatus();
}
function resetStatus() {
  return new Promise(() => {
    setTimeout(() => {
      // reset status
      console.log(
        colors.inverse.brightGreen(" STATUS ") +
          colors.brightGreen(`      Resetting Status`)
      );
      client.user?.setPresence({
        activities: [
          {
            name: "Hehe code 👨‍💻",
            type: ActivityType.Watching,
            url: "https://github.com/HARI-PRMD",
          },
        ],
        status: "online",
      });
    }, 1800000);
  });
}
