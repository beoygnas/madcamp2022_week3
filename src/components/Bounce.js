import React from "react";
import Sketch from "react-p5";

import { BallContainer } from "./Ball";

const Bounce = () => {
    let numBalls = 5
    let ballContainer

    const setup = (p, canvasParentRef) => {
        ballContainer = new BallContainer(p, numBalls)
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background("gray");
    }

    const draw = (p) => {
        p.background("gray")
        ballContainer.wallCollision()
        ballContainer.ballCollision()
        ballContainer.draw(p)
    }

    return (
        <Sketch setup={setup} draw={draw} />
    );
};

export default Bounce;
