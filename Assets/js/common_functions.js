//+++++++ SHOW OR HIDE  +++++++//
function mostrarOcultarCampo() {
  var switchCheck = document.getElementById("SwitchCheck1");
  var campoKit = document.getElementById("campoKit");
  var campoDescripcion = document.getElementById("campoDescripcion"); // Nuevo: Obtener el campo de descripción

  if (switchCheck.checked) {
      campoKit.style.display = "block"; // Mostrar el campo de kit
      campoDescripcion.style.display = "none"; // Ocultar el campo de descripción
  } else {
      campoKit.style.display = "none"; // Ocultar el campo de kit
      campoDescripcion.style.display = "block"; // Mostrar el campo de descripción
      // Limpiar el contenido del input de tamaño
      document.getElementById("size").value = ""; 
  }
}

 // Función para mostrar el campo de kit y ocultar el campo de descripción cuando el modal se abre
 $('#modalMaterial').on('shown.bs.modal', function () {
  var switchCheck = document.getElementById("SwitchCheck1");
  var campoKit = document.getElementById("campoKit");
  var campoDescripcion = document.getElementById("campoDescripcion");

  if (switchCheck.checked) {
      campoKit.style.display = "block";
      campoDescripcion.style.display = "none";
  } else {
      campoKit.style.display = "none";
      campoDescripcion.style.display = "block";
  }

  // Reiniciar los elementos <select> a su estado inicial
  $('#comboxKit').trigger('change');
});

// Función para ocultar un campo en un modal si el switch no está marcado
function ocultarCampoSiNoMarcado(modalId) {
  $('#' + modalId).on('show.bs.modal', function () {
    // Ocultar el campo de kit si el switch no está marcado
    var switchCheck = document.getElementById("SwitchCheck1");
    var campoKit = document.getElementById("campoKit");
  
    if (!switchCheck.checked) {
        campoKit.style.display = "none";
    }
  });
}

window.onload = function() {
  mostrarOcultarCampo();
};