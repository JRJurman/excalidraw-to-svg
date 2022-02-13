const buildSvgPath = require("./build-svg-path");

describe("buildSvgPath", () => {
  test.each`
    expectedResults                              | diagramPath                        | svgPath                | expectedSvgPath
    ${"diagramPath when no svgPath is provided"} | ${"./diagrams/example.excalidraw"} | ${undefined}           | ${"./diagrams/example.svg"}
    ${"svgPath folder when no file is provided"} | ${"./diagrams/example.excalidraw"} | ${"./output"}          | ${"./output/example.svg"}
    ${"full svgPath when provided"}              | ${"./diagrams/example.excalidraw"} | ${"./output/test.svg"} | ${"./output/test.svg"}
  `(
    "it should use the $expectedResults",
    ({ diagramPath, svgPath, expectedSvgPath }) => {
      const actualSvgPath = buildSvgPath(diagramPath, svgPath);
      expect(actualSvgPath).toBe(expectedSvgPath);
    }
  );
});
