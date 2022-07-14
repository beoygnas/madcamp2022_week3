import React from "react";
import Sketch from "react-p5";

const Bounce = () => {
  const setup = (p, canvasParentRef) => {
    p.createCanvas(500, 400).parent(canvasParentRef);
  };

  const draw = (p) => {
    p.background(180, 0, 180);
    p.circle(p.mouseX, p.mouseY, 50);
  };
  return (
    <div>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default Bounce;
