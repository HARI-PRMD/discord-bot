import { AttachmentBuilder, Message } from "discord.js";
import { EmbedBuilder } from "@discordjs/builders";
import { pfpPrice, statusPrice } from "./contants";
////////////////////////////////////////////////////////////////////////////////
export function help(message: Message): void {
  const heheChanPfp = new AttachmentBuilder("./assets/hehe_chan_pfp.jpg");
  const hehePfp = new AttachmentBuilder("./assets/hehe_pfp.png");
  const helpEmbed = new EmbedBuilder()
    .setColor([229, 161, 162])
    .setURL("https://github.com/HARI-PRMD")
    .setAuthor({
      name: `Hehe Chan's List of Commands`,
      iconURL: "attachment://hehe_chan_pfp.jpg",
    })
    .addFields(
      {
        name: "Regular Functions",
        value:
          `\`!hi\` - Greet Hehe Chan.\n` +
          `\`!gm\` - Rise and Shine Hehe Chan.\n` +
          `\`!addme\` - Have Hehe Chan call you by your nickname, enables work and dating functions.\n` +
          `\`!rule\` - Find out what the only rule on Hehe's server is.\n`,
      },
      {
        name: "Money Functions",
        value:
          `\`!work\` - Earn money to spend on Hehe Chan's e-dating functions.\n` +
          `\`!balance\` - Check your current balance.\n`,
      },
      {
        name: "E-Dating Functions",
        value:
          `\`!status\` - Have your name in Hehe Chan's status for 30 mins, cost: $${statusPrice}.\n` +
          `\`!matchpfp\` - Removed due to moral concerns, cost: $${pfpPrice}.\n`,
      }
    )
    .setFooter({
      text: "Made by @Hehe#6969",
      iconURL: "attachment://hehe_pfp.png",
    });
  message.reply({ embeds: [helpEmbed], files: [heheChanPfp, hehePfp] });
}
