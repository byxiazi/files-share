#!/usr/bin/env node
const { program } = require("commander");
const path = require("path");
const App = require("./index");
const pkg = require("./package.json");
const { readFiles } = require("./utils");

program
  .option("-d, --dir <dir>", "only download the files in the dir")
  .option("-r, --recursive", "download the files recursively")
  .version(pkg.version);

program.parse();

if (!program.opts().dir) {
  program.help();
}

const dir = path.resolve(process.cwd(), program.opts().dir);
const files = readFiles(dir, {
  isRecursive: program.opts().recursive,
});

if (files.length === 0) {
  console.error("no file in the dir");
  process.exit(1);
}

App(dir, files);
