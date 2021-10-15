const cuadro = document.getElementById("pizarra");
const papel = cuadro.getContext("2d");
const borrador = document.getElementById("eraser");
const masGrosor = document.getElementById("mas_grosor");
const menosGrosor = document.getElementById("menos_grosor");
let colorPicker = document.getElementById("color_picker");
const radioLibre = document.getElementById("libre");
const radioAbanico = document.getElementById("abanico");

let estilo = "libre";

let anchoLinea = 1;
let anchoPizarra = 800;
let largoPizarra = 500;

let color = "#0000ff";

let x = 0;
let y = 0;

let estaDibujando = false;

//actualiza el color cuando se carga la página
window.addEventListener("load", startup, false);

radioAbanico.addEventListener("click", (cambiarEstilo) => estilo = "abanico");
radioLibre.addEventListener("click", (cambiarEstilo) => estilo = "libre");

masGrosor.addEventListener("click", grosorLinea);
masGrosor.myParam = "mas";
menosGrosor.addEventListener("click", grosorLinea);
menosGrosor.myParam = "menos";

borrador.addEventListener("click", (borrarPizarra) =>
  papel.clearRect(0, 0, anchoPizarra, largoPizarra)
);

colorPicker.addEventListener("input", updateColor, false);
colorPicker.addEventListener("change", updateColor, false);

cuadro.addEventListener("mousedown", (empiezaDibujo) => {
  estaDibujando = true;
  x = empiezaDibujo.offsetX;
  y = empiezaDibujo.offsetY;
});

cuadro.addEventListener("mouseup", (terminaDibujo) => {
  estaDibujando = false;
  x = 0;
  y = 0;
});

cuadro.addEventListener("mousemove", (dibujar) => {
  if (estaDibujando) {
    dibujarLinea(papel, x, y, dibujar.offsetX, dibujar.offsetY);
    if (estilo == "libre") {
      x = dibujar.offsetX;
      y = dibujar.offsetY;
    }
  }
});


function grosorLinea(event) {
  switch (event.currentTarget.myParam) {
    case "mas":
      if (anchoLinea < 10 && anchoLinea >= 1) {
        anchoLinea = anchoLinea + 1;

      }
      break;
    case "menos":
      if (anchoLinea <= 10 && anchoLinea > 1) {
        anchoLinea = anchoLinea - 1;
      }
      break;
  }
  document.getElementById('grosor_linea__titulo').innerHTML = anchoLinea;
}

function dibujarLinea(contexto, x1, y1, x2, y2) {
  contexto.beginPath();
  contexto.strokeStyle = color;
  contexto.lineWidth = anchoLinea;
  contexto.moveTo(x1, y1);
  contexto.lineTo(x2, y2);
  contexto.stroke();
  contexto.closePath();
}

function updateColor(event) {
  color = event.target.value;
}

function startup() {
  colorPicker.value = color;
  radioLibre.checked = "true";
}
