const fs = require("fs"); // used to read in node_module as script
const jsdom = require("jsdom"); // used to create mock web interface (which excalidraw-utils depends on)

/**
 * Function to convert an excalidraw JSON file to an SVG
 * @param {string | object} diagram excalidraw diagram to convert
 * @returns SVG XML string
 */
const excalidrawToSvg = (diagram) => {
  const { JSDOM } = jsdom;

  // load the node_module excalidraw utils dependency
  const excalidrawUtils = fs.readFileSync(
    "./node_modules/@excalidraw/utils/dist/excalidraw-utils.min.js",
    "utf8"
  );

  // if the diagram is not a string, it's probably an object, and we need to stringify it
  const stringDiagram =
    typeof diagram === "string" ? diagram : JSON.stringify(diagram);

  // create a document with the JSON and export script
  const exportScript = `
		<body>
			<script>
				${excalidrawUtils}
				const { exportToSvg } = ExcalidrawUtils

				const diagram = ${stringDiagram}
				const svg = exportToSvg(diagram)

				document.body.appendChild(svg)
			</script>
		</body>
	`;

  const dom = new JSDOM(exportScript, { runScripts: "dangerously" });

  // pull the svg outerHTML and return that string
  const excalidrawSvg = dom.window.document.body.querySelector("svg");
  return excalidrawSvg.outerHTML;
};

module.exports = excalidrawToSvg;
