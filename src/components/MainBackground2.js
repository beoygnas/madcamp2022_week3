import Sketch from "react-p5";
import { MainBubble, DripBubble } from "./Bubble";

function MainBackground2() {

    let mainBubble
    let bubbles = []


    let particleNum = 300

    const setup = (p) => {
        mainBubble = new MainBubble(p, p.windowWidth/2, p.windowHeight/2, 350, particleNum, 0.5, {r: 0, g: 130, b: 230})

        bubbles.push(new DripBubble(p, p.windowWidth * 0.2, p.windowHeight*0.2, 70, particleNum, 1,  {r:230, g: 130, b: 100}))
        bubbles.push(new DripBubble(p, p.windowWidth * 0.8, p.windowHeight*0.3, 70, particleNum, 1, {r: 0, g: 200, b: 100}))
        bubbles.push(new DripBubble(p, p.windowWidth*0.16, p.windowHeight*0.7, 80, particleNum, 1, {r:200, g: 200, b: 230}))
        bubbles.push(new DripBubble(p, p.windowWidth * 0.3, p.windowHeight*0.9, 30, particleNum, 1,  {r:200, g: 200, b: 255}))
        bubbles.push(new DripBubble(p, p.windowWidth * 0.65, p.windowHeight*0.8, 100, particleNum, 1,  {r:230, g: 50, b: 255}))
        bubbles.push(new DripBubble(p, p.windowWidth * 0.9, p.windowHeight*0.7, 50, particleNum, 1,  {r:0, g: 255, b: 255}))
        bubbles.push(new DripBubble(p, p.windowWidth * 0.1, p.windowHeight*0.45, 60, particleNum, 1,  {r:200, g: 200, b: 0}))



        p.createCanvas(p.windowWidth, p.windowHeight)
    }

    const draw = (p) => {
        p.background(255, 250, 243)
        mainBubble.draw()
        for(const dripBubble of bubbles) {
            dripBubble.draw()
        }
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