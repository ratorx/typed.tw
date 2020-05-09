#! /usr/bin/env node
import { promises as fs } from "fs";
import { getSource } from "./index";

async function gen_js(configFileName: string, outputFileName: string) {
	const inhandle = await fs.open(configFileName, "r");
	const outhandle = await fs.open(outputFileName, "w");
	const done = await inhandle.readFile("utf-8")
		.then(content => getSource(content))
		.then(processed => outhandle.writeFile(processed, "utf-8"));
	const closein = await inhandle.close();
	const closeout = await outhandle.close();
}
// fs.open("tailwind.config.js", "r")
// 	.then(handle => handle.readFile("utf-8"))
// 	.then(src => getSource(src))
// 	.then(js => console.log(js))
// 	.catch(err => console.error(err));
//
var args = process.argv.slice(2);

if (args.length != 1) {
	console.error("Usage: " + process.argv.slice(0, 2).join(' ') + " <tailwind config file>")
	process.exit()
}

gen_js(args[0], "tw.go")
