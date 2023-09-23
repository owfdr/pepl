#!/usr/bin/env node

const { Command } = require("commander");
const { spawn } = require("child_process");
const package = require("../package.json");
const chokidar = require("chokidar");

const program = new Command();

program
  .version(package.version)
  .description("Re-run any Python script when it changes")
  .argument("[file]", "Python script to run")
  .argument("[args...]", "Arguments to pass to the Python script");

const file = program.parse(process.argv).args[0];

if (!file) {
  console.log("No file provided, enter interpreter mode");
  spawn("python", [], { stdio: "inherit" });
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
