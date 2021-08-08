import { Socket } from "net";

export const commands = {
  on: "PWON",
  off: "PWSTANDBY",
  play: "NS9A",
  pause: "NS9B",
  stop: "NS9C",
  next: "NS9D",
  prev: "NS9E",
};

type Command = keyof typeof commands;

export const sendCommand = (socket: Socket, command: Command) => {
  return socket.write(commands[command]);
};

export const surroundModes = {
  mstereo: "MCH STEREO",
  dolby: "DOLBY DIGITAL",
  dts: "DTS SURROUND",
  rock: "ROCK ARENA",
  jazz: "JAZZ CLUB",
  stereo: "STEREO",
  direct: "DIRECT",
} as const;

type SurroundMode = keyof typeof surroundModes;

export const setSurroundMode = (socket: Socket, mode: SurroundMode) => {
  return socket.write(`MS${surroundModes[mode]}`);
};

export const setVolume = (socket: Socket, value: number) => {
  return socket.write(`MV${value}`);
};
