#!/usr/bin/env node

const { Command } = require("commander");
const { spawn } = require("child_process");
const package = require("../package.json");
const chokidar = require("chokidar");

const program = new Command();

program
  .version(package.version)
  .description("Re-run any Python script when it changes")
  .argument("<file> [args...]", "Python script to run");

const file = program.parse(process.argv).args[0];

if (!file) {
  console.error("No file specified");
  process.exit(1);
}

const watcher = chokidar.watch(file, {
  persistent: true,
});

watcher.on("ready", () => {
  pepl(program.args);
});

watcher.on("change", () => {
  pepl(program.args);
});

let counter = 0;

function pepl(args) {
  console.log("");
  console.log(`Run ${counter}`);
  console.log("--------------------");

  spawn("python", [...args], { stdio: "inherit" });

  counter += 1;
}
