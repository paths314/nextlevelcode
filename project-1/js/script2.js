// some logic taken from: https://codepen.io/sideagle/pen/bGwEXjE?editors=0010 (referred to as NMC)

// --------------------- canvas ------------------------ 
const c = document.getElementById("canvas")
const ctx = c.getContext("2d")
c.width = 1000
c.height = 700

// ------------------ backgrounds -----------------------
const backgrounds = [
  './assets/bg-0.png',
  './assets/bg-1.png',
  './assets/bg-2.png',
  './assets/bg-3.png',
  './assets/bg-4.png',
  './assets/bg-5.png',
  './assets/bg-6-y.png'
]

var img = new Image()
img.src = './assets/bg1.png'

// ---------------------- objects ----------------------
const objects = [
  [],
  [],
  [{ x: 835, y: 100, w: 30, h: 30, visible: true }],
  [{ x: 280, y: 120, w: 30, h: 30, visible: true }, { x: 710, y: 350, w: 30, h: 30, visible: true }],
  [],
  [{ x: 240, y: 345, w: 15, h: 15, visible: true }, { x: 560, y: 240, w: 15, h: 15, visible: true },{ x: 415, y: 470, w: 15, h: 15, visible: true },{ x: 725, y: 560, w: 15, h: 15, visible: true }, { x: 825, y: 190, w: 15, h: 15, visible: true }],
  [],
  []
]


let objectColor = '#FFEF00'

// ----------------------  player ---------------------- 
const players = [
  './assets/char-neutral.png',
  './assets/char-sad.png',
  './assets/char-sad.png',
  './assets/char-angry.png',  
  './assets/char-angry.png',
  './assets/char-bittersweet.png',
  './assets/char-hap.png'
]

var playerImg = new Image()
playerImg.src = './assets/char.png'

let player = { //NMC, manipulated
  x: 100,
  y: 200,
  xv: 0,
  yv: 0,
  w: 90,
  h: 160
}

// ----------------------- ground ----------------------- 
let ground = []
var groundColor = '#383838'
ground = [ //NMC, manipulated
  {
    x: 0,
    y: 250,
    w: 300,
    h: 50
  }
]

const falseGround = [
  [],
  [],
  [{ x: 700, y: 300, w: 100, h: 50, visible: true }],
  [],
  [],
  [],
  [],
  []
]

// ----------------- keydown event -----------------------
let keysDown = {}
addEventListener("keydown", function (event) {
  keysDown[event.key] = true
})

addEventListener("keyup", function (event) {
  delete keysDown[event.key]
})


// ----------------------- levels ------------------------- //NMC, manipulated
let level = 0
let createLevel = () => {

  //.......... LEVEL 0 ..........

  if(level == 0){
    img.src = backgrounds[level]
    playerImg.src = players[level]

    ground = [
      {
        x: 0,
        y: 640,
        w: 1000,
        h: 60
      }
    ]
  }

  //.......... LEVEL 1 ..........

  if(level == 1){
    img.src = backgrounds[level]
    playerImg.src = players[level]

    ground = [
      {
        x: 0,
        y: 640,
        w: 1000,
        h: 60
      }
    ]
  }

  //.......... LEVEL 2 ..........

  if(level == 2){
    img.src = backgrounds[level]
    playerImg.src = players[level]

    ground = [
      {
        x: 0,
        y: 640,
        w: 1000,
        h: 60
      },
      {
        x: 300,
        y: 500,
        w: 100,
        h: 50
      },
      {
        x: 500,
        y: 400,
        w: 100,
        h: 50
      },
      // {
      //   x: 700,
      //   y: 300,
      //   w: 100,
      //   h: 50
      // },
      {
        x: 800,
        y: 150,
        w: 100,
        h: 50
      }
    ]
  }

  //.......... LEVEL 3 ..........
  if(level == 3){
    img.src = backgrounds[level]
    playerImg.src = players[level]

    ground = [
      {
        x: 0,
        y: 640,
        w: 1000,
        h: 60
      },
      {
        x: 250,
        y: 500,
        w: 100,
        h: 50
      },
      {
        x: 680,
        y: 400,
        w: 100,
        h: 50
      }
    ]
  }

  //.......... LEVEL 4 ..........

  if(level == 4){
    img.src = backgrounds[level]
    playerImg.src = players[level]

    ground = [
      {
        x: 0,
        y: 640,
        w: 1000,
        h: 60
      },
      {
        x: 150,
        y: 500,
        w: 140,
        h: 150
      },
      {
        x: 400,
        y: 400,
        w: 40,
        h: 50
      },
      {
        x: 700,
        y: 400,
        w: 450,
        h: 390
      },
      {
        x: 800,
        y: 300,
        w: 450,
        h: 390
      },
      {
        x: 900,
        y: 200,
        w: 450,
        h: 390
      }
    ]
  }

  //.......... LEVEL 5 ..........

  if(level == 5){
    img.src = backgrounds[level]
    playerImg.src = players[level]

    ground = [
      {
        x: 0,
        y: 640,
        w: 1000,
        h: 60
      },
      {
        x: 450,
        y: 500,
        w: 100,
        h: 50
      },
      {
        x: 700,
        y: 350,
        w: 100,
        h: 50
      }
    ]
  }

  //.......... LEVEL 6 ..........

  if(level == 6){
    img.src = backgrounds[level]
    playerImg.src = players[level]

    ground = [
      {
        x: 0,
        y: 640,
        w: 1000,
        h: 60
      },
      {
        x: 999.9,
        y: 0,
        w: 0.1,
        h: 700
      }
    ]
  }
}

//----------------------- mechanics -------------------------

//collision function //NMC, unchanged
let colliding = (object) => {
  if (player.x + player.w >= object.x &&
  player.x <= object.x + object.w &&
  -player.y + player.h >= object.y &&
  -player.y <= object.y + object.h) {
    return true
  }
  
  return false
}

//update; physics, collision detection //NMC, unchanged
let iteration = 0
let onground = 0

let update = () => {
  iteration += 1

  //collision with collectable objects //NMC, unchanged
  objects[level].forEach(object => {
    if (object.visible && colliding(object)) {
      object.visible = false
    }
  });

  falseGround[level].forEach(fg => {
    if (fg.visible && colliding(fg)) {
      fg.visible = false
    }
  });


  //gravity //NMC, unchanged
  player.yv -= 1
  player.y += player.yv
  for(let i = 0; i < ground.length; i++){
    if(player.yv < 0){
      while(colliding(ground[i])){
        player.y += 1
        player.yv = 0
        onground = iteration
      }
    }else {
      while(colliding(ground[i])){
        player.y -= 1
        player.yv = 0
      }
    }
  }

  //movement (left/right) 
  if(keysDown["ArrowRight"] || keysDown["d"] || keysDown["D"]){
    player.xv = 10
  }
  if(keysDown["ArrowLeft"] || keysDown["a"] || keysDown["A"]){
    player.xv = -10
  }

  //NMC, manipulated
  player.xv *= 0.7
  player.x += player.xv
  for(let i = 0; i < ground.length; i++){
    if(colliding(ground[i])) {
      player.x -= player.xv
      player.xv = 3
    }
  }

  // stops player from moving out of left frame  //NMC, unchanged
  if(player.x < 1){
    player.x = 1
  }

  // jumping //NMC, manipulated
  for(let i = 0; i < ground.length; i++){
    if(onground > iteration - 3 && keysDown['ArrowUp'] || onground > iteration - 3 && keysDown[' '] || onground > iteration - 3 && keysDown['w'] || onground > iteration - 3 && keysDown['W']){
      player.yv = 18
    }
  }

  let reset = () => {
    player.y = -600
    player.x = 0
    player.xv = 0
    player.yv = 0
  }

  //makes next level when character is out of screen
  if(player.x > 1000){
    level += 1
    reset()
  }
}

//draw function
let draw = () => {
  //draw bg
  ctx.drawImage(img, 0, 0, c.width, c.height)

  //draw player
  ctx.drawImage(playerImg, player.x, 0 - player.y, player.w, player.h)

  //draw ground
  ctx.fillStyle = groundColor
  for(let i = 0; i < ground.length; i++){
    ctx.fillRect(ground[i].x, ground[i].y, ground[i].w, ground[i].h)
  }

  //draw false ground
  falseGround[level].forEach(fg => {
    if (fg.visible) {
      ctx.fillStyle = groundColor
      ctx.fillRect(fg.x, fg.y, fg.w, fg.h)
    }
  })

  //draw objects
  objects[level].forEach(object => {
    if (object.visible) {
      ctx.fillStyle = objectColor
      ctx.fillRect(object.x, object.y, object.w, object.h)
    }
  })

}

//game loop //NMC, unchanged
let loop = () => {
  createLevel()
  draw()
  update()
  requestAnimationFrame(loop)
}

loop()