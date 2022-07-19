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
        

        for(let col = 0; col<img.width; col+=10) {
            for(let row = 0; row<img.height; row+=10) {
                let c = img.get(col, row)
                // p.stroke(p.color(c))
                // p.strokeWeight(10)
                points.push({
                    row: row,
                    col: col,
                    color: c
                })
                // p.set(col, row, p.color(c))
            }
        }
        p.strokeWeight(10)
        scroll = new Scroll(p, points)
    }

    function draw(p) {
        p.background(255, 250, 243)
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