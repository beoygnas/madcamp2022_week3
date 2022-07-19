import { calcPosFromAngles, Point } from "@react-three/drei";
import Sketch from "react-p5";
import { Data, hexToRGB } from "./Constant";
import { Scroll } from "./Scroll";

function ProjectBackground() {

    let scroll
    let img
    let points = []

    function preload(p) {
        img = p.loadImage('./assets/camp.png')
    }

    function setup(p) {
        p.createCanvas(p.windowWidth, p. windowHeight)
        p.background(255, 250, 243)
        p.noStroke()
        
        let ratio = img.width/img.height
        let height = p.windowHeight * 0.8
        let width = height*ratio
        img.resize(Math.floor(width), Math.floor(height))

        for(let col = 0; col<img.width; col+=5) {
            for(let row = 0; row<img.height; row+=5) {
                let c = img.get(col, row)
                points.push({
                    row: row + Math.floor(p.windowHeight * 0.1),
                    col: col + Math.floor((p.windowWidth-width)/2),
                    color: c
                })
                // p.set(col, row, p.color(c))
            }
        }
        p.strokeWeight(5)
        scroll = new Scroll(p, points)
    }

    function draw(p) {
        scroll.draw()
    }

    function mouseDragged(p) {
        scroll.updateScroll()
    }

    return (
        <Sketch
            preload={preload}
            setup={setup}
            draw={draw}
            mouseDragged={mouseDragged}
        >
        </Sketch>
    )
}

export default ProjectBackground