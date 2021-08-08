#! /usr/bin/env node

import { Socket } from "net";
import {
  setVolume,
  setSurroundMode,
  sendCommand,
  surroundModes,
  commands,
} from "./denon_commands";
import { Command, Option, Argument } from "commander";

const program = new Command();

program.version("0.0.1");

program
  .addOption(new Option("-d, --debug", "output debugging logs"))
  .addOption(
    new Option("-i, --ip <ip>", "specifies the receiver's IP address").default(
      "Denon-AVR-S750H"
    )
  )
  .addOption(
    new Option(
      "-m, --mode <mode>",
      "sets the receiver's surround mode"
    ).choices(Object.keys(surroundModes))
  )
  .addOption(
    new Option(
      "-c, --command <command>",
      "send a command to the receiver"
    ).choices(Object.keys(commands))
  )
  .addOption(
    new Option("-v, --volume <value>", "sets the receiver's volume in percent")
  )
  .parse();

const options = program.opts();

const socket = new Socket({ allowHalfOpen: true });
socket.setTimeout(250);
socket.setEncoding("utf8");

if (options.debug) {
  socket.on("connect", () => {
    console.log(
      `Successfully connected to ${socket.remoteAddress}:${socket.remotePort}`
    );
  });

  socket.on("error", (err) => {
    console.log("Something went wrong", err);
  });

  socket.on("close", () => {
    console.log("Connection closed");
  });

  socket.on("data", (buffer) => {
    console.log("Received data", buffer.toString().trim());
  });
}

(async () => {
  await socket.connect(23, options.ip);

  if (options.command !== undefined) {
    await sendCommand(socket, options.command);
  }

  if (options.mode !== undefined) {
    await setSurroundMode(socket, options.mode);
  }

  if (options.volume !== undefined) {
    await setVolume(socket, options.volume);
  }

  await socket.end();
})();
