#! /usr/bin/env node

// this file is a cli script that can be used in a deployment setup
// it expects the diagram file name, and optionally an output directory or file

const fs = require("fs");
const excalidrawToSvg = require("./excalidraw-to-svg");
const buildSvgPath = require("./build-svg-path");

const excalidrawPath = process.argv[2];

if (!excalidrawPath) {
  throw Error(
    "No diagram file name passed in, please pass one in as the first argument"
  );
}

const svgPath = buildSvgPath(excalidrawPath, process.argv[3]);

const diagram = fs.readFileSync(excalidrawPath, "utf8");

const writeSvgSync = async () => {
  try {
    const svgElement = await excalidrawToSvg(diagram);
    const svgOuterHTML = svgElement.outerHTML;
    fs.writeFileSync(svgPath, svgOuterHTML);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("");
  }
};

writeSvgSync();
