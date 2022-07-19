import { StaticCopyUsage } from "three"

class Scroll {
    constructor(p, points) {
        this.p = p
        this.numPoints = points.length
        this.points = points
        this.scroll = 0
        this.numCard = 20
        this.show = []
    }

    updateScroll() {
        let movement = (this.p.pmouseX - this.p.mouseX) / this.p.windowWidth * this.p.windowHeight * 0.24
        let pScroll = this.scroll
        this.scroll += movement
        if(this.scroll < 0 || this.scroll > this.p.windowHeight) this.scroll = pScroll
        this.managePoints()
        this.managePoints()
        // this.managePoints()
        console.log(this.scroll / this.p.windowHeight)
    }

    managePoints() {
        if((this.scroll / this.p.windowHeight) * this.numPoints > this.show.length+1) {
            let arr = this.points.splice(Math.floor(Math.random()*this.points.length), 50)
            arr.map((point) => this.show.push(point))
        }
        if((this.scroll / this.p.windowHeight) * this.numPoints < this.show.length) {
            let arr = this.show.splice(Math.floor(Math.random()*this.points.length), 50)
            arr.map((point) => this.points.push(point))
        }
    }

    draw() {
        this.p.noStroke()
        for(let point of this.show) {
            // console.log(point)
            this.p.stroke(this.p.color(point.color))
            this.p.point(point.col, point.row)
        }
        // this.p.fill(255, 250, 243)
        // this.p.rect(0, 0, this.p.windowWidth, this.p.windowHeight)
        // for(const mirror of this.mirrors) {
        //     mirror.draw()
        // }
    }

}

class Mirror {
    constructor(p, img, x, y, radius) {
        this.p = p
        this.img = img
        this.x = x
        this.y = y
        this.radius = radius
        this.curRadius = 0
    }

    update() {

    }

    draw() {
        
        if(this.img.width / this.img.height < this.p.windowWidth / this.p.windowHeight) {
            this.p.copy(this.img, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2, this.x - this.radius + (this.p.windowWidth - this.img.width * this.p.windowHeight / this.img.height)/2, this.y - this.radius, this.radius*2, this.radius*2)
        } else {
            this.p.copy(this.img, this.x - this.radius, this.y - this.radius, this.radius*2, this.radius*2, this.x - this.radius, this.y - this.radius + (this.p.windowHeight - this.img.height * this.p.windowWidth / this.img.width)/2, this.radius*2, this.radius*2)
        }
    }
}

export { Scroll } 