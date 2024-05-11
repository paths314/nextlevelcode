// NOTES: 
// I couldn't download the typeface for the sauce labels and the information at the bottom, so I had to use images.
// I designed this for a maximum of 4 sauces
// I've added pasta images to my CMS to show how it'd look, but for the actual packaging it would be a cutout.

// -----------------------------------------------------------------------------------------------

// CMS variables
let sheetID = "1dICJSPs2exnalk_pRSTAbGJMYATr8viuNXmocUrup4I";
let tabName = 'Sheet1'
let opensheet_uri = `https://opensheet.elk.sh/${sheetID}/${tabName}`


// Main variables
let sauces = ['Oil', 'Pesto', 'Tomato', 'Cream', 'Vegetable', 'Meat', 'Pumpkin']
let sauceImages = []

let pasta, consistency, chosenSauces
let pastaImg = "assets/pastaimages/saffron.png"


// -------------------------- INFO FROM CMS -----------------------------

function loadSauceImages(sauces) {
  let imagePromises = sauces.map(sauce => {
      return new Promise((resolve, reject) => {
          let img = loadImage(`./assets/saucelabels/${sauce}.png`, () => {
              resolve(img); // Resolve each image promise once it's loaded
          });
      });
  });

  // Wait for all images to load
  Promise.all(imagePromises).then(images => {
      sauceImages = images; // Set the global sauce images array
      redraw(); // Redraw the canvas to reflect the updated images
  }).catch(error => {
      console.error("Failed to load images", error);
  });
}

// Event listener for form submission
document.getElementById('rowSelectorForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from actually submitting

  fetch(opensheet_uri)
      .then(response => response.json())
      .then(data => {
          const pastaData = data[parseInt(document.getElementById('rowDataSelect').value)]; // Use selected value to index data
          pasta = pastaData.Pasta;
          consistency = pastaData.Consistency;
          chosenSauces = pastaData.Sauces.split(',').map(sauce => sauce.trim());
          loadSauceImages(chosenSauces); // Load images and then draw
      })
      .catch(err => {
          console.log("Something went wrong!", err);
      });
});


//Determine line overlap and width
let minYchange = 20; 
let maxYchange = 2;
let rotStripe = 0; //rotation of each stripe (10,90)

//Extra
let lines = true;
let colRand = false; //true = random; false = palette
let colorLines = true; //false for black lines
let filling = true; // color fill
let sw = 0; // stroke width
let strokeColor
let extraBlack = -2; //1 for some black line and white fills; 0 in between; -2 for no b&w;
let r, g, b;
let y1,y2,y3,y4,y5,y6

let canvasContainer = document.getElementById('canvas-container')


// -------------------------- CHANGE OPACITY -----------------------------

let a = 255; //opacity
let table;


function preload() {
  table = loadTable("colors.csv", "csv", "header");
  logo = loadImage("assets/logo.png")
  font = loadFont("assets/font.ttf");
  // pastaImg = loadImage("assets/pastaimages/pasta4.svg")
  pastaImg = loadImage(pastaImg)
  info = loadImage("assets/info.png")
}

function setup() {
  
  // let canvas = createCanvas(windowWidth-20, windowHeight-20);
  let canvas = createCanvas(600, 890);
  canvas.parent(canvasContainer)
  // 600, 900
  logo.drawingContext.fillStyle = '#90AD67'
  
  console.log(width)
  
  canvas.mousePressed(draw);
}

// ------------------------- SAUCE THICKNESS ---------------------------

function sauceAdjustment(){
  if(consistency =='Light'){
    minYchange = 10; 
    maxYchange = 50;
    y1 += random(20, 20); // More jagged
    y3 += random(40, 50); // More jagged
    y5 += random(-10, 50); // More jagged
    
  }
  
  else if(consistency == 'Medium'){
    minYchange = 5; 
    maxYchange = 90;
    y1 += random(-20, 10); // More jagged
    y3 += random(10, 30); // More jagged
    y5 += random(-10, 10); // More jagged
  }
  
    else if(consistency == 'Heavy'){
    minYchange = 20; 
    maxYchange = 140;
    y1 += random(-20, 50); // More jagged
    y3 += random(-10, -5); // More jagged
    y5 += random(-10, 0); // More jagged
  }
}

// --------------------------- SAVE CANVAS -----------------------------

function keyTyped() {
  if (key == "s") {
    save("myCanvas.jpg");
  }
}

// -------------------- RESPONSIVE SAUCE LABEL GRID -----------------------

function drawSauceGrid() {
  imageMode(CORNER)
  let maxImageSize = 100;
  let padding = 16;
  let numCols = sauceImages.length; 
  let totalWidth = 0; 

  // Get total width including padding
  let adjustedSizes = sauceImages.map(img => {
    let w = img.width;
    let h = img.height;
    let aspectRatio = w / h;
    if (w > h) { // landscape or square
      w = maxImageSize;
      h = w / aspectRatio;
    } else { // portrait
      h = maxImageSize;
      w = h * aspectRatio;
    }
    totalWidth += (w + padding); // Add padding to each image's width
    return {w, h}; // Store adjusted sizes
  });
  totalWidth -= padding; // Remove last padding

  let startX = (width - totalWidth) / 2; // Center grid horizontally
  let startY = height - maxImageSize - 80; // Position grid to bottom
  let x = startX;

  // Draw
  for (let i = 0; i < numCols; i++) {
    let img = sauceImages[i];
    let size = adjustedSizes[i];
    image(img, x, startY, size.w, size.h);
    x += (size.w + padding); 
  }
}

// ------------------------- DRAW FUNCTION --------------------------
function draw(){
  clear()
  
  if (lines == true) {
    strokeWeight(sw);
  } else {
    noStroke();
  }
  
  angleMode(DEGREES);
  let end = height / 2 + 500; // Where lines stop
  
  let layers = chosenSauces.length

  for (let i = 0; i < layers; i++) {    

    
  // Equal ratio of sauces
    
    if (i == 0) {
      y1 = -height / 2 - 300;
    } else {
      y1 = -height / 2 + (height / layers) * i;
    }
    
        // Starting height for each layer
      y2 = y1
      y3 = y1
      y4 = y1
      y5 = y1
      y6 = y1
    
    
  // Get palette
    

    let sauce = chosenSauces[i];
    let paletteIndex = sauces.indexOf(sauce);
  
    let rotLayer = random(30,-30);// Layer rotation
    let rotThisStripe = 0;

    // Keep going until all the lines are at the bottom
    while (
      (y1 < end) &
      (y2 < end) &
      (y3 < end) &
      (y4 < end) &
      (y5 < end) &
      (y6 < end) &
      (-maxYchange < minYchange)
    ) {
      y1 += random(minYchange, maxYchange);
      y2 += random(minYchange, maxYchange);
      y3 += random(minYchange, maxYchange);
      y4 += random(minYchange, maxYchange);
      y5 += random(minYchange, maxYchange);
      y6 += random(minYchange, maxYchange);
      
      sauceAdjustment()
      
      if (colRand == true) {
        r = random(256);
        g = random(256);
        b = random(256);
      } else {
        let col = floor(random(4));
        col = floor(random(5 + extraBlack));
        r = table.get(paletteIndex, col * 3);
        g = table.get(paletteIndex, col * 3 + 1);
        b = table.get(paletteIndex, col * 3 + 2);
        
        strokeColor = color(int(table.get(paletteIndex, 0)), int(table.get(paletteIndex, 1)), int(table.get(paletteIndex, 2)), a);
      }
      
      if (filling == true) {
        fill(r, g, b, a);
      } else {
        noFill();
      }
      
      if (colorLines == true) {
        stroke(r, g, b, a);
      }  

      push();
      
      translate(width / 2, height / 2);
      rotThisStripe += rotStripe; // Rotate after each stripe
      rotate(rotThisStripe + rotLayer);
      let xStart = -width / 2;
      
      beginShape();
      
      curveVertex(xStart - 300, height / 2 + 500);
      curveVertex(xStart - 300, y1);
      curveVertex(xStart + (width / 5) * 1, y2);
      curveVertex(xStart + (width / 5) * 2, y3);
      curveVertex(xStart + (width / 5) * 3, y4);
      curveVertex(xStart + (width / 5) * 4, y5);
      curveVertex(width / 2 + 300, y6);
      curveVertex(width / 2 + 300, height / 2 + 500);
      
      endShape(CLOSE);
      
      pop();
      
      // Text
      
      textSize(50)
      fill('white')
      textAlign(CENTER)
      textFont(font)
      strokeWeight(1)
      stroke('white')
      text(pasta, width/2, 680)  
    
    }
  }
  
  // Logo
    
  fill('white')
  stroke('white')
  ellipse(width/2,130,440,170)
      
  imageMode(CENTER)
  image(logo, width/2, 130, 340, 110);
      
  // Pasta image
      
  image(pastaImg, width/2 ,440,350,350)
      
  // Info bar
      
  image(info, width/2, 867, 600, 45)
  
  drawSauceGrid();
}