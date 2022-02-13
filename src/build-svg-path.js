const path = require("path");

/**
 * Simple function to convert an excalidraw filename to svg filename
 */
const buildSvgPath = (diagramPath, svgPath) => {
  const [excalidrawFileName] = diagramPath.split(path.sep).slice(-1);
  const [excalidrawFileNameBase, excalidrawFileNameExt] =
    excalidrawFileName.split(".");

  if (!svgPath) {
    // if there is no output path, return the diagramPath with svg as the extension
    const svgFileName = `${excalidrawFileNameBase}.svg`;
    return diagramPath.replace(excalidrawFileName, svgFileName);
  }

  // does the output have a file in it?
  const [outputFileName] = svgPath.split(path.sep).slice(-1);
  const [outputFileNameBase, outputFileNameExt] = outputFileName.split(".");

  if (!outputFileNameExt) {
    // if there is no extension, we're probably pointing to a folder
    return `${svgPath}${path.sep}${excalidrawFileNameBase}.svg`;
  }

  // if we had a fully defined svgPath, return that
  return svgPath;
};

module.exports = buildSvgPath;
