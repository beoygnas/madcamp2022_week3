import React from "react";
import Sketch from "react-p5";

import { BallContainer } from "./Ball";

const Bounce = () => {
    let numBalls = 5
    let ballContainer
    let img;
    let profiles = Array()
    
    const preload = (p) => {
        img = p.loadImage('assets/sky.jpg', () => {
            console.log('hi')
        })
        
        for(let i=1; i<=2 ;i++){
            profiles[i] = p.loadImage(`assets/profile${i}.png`, () => {
            })
        }
    }

    const setup = (p, canvasParentRef) => {
        var names = ['김찬우', '김상엽', '조예진', '최가희', '강지훈']
        var images = [profiles[1], profiles[2], profiles[1], profiles[2], profiles[1]]

        ballContainer = new BallContainer(p, numBalls, names, images)
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background("gray");
        p.image(img, 0, 0);
    }

    const draw = (p) => {
        p.background(255, 250, 243)
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
            <Sketch setup={setup} draw={draw} mousePressed = {mousePressed} mouseReleased = {mouseReleased} mouseDragged = {mouseDragged}
            preload = {preload}
            />
        </div>
    );
};

export default Bounce;
