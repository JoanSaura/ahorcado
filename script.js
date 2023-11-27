//Capturamos elementos del HTML
const intentos = document.getElementById("intentos");
const cronometro = document.getElementById("cronometro");
const palabraElemento = document.getElementById("palabra");
const teclado = document.getElementById("teclado");
const mensaje = document.getElementById("mensaje");
const errores = document.getElementById("errores");
const selector = document.getElementById("selector");
const imagenAhorcado = document.getElementById("dibujo").querySelector("img");

//Array de las letras que son correctas
let letrasCorrectas = [];
//Definimos el maximo numero de intentos
let maxIntentos = 7;
intentos.textContent = maxIntentos;
// Segundos que han pasado
let segundosTranscurridos = 0;
const tiempoRestarIntento = 7;
//Implementamos el cronometro
let tiempoInicio;
function iniciarCronometro() {
  tiempoInicio = new Date();
  // Actualiza el cronómetro cada segundo
  setInterval(actualizarCronometro, 1000);
}
function actualizarCronometro() {
  const tiempoActual = new Date();
  const diferencia = tiempoActual - tiempoInicio;
  const segundos = Math.floor(diferencia / 1000);
  if (segundos > segundosTranscurridos) {
    segundosTranscurridos = segundos;
    // Cada siete segundos, resta un intento
    if (segundosTranscurridos % tiempoRestarIntento === 0) {
      restarIntento();
    }
  }
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const tiempoFormateado = `${rellenarCeros(horas)}:${rellenarCeros(
    minutos % 60
  )}:${rellenarCeros(segundos % 60)}`;

  cronometro.textContent = tiempoFormateado;
}
// Función para mostrar la palabra con guiones bajos y letras adivinadas
function mostrarPalabraConGuiones() {
  let palabraMostrada = "";
  for (const letra of palabraSeleccionada) {
    if (letrasCorrectas.includes(letra)) {
      palabraMostrada += letra + " ";
    } else {
      palabraMostrada += "_ ";
    }
  }
  palabraElemento.textContent = palabraMostrada.trim();

  // Verificamos si el jugador ha adivinado todas las letras
  if (!palabraMostrada.includes("_")) {
    // Aquí puedes agregar la lógica para mostrar un mensaje de victoria
    mostrarMensaje("¡Has ganado!");
  }
}

// Función para rellenar ceros en los dígitos menores a 10
function rellenarCeros(valor) {
  return valor < 10 ? `0${valor}` : valor;
}

//Declaramos las tematiacas
const tematicas = {
  animales: ["león", "elefante", "jirafa", "tigre", "perro", "gato", "pájaro"],
  coches: ["tesla", "ford", "honda", "bmw", "audi", "toyota", "chevrolet"],
  marcasropa: [
    "nike",
    "adidas",
    "gucci",
    "zara",
    "puma",
    "h&m",
    "calvin klein",
  ],
  paises: ["francia", "alemania", "italia", "japon", "china", "brasil"],
  marcasdemotos: [
    "harley",
    "honda",
    "yamaha",
    "kawasaki",
    "suzuki",
    "Ducati",
    "BMW",
  ],
};
//Para elegir tematicas
function elegirTematica(tematica) {
  const palabras = tematicas[tematica];
  //Coje una palabra/nombre que tiene la tematica y
  palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
  //Chivato para mostrar la palabra selecionada
  console.log(palabraSeleccionada);
  // Ocultar el pop-up
  selector.style.display = "none";

  mostrarPalabraConGuiones();
  iniciarCronometro();
}
//Mostar palabaras en guiones
function mostrarPalabraConGuiones() {
  const palabraguiones = " - ".repeat(palabraSeleccionada.length);
  document.getElementById("palabra").textContent = palabraguiones;
}
//Funcion para restar intentos
function restarIntento() {
  maxIntentos--;
  intentos.textContent = maxIntentos;
  // Verificar si aún hay intentos restantes
  imagenAhorcado.src = `img/${8 - maxIntentos}.png`;
  intentos.textContent = maxIntentos;
  // Verificamos si se han agotado los intentos
  if (maxIntentos == 0) {
    lancarGameOver();
    clearInterval(cronometroInterval); 
  }
}
//Lanzar fin del juego cuando los intentos llegan a 0
function lancarGameOver() {
  alert("Has perdido, la palabra era " + palabraSeleccionada);
}
