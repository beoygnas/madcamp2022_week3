import { ThemeConsumer } from "styled-components"

class Bubble {
    constructor(p, x, y, radius, particleNum, scale, color) {
        this.p = p
        this.x = x
        this.y = y
        this.radius = radius
        this.scale = scale
        this.color = color
        this.particles = []
        this.particleNum = particleNum
        this.mouseOn = this.isMouseOn()
        this.buildParticles()
    }

    buildParticles() {
        for(let i=0; i<this.particleNum; i++) {
            let r = (Math.random() * 0.1  + 0.7) * this.radius
            let theta = Math.random() * Math.PI * 2
            this.particles.push(
                new Particle(this.p, r*Math.cos(theta) + this.x, r*Math.sin(theta) + this.y, this.radius * 0.2, this.scale, this.color)
            )
        }
    }

    dist() {
        return (this.p.mouseX-this.x)**2 + (this.p.mouseY-this.y)**2
    }

    isMouseOn() {
        if(this.dist() < (this.radius**2)) return true
        return false
    }

    draw () {
        this.p.noStroke()
        this.p.fill(this.color.r, this.color.g, this.color.b)
        this.p.circle(this.x, this.y, this.radius * 2 * 0.7)

        for(const particle of this.particles) {
            particle.draw()
        }
    }
}

class DripBubble extends Bubble {
    constructor(p, x, y, radius, particleNum, scale, color) {
        super(p, x, y, radius, particleNum, scale, color)
        this.drips = []
        this.dripNum = 3
    }

    makeDrips() {
        let xdif = this.p.mouseX - this.x
        let ydif = this.p.mouseY - this.y
        let atan = Math.atan(ydif/xdif)
        let theta = xdif > 0 ? atan : atan + Math.PI

        for(let i=0; i<this.dripNum; i++) {
            let randTheta = (Math.random() - 0.5) * Math.PI * 2 * 0.1 + theta
            let randR = (Math.random() * 0.5 + 1) * this.radius
            let dripRadius = 0.5 * (this.radius * 1.5 - randR)
            this.drips.push(new Drip(this.p, this.x + randR*Math.cos(randTheta), this.y + randR*Math.sin(randTheta), dripRadius, 100, this.color))
        }
    }

    updateDrip() {
        let pmouseOn = this.mouseOn
        this.mouseOn = this.isMouseOn()
        if(pmouseOn != this.mouseOn) {
            this.makeDrips()
        }
        
        if(this.drips[0] && this.drips[0].timer < 0) {
            this.drips.splice(0, this.dripNum)
        }
    }

    draw () {
        this.p.noStroke()
        this.p.fill(this.color.r, this.color.g, this.color.b)
        this.p.circle(this.x, this.y, this.radius * 2 * 0.7)

        for(const particle of this.particles) {
            particle.draw()
        }

        for(const drip of this.drips) {
            drip.draw()
        }

        this.updateDrip()
    }
}

class MainBubble extends DripBubble {
    constructor(p, x, y, radius, particleNum, scale, color) {
        super(p, x, y, radius, particleNum, scale, color)
    }

    makeDrips() {
        let xdif = this.p.mouseX - this.x
        let ydif = this.p.mouseY - this.y
        let atan = Math.atan(ydif/xdif)
        let theta = xdif > 0 ? atan : atan + Math.PI

        for(let i=0; i<this.dripNum; i++) {
            let randTheta = (Math.random() - 0.5) * Math.PI * 2 * 0.1 + theta
            let randR = (Math.random() * 0.5 + 1) * this.radius
            let dripRadius = 0.2 * (this.radius * 1.5 - randR)

            this.drips.push(new TempBubble(this.p, this.x + randR*Math.cos(randTheta), this.y + randR*Math.sin(randTheta), dripRadius, 50, 0.5, 100, this.color))
        }
    }
}

class TempBubble extends Bubble {
    constructor(p, x, y, radius, particleNum, scale, timer, color) {
        super(p, x, y, radius, particleNum, scale, color)
        this.timer = timer
        this.life = timer
    }

    update() {
        this.timer--
        this.opacity = this.timer / this.life * 255
    }

    draw() {
        this.p.noStroke()
        this.update()
        this.p.fill(this.color.r, this.color.g, this.color.b, this.opacity)
        this.p.circle(this.x, this.y, this.radius * 2 * 0.7)

        for(const particle of this.particles) {
            particle.draw()
        }


    }
}

class Particle {
    constructor(p, x, y, radius, scale, color) {
        this.p = p
        this.x = x
        this.y = y
        this.radius = radius
        this.scale = scale
        this.color = color
    }

    dist() {
        return (this.p.mouseX-this.x)**2 + (this.p.mouseY-this.y)**2
    }

    scaleUp() {
        let dist = this.dist()
        if(dist < this.radius**2*4) {
            return ((1 - dist / (this.radius**2*4)) * this.scale) + 1
        }
        return 1
    }

    draw () {
        this.p.noStroke()
        // this.p.fill(this.color.r, this.color.g, this.color.b)
        this.p.circle(this.x, this.y, (this.radius * 2) * this.scaleUp())
    }
}



class Drip {
    constructor(p, x, y, radius, timer, color) {
        this.p = p
        this.x = x
        this.y = y
        this.radius = radius
        this.timer = timer
        this.life = timer
        this.color = color
    }

    update() {
        this.timer--
        this.opacity = this.timer / this.life * 255
    }

    draw() {
        this.update()
        this.p.fill(this.color.r, this.color.g, this.color.b, this.opacity)
        if(this.timer > 0) {
            this.p.circle(this.x, this.y, this.radius*2)
        }
        
    }
}

export { MainBubble, DripBubble }