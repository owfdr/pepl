#!/usr/bin/env node

const { Command } = require("commander");
const { spawn } = require("child_process");
const chokidar = require("chokidar");

const program = new Command();

program
  .version("0.1.0")
  .description("Re-run any Python script when it changes")
  .argument("<file>", "python file to run");

program.parse(process.argv);

const file = program.args[0];

if (!file) {
  console.error("No file specified");
  process.exit(1);
}

const watcher = chokidar.watch(file, {
  persistent: true,
});

watcher.on("ready", () => {
  pepl(file);
});

watcher.on("change", () => {
  pepl(file);
});

let counter = 0;

function pepl(file) {
  console.log("");
  console.log(`Run ${counter}`);
  console.log("--------------------");

  spawn("python", [file], { stdio: "inherit" });

  counter += 1;
}
