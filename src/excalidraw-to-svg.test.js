const excalidrawToSvg = require("./excalidraw-to-svg");

const mockDiagram = {
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
  appState: { viewBackgroundColor: "#ffffff", gridSize: null },
};

describe("excalidraw-to-svg function", () => {
  it("should render an svg", async () => {
    const svg = await excalidrawToSvg(mockDiagram);
    expect(svg.outerHTML).toMatch(/<svg/);
  });
});
