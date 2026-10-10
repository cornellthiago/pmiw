//https://youtu.be/V1fG12fzwXg
//Thiogo Carrasco Cornell
let verTexto = false;
let paso1 = false; 
let paso2 = false;         
let t6 = true;                     
let t7 = false;                     
let t9 = true;                     
let t10 = true;                     
let t13 = true;                     
let t14 = true;                     

// Textos de Nora
let t2 = true;
let t3 = true;
let t5 = true; 

// Textos de Bruno
let t19 = true;
let t20 = true;
let t21 = true;
let t23 = true;
let t24 = true;
let t25 = true;

let pantalla = 0;

// Animaciones
let yLluvia = 0;
let yCreditos = 450; 


// IMÁGENES Y SONIDOS

let imgs = []; 
let imgLluvia;         
let sClick;        
let sLluvia;        
let sFondo;         
let sLluviaActivo = false; 
let sFondoActivo = false;

function preload() {
  for (let i = 1; i <= 27; i++) {
    imgs[i] = loadImage('data/img' + i + '.jpg');
  }
  imgLluvia = loadImage('data/imglluvia.png'); 
  
  sClick = loadSound('data/pulsar.mp3');
  sLluvia = loadSound('data/lluvia.wav');
  sFondo  = loadSound('data/fondo.wav');
}

function setup() {
  createCanvas(800, 450);
}

function draw() {
  background(0);

  // Sonidos
  if (pantalla == 26) {
    if (sFondoActivo) { sFondo.stop(); sFondoActivo = false; }
    if (!sLluviaActivo) { sLluvia.loop(); sLluviaActivo = true; }
  } else {
    if (sLluviaActivo) { sLluvia.stop(); sLluviaActivo = false; }
    if (!sFondoActivo) { sFondo.loop(); sFondoActivo = true; }
  }

  // PANTALLAS
  if (pantalla == 0) {
    image(imgs[1], 0, 0, width, height);
  } 
  else if (pantalla == 1) {
    verPantalla(2, t2, "Al detective Bruno y a su asistente Nora se les ha notificado sobre un grave asesinato y han llegado a la escena del crimen lo más rápido posible. Deberán adentrarse en la mansión para descubrir al asesino.", 105);
  } 
  else if (pantalla == 2) {
    verPantalla(3, t3, "Bruno y Nora deberán tomar caminos separados en la investigación dentro de la mansión ya que creen que el culpable sigue estando acá adentro, elije tu camino y resuelve el caso!!", 105);
  } 
  else if (pantalla == 3) {
    image(imgs[4], 0, 0, width, height);
    if (verTexto) mensaje("Nora encuentra una libreta de Arthur donde hay notas y cuentas de negocios pendientes que complican a su socio Lucas, pero decidirá seguir investigando.", 115);
  } 
  else if (pantalla == 4) {
    verPantalla(5, t5, "Nora debajo de los libros encuentra una daga oxidada para abrir cartas la cual tiene marcas extrañas ¿podría ser el arma?", 115);
  } 
  else if (pantalla == 5) {
    verPantalla(6, t6, "Nora huele una taza de té del lugar y ve que contiene un líquido espeso y deduce que el asesinato fue todo planeado y no una muerte natural.", 115);
  } 
  else if (pantalla == 6) {
    image(imgs[7], 0, 0, width, height);
    if (t7) {
      mensaje("Nora encuentra un testamento donde deja toda la herencia a Elena para cuando Arthur muriera, pero duda entre eso y los negocios turbios de Lucas. Deberá decidir por dónde continuar.", 120, 295);
      botones7();
    }
  } 
  else if (pantalla == 7) {
    image(imgs[8], 0, 0, width, height);    
  } 
  else if (pantalla == 8) {
    verPantalla(9, t9, "Nora revisa el maletín de Arthur y descubre un montón de papeles de negocios y registros de deudas que comprometen directamente a Lucas, ¡Nora cree que es el culpable!", 115);
  } 
  else if (pantalla == 9) {
    verPantalla(10, t10, "Nora enfrenta a Lucas de frente y lo culpa por lo sucedido mostrando sus pruebas.", 105);
  } 
  else if (pantalla == 10) {
    image(imgs[11], 0, 0, width, height);  
    botonReiniciar(); 
  } 
  else if (pantalla == 11) {
    image(imgs[12], 0, 0, width, height);  
  } 
  else if (pantalla == 12) {
    verPantalla(13, t13, "Nora sigue revisando y encuentra el frasco en una parte que parecieran ser libros de Elena, ¡es el mismo veneno utilizado en la taza!", 115);
  } 
  else if (pantalla == 13) {
    verPantalla(14, t14, "Nora confronta a Elena directamente acusándola del asesinato y mostrando las pruebas contra ella.", 105);
  } 
  else if (pantalla == 14) {
    image(imgs[15], 0, 0, width, height); 
    botonFin(); 
  } 
  // FLUJO BRUNO
  else if (pantalla == 15) {
    image(imgs[16], 0, 0, width, height);
    if (verTexto) mensaje("Dentro de la oficina privada de la mansión el detective bruno busca entre revistas, aparta cosas viejas, sobres rotos y un cenicero lleno", 105);
  } 
  else if (pantalla == 16) {
    image(imgs[17], 0, 0, width, height);
  } 
  else if (pantalla == 17) {
    image(imgs[18], 0, 0, width, height);
    if (t6) {
      mensaje("Bruno encuentra dos pistas un libro con notas y un pañuelo con la letra E que no parecía ser de la víctima, ¿qué pista decides seguir?", 105);
      botonesOpciones();
    }
  } 
  else if (pantalla == 18) {
    verPantalla(19, t19, "Bruno revisa los papeles viejos y la libreta del socio Lucas que estaba guardada en la oficina, solo encuentra contratos viejos de la empresa y una chequera común.", 105);
  } 
  else if (pantalla == 19) {
    verPantalla(20, t20, "Bruno confuso cree que el culpable es el socio Lucas y lo acusa frente a todos, todos se quedan sorprendidos.", 105);
  } 
  else if (pantalla == 20) {
    verPantalla(21, t21, "Lucas demuestra que esos contratos eran legales y se descubre que se equivocaron de persona. ¡El verdadero asesino se escapa!", 105);
  } 
  else if (pantalla == 21) {
    image(imgs[22], 0, 0, width, height);    
    botonReiniciar();                     
  } 
  else if (pantalla == 22) {
    verPantalla(23, t23, "Tras revisar el pañuelo Bruno encuentra un cajón del escritorio medio abierto y decide revisarlo, encuentras una libreta de registros.", 105);
  } 
  else if (pantalla == 23) {
    verPantalla(24, t24, "Bruno encuentra un registro de entradas y salidas de la noche del crimen junto a una carta que delata al mayordomo Eduard.", 105);
  } 
  else if (pantalla == 24) {
    verPantalla(25, t25, "Con estas pruebas, Bruno acierta y acusa al mayordomo Eduard, quien se pone nervioso y confiesa que ayudó a encubrir el plan por dinero.", 115);
  } 
  else if (pantalla == 25) {
    image(imgs[26], 0, 0, width, height);  
    botonFin(); 
  } 
  else if (pantalla == 26) {
    image(imgs[27], 0, 0, width, height);  
    image(imgLluvia, 0, yLluvia, width, height);
    image(imgLluvia, 0, yLluvia - height, width, height);
    
    yLluvia += 3;  
    if (yLluvia >= height) yLluvia = 0;

    push();
    fill(0, 0, 0, 180); noStroke();
    rect(250, yCreditos, 300, 100, 8);
    fill(255); textSize(14); textAlign(CENTER, TOP);
    text("Violeta Alvaro\nLegajo: 122585/6\n\nThiago Carrasco\nLegajo: 122639/3", width / 2, yCreditos + 12);
    pop();

    yCreditos -= 1;
    if (yCreditos < -120) yCreditos = 450;
  }
}

// FUNCIONES AUXILIARES SIMPLIFICADAS

function verPantalla(numImg, condicionTexto, textoMensaje, altoCaja) {
  image(imgs[numImg], 0, 0, width, height);
  if (condicionTexto) {
    mensaje(textoMensaje, altoCaja);
  }
}

function mensaje(textoMensaje, altoCaja = 105, posY = 305) {
  caja(altoCaja, posY);
  fill(255);
  textSize(17);
  textAlign(LEFT, TOP);
  text(textoMensaje, 55, posY + 5, 690, altoCaja);
}

function caja(h = 135, y = 290) {
  push();
  stroke(255);
  strokeWeight(2);
  fill(0, 0, 0, 210); 
  rect(30, y, 740, h, 15); 
  pop();
}

function mousePressed() {
  if (sClick) { sClick.stop(); sClick.play(); }

  if (pantalla == 0) {
    if (mouseX > 330 && mouseX < 330 + 140 && mouseY > 320 && mouseY < 364) { pantalla = 1; t2 = true; }
  } else if (pantalla == 1) {
    if (t2) { t2 = false; return; }
    if (mouseX > 306 && mouseX < 502 && mouseY > 93 && mouseY < 400) { pantalla = 2; t3 = true; }
  } else if (pantalla == 2) {
    if (t3) { t3 = false; return; }
    if (mouseX > 6 && mouseX < 70 && mouseY > 128 && mouseY < 178) { pantalla = 3; }
    if (mouseX > 727 && mouseX < 792 && mouseY > 151 && mouseY < 167) { pantalla = 15; }
  } else if (pantalla == 3) {
    if (paso2) { verTexto = false; paso2 = false; pantalla = 4; t5 = true; return; }
    if (mouseX > 200 && mouseX < 365 && mouseY > 370 && mouseY < 440) { verTexto = !verTexto; paso1 = true; } 
    else if (paso1) {
      let yLinea = map(mouseX, 365, 490, 436, 390);
      if (mouseX >= 365 && mouseX <= 496 && mouseY >= yLinea - 15 && mouseY <= yLinea + 15) { verTexto = true; paso2 = true; } 
      else { verTexto = false; }
    } else { verTexto = false; }
  } else if (pantalla == 4) {
    if (t5) { t5 = false; return; }
    if (mouseX >= 390 && mouseX <= 424 && mouseY >= 348 && mouseY <= 380) { pantalla = 5; t6 = true; }
  } else if (pantalla == 5) {
    if (t6) { t6 = false; pantalla = 6; t7 = true; }
  } else if (pantalla == 6) {
    if (t7) {
      if (mouseX >= 200 && mouseX <= 350 && mouseY >= 250 && mouseY <= 300) { t7 = false; pantalla = 7; return; }
      if (mouseX >= 450 && mouseX <= 600 && mouseY >= 250 && mouseY <= 300) { t7 = false; pantalla = 11; return; }
    }
    let yLineaImg7 = map(mouseX, 202, 364, 410, 396);
    if (mouseX >= 202 && mouseX <= 364 && mouseY >= yLineaImg7 - 15 && mouseY <= yLineaImg7 + 15) { t7 = !t7; }
  } else if (pantalla == 7) {
    let yLineaImg8 = map(mouseX, 600, 670, 355, 373);
    if (mouseX >= 600 && mouseX <= 670 && mouseY >= yLineaImg8 - 15 && mouseY <= yLineaImg8 + 15) { pantalla = 8; t9 = true; }
  } else if (pantalla == 8) {
    if (t9) { t9 = false; return; }
    pantalla = 9; t10 = true; 
  } else if (pantalla == 9) {
    if (t10) { t10 = false; return; }
    pantalla = 10; 
  } else if (pantalla == 10) {
    if (mouseX >= 325 && mouseX <= 475 && mouseY >= 350 && mouseY <= 400) { reiniciarJuego(); }
  } else if (pantalla == 11) {
    let yLineaImg12 = map(mouseX, 72, 100, 206, 168);
    if (mouseX >= 72 && mouseX <= 100 && mouseY >= yLineaImg12 - 15 && mouseY <= yLineaImg12 + 15) { pantalla = 12; t13 = true; }
  } else if (pantalla == 12) {
    if (t13) { t13 = false; return; }
    pantalla = 13; t14 = true; 
  } else if (pantalla == 13) {
    if (t14) { t14 = false; return; }
    pantalla = 14; 
  } else if (pantalla == 14) {
    if (mouseX >= 325 && mouseX <= 475 && mouseY >= 350 && mouseY <= 400) { pantalla = 26; yLluvia = 0; yCreditos = 450; }
  } else if (pantalla == 15) {
    if (verTexto) { verTexto = false; pantalla = 16; return; }
    if (mouseX > 75 && mouseX < 242 && mouseY > 292 && mouseY < 416) { verTexto = true; paso1 = true; } 
    else if (paso1) {
      let yLinea = map(mouseX, 365, 490, 436, 390);
      if (mouseX >= 365 && mouseX <= 496 && mouseY >= yLinea - 15 && mouseY <= yLinea + 15) { verTexto = true; }
    }
  } else if (pantalla == 16) {
    if (mouseX >= 400 && mouseX <= 503 && mouseY >= 308 && mouseY <= 372) { pantalla = 17; t6 = true; }
  } else if (pantalla == 17) {
    if (t6) {
      if (mouseX >= 200 && mouseX <= 350 && mouseY >= 250 && mouseY <= 300) { t6 = false; pantalla = 18; t19 = true; return; }
      if (mouseX >= 450 && mouseX <= 600 && mouseY >= 250 && mouseY <= 300) { t6 = false; pantalla = 22; t23 = true; return; }
    }
  } else if (pantalla == 18) {
    if (t19) { t19 = false; pantalla = 19; t20 = true; return; }
  } else if (pantalla == 19) {
    if (t20) { t20 = false; pantalla = 20; t21 = true; return; }
  } else if (pantalla == 20) {
    if (t21) { t21 = false; pantalla = 21; return; }
  } else if (pantalla == 21) {
    if (mouseX >= 325 && mouseX <= 475 && mouseY >= 350 && mouseY <= 400) { reiniciarJuego(); }
  } else if (pantalla == 22) {
    if (t23) { t23 = false; pantalla = 23; t24 = true; return; }
  } else if (pantalla == 23) {
    if (t24) { t24 = false; pantalla = 24; t25 = true; return; }
  } else if (pantalla == 24) {
    if (t25) { t25 = false; pantalla = 25; return; }
  } else if (pantalla == 25) {
    if (mouseX >= 325 && mouseX <= 475 && mouseY >= 350 && mouseY <= 400) { pantalla = 26; yLluvia = 0; yCreditos = 450; }
  } else if (pantalla == 26) {
    if (mouseX >= 316 && mouseX <= 485 && mouseY >= 392 && mouseY <= 433) { reiniciarJuego(); }
  }
}

function reiniciarJuego() {
  if (sLluvia && sLluvia.isPlaying()) sLluvia.stop();
  if (sFondo && sFondo.isPlaying()) sFondo.stop();
  sLluviaActivo = false; sFondoActivo = false;
  pantalla = 0; verTexto = false; paso1 = false;
  t2 = true; t3 = true; t5 = true; t6 = true;
  t7 = true; t9 = true; t10 = true; t13 = true;
  t14 = true; t19 = true; t20 = true; t21 = true;
  t23 = true; t24 = true; t25 = true;
  yLluvia = 0; yCreditos = 450;
}

function botones7() {
  push();
  fill(60, 60, 60, 200); stroke(255); strokeWeight(1);
  rect(200, 250, 150, 50, 10);
  rect(450, 250, 150, 50, 10);
  fill(255); textSize(14); textAlign(CENTER, CENTER);
  text("Lucas", 275, 275); text("Elena", 525, 275);
  pop();
}

function botonesOpciones() {
  push();
  fill(60, 60, 60, 200); stroke(255); strokeWeight(1);
  rect(200, 250, 150, 50, 10);
  rect(450, 250, 150, 50, 10);
  fill(255); textSize(14); textAlign(CENTER, CENTER);
  text("Cuaderno", 275, 275); text("Pañuelo", 525, 275);
  pop();
}

function botonReiniciar() {
  push();
  fill(200, 0, 0, 180); stroke(255); strokeWeight(2);
  rect(325, 350, 150, 50, 10);
  fill(255); textSize(14); textAlign(CENTER, CENTER); text("REINICIAR", 400, 375);
  pop();
}

function botonFin() {
  push();
  fill(0, 150, 200, 180); stroke(255); strokeWeight(2);
  rect(325, 350, 150, 50, 10);
  fill(255); textSize(14); textAlign(CENTER, CENTER); text("FIN", 400, 375);
  pop();
}
