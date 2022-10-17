import { Client, GatewayIntentBits } from "discord.js";
import { writeFileSync, readFileSync } from "fs";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
  ],
});

export const mapOfUsers: Map<string, string> = new Map();

export function saveMap(map: Map<string, string>) {
  const finalObject: { [key: string]: string } = {};
  for (const [key, value] of map.entries()) {
    finalObject[key] = value;
  }
  const stringifiedObject = JSON.stringify(finalObject);

  // write to file
  writeFileSync("./data/names.json", stringifiedObject);
}

export function loadMap(map: Map<string, string>) {
  try {
    const fileData = readFileSync("./data/names.json");
    if (!fileData) return;
    const stringData = fileData.toString();
    const parsedData = JSON.parse(stringData) as { [key: string]: string };
    for (const [key, value] of Object.entries(parsedData)) {
      map.set(key, value);
    }
    console.log(`Loaded ${Object.keys(parsedData).length} names from file!`);
  } catch (error) {
    console.error("Error occurred while loading file:", error);
  }
}
