//variables
let bgImg;

//goku p1
let p1Frames = [];
let p1CantFrames = 15;
let framep1 = 0;
let tiempo1 = 0;

let repeticionp1 = 0;
let maxrepeticionp1 = 6; 

let p1Duraciones = [5, 5, 60, 40, 40, 20, 20, 25, 12, 12, 12, 12, 12, 12, 120]; 

let aura1Frames = [];
let aura1Cant = 2; 
let auraframe1 = 0;
let tiempoaura1 = 0;
let aura1Vel = 5; 

let p1X = 100;
let p1Y = 400;
let aura1OffX = -10; 
let aura1OffY = -20; 

let p1MovY = [0, 0, 0, -15, -15, -15, -15, -15, -15, -15, 0, 0, 0, 0, 0]; 

//piccolo p2
let p2Frames = [];
let p2CantFrames = 15; 
let framep2 = 0;
let tiempop2 = 0;
let p2Vel = 20; 

let aura2Frames = [];
let aura2Cant = 2; 
let auraframe2 = 0;
let aura2Timer = 0;
let aura2Vel = 8;

let p2X = 700;
let p2Y = 400;
let aura2OffX = 0; 
let aura2OffY = -20; 

let p2MovY = [0, 0, -15, -15, -15, -15, -15, -15, 0, 0, 0, 0, 0, 0, 0]; 

let kiImgs = [];
let expImgs = [];
let logoImg; 

let posKi = {
  ki1:   { x: 290, y: 365 },
  ki4_2: { x: 400, y: 356 },
  ki3:   { x: 450, y: 358 },
  ki4:   { x: 550, y: 355 }
};

function preload() {
  bgImg = loadImage("data/fondo.png"); 

  armarSecuencia(aura1Frames, "data/aura", 1, aura1Cant);
  armarSecuencia(aura2Frames, "data/2.aura", 1, aura2Cant);

  armarSecuencia(p1Frames, "data/parado", 1, 3);
  p1Frames[3] = loadImage("data/pose2.png");
  p1Frames[4] = loadImage("data/pose1.png");
  p1Frames[5] = loadImage("data/ataqueki.png");
  for (let i = 6; i <= 9; i++) {
    p1Frames[i] = loadImage("data/ataqueki2.png");
  }
  for (let i = 10; i <= 14; i++) {
    p1Frames[i] = loadImage("data/parado3.png");
  }

  armarSecuencia(p2Frames, "data/2.parado", 1, 2);
  p2Frames[2] = loadImage("data/2.pose1.png");
  p2Frames[3] = loadImage("data/2.carga1.png");
  for (let i = 4; i <= 7; i++) {
    p2Frames[i] = loadImage("data/2.carga2.png");
  }
  for (let i = 8; i <= 14; i++) {
    p2Frames[i] = loadImage("data/2.parado2.png");
  }

  //ki explosion  logo
  kiImgs[0] = loadImage("data/ki1.png");
  kiImgs[1] = loadImage("data/ki3.png");
  kiImgs[2] = loadImage("data/ki4.png");

  armarSecuencia(expImgs, "data/ex", 1, 6);

  logoImg = loadImage("data/logo.png"); 
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);
}

function draw() {
  background(200);

  renderImg(bgImg, width / 2, height / 2, 0);

  //velocidad auras
  if (framep1 >= 6 && framep1 <= 9) {
    aura1Vel = 2; 
    aura2Vel = 2; 
  } else if (framep1 >= 4) {
    aura1Vel = 3; 
    aura2Vel = 4; 
  } else if (framep1 >= 2) {
    aura1Vel = 18; 
    aura2Vel = 12;
  } else {
    aura1Vel = 5;  
    aura2Vel = 8;
  }

  //tiempo de las auras
  tiempoaura1++;
  if (pasoTiempo(tiempoaura1, aura1Vel)) {
    tiempoaura1 = 0;
    auraframe1 = (auraframe1 + 1) % aura1Cant;
  }

  aura2Timer++;
  if (pasoTiempo(aura2Timer, aura2Vel)) {
    aura2Timer = 0;
    auraframe2 = (auraframe2 + 1) % aura2Cant;
  }

  //tiempo de los frames
  tiempo1++;
  if (pasoTiempo(tiempo1, p1Duraciones[framep1])) {
    tiempo1 = 0;

    if (repeticionp1 < maxrepeticionp1) {
      framep1 = (framep1 === 0) ? 1 : 0;
      repeticionp1++;
    } else if (framep1 < 2) {
      framep1 = 2; 
    } else if (framep1 === 2) {
      framep1 = 3; 
      framep2 = 2; 
    } else if (framep1 === 3) {
      framep1 = 4; 
    } else if (framep1 === 4) {
      framep1 = 5;
      framep2 = 3;
    } else if (framep1 === 5) {
      framep1 = 6;
      framep2 = 4;
    } else if (framep1 === 6) {
      framep1 = 7;
      framep2 = 5;
    } else if (framep1 === 7) {
      framep1 = 8;
      framep2 = 6;
    } else if (framep1 === 8) {
      framep1 = 9;
      framep2 = 7;
    } else if (framep1 === 9) {
      framep1 = 10;
      framep2 = 8;
    } else if (framep1 === 10) {
      framep1 = 11;
      framep2 = 9;
    } else if (framep1 === 11) {
      framep1 = 12;
      framep2 = 10;
    } else if (framep1 === 12) {
      framep1 = 13;
      framep2 = 11;
    } else if (framep1 === 13) {
      framep1 = 14;
      framep2 = 12;
    } else if (framep1 === 14) {
      resetValores();
    }
  }

  if (framep2 < 2) {
    tiempop2++;
    if (pasoTiempo(tiempop2, p2Vel)) {
      tiempop2 = 0;
      framep2 = min(framep2 + 1, 1);
    }
  }

  //dibuja las auras
  if (framep1 < 10) {
    renderImg(aura1Frames[auraframe1], p1X + aura1OffX, p1Y + aura1OffY, p1MovY[framep1]);
    renderImg(aura2Frames[auraframe2], p2X + aura2OffX, p2Y + aura2OffY, p2MovY[framep2]);
  }

  //dibuja p2
  renderImg(p1Frames[framep1], p1X, p1Y, p1MovY[framep1]);
  renderImg(p2Frames[framep2], p2X, p2Y, p2MovY[framep2]);

  //ki
  if (framep1 === 6 && framep2 === 4) {
    renderImg(kiImgs[0], posKi.ki1.x, posKi.ki1.y, 0);
    renderImg(kiImgs[1], posKi.ki3.x, posKi.ki3.y, 0);
    renderImg(kiImgs[2], posKi.ki4.x, posKi.ki4.y, 0);
  }

  if (framep1 === 7 && framep2 === 5) {
    renderImg(kiImgs[0], posKi.ki1.x, posKi.ki1.y, 0);
    renderImg(kiImgs[1], posKi.ki3.x, posKi.ki3.y, 0);
    renderImg(kiImgs[2], posKi.ki4_2.x, posKi.ki4_2.y, 0);
    renderImg(kiImgs[2], posKi.ki4.x, posKi.ki4.y, 0);
  }

  //explosiones y logo
  if (framep1 === 8) {
    renderImg(expImgs[0], width / 2, height / 2, 0);
  }

  if (framep1 === 9) {
    renderImg(expImgs[1], width / 2, height / 2, 0);
  }

  if (framep1 === 10) {
    renderImg(logoImg, width / 2, height / 2, 0);
    renderImg(expImgs[2], width / 2, height / 2, 0);
  }

  if (framep1 === 11) {
    renderImg(logoImg, width / 2, height / 2, 0);
    renderImg(expImgs[3], width / 2, height / 2, 0);
  }

  if (framep1 === 12) {
    renderImg(logoImg, width / 2, height / 2, 0);
    renderImg(expImgs[4], width / 2, height / 2, 0);
  }

  if (framep1 === 13) {
    renderImg(logoImg, width / 2, height / 2, 0);
    renderImg(expImgs[5], width / 2, height / 2, 0);
  }

  if (framep1 === 14) {
    renderImg(logoImg, width / 2, height / 2, 0);
  }
}

//funciones propias

function armarSecuencia(arr, ruta, desde, hasta) {
  let idx = 0;
  for (let i = desde; i <= hasta; i++) {
    arr[idx] = loadImage(ruta + i + ".png");
    idx++;
  }
}

function renderImg(img, x, y, offY) {
  if (img) {
    image(img, x, y + offY);
  }
}

function pasoTiempo(c, max) {
  return c >= max;
}

function resetValores() {
  framep1 = 0;
  framep2 = 0;
  repeticionp1 = 0;
  tiempo1 = 0;
  tiempop2 = 0;
}
