import { Connection, Messages } from "@/types";

export function getMessagesFromLocalStorage() {
  const messages = localStorage.getItem("messages");
  if (messages) return JSON.parse(messages);
  return {};
}
export function updateMessagesInLocalStorage(newMessages: Messages) {
  console.log(newMessages);
  const messageToString = JSON.stringify(newMessages);
  localStorage.setItem("messages", messageToString);
}

export function getConnectionsFromLocalStorage() {
  const connections = localStorage.getItem("connections");
  if (connections) return JSON.parse(connections);
  return [];
}

export function updateConnectionsInLocalStorage(connections: Connection[]) {
  const connectionArrayToString = JSON.stringify(connections);
  localStorage.setItem("connections", connectionArrayToString);
}
