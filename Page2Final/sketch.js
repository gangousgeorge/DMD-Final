let sound;
let img2X, img2Y;
let isPlaying = true;
let link;
let linkIsShowing = false;

// Drop zone rectangle — edit these four values to reposition or resize it
const DROP_X = 200;
const DROP_Y = 190;
const DROP_W = 100;
const DROP_H = 100;

let fontGenerator;
let img;
let img2;
let dragging = false;
let pew, pewpew;

function preload() {
  fontGenerator = loadFont('Monoton-Regular.ttf');
  img = loadImage("ear.png");
  img2 = loadImage("earplug.png");
  sound = loadSound("music.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img2X = width - 150; 
  img2Y = height / 2;
  imageMode(CENTER);
  sound.setVolume(1);
  sound.loop();
  link = createA('../Page3Final/index.html', 'Next Page', '_self');
  link.position(width - 50, height-80);
  link.style("color", "white");
}

function draw() {
  background(15,16,66);

  const inpText     = 'CANT HEAR THE WORDS';
  const fontSize    = 20;
  const tracking    = 20;
  const yWaveSize   = 10;
  const yWaveLength = 0.5;
  const yWaveSpeed  = 0.06;

  noStroke();
  textFont(fontGenerator);
  textSize(fontSize);
  textAlign(CENTER);
  fill(90,90,90);

  const rowHeight   = fontSize * 2;
  const lineWidth   = inpText.length * tracking;
  const totalColums = ceil(width / lineWidth) + 2;
  const rows        = ceil(height / rowHeight) + 2;

  for (let row = -1; row < rows; row++) {
    const centerY = row * rowHeight;
    const offsetX = (row % 2 === 0) ? 0 : lineWidth / 2;

    for (let colums = -1; colums < totalColums; colums++) {
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

  // Drop zone drawn after wave text
  let overDrop = isOverDrop(img2X, img2Y);

  strokeWeight(2);
  if (overDrop) {
    stroke("magenta");
    fill("rgba(127,255,212,0.15)");
  } else {
    stroke("#888");
    fill("rgba(255,255,255,0.05)");
  }
  rect(DROP_X, DROP_Y, DROP_W, DROP_H, 8);

  noStroke();
  if (overDrop) {
    fill("magenta");
  } else {
    fill("#aaa");
  }
  textAlign(CENTER);
  textSize(11);
  text("drop here", DROP_X + DROP_W / 2, DROP_Y + DROP_H / 2 + 4);

  // Images drawn on top of everything
  // ear center placed at (250, 240) to sit over the drop zone
  image(img, 250, 240);
  image(img2, img2X, img2Y);
  
  linkIsShowing = !isPlaying;
  if (linkIsShowing){
    link.show();
  } else { link.hide();}
}

function isOverDrop(cx, cy) {
  let hw = img2.width / 2;
  let hh = img2.height / 2;
  return (
    cx + hw > DROP_X &&
    cx - hw < DROP_X + DROP_W &&
    cy + hh > DROP_Y &&
    cy - hh < DROP_Y + DROP_H
  );
}

function mousePressed() {
  if (
    mouseX > img2X - img2.width / 2 &&
    mouseX < img2X + img2.width / 2 &&
    mouseY > img2Y - img2.height / 2 &&
    mouseY < img2Y + img2.height / 2
  ) {
    dragging = true;
    pew    = mouseX - img2X;
    pewpew = mouseY - img2Y;
  }
}

function mouseDragged() {
  if (dragging) {
    img2X = mouseX - pew;
    img2Y = mouseY - pewpew;

    if (isOverDrop(img2X, img2Y) && isPlaying) {
      // Earplug in — reduce volume by 80%
      sound.setVolume(0.2);
      isPlaying = false;
    } else if (!isOverDrop(img2X, img2Y) && !isPlaying) {
      // Earplug out — restore full volume
      sound.setVolume(1);
      isPlaying = true;
    }
  }
}

function mouseReleased() {
  dragging = false;
}