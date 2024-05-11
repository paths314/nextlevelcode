// SOURCE CODE (manipulated): https://codepen.io/Thibka/pen/PmaLOZ?editors=0010

// MY CODE

var coverImage = new Image();
coverImage.src = "'https://t3.ftcdn.net/jpg/04/63/51/28/360_F_463512856_GEk2IrQkYatpRVR9YDhiZgRY2z00Zet3.jpg'";

var imagesrcs = ["./assets/cover.png", "./assets/img3.jpg", "./assets/img2.jpg"];
var currentImageIndex = 0; 

$(document).ready(function(){
  var gavelInit = "./assets/gavel-03.png"
  var gavelClicked = "./assets/gavel-04.png"

  // Follow the cursor
  $(document).mousemove(function(e) {

    var imageWidth = $("#gavel").width();
    var imageHeight = $("#gavel").height();
    var newX = e.pageX - (imageWidth / 2);
    var newY = e.pageY - 4;
    
      $("#gavel").css({left: newX, top: newY + "px"});

  });

  // Change image on click
  $(document).mousedown(function() {
      $("#gavel").attr("src", gavelClicked);
  });

  // Revert to init image when released
  $(document).mouseup(function() {
      $("#gavel").attr("src", gavelInit);
  });

  // Revert the image if the cursor leaves the window while clicking
  $(document).mouseleave(function() {
      $("#gavel").attr("src", gavelInit);
  });
})

// $(function() {
//   var $gavel = $("#gavel"); // Cache the jQuery object

//   $("canvas").on("mouseenter", function() {
//       $gavel.show(); // Show the gavel when mouse enters the canvas
//   }).on("mouseleave", function() {
//       $gavel.hide(); // Hide the gavel when mouse leaves the canvas
//   }).mousemove(function(e) {
//       // Update gavel position only when mouse is over the canvas
//       $gavel.css({left: e.pageX, top: e.pageY});
//   });
// });

// $(document).mousemove(function(e){
//   $("#gavel").css({left:e.pageX, top:e.pageY});
// });

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight * 0.7,
    // HEIGHT = 700,
    DIAG = Math.sqrt(WIDTH * WIDTH + HEIGHT * HEIGHT),
    chips = [],
    pieces = [];
    falling = false,
    fallSpeed = 0,
    fallAcceleration = 0.5;

canvas.width = WIDTH;
canvas.height = HEIGHT;

var canCreateCracks = true;

// NOT MY CODE

function degToRad(deg) {
  return deg * (Math.PI / 180);
}

function setCanvasSize() {
  WIDTH = document.documentElement.clientWidth;
  HEIGHT = document.documentElement.clientHeight;                   
  DIAG = Math.sqrt(Math.pow(WIDTH, 2) + Math.pow(HEIGHT, 2));
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
}

// Chip class definition
function Chip(id, x, y) {
  this.id = id;
  this.x = x;
  this.y = y;
  this.cracks = [];
  this.cracksLength;
  this.interCracks = [];
  this.interCracksLength = Math.floor(Math.random() * 100) + 50;
  this.maxCrackGap = 45;
}

Chip.prototype.init = function() {
  var dir = 0, i = 0;
  while (dir < 360) {
    if (i == 0) dir = Math.floor(Math.random() * this.maxCrackGap);
    else dir += Math.floor(Math.random() * this.maxCrackGap);
    this.cracks[i] = new Crack(this.id, i, dir);
    if (i > 0) pieces[i - 1] = new Piece(this.id, i - 1, this.cracks[i - 1].dir, this.cracks[i].dir);
    i++;
  }
  pieces[i - 1] = new Piece(this.id, i - 1, this.cracks[i - 1].dir, this.cracks[0].dir);
  this.cracksLength = i - 1;
  for (var u = 0; u < this.interCracksLength; u++) {
    var randomCrackId_1 = Math.floor(Math.random() * (this.cracksLength - 1));
    var randomCrackId_2 = randomCrackId_1 + 1;
    this.interCracks[u] = new InterCrack(this.id, u, randomCrackId_1, randomCrackId_2);
  }
};

// Crack class definition
function Crack(parentChip, id, dir) {
  this.parentChip = parentChip;
  this.id = id;
  this.dir = dir;
  this.distanceFromCenter = Math.floor(Math.random() * 10);
  this.x = chips[this.parentChip].x;
  this.y = chips[this.parentChip].y;
  
  this.length = DIAG;
  this.segments = Math.floor(Math.random() * 2);
  
  this.endX = this.x + Math.cos(degToRad(this.dir)) * this.length;
  this.endY = this.y + Math.sin(degToRad(this.dir)) * this.length;
  
  this.draw();
}

Crack.prototype.draw = function() {
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.endX, this.endY);
  ctx.strokeStyle = "white";
  var line_width = Math.random();
  if (line_width < .3) ctx.lineWidth = 0.3;
  else if (line_width >= .3 && line_width <= .8) ctx.lineWidth = 0.3;
  else if (line_width > .8) ctx.lineWidth = 0.5;
  ctx.stroke();
  ctx.closePath();
};

// InterCrack class definition
function InterCrack(parentChipId, id, parentCrack_1, parentCrack_2) {
  this.parentChipId = parentChipId;
  this.id = id;
  this.parentCrack_1 = parentCrack_1;
  this.parentCrack_2 = parentCrack_2;
  
  this.distanceFromCenter = Math.floor(Math.random() * Math.max(WIDTH, HEIGHT)) + 10;
  var parentChip = chips[this.parentChipId];
  var parentCrack_1 = parentChip.cracks[this.parentCrack_1];
  var parentCrack_2 = parentChip.cracks[this.parentCrack_2];
  this.x = parentChip.x + Math.cos(degToRad(parentCrack_1.dir)) * this.distanceFromCenter;
  this.y = parentChip.y + Math.sin(degToRad(parentCrack_1.dir)) * this.distanceFromCenter;
  
  this.endX = parentChip.x + Math.cos(degToRad(parentCrack_2.dir)) * this.distanceFromCenter;
  this.endY = parentChip.y + Math.sin(degToRad(parentCrack_2.dir)) * this.distanceFromCenter;  
  
  this.draw();
}

InterCrack.prototype.draw = function() {
  ctx.beginPath();
  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.endX, this.endY);
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.closePath();
};

// Piece class definition
function Piece(chipId, id, dir1, dir2) {
    this.chipId = chipId;
  this.id = id;
  this.dir1 = dir1;
  this.dir2 = dir2;
  
  this.draw = function() {
    var chip = chips[this.chipId];
    var x = chip.x; // Central point of the crack
    var y = chip.y;
    console.log(`Draw piece for chip ${this.chipId} between directions ${this.dir1} and ${this.dir2}`);
  };
}

// MY CODE

function makeCracksFall() {
  if (!falling) return; // Stop function if not set to fall

  ctx.clearRect(0, 0, WIDTH, HEIGHT + fallSpeed); // Clear canvas
  fallSpeed += fallAcceleration; // Increase fall speed to simulate acceleration
  
  // Adjust positions of chips and their cracks, then redraw them
  chips.forEach(function(chip) {

    chip.cracks.forEach(function(crack) {
      crack.y += fallSpeed; // Adjust crack's vertical position
      crack.endY += fallSpeed; // Adjust crack's end vertical position
      crack.draw(); // Redraw the crack at its new position
    });

    chip.interCracks.forEach(function(interCrack) {
      // Similarly adjust interCrack positions and redraw
      interCrack.y += fallSpeed;
      interCrack.endY += fallSpeed;
      interCrack.draw();
    });
  });

  if (HEIGHT + fallSpeed < HEIGHT * 2) {
    requestAnimationFrame(makeCracksFall); // Continue animation if the bottom hasn't been reached
    canvas.style.backgroundImage ="url('https://t3.ftcdn.net/jpg/04/63/51/28/360_F_463512856_GEk2IrQkYatpRVR9YDhiZgRY2z00Zet3.jpg')"

  } else {
    falling = false; // Stop falling when the condition is met
    canCreateCracks = false;
  }
  canCreateCracks = false;
}

// Initialize event listener for canvas clicks

var debounceTimer;

document.addEventListener("click", function(e) {
  clearTimeout(debounceTimer);

  if (!canCreateCracks) {
    return; // Exit the function if new cracks are not allowed
  }

  var chipId = chips.length; // Assign a new ID based on current chips array length
  chips[chipId] = new Chip(chipId, e.clientX, e.clientY);
  chips[chipId].init();
  console.log(chips.length)

  if (chips.length == 4){
    // falling = true;
    canvas.style.backgroundImage ="url('https://t3.ftcdn.net/jpg/04/63/51/28/360_F_463512856_GEk2IrQkYatpRVR9YDhiZgRY2z00Zet3.jpg')"
    return;
  }

  debounceTimer = setTimeout(function() {
    chips = [];
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    // canvas.style.backgroundImage ="url('./assets/cover.png')"
    
    currentImageIndex = (currentImageIndex + 1) % imagesrcs.length;
    canvas.style.backgroundImage = `url('${imagesrcs[currentImageIndex]}')`;

  }, 3000); //3000
})

// Resize listener to adjust canvas size dynamically
window.addEventListener('resize', setCanvasSize);
