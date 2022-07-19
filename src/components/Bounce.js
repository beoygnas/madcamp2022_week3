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
import { Projects } from "./Constant";
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
            images[i] = p.loadImage(`${process.env.PUBLIC_URL}/assets/profile/${Data.name[i]}.png`)
        }
        for(let i=0 ; i < 20 ; i++){
            for(let j = 1 ; j <= 3 ; j++){
                console.log(Projects[i].name)
                var img 
                if(i<10)
                    img = p.loadImage(`assets/project_img/week1/${i+1}_${j}.png`)
                else 
                    img = p.loadImage(`assets/project_img/week2/${i-9}_${j}.png`)

                Projects[i].img.push(img)
            }
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
                                Data.color[i],
                                )

            for(let k = 0 ;k < Projects.length ; k++){
                for(let j=0 ; j < 2 ; j++){
                    if(Projects[k].team[j] == Data.name[i])
                        student.projects.push(Projects[k])
                }
            }
            students.push(student)
        }
        
        ballContainer = new BallContainer(p, numBalls, students, TYPE_CLICK)


        p.createCanvas(p.windowWidth, p.windowHeight);
        extraCanvas = p.createGraphics( 0.8 * p.windowWidth, 0.8 * p.windowHeight).parent(canvasParentRef)
        extraCanvas.background(0, 0, 0, 160)
        
    }

    const draw = (p) => {
        
        p.background(255, 250, 243)
        if(!ballContainer.collision_ignore){
            ballContainer.ballCollision()
            ballContainer.wallCollision()
        }
        ballContainer.isMouseOn()
        ballContainer.draw(p)

        if(ballContainer.clicked == true){
            
            p.fill("0, 0, 0")

            if(ballDetail == null)
                ballDetail = new BallDetail(p, selected_ball)
            
            ballDetail.draw()
            
            p.rect(
                0.475 * p.windowWidth, 
                0.05 * p.windowHeight, 
                0.05 * p.windowHeight, 
                0.05 * p.windowHeight
            )
        }


    }

    const mousePressed = (p) => {
        if(ballContainer.type == 0)
            ballContainer.mousePressed(p)
        
        if(ballDetail != null){
            ballDetail.mousePressed(p)
        }
    }

    const mouseReleased = (p) => {
        if(ballContainer.type == 0)
            ballContainer.mouseReleased(p)
    }

    const mouseDragged = (p) => {
        if(ballContainer.type == 0)
            ballContainer.mouseDragged(p)
        if(ballDetail != null){
            ballDetail.mouseDragged(p)
        }
    }

    const mouseClicked = (p) => {

        if(ballDetail == null){
            if(!ballContainer.clicked){
                var tmp = ballContainer.mouseClicked(p)
                if(tmp != false){
                    ballContainer.clicked = true
                    selected_ball = tmp
                }
            }
        }
        else if(ballDetail != null){
            var next_action = ballDetail.mouseClicked()
            if(next_action == GO_BACK){
                ballContainer.clicked = false
                ballDetail = null   
            }
            else if(next_action == GO_PROJECT){
                // ballDetail.projectMode = true
            }
            else ;
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
