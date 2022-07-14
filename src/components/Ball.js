class Ball {
    constructor (p, x, y, radius, velocity, direction) {
        this.p = p
        this.x = x
        this.y = y
        this.radius = radius
        this.velocity = velocity
        this.direction = direction
        // this.color
        // this.img
        // this.text
    }

    isMouseOn() {
        if(this.p.mouseX**2 + this.p.mouseY**2 > this.radius**2) return false
        return true
    }

    move() {
        this.x += Math.cos(this.direction) * this.velocity
        this.y += Math.sin(this.direction) * this.velocity
    }

    draw() {
        this.p.fill(255, 255, 255);
        this.p.stroke(0, 0, 0);
        this.p.strokeWeight(3);
        this.p.circle(this.x, this.y, this.radius*2)
        this.move()
    }

}

class BallContainer {
    constructor(p, num) {
        this.p = p
        this.num = num
        this.balls = []
        this.buildBalls()
    }

    buildBalls() {
        for(let i=0; i<this.num; i++) {
            this.balls.push(
                new Ball(
                    this.p,
                    this.p.windowWidth/2,
                    this.p.windowHeight/2,
                    50,
                    Math.random() * 10 + 10,
                    Math.random() * 2 * Math.PI
                )
            )
        }
    }

    wallCollision() {
        for(const ball of this.balls) {
            if((ball.x < 0 + ball.radius )|| (ball.x > this.p.windowWidth - ball.radius))
                ball.direction = 3*Math.PI - ball.direction
            if((ball.y < 0 + ball.radius )|| (ball.y > this.p.windowHeight - ball.radius))
                ball.direction = 2*Math.PI - ball.direction
                
        }
    }

    ballCollision() {
        for(let i=0; i<this.num; i++) {
            for(let j=i+1; j<this.num; j++) {
                let ball1 = this.balls[i]
                let ball2 = this.balls[j]
                let xDif = ball1.x - ball2.x
                let yDif = ball1.y - ball2.y
                if(xDif**2 + yDif**2 < (ball1.radius + ball2.radius)**2) {
                    [ball1.velocity, ball2.velocity] = [ball2.velocity, ball1.velocity]
                    ball1.direction = ball1.direction - Math.PI
                    ball2.direction = ball2.direction - Math.PI
                }
            }
        }
    }

    isMouseOn() {
        for(const ball of this.balls) {
            if(ball.isMouseOn()) return ball 
        }
        return null
    }

    draw() {
        for(const ball of this.balls) {
            ball.draw(this.p)
        }
    }
}

export { Ball, BallContainer }