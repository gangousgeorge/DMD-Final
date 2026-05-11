let sound
let img2X, img2Y;
let isPlaying = true;
let link;
let linkIsShowing = false;

// Drop zone rectangle — edit these four values to reposition or resize it
const DROP_X = 150; // x position of the drop zone (from left edge)
const DROP_Y = 170; // y position of the drop zone (from top edge)
const DROP_W = 130; // width of the drop zone
const DROP_H = 150; // height of the drop zone

// TEXT LINE W/ WAVE — no controls, hardcoded values
let fontGenerator;
let img
let img2
let dragging = false; // tracks whether the user is currently dragging the image
let pew, pewpew; // distance from the mouse click point to the image center


//////


//font and image
function preload() {
  fontGenerator = loadFont('Monoton-Regular.ttf');
  img = loadImage("Mouth.png");
  img2 = loadImage("hand.png");
  sound = loadSound("music.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
 img2X = width/2;
img2Y = height/2;
  sound.play();
  link = createA('../index.html', 'Return Home', '_self');
  link.position(width - 50, height-80);
  link.style("color", "white");
}


function draw(){
background(5,8,28);
   let overDrop = isOverDrop(img2X, img2Y);

  // Draw the drop zone rectangle
  strokeWeight(2);
  if (overDrop) {
    // Image is over the drop zone — highlight it teal
    stroke("black");
    fill("grey");
  } else {
    // Image is elsewhere — show the drop zone in a neutral grey
    stroke("#888");
    fill("rgba(255,255,255,0.05)");
  }
  rect(DROP_X, DROP_Y, DROP_W, DROP_H, 8); // 8 = corner radius

  // Draw the label centered inside the drop zone rectangle
  noStroke();
  if (overDrop) {
    fill("black"); 
  } else {
    fill("#aaa");
  }
  textAlign(CENTER);
  textSize(11);
  text("drop here", DROP_X + DROP_W / 2, DROP_Y + DROP_H / 2 + 4);

  
  
  //Inputs for background
  const inpText    = 'YOU SHOUT';
  const fontSize   = 20;
  const tracking   = 15;
  const yWaveSize  = 30;
  const yWaveLength = 0.5;
  const yWaveSpeed = 0.03;
  

  noStroke();
  textFont(fontGenerator);
  textSize(fontSize);
  textAlign(CENTER);
  fill('grey');

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
  image(img,100,160,220,220);
  image(img2,img2X, img2Y);
  
   linkIsShowing = !isPlaying;
  if (linkIsShowing){
    link.show();
  } else { link.hide();}

}

function isOverDrop(cx1, cy1) {
  return (
    cx1 > DROP_X && cx1 < DROP_X + DROP_W && cy1 > DROP_Y && cy1 < DROP_Y + DROP_H
  );
}
  
  function mousePressed() {
  // test against the image bounds — since imgX/imgY is the center,
  // the edges are half the image's width/height away in each direction
  // if the mouse is pressed while over the image, set dragging to true!
   
    
   if (
    mouseX > img2X - img2.width / 2 &&
    mouseX < img2X + img2.width / 2 &&
    mouseY > img2Y - img2.height / 2 &&
    mouseY < img2Y + img2.height / 2
  ) {
    dragging = true;
    // Record how far the mouse is from the image center so the image
    // doesn't snap its center to the cursor on pickup
    pew = mouseX - img2X;
  pewpew = mouseY - img2Y;
  }
}
  
  function mouseDragged() {
  if (dragging) {
    // Move the image center to follow the mouse, preserving the grab offset
    img2X = mouseX - pew;
    img2Y = mouseY - pewpew;

    if (isOverDrop(img2X, img2Y) && isPlaying) {
      // Image center just entered the drop zone — stop looping the music
      sound.loop();
      isPlaying = false;
    } else if (!isOverDrop(img2X, img2Y) && !isPlaying) {
      // Image center just left the drop zone — stop the music
      sound.stop();
      isPlaying = true;
    }
  }
  }
  function mouseReleased() {
  dragging = false; // stop tracking the drag regardless of where the image lands
  }