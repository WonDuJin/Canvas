const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

let dino = {
  x: 10,
  y: 200,
  width : 50,
  height : 50,
  draw(){
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x,this.y,this.width,this.height);
  }
}
dino.x += 1;
dino.draw()

class Cactus{
  constructor(){
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw(){
    ctx.fillStyle = 'gray';
    ctx.fillRect(this.x,this.y,this.width,this.height);
    ctx.drawImage()
  }
}

let cactus = new Cactus();
cactus.draw();

let timer = 0;
let cactusArray =[];
let jumptimer = 0;
let jump = false;
let animation;

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
    dino.y -=3;
    jumptimer ++;
  }
  if ( jump === false){
    if(dino.y < 200){

      dino.y +=3;
    }
  }
  if (jumptimer>50){
    jump = false;
    jumptimer = 0;
  }
  

  
}



frame();

const crash =(dino,cactus)=>{
  let xCrash = cactus.x - (dino.x+dino.width);
  let yCrash = cactus.y - (dino.y+dino.height);

  if(xCrash < 0 && yCrash < 0){
    ctx.clearRect(0,0, canvas.width,canvas.height);
    cancelAnimationFrame(animation)
    alert("게임오버")
  }
}


document.addEventListener('keydown',(a)=>{
  if(a.code === 'Space'){
    jump = true;
  }
})