import Sketch from "react-p5";
import { MainBubble, DripBubble } from "./Bubble";
import { Data, hexToRGB } from "./Constant";

function MainBackground() {

    let mainBubble
    let bubbles = []

    let particleNum = 300
    let startFrame = 130
    let transitionLength = 100

    const setup = (p) => {
        mainBubble = new MainBubble(p, p.windowWidth/2, p.windowHeight/2, 350, particleNum, 0.5, 0, hexToRGB(Data.color[20]))

        bubbles.push(new DripBubble(p, p.windowWidth * 0.2, p.windowHeight*0.2, 70, particleNum, 1, 10, hexToRGB(Data.color[0])))
        bubbles.push(new DripBubble(p, p.windowWidth * 0.8, p.windowHeight*0.3, 70, particleNum, 1, 20, hexToRGB(Data.color[1])))
        bubbles.push(new DripBubble(p, p.windowWidth*0.16, p.windowHeight*0.7, 80, particleNum, 1, 70, hexToRGB(Data.color[2])))
        bubbles.push(new DripBubble(p, p.windowWidth * 0.3, p.windowHeight*0.9, 30, particleNum, 1,  35, hexToRGB(Data.color[3])))
        bubbles.push(new DripBubble(p, p.windowWidth * 0.65, p.windowHeight*0.8, 100, particleNum, 1,  40, hexToRGB(Data.color[4])))
        bubbles.push(new DripBubble(p, p.windowWidth * 0.9, p.windowHeight*0.7, 50, particleNum, 1,  58, hexToRGB(Data.color[5])))
        bubbles.push(new DripBubble(p, p.windowWidth * 0.1, p.windowHeight*0.45, 60, particleNum, 1,  60, hexToRGB(Data.color[6])))

        p.createCanvas(p.windowWidth, p.windowHeight)
    }

    const draw = (p) => {
        if(p.frameCount < startFrame) {
            p.background(20, 20, 20)
        }
        else if(p.frameCount >= startFrame && p.frameCount < startFrame + transitionLength) {
            let backR = (p.frameCount-startFrame) / transitionLength * 255
            let backG = (p.frameCount-startFrame) / transitionLength * 250
            let backB = (p.frameCount-startFrame) / transitionLength * 243
            p.background(backR, backG, backB)
        }
        else {
            p.background(255, 250, 243)
        }
        mainBubble.draw()
        for(const dripBubble of bubbles) {
            dripBubble.draw()
        }
    }

    const mouseReleased = (p) => {
        console.log('click')
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
            mouseReleased ={mouseReleased}
        ></Sketch>
    )
}

export default MainBackground