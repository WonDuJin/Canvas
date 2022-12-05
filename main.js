const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let img1 = new Image();
img1.src ='mario.png'
let img2 = new Image();
img2.src = 'goomba.png'

let dino = {
  x: 10,
  y: 200,
  width : 50,
  height : 50,
  draw(){
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x,this.y,this.width,this.height);
    ctx.drawImage(img1,this.x,this.y)
    
  }
}
dino.x += 1;
dino.draw()

class Cactus{
  constructor(){
    this.x = 1500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw(){
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x,this.y,this.width,this.height);
    ctx.drawImage(img2,this.x,this.y)

    
  }
}

let cactus = new Cactus();
cactus.draw();

let timer = 0;
let cactusArray =[];
let jumptimer = 0;
let jump = false;
let animation;
let rightmove = false;
let leftmove = false;



function frame(){
  animation =  requestAnimationFrame(frame)
  timer++;
  
  ctx.clearRect(0,0, canvas.width,canvas.height);
  
  
  if(timer % 120 === 0){    
    let cactus = new Cactus();
    cactusArray.push(cactus);
  }
  
  cactusArray.forEach((e, i, o)=>{
    if(e.x < 0){
      o.splice(i,1)
    }
    e.x -=2;

    crash(dino,e);

    e.draw();
  })
  dino.draw()


  if (jump === true){
    dino.y -=6;
    jumptimer ++;
  }
  if ( jump === false){
    if(dino.y < 200){

      dino.y +=6;
    }
  }

  if (jumptimer>25){
    jump = false;
    jumptimer = 0;
  }
  
  if (rightmove===true){
    dino.x +=4;
  } else if (leftmove === true){
    dino.x -=4;
  }
  
}



frame();

const crash =(dino,cactus)=>{
  let xCrash = cactus.x - (dino.x+dino.width);
  let yCrash = cactus.y - (dino.y+dino.height);
  if(xCrash < 0 && yCrash <0 && xCrash > -100){
    if ( yCrash <= 0 ){
      ctx.clearRect(0,0,canvas.width,canvas.height)
    }else{

      ctx.clearRect(0,0, canvas.width,canvas.height);
      cancelAnimationFrame(animation)
      alert("게임오버")
    }

  }


}




document.addEventListener('keydown',(a)=>{
  if(a.code === 'Space'){
    jump = true;
  }else if(a.code === 'ArrowRight'){
    rightmove = true;
  }else if(a.code === 'ArrowLeft'){
    leftmove = true;
  }
  
})

document.addEventListener('keyup',(e)=>{
  if(e.code === 'ArrowRight'){
    rightmove = false;
  }
  if(e.code === 'ArrowRight'){
    leftmove = false;
  }
})