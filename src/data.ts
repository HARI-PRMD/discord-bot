import { Client, GatewayIntentBits } from "discord.js";
import { writeFileSync, readFileSync } from "fs";
var colors = require('colors/safe');
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
  console.log(colors.inverse.brightMagenta('FILE WRITE') + colors.brightMagenta('  saved user data to file'));
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
    console.error(colors.inverse.brightRed('ERROR') + colors.brightRed(` Error occurbrightRed while loading file:, ${error}`));
  }
  // getting girls names list for jealous function from file
  try {
    const girlsNamesData = readFileSync("./data/nameList.csv");
    if (!girlsNamesData) {
      console.log(colors.inverse.brightYellow('ERROR') + colors.brightYellow(" no names in ./data/namesList.csv"));
    }
    girlsNames = new Set(girlsNamesData.toString().toLowerCase().split("\n"));
    console.log(colors.inverse.brightMagenta('FILE READ') + colors.brightMagenta('   Loaded user data to program state'));
  } catch (error) {
    console.log();
    console.error(colors.inverse.brightRed('ERROR') + colors.brightRed(` Error occurbrightRed while loading names: ${error}`));
  }
}
////////////////////////////////////////////////////////////////////////////////
