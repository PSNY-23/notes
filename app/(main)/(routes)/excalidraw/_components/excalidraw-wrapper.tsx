"use client";
import { Excalidraw } from "@excalidraw/excalidraw";

import "@excalidraw/excalidraw/index.css";
import { useTheme } from "next-themes";

const ExcalidrawWrapper: React.FC = () => {
  //   console.info(convertToExcalidrawElements([{
  //     type: "rectangle",
  //     id: "rect-1",
  //     width: 186.47265625,
  //     height: 141.9765625,
  //   },]));

  const { resolvedTheme } = useTheme();
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Excalidraw theme={resolvedTheme === "light" ? "light" : "dark"} />
    </div>
  );
};
export default ExcalidrawWrapper;
