class ProjectSumnail {
    constructor (p) {
        this.p = p
        this.x = 0
        this.y = 0
        this.width = 50
        this.height = 100
    }

    move() {
        this.x += 5
    }

    draw() {
        this.p.rect(this.x, this.y, this.width, this.height)
        this.move()
    }
}

export { ProjectSumnail }