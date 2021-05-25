import React, { useState, useEffect, useRef } from "react";

const list = {
  "116208": "Document",
  "66271": "Euro",
  "5518": "Euro",
  "392360": "Procent",
  "2210952": "Euro",
  "207306": "Euro",
};

export const TestWheel = () => {
  const [state, setState] = useState();
  const ref = useRef<HTMLCanvasElement>(null);

  const wheel = {
    timerHandle: 0,
    timerDelay: 33,
    angleCurrent: 0,
    angleDelta: 0,
    size: 290,
    canvasContext: null,
    colors: [
      "#ffff00",
      "#ffc700",
      "#ff9100",
      "#ff6301",
      "#ff0000",
      "#c6037e",
      "#713697",
      "#444ea1",
      "#2772b2",
      "#0297ba",
      "#008e5b",
      "#8ac819",
    ],
    segments: [],
    seg_colors: [],
    maxSpeed: Math.PI / 16,
    upTime: 1000,
    // How long to spin up for (in ms)
    downTime: 17000,
    // How long to slow down for (in ms)
    spinStart: 0,
    frames: 0,
    centerX: 300,
    centerY: 300,
  };

  return (
    <div>
      <div id="venues" style={{ float: "left" }}>
        <ul />
      </div>

      <div id="wheel">
        <canvas ref={ref} id="canvas" width="1000" height="600"></canvas>
      </div>

      <div id="stats">
        <div id="counter"></div>
      </div>
    </div>
  );
};
