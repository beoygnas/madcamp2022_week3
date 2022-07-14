import React from "react";
import Sketch from "react-p5";

const Bounce = () => {

  const setup = (p, canvasParentRef) => {
    p.createCanvas(800, 800);
    p.background("gray");

    p.stroke("black");
    p.fill('white');
    p.strokeWeight(3);
    
    p.balls = Array();
    for(let i=0 ; i<5 ; i++){
      var obj = new Object;
      obj.x = p.random(800);
      obj.y = p.random(800);
      obj.r = 50;
      obj.xdir = p.random(20) - 10;
      obj.ydir = p.random(20) - 10;
      
      obj.dist = Array();
      for(let j=0; j < i;j++){
        var distance = p.pow(p.balls[j].x - obj.x, 2) + p.pow(p.balls[j].y - obj.y, 2);
        p.balls[j].dist.push(distance);
        obj.dist.push(distance);
        }
        obj.dist.push(0);
        p.balls.push(obj);
    }
  };


  const draw = (p) => {
    // p.background(180, 0, 180);
    // p.circle(p.mouseX, p.mouseY, 50);
        
    p.background("gray");
    for(let i=0; i<5;i++){

        for(let j = 0; j < 5 ; j++){
            if(i == j) continue;
            console.log(`${i} : ${p.balls[i].dist}`);
            if(p.balls[i].dist[j] < 50*50){
                
                if(p.balls[i].x > p.balls[j].x)
                    p.balls[i].xdir = p.random(10);
                else 
                    p.balls[i].xdir = -p.random(10);
                
                if(p.balls[i].y > p.balls[j].y)
                    p.balls[i].ydir = p.random(10);
                else 
                    p.balls[i].ydir = - p.random(10);
            }
        }

        //부딪히지 않는 경우
        if(p.balls[i].x<=0 && p.balls[i].y<=0){
            p.balls[i].xdir = p.random(10);
            p.balls[i].ydir = p.random(10);
        }
        else if(p.balls[i].x>=800 && p.balls[i].y>=800){
            p.balls[i].xdir = -p.random(10);
            p.balls[i].ydir = -p.random(10);
        }
        else if(p.balls[i].x>=800 && p.balls[i].y <= 0){
            p.balls[i].xdir = -p.random(10);
            p.balls[i].ydir = p.random(10);
        }
        else if(p.balls[i].x<=0 && p.balls[i].y>=800){
            p.balls[i].xdir = p.random(10);
            p.balls[i].ydir = -p.random(10);
        }
        else if(p.balls[i].x<=0 && p.balls[i].y>0){
            p.balls[i].xdir = p.random(10);
        }
        else if(p.balls[i].x>0 && p.balls[i].y<=0){
            p.balls[i].ydir = p.random(10);
        }
        else if(p.balls[i].x>=800 && p.balls[i].y>0){
            p.balls[i].xdir = -p.random(10);
        }
        else if(p.balls[i].x>0 && p.balls[i].y>=800){
            p.balls[i].ydir = -p.random(10);
        }
    
        p.balls[i].x = p.balls[i].x + p.balls[i].xdir;
        p.balls[i].y = p.balls[i].y + p.balls[i].ydir;
    
        p.circle(p.balls[i].x, p.balls[i].y, 50); 
    }

    for(let i=0 ; i<5 ;i++){
        for(let j=0 ; j<5 ; j++){
            p.balls[i].dist[j] = p.pow(p.balls[j].x - p.balls[i].x, 2) + p.pow(p.balls[j].y - p.balls[i].y, 2);
        }
    }
  };

  
  return (
    <div>
      <Sketch setup={setup} draw={draw} />
    </div>
  );



};

export default Bounce;
