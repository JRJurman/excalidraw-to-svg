const fs = require("fs"); // used to read in node_module as script
const jsdom = require("jsdom"); // used to create mock web interface (which excalidraw-utils depends on)

/**
 * Function to convert an excalidraw JSON file to an SVG
 * @param {string | object} diagram excalidraw diagram to convert
 * @returns SVG XML Node
 */
const excalidrawToSvg = (diagram) => {
  const { JSDOM } = jsdom;

  // load the node_module excalidraw utils dependency
  const excalidrawUtils = fs.readFileSync(
    "./node_modules/@excalidraw/utils/dist/excalidraw-utils.min.js",
    "utf8"
  );

  // load Path2D polyfill
  const path2DPolyfill = fs.readFileSync(
    "./node_modules/canvas-5-polyfill/canvas.js",
    "utf8"
  );

  // if the diagram is not a string, it's probably an object, and we need to stringify it
  const stringDiagram =
    typeof diagram === "string" ? diagram : JSON.stringify(diagram);

  // create a document with the JSON and export script
  const exportScript = `
		<body>
			<script>

        // mock CanvasRenderingContext2D (which currently blows up in the canvas-5-polyfill)
        class CanvasRenderingContext2D {}

        // load canvas-5-polyfill
        ${path2DPolyfill}

        // load excalidraw dependencies
				${excalidrawUtils}

        // custom logic to load an SVG
        const buildSVG = async () => {
          const { exportToSvg } = ExcalidrawUtils

          const diagram = ${stringDiagram}
          const svg = await exportToSvg(diagram)

          document.body.appendChild(svg)
        }
				buildSVG()
			</script>
		</body>
	`;

  const dom = new JSDOM(exportScript, {
    runScripts: "dangerously",
    resources: "usable",
  });

  // pull the svg and return that Node
  // since this happens asyncronously, we will wait for it to be available
  const svgPromise = new Promise(async (resolve, reject) => {
    let checks = 20;
    const sleepTime = 10;
    while (checks > 0) {
      checks--;
      const excalidrawSvg = dom.window.document.body.querySelector("svg");
      if (excalidrawSvg) {
        resolve(excalidrawSvg);
      }
      await new Promise((resolve) => setTimeout(resolve, sleepTime));
    }
    reject("svg was not created after expected period");
  });

  return svgPromise;
};

module.exports = excalidrawToSvg;
