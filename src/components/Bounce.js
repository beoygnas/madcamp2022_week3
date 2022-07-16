import React from "react";
import Sketch from "react-p5";
import { Ball } from "./Ball";
import { BallContainer } from "./Ball";
import { Particle } from "./Bubble";
import { Circle } from "@react-three/drei";
import { Data } from "./Constant";

const Bounce = () => {
    let numBalls = 5
    let ballContainer
    let profiles = Array()
    var extraCanvas
    var selected_ball
    var new_ball = null

    const preload = (p, canvasParentRef) => {

        for(let i=0; i < numBalls ;i++){
            Data.images[i] = p.loadImage(`assets/${Data.name[i]}.png`)
        }
    }

    const setup = (p, canvasParentRef) => {

        var names = ['김찬우', '김상엽', '조예진', '최가희', '강지훈']
        var images = [profiles[0], profiles[0], profiles[0], profiles[0], profiles[0]]

        console.log("setup")
        
        ballContainer = new BallContainer(p, numBalls, names, images, 1)
        p.createCanvas(p.windowWidth, p.windowHeight);

        extraCanvas = p.createGraphics( 0.8 * p.windowWidth, 0.8 * p.windowHeight).parent(canvasParentRef)
        extraCanvas.background(0, 0, 0, 160)
        
    }

    const draw = (p) => {
        
        p.background(255, 250, 243)
        ballContainer.ballCollision()
        ballContainer.wallCollision()
        ballContainer.isMouseOn()
        ballContainer.draw(p)

        if(ballContainer.clicked == true){
            var flag = 0
            p.image(extraCanvas, 0.1 * p.windowWidth, 0.1 * p.windowHeight)   
            p.rect(0.8 * p.windowWidth, 
                0.1 * p.windowHeight, 
                0.1 * p.windowWidth, 
                0.1 * p.windowHeight )
            
            if(new_ball == null){
                var new_particles = Object.assign([], selected_ball.Particle)

                new_ball = new Ball(selected_ball.p, selected_ball.x, selected_ball.y,
                selected_ball.radius, 0, 0, selected_ball.name, selected_ball.image, selected_ball.degree, new_particles)
                new_ball.direction = Math.atan2(0.5 * p.windowHeight - new_ball.y, 0.5 * p.windowWidth - new_ball.x)
                new_ball.velocity = 5
                new_ball.degreeSpeed = 0.01
            }

            console.log(0.5 * p.windowWidth, 0.5 * p.windowHeight)
            
            if(
                new_ball.x < 0.5 * p.windowWidth - new_ball.radius * 0.125 ||
                new_ball.x > 0.5 * p.windowWidth + new_ball.radius  * 0.125 ||
                new_ball.y < 0.5 * p.windowHeight - new_ball.radius * 0.125 ||
                new_ball.y > 0.5 * p.windowHeight + new_ball.radius * 0.125 
            ){
                new_ball.move()
            }
            else{

                flag = true
                new_ball.x = 0.5 * p.windowWidth
                new_ball.y = 0.5 * p.windowHeight
                new_ball.velocity = 0
                new_ball.degreeSpeed = 0
                
                console.log(new_ball.degree)
                
                if(new_ball.degree == 0){
                    
                }
                else if(new_ball.degree % 2 <= 1){
                    new_ball.degree -= 0.02
                    if(new_ball.degree % 1 <= 0.02)
                        new_ball.degree = 0
                        new_ball.degreeSpeed = 0
                }
                else {
                    new_ball.degree += 0.02
                    if(new_ball.degree % 1 >= 0.98){
                        new_ball.degree = 0
                        new_ball.degreeSpeed = 0
                    }
                }
            }

            if(flag  && new_ball.radius <= 200)
                new_ball.radius *= 1.05

            new_ball.new_draw()
        }
    }

    const mousePressed = (p) => {
        if(ballContainer.type == 0)
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

        if(ballContainer.type == 1){
            
            if(!ballContainer.clicked){
                var tmp = ballContainer.mouseClicked(p)
                if(tmp != false){
                    ballContainer.clicked = true
                    selected_ball = tmp
                }
            }
            else {
                if(ballContainer.outClicked()){
                    ballContainer.clicked = false
                    new_ball = null   
                }
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
