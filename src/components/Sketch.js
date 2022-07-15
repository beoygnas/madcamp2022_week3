import React from "react";
import Sketch from "react-p5";

import { Ball, BallContainer } from "./Ball";

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
        ballContainer.ballCollision()
        ballContainer.wallCollision()
        ballContainer.isMouseOn()
        ballContainer.draw(p)
    }

    const mousePressed = (p) => {
        ballContainer.mousePressed(p)
    }

    const mouseReleased = (p) => {
        ballContainer.mouseReleased(p)
    }

    const mouseDragged = (p) => {
        ballContainer.mouseDragged(p)
    }

    return (
        <div>
            <Sketch setup={setup} draw={draw} mousePressed = {mousePressed} mouseReleased = {mouseReleased} mouseDragged = {mouseDragged}/>
        </div>
    );
};

export default Bounce;
