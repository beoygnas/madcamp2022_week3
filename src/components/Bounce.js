import React from "react";
import Sketch from "react-p5";
import { Ball } from "./Ball";
import { BallContainer } from "./Ball";

const Bounce = () => {
    let numBalls = 5
    let ballContainer
    let img;
    let profiles = Array()
    var extraCanvas
    var selected_ball
    
    const preload = (p) => {
        img = p.loadImage('assets/sky.jpg', () => {
          
        })
        
        for(let i=1; i<=2 ;i++){
            profiles[i] = p.loadImage(`assets/profile${i}.png`, () => {
            })
        }
    }

    const setup = (p, canvasParentRef) => {

        var names = ['김찬우', '김상엽', '조예진', '최가희', '강지훈']
        var images = [profiles[1], profiles[2], profiles[1], profiles[2], profiles[1]]

        ballContainer = new BallContainer(p, numBalls, names, images, 1)
        p.createCanvas(p.windowWidth, p.windowHeight);

        extraCanvas = p.createGraphics( 0.8 * p.windowWidth, 0.8 * p.windowHeight)
        extraCanvas.background(255, 0, 0, 160)
        
    }

    const draw = (p) => {
        
        p.background(255, 250, 243)
        ballContainer.ballCollision()
        ballContainer.wallCollision()
        ballContainer.isMouseOn()
        ballContainer.draw(p)

        if(ballContainer.clicked == true){
            p.image(extraCanvas, 0.1 * p.windowWidth, 0.1 * p.windowHeight)   
        }
    }

    const mousePressed = (p) => {
        // if(ballContainer.type == 0)
            ballContainer.mousePressed(p)
    }

    const mouseReleased = (p) => {
        if(ballContainer.type == 0)
            ballContainer.mouseReleased(p)
    }

    const mouseDragged = (p) => {
        if(ballContainer.type == 0)
            ballContainer.mouseDragged(p)
    }

    const mouseClicked = (p) => {

        console.log("12345");
        if(ballContainer.type == 1){

            selected_ball = ballContainer.mouseClicked(p)
            

            if(!ballContainer.clicked && selected_ball != false)
                ballContainer.clicked = true
            else {
                if(ballContainer.outClicked())
                    ballContainer.clicked = false
            }
            console.log(ballContainer.clicked)
            // console.log(selected_ball)
        }
    }


    return (
        <div>
            <Sketch setup={setup} draw={draw} mousePressed = {mousePressed} mouseReleased = {mouseReleased} mouseDragged = {mouseDragged}
            preload = {preload} mouseClicked = {mouseClicked}
            />
        </div>
    );
};

export default Bounce;
