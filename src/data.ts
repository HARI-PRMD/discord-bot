import { Client, GatewayIntentBits } from "discord.js";
import { writeFileSync, readFileSync } from "fs";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});
////////////////////////////////////////////////////////////////////////////////
export interface UserData {
  users: User[];
}

export interface User {
  userId: string;
  nickname: string;
  money: number;
}

export let userData: UserData = {
  users: [],
};

////////////////////////////////////////////////////////////////////////////////
export function saveMap(): void {
  const stringifiedUserData = JSON.stringify(userData);
  // write to file
  writeFileSync("./data/names.json", stringifiedUserData);
}
////////////////////////////////////////////////////////////////////////////////
export function loadMap() {
  try {
    // loading up the user data
    const fileData = readFileSync("./data/names.json");
    if (!fileData) return;
    const stringData = fileData.toString();
    const parsedData = JSON.parse(stringData) as UserData;
    userData = { ...parsedData };
  } catch (error) {
    console.error("Error occurred while loading file:", error);
  }
}
////////////////////////////////////////////////////////////////////////////////
