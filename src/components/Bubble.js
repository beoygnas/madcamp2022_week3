import { ThemeConsumer } from "styled-components"

class Bubble {
    constructor(p, x, y, radius, color) {
        this.p = p
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.particles = []
        this.build()
    }

    build() {
        for(let i=0; i<500; i++) {
            let r = Math.random() * this.radius * 0.6
            let theta = Math.random() * Math.PI * 2
            this.particles.push(
                new Particle(this.p, r*Math.cos(theta) + this.x, r*Math.sin(theta) + this.y, this.radius/3, this.color)
            )
        }
    }

    draw () {
        for(const particle of this.particles) {
            particle.draw()
        }
    }
}

class Particle {
    constructor(p, x, y, radius, color) {
        this.p = p
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
    }

    draw () {
        this.p.noStroke()
        this.p.fill(this.color.r, this.color.g, this.color.b)
        this.p.circle(this.x, this.y, this.radius * 2)
    }
}

export { Bubble }