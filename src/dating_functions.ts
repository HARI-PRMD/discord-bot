import { ActivityType, Client, EmbedBuilder, GatewayIntentBits, Message } from "discord.js";
import { saveMap, userData } from "./data";
import { client } from './index'

export function matchPFP(message: Message) {
    client.user?.setAvatar(message.author.avatarURL.toString());
}

export function matchStatus(message: Message) {
    client.user?.setPresence({
        activities: [{ 
          name: `with ${message.author.username} 💞`,
          type: ActivityType.Playing,
          url: 'https://github.com/HARI-PRMD'
       }],
       status: "online",
    });
    message.reply(`Got U in my status 🥰`);
}