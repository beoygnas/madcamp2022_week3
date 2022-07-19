import { StaticCopyUsage } from "three"

class Scroll {
    constructor(p, points) {
        this.p = p
        this.points = points
        this.numVisiblePoints = 0
        this.scroll = 0
        this.numCard = 20
    }

    updateScroll() {
        let movement = (this.p.pmouseX - this.p.mouseX) / this.p.windowWidth * this.p.windowHeight * 0.24
        let pScroll = this.scroll
        this.scroll += movement
        if(this.scroll < 0 || this.scroll > this.p.windowHeight) this.scroll = pScroll
        this.managePoints()
        console.log(this.scroll / this.p.windowHeight)
    }

    managePoints() {
        let shouldVisible = (this.scroll / this.p.windowHeight) * this.points.length
        if(shouldVisible > this.numVisiblePoints) {
            let amount
            if(this.numVisiblePoints + 250 < this.points.length) {
                amount = 250
            } else {
                amount = this.points.length - this.numVisiblePoints
            }
            for(let i = this.numVisiblePoints; i < this.numVisiblePoints+amount; i++){
                this.points[i].visible = true
            }
            this.numVisiblePoints += amount
        }

        if(shouldVisible < this.numVisiblePoints-1) {
            let amount
            if(this.numVisiblePoints - 250 >= 0) {
                amount = 250
            } else {
                amount = this.numVisiblePoints
            }
            for(let i = this.numVisiblePoints-amount; i < this.numVisiblePoints; i++){
                this.points[i].visible = false
            }
            this.numVisiblePoints -= amount
        }
    }

    draw() {
        this.p.background(255, 250, 243)
        this.p.noStroke()
        for(let point of this.points) {
            if(point.visible) {
                this.p.stroke(this.p.color(point.color))
                this.p.point(point.col, point.row)
            }
        }
    }

}

export { Scroll } 