class Bubble {
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
        this.p.circle(this.x, this.y, this.radius * 2 * 0.8)
    }
}

export { Bubble }