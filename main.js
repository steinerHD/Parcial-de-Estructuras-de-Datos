const form = document.getElementById("formulario");
const resultados = document.getElementById("resultados");

const votos = JSON.parse(localStorage.getItem("votos")) || {
  JavaScript: 0,
  Python: 0,
  "C++": 0,
  Otro: 0,
};

function calcularPorcentaje(votosOpcion, totalVotos) {
  if (totalVotos === 0) return "0%";
  return ((votosOpcion / totalVotos) * 100).toFixed(2) + "%";
}

function actualizarResultados() {
  const totalVotos = Object.values(votos).reduce((a, b) => a + b, 0);
  resultados.innerHTML = "";

  for (const opcion in votos) {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${opcion}</td>
      <td>${votos[opcion]}</td>
      <td>${calcularPorcentaje(votos[opcion], totalVotos)}</td>
    `;
    resultados.appendChild(fila);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const botonEnviar = document.getElementById("boton");
  botonEnviar.setAttribute("disabled", "true");

  const lasAcciones = document.getElementsByName("accion");
  let accionSeleccionada = null;

  for (let i = 0; i < lasAcciones.length; i++) {
    if (lasAcciones[i].checked) {
      accionSeleccionada = lasAcciones[i].value;
      break;
    }
  }

  if (accionSeleccionada) {
    votos[accionSeleccionada]++;
    console.log(`Voto registrado para: ${accionSeleccionada}`);

    localStorage.setItem("votos", JSON.stringify(votos));

    actualizarResultados();
  } else {
    alert("Por favor, selecciona una opción antes de votar.");
  }
});


actualizarResultados();