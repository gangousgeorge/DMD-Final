// TEXT LINE W/ WAVE — no controls, hardcoded values
let fontGenerator;
let img
let img2
let x = 100
let y = 100
let xspeed = 2
let yspeed = 2


//font and image
function preload() {
  fontGenerator = loadFont('Monoton-Regular.ttf');
  img = loadImage('eyes.png');
  img2 = loadImage('eyes2.png');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(17,17,132);

  //move image around
  image(img,x,y,100,100);
  x = x + xspeed;
  y = y + yspeed;
  
  image(img2,x,y,300,300);
   x = x + xspeed;
  y = y + yspeed;
  
  // If image hits right or left edge
  if (x < 0 || x > width - 100) {
    // Turn around!
    xspeed = -xspeed;    
  }

  if (y < 0 || y > height - 160) {
    // Turn around!
    yspeed = -yspeed;    
  }

  //Inputs for background
  const inpText    = 'DROWNING OUT';
  const fontSize   = 20;
  const tracking   = 20;
  const yWaveSize  = 10;
  const yWaveLength = 0.5;
  const yWaveSpeed = 0.08;
  

  noStroke();
  textFont(fontGenerator);
  textSize(fontSize);
  textAlign(CENTER);
  fill('black');

  //determines height of row relative to the size of the font, higher means row is much wider
  const rowHeight = fontSize * 2;
  
//determines width of line relative to how long the text itself is
  const lineWidth = inpText.length * tracking;
  //amount oif colums withi
  //calculates the smallest integer greater than or equal to a given number, effectively rounding up
  const totalColums = ceil(width  / lineWidth) + 2;
  const rows = ceil(height / rowHeight) + 2;

  for (let row = -1; row < rows; row++) {
    const centerY = row * rowHeight;
    //Independant spacing between each row of text, change row %2 to allow for more text lines within one block
    const offsetX = (row % 2 === 0) ? 0 : lineWidth / 2;

    for (let colums = -1; colums < totalColums; colums++) {
      
      //baseX is the position at which the new colums of text begins
      const baseX = colums * lineWidth + offsetX;

      
      
      
      push();
      translate(baseX - (inpText.length - 1) * tracking / 2, centerY);

      for (let i = 0; i < inpText.length; i++) {
        let yWave = sin(frameCount * yWaveSpeed + i * yWaveLength) * yWaveSize;
        push();
          translate(i * tracking, 0);
          text(inpText.charAt(i), 0, yWave);
        pop();
      }
      pop();
    }
  }

}