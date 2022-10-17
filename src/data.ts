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

export function loadMap() {
  try {
    const fileData = readFileSync("./data/names.json");
    if (!fileData) return;
    const stringData = fileData.toString();
    // console.log(stringData);
    const parsedData = JSON.parse(stringData) as UserData;
    // console.log(parsedData);
    // console.log(typeof parsedData);
    userData = { ...parsedData };
    console.log(userData);

    // console.log(typeof userData);
    // saveMap(userData);
    // console.log(`Loaded ${Object.keys(parsedData).length} names from file!`);
  } catch (error) {
    console.error("Error occurred while loading file:", error);
  }
}
////////////////////////////////////////////////////////////////////////////////
