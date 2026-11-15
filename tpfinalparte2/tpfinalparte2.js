//https://youtu.be/Jcu73CPDrPE
//thiago carrasco cornell
const juegoFacultad = (p) => {
  //variables de control de flujo y estado local del juego
  let estadoJuego = "inicio";         
  let contador = 0;            
  let listaObjetos = [];
  
  let personajeJuego;
  let sistemaVidas;
  let gestorFondos;
  let canvas;
  let btnAccion;

  let sonidoPulsar;
  let sonidoFondo;
  let sonidoLluvia;

  //referencias a recursos locales
  let imgInicio, imgFondo, imgGanaste, imgPerdiste, imgFinal, imgLluvia;
  let imgPj1, imgPj2, imgPj3, imgBasura;
  let imgVida1, imgVida2, imgVida3;
  let imgObjeto1, imgObjeto2, imgObjeto3, imgObjeto4;

  p.preload = function() {
    imgInicio = p.loadImage("data/inicio.png");
    imgFondo = p.loadImage("data/fondo.png");
    imgGanaste = p.loadImage("data/ganaste.png");
    imgPerdiste = p.loadImage("data/perdiste.png");
    imgFinal = p.loadImage("data/final.png");
    imgLluvia = p.loadImage("data/lluvia.png");
    
    imgPj1 = p.loadImage("data/pj1.png");
    imgPj2 = p.loadImage("data/pj2.png");
    imgPj3 = p.loadImage("data/pj3.png");
    
    imgBasura = p.loadImage("data/basura.png");
    
    imgVida1 = p.loadImage("data/vida1.png");
    imgVida2 = p.loadImage("data/vida2.png");
    imgVida3 = p.loadImage("data/vida3.png");
    
    imgObjeto1 = p.loadImage("data/objeto1.png");
    imgObjeto2 = p.loadImage("data/objeto2.png");
    imgObjeto3 = p.loadImage("data/objeto3.png");
    imgObjeto4 = p.loadImage("data/objeto4.png");
  };

  p.setup = function() {
    canvas = p.createCanvas(800, 400);
    canvas.center();
    
    p.select("body").style("background-color", "#3d1115");

    sonidoPulsar = new Audio('data/pulsar.mp3');
    sonidoFondo = new Audio('data/fondo.wav');
    sonidoFondo.loop = true;

    sonidoLluvia = new Audio('data/lluvia.wav');
    sonidoLluvia.loop = true;

    //imagnes
    personajeJuego = new personaje(imgPj1, imgPj2, imgPj3, p.width / 2 - 90, p.height - 270, 180, 260, p);
    sistemaVidas = new vidas(imgVida1, imgVida2, imgVida3, p);
    gestorFondos = new fondos(imgInicio, imgFondo, imgGanaste, imgPerdiste, imgFinal, imgLluvia, p);

    btnAccion = p.createButton("");
    btnAccion.style("cursor", "pointer");
    btnAccion.hide();

    btnAccion.mousePressed(() => {
      if (sonidoPulsar) {
        sonidoPulsar.currentTime = 0;
        sonidoPulsar.play().catch(e => {});
      }

      if (sonidoFondo && sonidoFondo.paused && estadoJuego !== "final") {
        sonidoFondo.play().catch(e => {});
      }

      if (estadoJuego === "inicio") {
        estadoJuego = "jugando";
        btnAccion.hide();
        canvas.elt.focus();
      } else if (estadoJuego === "final") {
        reiniciarJuego();
      }
    });
  };

  p.mousePressed = function() {
    if (sonidoPulsar) {
      sonidoPulsar.currentTime = 0;
      sonidoPulsar.play().catch(e => {});
    }

    if (sonidoFondo && sonidoFondo.paused && estadoJuego !== "final") {
      sonidoFondo.play().catch(e => {});
    }

    if (estadoJuego === "ganaste" || estadoJuego === "perdiste") {
      if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
        estadoJuego = "final";
        btnAccion.hide();
      }
    }
  };

  p.draw = function() {
    p.background(0);

    if (estadoJuego === "final") {
      if (sonidoFondo && !sonidoFondo.paused) {
        sonidoFondo.pause();
      }
      if (sonidoLluvia && sonidoLluvia.paused) {
        sonidoLluvia.play().catch(e => {});
      }
    } else {
      if (sonidoLluvia && !sonidoLluvia.paused) {
        sonidoLluvia.pause();
        sonidoLluvia.currentTime = 0;
      }
      if (sonidoFondo && sonidoFondo.paused && estadoJuego !== "inicio") {
        sonidoFondo.play().catch(e => {});
      }
    }

    gestorFondos.mostrarFondo(estadoJuego);

    if (estadoJuego === "inicio") {
      btnAccion.html("");
      btnAccion.size(146, 37);
      btnAccion.style("background-color", "transparent");
      btnAccion.style("border", "none");
      btnAccion.style("color", "transparent");
      btnAccion.show();
      posicionarBoton();
    } 
    else if (estadoJuego === "jugando") {
      btnAccion.hide();

      if (p.frameCount % 60 === 0) {
        let xAleatoria = p.random(50, p.width - 70);
        let esBasura = p.random(1) < 0.55;
        
        let imgElegida;
        if (esBasura) {
          imgElegida = imgBasura;
        } else {
          let imgsObjetosBuenos = [imgObjeto1, imgObjeto2, imgObjeto3, imgObjeto4];
          imgElegida = p.random(imgsObjetosBuenos);
        }

        listaObjetos.push(new objetosdelcielo(imgElegida, xAleatoria, -65, 65, 65, esBasura, p));
      }

      personajeJuego.mover();
      personajeJuego.mostrar();

      for (let i = listaObjetos.length - 1; i >= 0; i--) {
        listaObjetos[i].actualizar();
        listaObjetos[i].mostrar();

        if (personajeJuego.colisiona(listaObjetos[i])) {
          if (listaObjetos[i].esBasura) {
            personajeJuego.setEstado(3);
            sistemaVidas.perderVida();

            if (sistemaVidas.obtenerVidas() <= 0) {
              estadoJuego = "perdiste";
              listaObjetos = [];
              break;
            }
          } else {
            personajeJuego.setEstado(2);
            contador++;

            if (contador >= 5) {
              estadoJuego = "ganaste";
              listaObjetos = [];
              break;
            }
          }
          listaObjetos.splice(i, 1);
          continue;
        }

        if (listaObjetos[i].y > p.height) {
          listaObjetos.splice(i, 1);
        }
      }

      p.push();
      p.fill(255);
      p.noStroke();
      p.textSize(20);
      p.textStyle(p.BOLD);
      p.textAlign(p.RIGHT, p.TOP);
      p.text(`${contador}/5`, p.width - 30, 25);
      p.pop();

      sistemaVidas.mostrar();
    }
    else if (estadoJuego === "ganaste" || estadoJuego === "perdiste") {
      btnAccion.hide();
    }
    else if (estadoJuego === "final") {
      p.push();
      p.fill(255);
      p.noStroke();
      p.textSize(13);
      p.textStyle(p.BOLD);
      p.textAlign(p.CENTER, p.CENTER);
      p.text("Hecho por Violeta Alvaro Legajo: 122585/6 y Thiago Carrasco Cornell Legajo: 122639/3 muchas gracias por jugar!!!", p.width / 2, p.height / 2 - 25);
      p.pop();

      btnAccion.html("");
      btnAccion.size(494 - 308, 386 - 346);
      btnAccion.style("background-color", "transparent");
      btnAccion.style("border", "none");
      btnAccion.style("color", "transparent");
      btnAccion.show();
      posicionarBoton();
    }

    if ((estadoJuego === "inicio" || estadoJuego === "final") && p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
      p.push();
      p.fill(0, 255, 0);
      p.noStroke();
      p.textSize(14);
      p.textStyle(p.BOLD);
      p.text(`X: ${Math.floor(p.mouseX)} | Y: ${Math.floor(p.mouseY)}`, p.mouseX + 15, p.mouseY);
      
      p.stroke(0, 255, 0);
      p.strokeWeight(2);
      p.point(p.mouseX, p.mouseY);
      p.pop();
    }
  };

  function posicionarBoton() {
    let pos = canvas.position();
    if (estadoJuego === "inicio") {
      btnAccion.position(pos.x + 326, pos.y + 289);
    } else if (estadoJuego === "final") {
      btnAccion.position(pos.x + 308, pos.y + 346);
    }
  }

  function reiniciarJuego() {
    if (sonidoLluvia) {
      sonidoLluvia.pause();
      sonidoLluvia.currentTime = 0;
    }
    if (sonidoFondo) {
      sonidoFondo.currentTime = 0;
      sonidoFondo.play().catch(e => {});
    }
    contador = 0;
    listaObjetos = [];
    personajeJuego.setEstado(1);
    sistemaVidas.reiniciar();
    estadoJuego = "inicio";
    btnAccion.hide();
  }
  //clase 1: objetosdelcielo
  class objetosdelcielo {
    constructor(img, x, y, w, h, esBasura, pRef) {
      this.img = img;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.esBasura = esBasura;
      this.p = pRef;
      this.velocidadY = this.esBasura ? 1.5 : 2.6;
    }

    actualizar() {
      this.y += this.velocidadY;
    }

    mostrar() {
      if (this.img) {
        this.p.push();
        this.p.image(this.img, this.x, this.y, this.w, this.h);
        this.p.pop();
      }
    }
  }
  //clase 2: personaje
  class personaje {
    constructor(img1, img2, img3, x, y, w, h, pRef) {
      this.img1 = img1;
      this.img2 = img2;
      this.img3 = img3;
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.p = pRef;
      this.velocidad = 6;
      this.estadoVisual = 1;
    }

    mover() {
      if (this.p.keyIsDown(this.p.LEFT_ARROW) || this.p.keyIsDown(65)) {
        this.x -= this.velocidad;
      }
      if (this.p.keyIsDown(this.p.RIGHT_ARROW) || this.p.keyIsDown(68)) {
        this.x += this.velocidad;
      }
      this.x = this.p.constrain(this.x, 0, this.p.width - this.w);
    }

    mostrar() {
      let imagenActual = this.img1;
      if (this.estadoVisual === 2) {
        imagenActual = this.img2;
      } else if (this.estadoVisual === 3) {
        imagenActual = this.img3;
      }

      if (imagenActual) {
        this.p.push();
        this.p.image(imagenActual, this.x, this.y, this.w, this.h);
        this.p.pop();
      }
    }

    setEstado(nuevoEstado) {
      this.estadoVisual = nuevoEstado;
    }

    colisiona(obj) {
      let zonaCapturaX = this.x + this.w * 0.35;
      let zonaCapturaY = this.y + this.h * 0.35;
      let zonaCapturaW = this.w * 0.3;
      let zonaCapturaH = this.h * 0.3;

      return (
        zonaCapturaX < obj.x + obj.w &&
        zonaCapturaX + zonaCapturaW > obj.x &&
        zonaCapturaY < obj.y + obj.h &&
        zonaCapturaY + zonaCapturaH > obj.y
      );
    }
  }
  //vidas 3: vidas
  class vidas {
    constructor(img1, img2, img3, pRef) {
      this.vidasCant = 3;
      this.imgVida1 = img1;
      this.imgVida2 = img2;
      this.imgVida3 = img3;
      this.p = pRef;
    }

    perderVida() {
      if (this.vidasCant > 0) {
        this.vidasCant--;
      }
    }

    reiniciar() {
      this.vidasCant = 3;
    }

    obtenerVidas() {
      return this.vidasCant;
    }

    mostrar() {
      let imagenActual = null;
      let w = 180;
      let h = 75;
      let x = 20;
      let y = 20;

      if (this.vidasCant === 3) {
        imagenActual = this.imgVida1;
        w = 180;
        h = 220;
        x = 20;
        y = -5;
      } else if (this.vidasCant === 2) {
        imagenActual = this.imgVida2;
        w = 180;
        h = 75;
        x = 20;
        y = 20;
      } else if (this.vidasCant === 1) {
        imagenActual = this.imgVida3;
        w = 150;
        h = 65;
        x = 10;
        y = 20;
      }

      if (imagenActual) {
        this.p.push();
        this.p.image(imagenActual, x, y, w, h);
        this.p.pop();
      }
    }
  }
  //clase 4: fondos
  class fondos {
    constructor(imgInicio, imgFondo, imgGanaste, imgPerdiste, imgFinal, imgLluvia, pRef) {
      this.imgInicio = imgInicio;
      this.imgFondo = imgFondo;
      this.imgGanaste = imgGanaste;
      this.imgPerdiste = imgPerdiste;
      this.imgFinal = imgFinal;
      this.imgLluvia = imgLluvia;
      this.p = pRef;

      this.yLluvia1 = 0;
      this.yLluvia2 = -this.p.height;
      this.velocidadLluvia = 2;
    }

    mostrarFondo(estado) {
      this.p.push();
      if (estado === "inicio") {
        if (this.imgInicio) this.p.image(this.imgInicio, 0, 0, this.p.width, this.p.height);
      } 
      else if (estado === "jugando") {
        if (this.imgFondo) this.p.image(this.imgFondo, 0, 0, this.p.width, this.p.height);
      } 
      else if (estado === "ganaste") {
        if (this.imgGanaste) this.p.image(this.imgGanaste, 0, 0, this.p.width, this.p.height);
      } 
      else if (estado === "perdiste") {
        if (this.imgPerdiste) this.p.image(this.imgPerdiste, 0, 0, this.p.width, this.p.height);
      } 
      else if (estado === "final") {
        if (this.imgFinal) this.p.image(this.imgFinal, 0, 0, this.p.width, this.p.height);
        this.actualizarYMostrarLluvia();
      }
      this.p.pop();
    }

    actualizarYMostrarLluvia() {
      if (this.imgLluvia) {
        this.p.push();
        this.p.image(this.imgLluvia, 0, this.yLluvia1, this.p.width, this.p.height);
        this.p.image(this.imgLluvia, 0, this.yLluvia2, this.p.width, this.p.height);
        this.p.pop();

        this.yLluvia1 += this.velocidadLluvia;
        this.yLluvia2 += this.velocidadLluvia;

        if (this.yLluvia1 >= this.p.height) {
          this.yLluvia1 = this.yLluvia2 - this.p.height;
        }
        if (this.yLluvia2 >= this.p.height) {
          this.yLluvia2 = this.yLluvia1 - this.p.height;
        }
      }
    }
  }
}; 

new p5(juegoFacultad);
