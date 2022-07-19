import { getRootState } from "@react-three/fiber"
import { BALL_RADIUS } from "./Constant"
import { Bubble } from "./Bubble"
import { Data } from "./Constant";
import { Student } from "./Constant";
import { TYPE_DRAG } from "./Constant";
import { TYPE_CLICK } from "./Constant";
import { hexToRGB } from "./Constant";
import { Center } from "@react-three/drei";
import { GO_BACK, GO_PROJECT, STAY} from "./Constant"; 
import { toHaveDisplayValue } from "@testing-library/jest-dom/dist/matchers";

class Ball {
    constructor (p, x, y, radius, velocity, direction, degree, degreeSpeed, particles, student) {
        
        this.p = p
        // 도형 속성
        this.x = x
        this.y = y
        this.radius = radius
        this.velocity = velocity
        this.direction = direction
        this.degree = degree
        this.degreeSpeed = degreeSpeed
        this.particles = particles
        this.student = student

        //student 정보
        this.name = student.name
        this.image = student.image
        this.school = student.school
        this.hakbeon = student.hakbeon
        this.hobby = student.hobby
        this.comment = student.comment
        this.color = student.color
    

        // drag 용 
        this.locked = false
        this.xOffset = 0
        this.yOffset = 0
        this.selected = 0
        

        this.tmp_velocity = 0 
        this.tmp_degreeSpeed = 0
        this.xx = (Math.trunc(Data.name.indexOf(student.name) % 5) + 1) * (this.p.windowWidth / 6)
        this.yy = Math.trunc(Data.name.indexOf(student.name) / 5 + 1) *  (this.p.windowHeight / 5)
    }

    isMouseOn() {
        if( ((this.p.mouseX - this.x) ** 2 + (this.p.mouseY - this.y) ** 2) > this.radius**2) 
            return false;
        else {
            return true
        }
    }

    move() {
    
        var dist_x = Math.cos(this.direction) * this.velocity * 0.5 
        var dist_y = Math.sin(this.direction) * this.velocity * 0.5
        

        this.x += dist_x
        this.y += dist_y
    
        this.degree += this.degreeSpeed

        if(this.recall){
        
            if(this.xx - this.x>= -10 && this.xx - this.x <= 10 &&
                this.yy - this.y >= -10 && this.yy - this.y <= 10){
                    this.x = this.xx
                    this.y = this.yy
                    this.velocity = 0
                    this.degree = 0
                    this.degreeSpeed = 0.001
                    this.recall = false
            }
        }

        console.log(this.degree)
        if(this.xx == this.x && this.yy == this.y){
            if(this.degree >= 0.15)
                this.degreeSpeed = -0.001
            else if(this.degree <= -0.2)
                this.degreeSpeed = 0.001
        }   
    }

    draw() {

        this.p.push()
        this.p.translate(this.x, this.y);
        this.p.rotate(Math.PI * this.degree)
        

        const RGB = hexToRGB(this.color)
        this.p.noStroke()
        this.p.fill(RGB.r, RGB.g, RGB.b, 200)
        this.p.circle(0, 0, this.radius * 1.7)
        
    
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

        //image draw
        this.p.image(this.image, -this.radius * 0.8, -this.radius * 0.8 , this.radius * 1.6, this.radius * 1.6)

        //text draw
        this.p.strokeWeight(1);
        if(this.selected){
            this.p.stroke(255, 255, 255);
            this.p.fill(255, 255, 255);
            this.p.textSize(this.radius * 0.25);
        }
        else{
            this.p.fill(200, 200, 200);
            this.p.textSize(15);
        }        

        if(this.selected == 0)
            this.p.text(this.name, 0 - this.radius * 0.25, 0 + this.radius )
        
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
            if(this.velocity == 0) this.velocity = 5
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
}

class BallContainer {
    constructor(p, num, students, type, container_images) {
        this.p = p
        this.num = num
        this.balls = []
        this.students = students
        this.type = type // 0은 클릭모드, 1은 드래그모드
        this.clicked = false
        this.collision_ignore = false
        this.stopped = false
        this.container_images = container_images
        this.buildBalls()
    }

    buildBalls() {
        for(let i=0; i<this.num; i++) {
            this.balls.push(
                new Ball(
                    this.p,
                    this.p.windowWidth/2,
                    this.p.windowHeight/2,
                    BALL_RADIUS,
                    Math.random() * 10 + 3,
                    Math.random() * 2 * Math.PI,
                    Math.random() * 1, //degree
                    Math.random() * 0.03, //degreeSpeed
                    [],
                    this.students[i]
                )
            )
        }
    }

    wallCollision() {

        for(const ball of this.balls) {

            if(ball.x <= -2 * ball.radius + ball.radius ){
                if(ball.velocity * Math.cos(ball.direction) < 0)
                    ball.direction = 3*Math.PI - ball.direction         
            }
            if(ball.x >= this.p.windowWidth + 2 * ball.radius - ball.radius){
                if(ball.velocity * Math.cos(ball.direction) > 0)
                    ball.direction = 3*Math.PI - ball.direction  
            } 
            if(ball.y <= - 2 * ball.radius + ball.radius){
                if(ball.velocity * Math.sin(ball.direction) < 0)
                    ball.direction = 2*Math.PI - ball.direction
            }
            if(ball.y >= this.p.windowHeight + 2 * ball.radius  - ball.radius){
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

                if(xDif**2 + yDif**2 < (ball1.radius + ball2.radius)**1.9) {

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

                        var nv1h = (v2_h - v1_h) * (1+ 0.9)/2 + v1_h
                        var nv2h = (v1_h - v2_h) * (1+ 0.9)/2 + v2_h

                        var new_v1_x = nv1h * Math.cos(angle) + v1_v * Math.sin(angle);
                        var new_v1_y = nv1h * Math.sin(angle) - v1_v * Math.cos(angle);
                        var new_v2_x = nv2h * Math.cos(angle) + v2_v * Math.sin(angle);
                        var new_v2_y = nv2h * Math.sin(angle) - v2_v * Math.cos(angle);

                        ball1.velocity = Math.sqrt(new_v1_x ** 2 + new_v1_y ** 2);
                        ball1.direction = Math.atan2(new_v1_y, new_v1_x)
                        ball2.velocity = Math.sqrt(new_v2_x ** 2 + new_v2_y ** 2);
                        ball2.direction = Math.atan2(new_v2_y, new_v2_x)

                        ball1.degreeSpeed = Math.random() * 0.01
                        ball2.degreeSpeed = Math.random() * 0.01
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

        var flag = true
        for(const ball of this.balls) {
            if(ball.recall){
                flag = false
                this.stopped = false
            }
        }
        if(flag) this.collision_ignore = false

        this.p.stroke(255, 255, 255);

        if(this.type == TYPE_CLICK){
            this.p.fill(0, 0, 0)
            this.p.image(this.container_images[1], 
                this.p.windowHeight * 0.05, 
                this.p.windowHeight * 0.35, 
                this.p.windowHeight * 0.05, 
                this.p.windowHeight * 0.05)
        }
        else{
            this.p.fill(255,0, 0)
            this.p.image(this.container_images[2], 
                this.p.windowHeight * 0.05, 
                this.p.windowHeight * 0.30, 
                this.p.windowHeight * 0.05, 
                this.p.windowHeight * 0.05)
        }
        
        this.p.image(this.container_images[0], 
            this.p.windowHeight * 0.05, 
            this.p.windowHeight * 0.40, 
            this.p.windowHeight * 0.05, 
            this.p.windowHeight * 0.05)
        
        this.p.image(this.container_images[3], 
            this.p.windowHeight * 0.05, 
            this.p.windowHeight * 0.45, 
            this.p.windowHeight * 0.05, 
            this.p.windowHeight * 0.05)

        this.p.image(
            this.container_images[4], 
            this.p.windowHeight * 0.05, 
            this.p.windowHeight * 0.50, 
            this.p.windowHeight * 0.05, 
            this.p.windowHeight * 0.05)
        
        this.p.image(this.container_images[5], 
            this.p.windowHeight * 0.05, 
            this.p.windowHeight * 0.55, 
            this.p.windowHeight * 0.05, 
            this.p.windowHeight * 0.05)

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
        if( 
            this.p.mouseX >= 0.81 * this.p.windowWidth && 
            this.p.mouseX <= 0.81 * this.p.windowWidth 
                            + 0.05 * this.p.windowHeight && 
            this.p.mouseY >= 0.10 * this.p.windowHeight && 
            this.p.mouseY <= 0.15 * this.p.windowHeight )
            return true
    }

    mouseClicked(){
        var selected_ball = false;
        
        if(this.type != TYPE_DRAG){
            for(const ball of this.balls) {
                if(selected_ball == false)    
                    selected_ball = ball.mouseClicked()            
            }
        }
        
        if(
            this.type == TYPE_CLICK && 
            this.p.mouseX >= 0.05 * this.p.windowHeight && 
            this.p.mouseX <= 0.1 * this.p.windowHeight &&
            this.p.mouseY >= 0.35 * this.p.windowHeight && 
            this.p.mouseY <= 0.40 * this.p.windowHeight
            )
            this.type = TYPE_DRAG;
        else if(
            this.type == TYPE_DRAG && 
            this.p.mouseX >= 0.05 * this.p.windowHeight && 
            this.p.mouseX <= 0.1 * this.p.windowHeight &&
            this.p.mouseY >= 0.30 * this.p.windowHeight && 
            this.p.mouseY <= 0.35 * this.p.windowHeight
        )
            this.type = TYPE_CLICK;
        else if(
            this.p.mouseX >= 0.05 * this.p.windowHeight && 
            this.p.mouseX <= 0.1 * this.p.windowHeight &&
            this.p.mouseY >= 0.40 * this.p.windowHeight && 
            this.p.mouseY <= 0.45 * this.p.windowHeight
        ){
            if(!this.stopped){
                this.stopped = true
                for(const ball of this.balls) {
                    if(ball.tmp_velocity == 0)
                        ball.tmp_velocity = ball.velocity
                    ball.velocity = 0
                    if(ball.tmp_degreeSpeed == 0)
                        ball.tmp_degreeSpeed = ball.degreeSpeed
                    ball.degreeSpeed = 0
                }
            }
        }

        else if(
            this.p.mouseX >= 0.05 * this.p.windowHeight && 
            this.p.mouseX <= 0.1 * this.p.windowHeight &&
            this.p.mouseY >= 0.45 * this.p.windowHeight && 
            this.p.mouseY <= 0.50 * this.p.windowHeight
        ){
            for(const ball of this.balls) {
                if(ball.tmp_velocity != 0)
                    ball.velocity = ball.tmp_velocity
                ball.tmp_velocity = 0
                if(ball.tmp_degreeSpeed != 0)
                    ball.degreeSpeed = ball.tmp_degreeSpeed
                ball.tmp_degreeSpeed = 0
            }
            this.stopped = false
        }

        else if(
            this.p.mouseX >= 0.05 * this.p.windowHeight && 
            this.p.mouseX <= 0.1 * this.p.windowHeight &&
            this.p.mouseY >= 0.50 * this.p.windowHeight && 
            this.p.mouseY <= 0.55 * this.p.windowHeight
        ){
            if(this.stopped){
                this.collision_ignore = true
                for(const ball of this.balls) {
                    if(!(ball.yy == ball.y && ball.xx == ball.x)){
                        ball.direction = Math.atan2(ball.yy - ball.y, ball.xx - ball.x)
                        ball.velocity = 40
                        ball.degreeSpeed = ball.tmp_degreeSpeed
                        ball.recall = true
                    }
                }
            }
        }
        return selected_ball
    }
}

class BallDetail {
    constructor(p, selected_ball){
        this.p = p
        this.selected_ball = new Ball(
                                selected_ball.p, 
                                selected_ball.x, 
                                selected_ball.y,
                                selected_ball.radius, 
                                30,
                                Math.atan2(0.5 * p.windowHeight - selected_ball.y, 0.3 * p.windowWidth - selected_ball.x),
                                selected_ball.degree , 
                                selected_ball.degreeSpeed * 10,
                                [],
                                selected_ball.student
                            )
        this.selected_ball.selected = 1
        this.ball_centered = false
        this.ball_expanded = false
        this.radius = 300
        this.radius_expanded = 0
        this.projectMode = false
        this.pressed_x = 0
        this.pressed_y = 0
        this.fix_x = true
        this.fix_y = false
        this.mode = 0
        this.velocity = 0
        this.container_images = []
    }

    draw(){
        console.log(this.selected_ball.x, this.selected_ball.y)
    
        if(!this.fix_x){
            this.selected_ball.x += this.velocity
            var tmp = this.selected_ball.x
            while(tmp < 0)
                tmp += this.p.windowWidth
            if(0.3 *this.p.windowWidth - tmp <= 30 && 0.3*this.p.windowWidth - tmp >= -30){
                this.velocity = 0
            }
        }

        if(!this.fix_y){   
            this.selected_ball.y += this.velocity 
            var tmp = this.selected_ball.y
            while(tmp < 0)
                tmp += this.p.windowHeight
            if(0.5 *this.p.windowHeight - tmp <= 30 && 0.5*this.p.windowHeight - tmp >= -30){
                this.velocity = 0
            }
        }

        if(
            !(this.selected_ball.x < 0.3 * this.p.windowWidth - this.selected_ball.radius * 0.125 ||
            this.selected_ball.x > 0.3 * this.p.windowWidth + this.selected_ball.radius  * 0.125 ||
            this.selected_ball.y < 0.5 * this.p.windowHeight - this.selected_ball.radius * 0.125 ||
            this.selected_ball.y > 0.5 * this.p.windowHeight + this.selected_ball.radius * 0.125) 
            && !this.radius_expanded
        ){
            
            this.ball_centered = true

            this.selected_ball.x = 0.3 * this.p.windowWidth
            this.selected_ball.y = 0.5 * this.p.windowHeight
            this.selected_ball.velocity = 0
            this.selected_ball.degreeSpeed = 0
            
            if(this.selected_ball.degree == 0){
                
            }
            else if(this.selected_ball.degree % 2 <= 1){
                    this.selected_ball.degree -= 0.02
                if(this.selected_ball.degree % 1 <= 0.02)
                    this.selected_ball.degree = 0
                    this.selected_ball.degreeSpeed = 0
            }
            else {
                this.selected_ball.degree += 0.02
                if(this.selected_ball.degree % 1 >= 0.9){
                    this.selected_ball.degree = 0
                    this.selected_ball.degreeSpeed = 0
                }
            }
        }


        if(this.ball_centered  && this.selected_ball.radius <= 250){
            this.selected_ball.radius *= 1.05
        }
        else {
            if(this.selected_ball.radius > 250){
                this.ball_expanded = true
            }    
        }

        // 원커지기
        if(this.ball_expanded) {
            const RGB = hexToRGB(this.selected_ball.color)
            this.p.noStroke()
            this.p.fill(RGB.r, RGB.g, RGB.b, 230)
            this.p.circle(this.selected_ball.x, this.selected_ball.y, this.radius)
            if(this.radius <= this.p.windowWidth * 10) 
                this.radius = this.radius ** 1.013;
            else if(this.selected_ball.degree == 0){
                this.radius_expanded = true
            }
        }

        this.selected_ball.draw()


        
        // 텍스트 띄우기
        if(this.radius_expanded){
        

            this.p.image(this.container_images[6], 
                0.81 * this.p.windowWidth,
                0.05 * this.p.windowHeight,
                0.05 * this.p.windowHeight,
                0.05 * this.p.windowHeight
            )

            this.p.strokeWeight(1);
            this.p.stroke(255, 255, 255);
            this.p.fill(255, 255, 255);
            this.p.textSize(this.selected_ball.radius * 0.20);
            
            // var whereMouseOn = this.isMouseOn()
        
            this.p.text(
                `${this.selected_ball.name}`,
                this.selected_ball.x - this.selected_ball.name.length * 20,
                this.selected_ball.y + this.selected_ball.radius 
            )
            
            this.p.text(
                "About me",
                this.selected_ball.x + this.selected_ball.radius * 1.5 , 
                this.selected_ball.y  - this.selected_ball.radius * 0.70
            )

            const RGB = hexToRGB(this.selected_ball.color)
            this.p.strokeWeight(3);
            this.p.textSize(this.selected_ball.radius * 0.15);
            this.p.stroke(255, 255, 255);
            this.p.fill(RGB.r, RGB.g, RGB.b)
            this.p.rect(this.selected_ball.x + this.selected_ball.radius * 1.5 , 
                this.selected_ball.y - this.selected_ball.radius * 0.65, 
                this.selected_ball.radius * 1.5, 
                this.selected_ball.radius * 1.5)

            this.p.noStroke();
            this.p.textSize(this.selected_ball.radius * 0.10);
            this.p.fill(255, 255, 255);
            this.p.text(
                `${this.selected_ball.school} ${this.selected_ball.hakbeon}학번`,
                this.selected_ball.x + this.selected_ball.radius * 1.6, 
                this.selected_ball.y - this.selected_ball.radius * 0.4 
            )

            var comment = Object.assign([], this.selected_ball.comment)            
            let i = 0
            
            while(comment.length > 16){
                this.p.text(
                    comment.slice(0, 16).join(""),
                    this.selected_ball.x + this.selected_ball.radius * 1.6, 
                    this.selected_ball.y - this.selected_ball.radius * (0.1 - i)
                )
                comment = comment.slice(16)
                i += 0.15;
            }

            this.p.text(
                comment.join(""),
                this.selected_ball.x + this.selected_ball.radius * 1.6,  
                this.selected_ball.y - this.selected_ball.radius * (0.1 - i)
            )
            i += 0.30;
            this.p.text(
                `취미는 ${this.selected_ball.hobby}(이)에요.`,
                this.selected_ball.x + this.selected_ball.radius * 1.6, 
                this.selected_ball.y - this.selected_ball.radius * (0.1 - i)
            )
        }

        // 첫 번째 view
        
        for(let k=1 ; k<=2 ; k++){

            this.p.noStroke()
            this.p.fill(255, 255, 255);
            this.p.textSize(this.selected_ball.radius * 0.25);

            this.p.text(
                `week${k} : ${this.selected_ball.student.projects[k-1].name}`,
                this.selected_ball.x -  this.p.windowWidth * 0.15,
                this.selected_ball.y + k * this.p.windowHeight
            )

            this.p.image(this.selected_ball.student.projects[k-1].img[0],
                (this.selected_ball.x + this.p.windowWidth) - 0.1*this.p.windowWidth,
                this.selected_ball.y + k * this.p.windowHeight - 0.30*this.p.windowHeight,
                270, 480)

            this.p.textSize(this.selected_ball.radius * 0.15);

            var comment = Object.assign([], 
                this.selected_ball.student.projects[k-1].text[0])        

            let i = 0       
            while(comment.length != 0){
                this.p.text(
                    comment.slice(0, 13).join(""),
                    (this.selected_ball.x + this.p.windowWidth) + 0.15*this.p.windowWidth, 
                    (this.selected_ball.y + k * this.p.windowHeight) + 
                    (i - 0.23) * this.p.windowHeight 
                )
                comment = comment.slice(13)
                i += 0.05;
            }

            // 두 번쨰
            this.p.image(this.selected_ball.student.projects[k-1].img[1],
                (this.selected_ball.x + 2 * this.p.windowWidth) - 0.05 *this.p.windowWidth,
                this.selected_ball.y + k * this.p.windowHeight - 0.35*this.p.windowHeight,
                270, 480)

            this.p.image(this.selected_ball.student.projects[k-1].img[2],
                (this.selected_ball.x + 2 * this.p.windowWidth) + 0.25 *this.p.windowWidth,
                this.selected_ball.y + k * this.p.windowHeight - 0.35*this.p.windowHeight,
                270, 480)
            
            this.p.textSize(this.selected_ball.radius * 0.10);
            var comment = Object.assign([], 
                this.selected_ball.student.projects[k-1].text[1])        

            i = 0        
            while(comment.length != 0){
                this.p.text(
                    comment.slice(0, 35).join(""),
                    (this.selected_ball.x + 2 * this.p.windowWidth) - 0.05*this.p.windowWidth, 
                    (this.selected_ball.y + k * this.p.windowHeight) + 
                    (0.30 - i) * this.p.windowHeight 
                )
                comment = comment.slice(35)
                i -= 0.05;
            }
        }   
    }


    mouseClicked(){
        if(
            this.p.mouseX >= 0.81 * this.p.windowWidth && 
            this.p.mouseX <= 0.81 * this.p.windowWidth 
                            + 0.05 * this.p.windowHeight && 
            this.p.mouseY >= 0.05 * this.p.windowHeight && 
            this.p.mouseY <= 0.10 * this.p.windowHeight     
        ){
            return GO_BACK
        }
        else{
            return STAY
        }
    }

    mousePressed(){
        this.pressed_y = this.p.mouseY;
        this.pressed_x = this.p.mouseX;
    }

    mouseDragged(){
        
        if(this.velocity == 0){
            var dif_x = Math.abs((this.p.mouseY - this.pressed_y))
            var dif_y = Math.abs((this.p.mouseX - this.pressed_x))
            
            if(dif_x > dif_y){
                this.fix_x = true
                this.fix_y = false
            }
            else{
                this.fix_x = false
                this.fix_y = true
            }
        }

        if(
            (this.selected_ball.y + (this.p.mouseY - this.pressed_y) < this.p.windowHeight * 0.45 )&&
            (this.selected_ball.y + (this.p.mouseY - this.pressed_y) >
            - this.p.windowHeight * 1.3) && 
            !this.fix_y && 
            this.selected_ball.x > 0
        ){
            this.selected_ball.y += this.p.mouseY - this.pressed_y
            if((this.p.mouseY - this.pressed_y) < 0)
                this.velocity = -40
            else if((this.p.mouseY - this.pressed_y) > 0)
                this.velocity = 40

            this.pressed_y = this.p.mouseY
        }
        if(
            this.selected_ball.x + (this.p.mouseX - this.pressed_x) <= this.p.windowWidth * 0.3 && !this.fix_x &&
            this.selected_ball.y < 0 
        ){
            this.selected_ball.x += (this.p.mouseX - this.pressed_x)

            if((this.p.mouseX - this.pressed_x) < 0){
                this.velocity = -40
            }
            else if((this.p.mouseX - this.pressed_x) > 0 && this.selected_ball.x < 0){

                this.velocity = 40
            }
            
            this.pressed_x = this.p.mouseX

        }
    }

    mouseReleased(){

    }

}

class ProjectContainer {

}

export { Ball, BallContainer, BallDetail }