const formulario = document.getElementById("formulario");
const contenedor = document.getElementById("bitacora");

// Cargar entradas almacenadas al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  const entradasGuardadas = JSON.parse(localStorage.getItem("bitacoraEntradas")) || [];
  entradasGuardadas.reverse().forEach(entrada => mostrarEntrada(entrada));
});

// Función para mostrar una entrada
function mostrarEntrada({ fecha, titulo, contenido }) {
  const nuevaEntrada = document.createElement("div");
  nuevaEntrada.classList.add("entrada");
  nuevaEntrada.innerHTML = `
    <div class="fecha">${fecha}</div>
    <div class="titulo">${titulo}</div>
    <div class="contenido">${contenido}</div>
  `;
  contenedor.prepend(nuevaEntrada);
}

// Guardar nueva entrada
formulario.addEventListener("submit", function(e) {
  e.preventDefault();

  const fecha = document.getElementById("fecha").value;
  const titulo = document.getElementById("titulo").value;
  const contenido = document.getElementById("contenido").value;

  const nueva = { fecha, titulo, contenido };

  // Mostrar en la página
  mostrarEntrada(nueva);

  // Guardar en localStorage
  const entradas = JSON.parse(localStorage.getItem("bitacoraEntradas")) || [];
  entradas.push(nueva);
  localStorage.setItem("bitacoraEntradas", JSON.stringify(entradas));

  this.reset();
});
document.getElementById("borrarTodo").addEventListener("click", () => {
  if (confirm("¿Estás seguro de borrar toda la bitácora?")) {
    localStorage.removeItem("bitacoraEntradas");
    contenedor.innerHTML = "";
  }
});


document.getElementById("exportarTXT").addEventListener("click", () => {
  const entradas = JSON.parse(localStorage.getItem("bitacoraEntradas")) || [];
  if (entradas.length === 0) {
    alert("No hay entradas para exportar.");
    return;
  }

  let texto = "BITÁCORA DIGITAL\n\n";
  entradas.forEach(e => {
    texto += `Fecha: ${e.fecha}\nTítulo: ${e.titulo}\nContenido:\n${e.contenido}\n\n---\n\n`;
  });

  const blob = new Blob([texto], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "bitacora.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});