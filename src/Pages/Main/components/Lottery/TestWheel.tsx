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
