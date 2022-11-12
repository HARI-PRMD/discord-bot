import {
  ActivityType,
  Constants,
  EmbedBuilder,
  Message,
} from "discord.js";
import { saveMap, userData } from "./data";
import { client } from "./index";
var colors = require("colors/safe");
import { statusPrice } from './contants'
import { addMinutes, isPast } from "date-fns";
import { statusDetails } from "./data";


export function matchPFP(message: Message) {
  client.user?.setAvatar(message.author.avatarURL.toString());
}

export function matchStatus(message: Message) {
  let user = userData.users.find((x) => x.userId === message.author.id);
  if (user === undefined) {
    message.reply(
      `Hiiii I don't think I've met you before 👀, please type \`!addme ${message.author.username}\` or any nickname you would like me to call you in the server chat 💞`
    );
    console.log(
      colors.inverse.brightYellow(" STATUS ") +
      colors.brightYellow(`      ${message.author.username} ran status command as invalid user`)
    );
    return;
  }

  if (user.money < 20) {
    message.reply(`maybe next time, you don't have enough balance in your account`);
    return;
  }
  
  if (isPast(statusDetails.endTime)) {
    // if the end time is in the past then set a new start and end time
    // from current moment in time
    statusDetails.startTime = new Date();
    statusDetails.endTime = addMinutes(statusDetails.startTime, 30);
    statusDetails.user = message.author.username;
    console.log(`${statusDetails.user} : ${statusDetails.startTime} --> ${statusDetails.endTime}`)
  } else {
    // if the status period is still running and end time is in the future
    let timeLeft = 101;
    message.reply(`It's still ${statusDetails.user}'s turn in my status, please try again after ${statusDetails.endTime}.`)
  }
  

  user.money = user.money - statusPrice;
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

  const balanceEmbed = new EmbedBuilder()
  .setColor([229, 161, 162])
  .setTitle(`Receipt`)
  .setDescription(`Thank you for your purchase 💞`)
  .addFields(
		{ name: 'You bought', value: `status time for $${statusPrice}.` },
  )
  .setTimestamp();
  
  message.author.send({ embeds: [balanceEmbed] }).then(() => {
    console.log(
      colors.inverse.brightGreen(" STATUS ") +
      colors.brightGreen(`      ${message.author.username} bought status time for $${statusPrice}`)
    );
  }).catch(() => {
    console.log(
      colors.inverse.brightYellow(" STATUS ") +
      colors.brightYellow(`      tried DMing ${message.author.username} receipt for status time for $${statusPrice}`)
    );
    message.channel.send(`Your DMs are disabled ${user?.nickname} 😔, guess you don't want me to talk to u privately 💔`);
  });
  saveMap();
  return;
}
