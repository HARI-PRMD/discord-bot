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

export let girlsNames: Set<string> = new Set();

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
  // getting girls names list for jealous function from file
  try {
    const girlsNamesData = readFileSync("./data/nameList.csv");
    if (!girlsNamesData) {
      console.log("no names in ./data/namesList.csv");
    }
    girlsNames = new Set(girlsNamesData.toString().toLowerCase().split("\n"));
  } catch (error) {
    console.log("Error occurred while loading names:", error);
  }
}
////////////////////////////////////////////////////////////////////////////////
