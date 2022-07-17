import React from "react";
import Sketch from "react-p5";
import { Ball } from "./Ball";
import { BallContainer } from "./Ball";
import { Particle } from "./Bubble";
import { Circle } from "@react-three/drei";
import { Data } from "./Constant";
import { Student } from "./Constant";
import { TYPE_DRAG } from "./Constant";
import { TYPE_CLICK } from "./Constant";
import { BallDetail } from "./Ball";
import { GO_BACK, GO_PROJECT, STAY} from "./Constant"; 

const Bounce = () => {
    let numBalls = 20
    let ballContainer
    let profiles = Array()
    var images = []
    var students = []
    var extraCanvas
    var selected_ball
    var ballDetail = null

    const preload = (p, canvasParentRef) => {

        for(let i=0; i < numBalls ;i++){
            images[i] = p.loadImage(`assets/${Data.name[i]}.png`)
            console.log(`assets/${Data.name[i]}.png`)
        }
    }

    const setup = (p, canvasParentRef) => {

        for(let i = 0 ; i < numBalls ; i++){
            var student = new Student(
                                Data.name[i], 
                                images[i], 
                                Data.school[i], 
                                Data.hakbeon[i], 
                                Data.hobby[i], 
                                Data.comment[i], 
                                Data.color[i]
                                )
            students.push(student)
        }
        
        ballContainer = new BallContainer(p, numBalls, students, TYPE_CLICK)


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
            
            p.fill("0, 0, 0")
            
            if(ballDetail == null)
                ballDetail = new BallDetail(p, selected_ball)
            
            ballDetail.draw()
            p.rect(
                0.45 * p.windowWidth, 
                0.9 * p.windowHeight, 
                0.1 * p.windowHeight, 
                0.1 * p.windowHeight
            )

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

        if(ballContainer.type == 1 && ballDetail == null){
            
            if(!ballContainer.clicked){
                var tmp = ballContainer.mouseClicked(p)
                if(tmp != false){
                    ballContainer.clicked = true
                    selected_ball = tmp
                }
            }
            // console.log(selected_ball)
        }
        else if(ballDetail != null){
            var next_action = ballDetail.mouseClicked()
            if(next_action == GO_BACK){
                console.log("나가기")
                ballContainer.clicked = false
                ballDetail = null   
            }
            else if(next_action == GO_PROJECT){
                console.log("원클릭")
            }
            else
                console.log("가만히")
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
