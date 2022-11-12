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

  user.money = user.money - statusPrice;
  client.user?.setPresence({
    activities: [
      {
        name: `with ${message.author.username} 💞`,
        type: ActivityType.Playing,
        url: "https://github.com/HARI-PRMD",
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
