// Tutorial used: https://timrodenbroeker.de/processing-tutorial-kinetic-typography-1/

let font;
let pg;

let tilesX, tilesY, sp, dspx, dspy, fct;
let senscore

function preload() {
  font6 = loadFont("FragmentMono-Regular.ttf");
}

async function setup() {
  createCanvas(400, 400);
  pg = createGraphics(400, 400);
  
  senscore = 0.9; // Offset
  await setParameters()

  sp = 0; // Speed
  fct = map(senscore, -1, 1, 20, 6)
  dspx = map(senscore, -1, 1, 0.1, 0.05); // Displacement X
  dspy = map(senscore, -1, 1, 0.1, 0.05); // Displacement Y
  tilesX = map(senscore, -1, 1, 10, 8); // Tiles X
  tilesY = map(senscore, -1, 1, 30, 20); // Tiles Y

  setParameters(senscore)

  // draw()
}

async function setParameters(senscore) {
  senscore = await analyzeSentiment();
  console.log(senscore)

  let ranges = [
    { min: -1.0, max: -0.9, tilesX: [28, 30], tilesY: [9, 10], dspx: [0.07, 0.1], dspy: [0.05, 0.1] },
    { min: -0.9, max: -0.8, tilesX: [26, 29], tilesY: [9, 10], dspx: [0.06, 0.1], dspy: [0.05, 0.1] },
    { min: -0.8, max: -0.7, tilesX: [24, 26], tilesY: [8, 9], dspx: [0.06, 0.1], dspy: [0.05, 0.1] },
    { min: -0.7, max: -0.6, tilesX: [22, 24], tilesY: [8, 9], dspx: [0.06, 0.1], dspy: [0.05, 0.13] },
    { min: -0.6, max: -0.5, tilesX: [20, 22], tilesY: [8, 9], dspx: [0.05, 0.1], dspy: [0.05, 0.14] },
    { min: -0.5, max: -0.4, tilesX: [18, 20], tilesY: [7, 8], dspx: [0.08, 0.1], dspy: [0.05, 0.15] },
    { min: -0.4, max: -0.3, tilesX: [14, 17], tilesY: [6, 13], dspx: [0.17, 0.1], dspy: [0.06, 0.08]},
    { min: -0.3, max: -0.2, tilesX: [5, 10], tilesY: [6, 8], dspx: [0.5, 0.16], dspy: [0.5, 0.4] },
    { min: -0.2, max: -0.1, tilesX: [7, 10], tilesY: [6, 8], dspx: [0.5, 0.14], dspy: [0.3, 0.3] },
    { min: -0.1, max: 0, tilesX: [6, 9], tilesY: [6, 8], dspx: [0.5, 0.14], dspy: [0.3, 0.05] },
    { min: 0, max: 0.1, tilesX: [14, 16], tilesY: [8, 9], dspx: [0.07, 0.1], dspy: [0.06, 0.1] },
    { min: 0.1, max: 0.2, tilesX: [14, 16], tilesY: [8, 9], dspx: [0.07, 0.1], dspy: [0.07, 0.11] },
    { min: 0.2, max: 0.3, tilesX: [12, 14], tilesY: [9, 10], dspx: [0.07, 0.08], dspy: [0.05, 0.1] },
    { min: 0.3, max: 0.4, tilesX: [6, 9], tilesY: [6, 8], dspx: [0.4, 0.14], dspy: [0.04, 0.06] },
    { min: 0.4, max: 0.5, tilesX: [6, 9], tilesY: [6, 8], dspx: [0.4, 0.14], dspy: [0.04, 0.06] },
    { min: 0.5, max: 0.6, tilesX: [12, 14], tilesY: [6, 7], dspx: [0.07, 0.16], dspy: [0.03, 0.1] },
    { min: 0.6, max: 0.7, tilesX: [12, 18], tilesY: [6, 9], dspx: [0.08, 0.14], dspy: [0.04, 0.02] },
    { min: 0.7, max: 0.8, tilesX: [12, 16], tilesY: [5, 8], dspx: [0.08, 0.13], dspy: [0.04, 0.05] },
    { min: 0.8, max: 0.9, tilesX: [10, 16], tilesY: [5, 8], dspx: [0.06, 0.1], dspy: [0.04, 0.05] },
    { min: 0.9, max: 1, tilesX: [4, 10], tilesY: [15, 18], dspx: [0.06, 0.03], dspy: [0.0, 0.04] },
    { min: 1, max: 2, tilesX: [0, 0], tilesY: [0, 0], dspx: [0, 0], dspy: [0, 0] },
  ];

  for (let range of ranges) {
    if (senscore >= range.min && senscore < range.max) {
      tilesX = int(random(range.tilesX[0], range.tilesX[1]));
      tilesY = int(random(range.tilesY[0], range.tilesY[1]));
      dspx = random(range.dspx[0], range.dspx[1]);
      dspy = random(range.dspy[0], range.dspy[1]);
      break;
    }
  }
}

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4e19bc4d12msh223c6657eb435f7p176bbdjsn2acd9b88f6ae',
    'X-RapidAPI-Host': 'twinword-sentiment-analysis.p.rapidapi.com'
  }
};

async function analyzeSentiment() {

  const text = "horrible negative bad";
  const url = `https://twinword-sentiment-analysis.p.rapidapi.com/analyze/?text=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
    console.log(JSON.parse(result).score)
    return JSON.parse(result).score
  } catch (error) {
    console.error(error);
  }

}


function draw() {
  // background(255);

  // PGraphics settings
  pg.background(255);
  // pg.fill(0);
  pg.textFont(font6);
  pg.strokeWeight(2);
  pg.textSize(100);
  pg.push();
  pg.translate(width / 2, height / 2);
  pg.textAlign(CENTER, CENTER);
  pg.stroke(0);
  pg.text("WIRED", 0, 0);
  pg.pop();

  let tileW = int(width / tilesX);
  let tileH = int(height / tilesY);

  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      // WARP
      let waveX = int(sin(frameCount * sp + (x * y) * dspx) * fct);
      let waveY = int(sin(frameCount * sp + (x * y) * dspy) * fct);

      if (dspx === 0) {
        waveX = 0;
      }

      if (dspy === 0) {
        waveY = 0;
      }

      // SOURCE and DESTINATION
      let sx = x * tileW + waveX;
      let sy = y * tileH + waveY;
      let sw = tileW;
      let sh = tileH;
      let dx = x * tileW;
      let dy = y * tileH;
      let dw = tileW;
      let dh = tileH;

      copy(pg, sx, sy, sw, sh, dx, dy, dw, dh);
    }
  }
}
