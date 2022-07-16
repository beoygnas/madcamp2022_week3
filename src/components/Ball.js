import { getRootState } from "@react-three/fiber"
import { BALL_RADIUS } from "./Constant"
import { Bubble } from "./Bubble"

class Ball {
    constructor (p, x, y, radius, velocity, direction, name, image) {
        
        this.p = p
        this.x = x
        this.y = y
        this.radius = radius
        this.velocity = velocity
        this.direction = direction
        this.locked = false
        this.xOffset = 0
        this.yOffset = 0
        this.name = name
        this.image = image
        this.degree = 0
        this.degreeSpeed = 0
        this.particles = []
        this.build()

        // this.color
        // this.img = p.loadImage('assets/sky.jpg')
        // console.log(this.img)
        // this.text
    }

    isMouseOn() {
        if( ((this.p.mouseX - this.x) ** 2 + (this.p.mouseY - this.y) ** 2) > this.radius**2) return false
        else {
            return true
        }
    }

    move() {

        var dist_x = Math.cos(this.direction) * this.velocity 
        var dist_y = Math.sin(this.direction) * this.velocity
        
        if(this.x + dist_x * 1 < 0 && Math.cos(this.direction) < 0)
            this.x -= dist_x * 2;

        if(this.y + dist_y * 1 < 0 && Math.sin(this.direction) < 0)
            this.y -= dist_y * 2; 

        if(this.x + dist_x * 1 > this.p.windowWidth && Math.cos(this.direction) > 0)
            this.x -= dist_x * 2;

        if(this.y + dist_y * 1 > this.p.windowHeight && Math.sin(this.direction) < 0)
            this.y -= dist_y * 2 ;

        this.x += dist_x * 1
        this.y += dist_y * 1
        this.degree += this.degreeSpeed

        for(const particle of this.particles){
            particle.move(dist_x, dist_y)
        }
    }

    draw() {

        for(const particle of this.particles)
            particle.draw()

        this.p.push()
        this.p.translate(this.x, this.y);
        this.p.rotate(Math.PI * this.degree)
        
        this.p.fill(0, 193, 255);
        this.p.noStroke()
        this.p.strokeWeight(3);
        
        if(this.isMouseOn()){
            if(!this.locked){
                this.p.fill('red');
                this.p.stroke(255, 255, 255);
            }
            else{
                this.p.fill('black');
                this.p.stroke('white');
            }
        }

        this.p.image(this.image, 0 - 50, 0 - 50, 100, 100)
        this.p.strokeWeight(1);
        this.p.stroke(180, 180, 180);
        this.p.fill(180, 180, 180);
        this.p.textSize(20);

        this.p.text(this.name, 0 - 20, 0 + 100)
        this.p.pop()

        this.move()
    }
    

    mousePressed(){

        if(this.isMouseOn()){
            this.locked = true;
            this.p.fill(0, 0, 0);
            this.velocity = 0;
            
        }else{
            this.locked = false;
        }
        this.xOffset = this.p.mouseX - this.x;
        this.yOffset = this.p.mouseY - this.y;
        
    }

    mouseReleased(){

        if(this.locked){
            this.locked = false;
            this.velocity = 
                Math.sqrt((this.p.mouseX - this.p.pmouseX) ** 2 
                    + (this.p.mouseY - this.p.pmouseY) ** 2 )
            this.direction = 
            Math.atan2(this.p.mouseY - this.p.pmouseY, this.p.mouseX - this.p.pmouseX)
        }
    }

    mouseDragged(){
        if(this.locked){

            var tmp_x = this.x
            var tmp_y = this.y

            this.x = this.p.mouseX - this.xOffset;
            this.y = this.p.mouseY - this.yOffset;
            
            for(const particle of this.particles){
                particle.x += this.x - tmp_x
                particle.y += this.y - tmp_y
            }
        }
    }

    mouseClicked(){
        if(this.isMouseOn()) return this
        else return false
    }

    build(){
        for(let i=0; i<500; i++) {
            let r = Math.random() * this.radius * 0.6
            let theta = Math.random() * Math.PI * 2
            this.particles.push(
                new Particle(this.p, r*Math.cos(theta) + this.x, r*Math.sin(theta) + this.y, this.radius/3)
            )
        }
    }
}


class Particle {
    constructor(p, x, y, radius) {
        this.p = p
        this.x = x
        this.y = y
        this.radius = radius
    }

    draw () {
        this.p.noStroke()
        this.p.fill(0, 193, 255)
        this.p.circle(this.x, this.y, this.radius * 2)
    }

    move (dist_x, dist_y){
        this.x += dist_x
        this.y += dist_y
    }
}


class BallContainer {
    constructor(p, num, names, images, type) {
        this.p = p
        this.num = num
        this.balls = []
        this.names = names
        this.images = images
        this.type = type // 0은 클릭모드, 1은 드래그모드
        this.clicked = false
        this.buildBalls()
    }

    buildBalls() {
        for(let i=0; i<this.num; i++) {
            this.balls.push(
                new Ball(
                    this.p,
                    this.p.windowWidth/2,
                    this.p.windowHeight/2,
                    // Math.random() * this.p.windowWidth,
                    // Math.random() * this.p.windowHeight,
                    BALL_RADIUS,
                    Math.random() * 10 + 5,
                    Math.random() * 2 * Math.PI,
                    this.names[i],
                    this.images[i]
                )
            )
        }
    }

    wallCollision() {

        for(const ball of this.balls) {

            if(ball.x <= 0 + ball.radius ){
                if(ball.velocity * Math.cos(ball.direction) < 0)
                    ball.direction = 3*Math.PI - ball.direction         
            }
            if(ball.x >= this.p.windowWidth - ball.radius){
                if(ball.velocity * Math.cos(ball.direction) > 0)
                    ball.direction = 3*Math.PI - ball.direction  
            } 
            if(ball.y <= 0 + ball.radius){
                if(ball.velocity * Math.sin(ball.direction) < 0)
                    ball.direction = 2*Math.PI - ball.direction
            }
            if(ball.y >= this.p.windowHeight - ball.radius){
                if(ball.velocity * Math.sin(ball.direction) > 0)
                    ball.direction = 2*Math.PI - ball.direction
            }
        }
    }

    ballCollision() {
        for(let i=0; i<this.num; i++) {
            for(let j=i+1; j<this.num; j++) {
                let ball1 = this.balls[i]
                let ball2 = this.balls[j]
                let v1_x = ball1.velocity * Math.cos(ball1.direction)
                let v1_y = ball1.velocity * Math.sin(ball1.direction)
                let v2_x = ball2.velocity * Math.cos(ball2.direction)
                let v2_y = ball2.velocity * Math.sin(ball2.direction)
                let xDif = ball1.x - ball2.x
                let yDif = ball1.y - ball2.y

                if(xDif**2 + yDif**2 < (ball1.radius + ball2.radius)**2) {

                    if((xDif * (v1_x - v2_x) < 0) || (yDif * (v1_y - v2_y) < 0)){

                        var angle = Math.atan2(yDif, xDif);
                        var v1_h = v1_x * Math.cos(angle)
                            + v1_y * Math.sin(angle)
                        var v1_v = v1_x * Math.sin(angle)
                            - v1_y * Math.cos(angle)
                        var v2_h = v2_x * Math.cos(angle)
                            + v2_y * Math.sin(angle)
                        var v2_v = v2_x * Math.sin(angle)
                            - v2_y * Math.cos(angle)

                        var nv1h = (v2_h - v1_h) * (1+ 0.8)/2 + v1_h
                        var nv2h = (v1_h - v2_h) * (1+ 0.8)/2 + v2_h

                        var new_v1_x = nv1h * Math.cos(angle) + v1_v * Math.sin(angle);
                        var new_v1_y = nv1h * Math.sin(angle) - v1_v * Math.cos(angle);
                        var new_v2_x = nv2h * Math.cos(angle) + v2_v * Math.sin(angle);
                        var new_v2_y = nv2h * Math.sin(angle) - v2_v * Math.cos(angle);

                        ball1.velocity = Math.sqrt(new_v1_x ** 2 + new_v1_y ** 2);
                        ball1.direction = Math.atan2(new_v1_y, new_v1_x)
                        ball2.velocity = Math.sqrt(new_v2_x ** 2 + new_v2_y ** 2);
                        ball2.direction = Math.atan(new_v2_y, new_v2_x)

                        ball1.degreeSpeed = Math.random() * 0.001
                        ball2.degreeSpeed = Math.random() * 0.001
                    }
                }
            }
        }
    }

    isMouseOn() {
        for(const ball of this.balls) {
                if(ball.isMouseOn())  
                    return ball ;
        }
        return null
    }

    draw() {
        for(const ball of this.balls) {
            ball.draw()
        }
    }

    mousePressed(){
        for(const ball of this.balls) {
            if(!this.clicked)
                ball.mousePressed()
        }
    }
    
    mouseReleased(){
        for(const ball of this.balls) {
            ball.mouseReleased()
        }
    }

    mouseDragged(){
        for(const ball of this.balls) {
            ball.mouseDragged()
        }
    }

    outClicked(){
        if(this.p.mouseX < 0.1 * this.p.windowWidth || 
            this.p.mouseX > 0.9 * this.p.windowWidth || 
            this.p.mouseY < 0.1 * this.p.windowHeight || 
            this.p.mouseY > 0.9 * this.p.windowHeight )
            return true
    }

    mouseClicked(){
        var selected_ball = false;
        for(const ball of this.balls) {
            if(selected_ball == false)    
                selected_ball = ball.mouseClicked()            
        }
        return selected_ball
        // if(selected_ball == false)
        //     return false
        // else{
        //     return true
        // }
        // this.clicked = true
    }
}

export { Ball, BallContainer }