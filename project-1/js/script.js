// base code: https://codepen.io/sideagle/pen/bGwEXjE?editors=0010 (used for different levels)
// other ref: https://codepen.io/Shruti-Pathak/pen/bGZYPJN

// canvas
const c = document.getElementById("canvas")
const ctx = c.getContext("2d")
c.width = 1000
c.height = 700

// backgrounds, lvl 1-7
const backgrounds = [
  './assets/bg1.png',
  './assets/bg2.jpg',
  './assets/bg2.jpg',
  './assets/bg2.jpg',
  './assets/bg2.jpg',
  './assets/bg2.jpg',
  './assets/bg2.jpg',
  './assets/bg1.png'
]

var img = new Image()
img.src = './assets/bg1.png'

// keysPressed
let keysDown = {}
addEventListener("keydown", function (event) {
  keysDown[event.keyCode] = true
})

addEventListener("keyup", function (event) {
  delete keysDown[event.keyCode]
})


// player 
const playerImg = new Image()
playerImg.src = './assets/char.png'


let player = {
  x: 20,
  y: 20,
  xv: 0,
  yv: 0,
  w: 20,
  h: 33
}

// ground 
let ground = []
var groundColor = 'red'
ground = [
  {
    x: 0,
    y: 250,
    w: 300,
    h: 50
  }
]


//levels
let level = 0

let createLevel = () => {
  if(level == 7){
    img.src = backgrounds[level]
    groundColor = 'yellow'
    ground = [
      {
        x: 0,
        y: 250,
        w: 300,
        h: 50
      }
    ]
  }

  if(level == 6){
    ground = [
      {
        x: 0,
        y: 180,
        h: 120,
        w: 60
      },
      {
        x: 75,
        y: 210,
        h: 90,
        w: 60
      },
      {
        x: 150,
        y: 230,
        h: 70,
        w: 50
      },
      {
        x: 150 + 75,
        y: 250,
        h: 50,
        w: 80
      }
    ]
  }

  if(level == 5){
    ground = [
      {
        x: 0,
        y: 250,
        h: 50,
        w: 50
      },
      {
        x: 75,
        y: 230,
        h: 70,
        w: 50
      },
      {
        x: 150,
        y: 210,
        h: 90,
        w: 60
      },
      {
        x: 240,
        y: 180,
        h: 120,
        w: 110
      }
    ]
  }

  if(level == 4){
    ground = [
      {
        x: 0,
        y: 250,
        w: 100,
        h: 50
      },
      {
        x: 125,
        y: 185,
        w: 31,
        h: 25
      },
      {
        x: 250,
        y: 250,
        w: 50,
        h: 50
      }
    ]
  }

  if(level == 3){
    ground = [
      {
        x: 100,
        y: 0,
        w: 150,
        h: 200
      },
      {
        x: 0,
        y: 250,
        h: 50,
        w: 50
      },
      {
        x: 75,
        y: 250,
        h: 50,
        w: 50
      },
      {
        x: 164,
        y: 250,
        h: 50,
        w: 80
      },
      {
        x: 240,
        y: 250,
        h: 50,
        w: 60
      }
    ]
  }

  if(level == 2){
    console.log('Level 2')
    groundColor = 'pink'
    ground = [
      //right
      {
        x: 290,
        y: 150,
        w: 10,
        h: 150
      },
      //bottom
      {
        x: 0,
        y: 250,
        w: 600,
        h: 50
      },
      //center
      {
        x: 125,
        y: 200,
        w: 50,
        h: 50
      },
      //left - platform
      {
        x: 30,
        y: 150,
        w: 60,
        h: 30
      },
      //right - platform
      {
        x: 230,
        y: 150,
        w: 60,
        h: 30
      },
      //center - platform
      {
        x: 600/2 - 25,
        y: 100,
        w: 50,
        h: 30
      }
    ]
  }

  if(level == 1){
    console.log('Level 1')
    img.src = backgrounds[level]
    groundColor = 'blue'
    ground = [
      {
        x: 0,
        y: 250,
        h: 50,
        w: 50
      },
      {
        x: 75,
        y: 250,
        h: 50,
        w: 50
      },
      {
        x: 150,
        y: 250,
        h: 50,
        w: 60
      },
      {
        x: 240,
        y: 250,
        h: 50,
        w: 60
      }
    ]
  }
    
  if(level == 0){
    // console.log('Level 0')
    img.src = backgrounds[level]
    groundColor = 'yellow'
    ground = [
      {
        x: 0,
        y: 250,
        w: 300,
        h: 50
      }
    ]
  }
}


//collision function 
let colliding = (object) => {
  if (player.x + player.w >= object.x &&
  player.x <= object.x + object.w &&
  -player.y + player.h >= object.y &&
  -player.y <= object.y + object.h) {
    return true
  }
  
  return false
}

//update; physics, collision detection
let iteration = 0
let onground = 0
let update = () => {
  iteration += 1

  //gravity
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
  if(39 in keysDown){
    player.xv = 4
  }
  if(37 in keysDown){
    player.xv = -4
  }

  player.xv *= 0.8
  player.x += player.xv
  for(let i = 0; i < ground.length; i++){
    if(colliding(ground[i])) {
      player.x -= player.xv
      player.xv = 0
    }
  }

  // stops player from moving out of left frame
  if(player.x < 1){
    player.x = 1
  }

  // jumping
  for(let i = 0; i < ground.length; i++){
    if(onground > iteration - 3 && 38 in keysDown){
      player.yv = 12
    }
  }

  let reset = () => {
    player.y = 10
    player.x = 15
    player.xv = 0
    player.yv = 0
  }

  //die if falls into lava
  if(player.y < -300 + Math.cos(iteration * 0.1) * 15){
    reset()
  }

  //makes next level when character is out of screen
  if(player.x > 300){
    level += 1
    reset()
  }
}

//render shapes
let draw = () => {
    //draw background
    ctx.drawImage(img, 0, 0, c.width, c.height)

    //draw player
    ctx.drawImage(playerImg, player.x, 0 - player.y, player.w, player.h)

    //draw lava
    // ctx.fillStyle = 'coral'
    // ctx.fillRect(0, 290, 300, 10)

    //draw ground
    // ctx.fillStyle = 'grey'
    ctx.fillStyle = groundColor

    for(let i = 0; i < ground.length; i++){
        ctx.fillRect(ground[i].x, ground[i].y, ground[i].w, ground[i].h)
    }
}

//game loop
let loop = () => {
  createLevel()
  draw()
  update()
  requestAnimationFrame(loop)
}

loop()
