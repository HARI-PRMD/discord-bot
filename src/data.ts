import { addMinutes } from "date-fns";
import { writeFileSync, readFileSync } from "fs";
var colors = require("colors/safe");
////////////////////////////////////////////////////////////////////////////////
export interface UserData {
  users: User[];
}

type money = {
  balance: number;
  lastTimeWorked: number | null;
  perHour: number;
};

export interface User {
  userId: string;
  nickname: string;
  money: money;
}

export interface statusDetails {
  startTime: Date;
  endTime: Date;
  user: string | null;
}

export let userData: UserData = {
  users: [],
};

export let girlsNames: Set<string> = new Set();

export interface messageData {
  message: string;
  reply: string;
}

export let statusDetails: statusDetails = {
  startTime: new Date(),
  endTime: addMinutes(new Date(), 30),
  user: null,
};

export let pfpDetails: statusDetails = {
  startTime: new Date(),
  endTime: addMinutes(new Date(), 30),
  user: null,
};

export let messageData: Array<messageData> = [];

////////////////////////////////////////////////////////////////////////////////
export function saveMap(): void {
  const stringifiedUserData = JSON.stringify(userData, null, 2);
  // write to file
  writeFileSync("./data/names.json", stringifiedUserData);
  console.log(
    colors.inverse.brightMagenta(" FILE WRITE ") +
      colors.brightMagenta("  saved user data to file")
  );
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
    console.error(
      colors.inverse.brightRed(" ERROR ") +
        colors.brightRed(` Error occurbrightRed while loading file:, ${error}`)
    );
  }
  // getting girls names list for jealous function from file
  try {
    const girlsNamesData = readFileSync("./data/nameList.csv");
    if (!girlsNamesData) {
      console.log(
        colors.inverse.brightYellow(" ERROR ") +
          colors.brightYellow(" no names in ./data/namesList.csv")
      );
    }
    girlsNames = new Set(girlsNamesData.toString().toLowerCase().split("\n"));
    console.log(
      colors.inverse.brightMagenta(" FILE READ ") +
        colors.brightMagenta("   Loaded user data to program state")
    );
  } catch (error) {
    console.log();
    console.error(
      colors.inverse.brightRed(" ERROR ") +
        colors.brightRed(` Error occurbrightRed while loading names: ${error}`)
    );
  }
}
////////////////////////////////////////////////////////////////////////////////
export function saveMessages(): void {
  const stringifiedUserData = JSON.stringify(messageData, null, 2);
  // write to file
  writeFileSync("./data/dmMessages.json", stringifiedUserData);
  // console.log(
  // colors.inverse.brightMagenta(" FILE WRITE ") +
  // colors.brightMagenta("  saved user message data to file")
  // );
}
////////////////////////////////////////////////////////////////////////////////
