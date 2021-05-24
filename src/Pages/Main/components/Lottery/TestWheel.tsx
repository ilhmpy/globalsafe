import React, { useState, useEffect, useRef } from "react";

const list = {
  "116208": "Jerry's Subs and Pizza",
  "66271": "Starbucks",
  "5518": "Ireland's Four Courts",
  "392360": "Five Guys",
  "2210952": "Uptown Cafe",
  "207306": "Corner Bakery Courthouse",
  "41457": "Delhi Dhaba",
  "101161": "TNR Cafe",
  "257424": "Afghan Kabob House",
  "512060": "The Perfect Pita",
  "66244": "California Tortilla",
  "352867": "Pho 75 - Rosslyn",
  "22493": "Ragtime",
  "268052": "Subway",
  "5665": "Summers Restaurant & Sports Bar",
  "129724": "Cosi",
  "42599": "Ray's Hell Burger",
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
