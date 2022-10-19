import { Message } from "discord.js"
import { EmbedBuilder } from "@discordjs/builders"

export function help(message: Message): void {
  const messageFunctions = `\`!hi\` - Hehe-chan greets you by your nickname or default username. \n 
    \`!addme\` - have Hehe-chan call you a nickname as well as setup your bank account. \n
    \`!work\` - earn money to spend on Hehe-chan's functions. \n
    \`!balance\` - view your current bank balance.
    `
  const helpEmbed = new EmbedBuilder().setTitle("so very poggers").addFields(
    {
      name: "message functions",
      value: messageFunctions,
    },
    { name: "e-?????? functions", value: "sadf" },
    { name: "money functions", value: "sdfd" }
  )
  message.channel.send({ embeds: [helpEmbed] })
}
