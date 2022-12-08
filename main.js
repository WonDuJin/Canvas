const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;


//이미지
let img1 = new Image();
img1.src ='mario.png'
let img2 = new Image();
img2.src = 'goomba.png'

// 마리오 설정
let Mario = {
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
//x축 이동 



//굼바(몬스터) 설정
class Goomba{
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
// Mario.draw()

let timer = 0;
let goombaArray =[];
let jumptimer = 0;
let jump = false;
let animation;
let rightmove = false;
let leftmove = false;
let count = 1;


//프레임단위로 설정을 하기 때문에 함수명 frame
function frame(){
  animation =  requestAnimationFrame(frame)
  timer++;
  
  //캔버스 초기화
  ctx.clearRect(0,0, canvas.width,canvas.height);
  
  //굼바 생성  & 배열에 담기
  if(timer % 120 === 0){    
    let goomba = new Goomba();
    
    goomba.draw();
    //굼바 생성시 배열에 계속해서 추가
    goombaArray.push(goomba);
  }
  console.log(goombaArray)
  
  goombaArray.forEach((element, index, array)=>{
    if(element.x < 0){
      array.splice(index,1)
    }
    element.x -=5;
    
    crash(Mario,element);

    element.draw();
  })
  Mario.draw()
  
  
  if (jump === true){
    Mario.y -=6;
    jumptimer ++;
  }
  if ( jump === false){
    if(Mario.y < 200){
      
      Mario.y +=6;
    }
  }
  // 점프 높이 설정
  if (jumptimer>25){
    jump = false;
    jumptimer = 0;
  }
  
  if (rightmove===true){
    Mario.x +=4;
  } else if (leftmove === true){
    
    Mario.x -=4;
  }
  
}
frame();


//충돌 설정
const crash =(mario,goomba)=>{

  //마리오와 굼바가 충돌했을때 화면이 멈추고 게임오버 
  let xCrash = goomba.x - (mario.x+mario.width);
  let yCrash = goomba.y - (mario.y+mario.height);
  if(xCrash < 0 && yCrash <0 && xCrash > -100){
    if ( yCrash < 0 ){
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
  if(e.code === 'ArrowLeft'){
    leftmove = false;
  }
})