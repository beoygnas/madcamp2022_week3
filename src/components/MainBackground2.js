import Sketch from "react-p5";
import { Bubble } from "./Bubble";

function MainBackground2() {

    let bubble1

    const setup = (p) => {
        bubble1 = new Bubble(p, p.windowWidth/2, p.windowHeight/2, 400, {r: 0, g: 130, b: 230})
        p.createCanvas(p.windowWidth, p.windowHeight)
    }

    const draw = (p) => {
        p.background(255, 250, 243)
        bubble1.draw()
    }

    const windowResized = (p) => {
        console.log('resize')
        console.log(p.windowWidth)
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    return (
        <Sketch
            setup={setup}
            draw={draw}
            windowResized={windowResized}
        ></Sketch>
    )
}

export default MainBackground2