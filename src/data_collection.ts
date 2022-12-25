import { messageData, saveMessages } from "./data";

export function collectDmData(message: string, reply: string) {
  messageData.push({ message, reply });
}
