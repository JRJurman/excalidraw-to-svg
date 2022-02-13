# Excalidraw to SVG

Node Library to transform excalidraw diagrams into svgs!
Useful if you are storing excalidraw diagrams in repos and want a pipeline to export them.

Note, this is a NodeJS library, if you want to get an svg in a web-app, use the [@excalidraw/utils](https://www.npmjs.com/package/@excalidraw/utils) library.

Please consider supporting Excalidraw by getting [Excalidraw Plus](https://plus.excalidraw.com/)!

## Usage

### CLI

You can run this package as a CLI tool by using npx (or if you have it installed as a node dependency).
It takes in two arguments, the path to the diagram you want to convert, and the output path (which can either be an exact path, or folder).

Note, this version returns a string version of the element (an artifact of `.outerHTML`), if you want to interact with the svg node elements, use the API below.

```bash
npx excalidraw-to-svg ./diagrams/example.excalidraw ./output
```

### API

You can install this package as a dependency for a project, and have it build svgs on the JSON files or objects.
Note, this function returns a DOM element, so if you want a string, use `.outerHTML` to get the string content.

```javascript
const excalidrawToSvg = require("excalidrawToSvg");
const excalidrawDiagram = {
  type: "excalidraw",
  version: 2,
  source: "https://excalidraw.com",
  elements: [
    {
      id: "vWrqOAfkind2qcm7LDAGZ",
      type: "ellipse",
      x: 414,
      y: 237,
      width: 214,
      height: 214,
      angle: 0,
      strokeColor: "#000000",
      backgroundColor: "#15aabf",
      fillStyle: "hachure",
      strokeWidth: 1,
      strokeStyle: "solid",
      roughness: 1,
      opacity: 100,
      groupIds: [],
      strokeSharpness: "sharp",
      seed: 1041657908,
      version: 120,
      versionNonce: 1188004276,
      isDeleted: false,
      boundElementIds: null,
    },
  ],
  appState: {
    viewBackgroundColor: "#ffffff",
    gridSize: null,
  },
};

const diagramSvg = excalidrawToSvg(excalidrawDiagram);
console.log(diagram.outerHTML);
```

## Why?

In order to expose diagrams in an interactive web interface, you may want to expose excalidraw diagrams as svgs. This might be useful in a larger toolchain that also injects links and other meta data into a web interface.
