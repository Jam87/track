(function() {
    // Función para mostrar u ocultar campos dependiendo del estado del checkbox
    function mostrarOcultarCampo() {
        var switchCheck = document.getElementById("SwitchCheck1");
        var campoKit = document.getElementById("campoKit");
        var campoDescripcion = document.getElementById("campoDescripcion"); 
  
        if (switchCheck.checked) {
            campoKit.style.display = "block"; 
            campoDescripcion.style.display = "none"; 
        } else {
            campoKit.style.display = "none"; 
            campoDescripcion.style.display = "block"; 
            document.getElementById("size").value = ""; 
        }
    }
  
    // Función para validar el formulario antes de enviarlo
    function validarFormulario() {
        var switchCheck = document.getElementById("SwitchCheck1").checked;
        
        // Si el switch está marcado, validar los campos de campoKit
        if (switchCheck) {
            var comboxKit = document.getElementById("comboxKit").value;
            var size = document.getElementById("size").value;
            
            if (comboxKit.trim() === "" || size.trim() === "") {
              Swal.fire({
                  position: "top-end",
                  toast: "true",
                  icon: "warning",
                  title: "Error!",
                  text: "Fields with an asterisk cannot be empty",
                  confirmButtonText: "Accept",
                  showConfirmButton: false,
                  timer: 5000,
                  timerProgressBar: true,
              });
              return false;
          }
        } else { // Si el switch no está marcado, validar el campo de campoDescripcion
            var txtDescripcion = document.getElementById("txtDescripcion").value;
  
            if (txtDescripcion.trim() === "") {
              Swal.fire({
                  position: "top-end",
                  toast: "true",
                  icon: "warning",
                  title: "Error!",
                  text: "Fields with an asterisk cannot be empty",
                  confirmButtonText: "Accept",
                  showConfirmButton: false,
                  timer: 5000,
                  timerProgressBar: true,
              });
              return false;
          }
  
            
        }
        
        // Si todo está bien, devolver true para permitir que el formulario se envíe
        return true;
    }
  
    // Agregar event listener al formulario para validar antes de enviar
    var formMaterial = document.querySelector("#formMaterial");
    formMaterial.addEventListener("submit", function (e) {
        if (!validarFormulario()) {
            e.preventDefault(); // Evitar que el formulario se envíe si la validación falla
        }
    });
  
    // Agregar event listener al checkbox para llamar a mostrarOcultarCampo() cuando cambie
    var switchCheck = document.getElementById("SwitchCheck1");
    switchCheck.addEventListener("change", mostrarOcultarCampo);
  
    // Función para ocultar un campo en un modal si el switch no está marcado
    function ocultarCampoSiNoMarcado(modalId) {
        $('#' + modalId).on('show.bs.modal', function () {
            var switchCheck = document.getElementById("SwitchCheck1");
            var campoKit = document.getElementById("campoKit");
          
            if (!switchCheck.checked) {
                campoKit.style.display = "none";
            }
        });
    }
  
    // Mostrar u ocultar campos al abrir el modal
    $('#modalMaterial').on('shown.bs.modal', function () {
        mostrarOcultarCampo();
    });
  
    // Llamar a la función de ocultar campo si el switch no está marcado
    ocultarCampoSiNoMarcado('modalMaterial');
  
    // Reiniciar los elementos <select> a su estado inicial
    $('#comboxKit').trigger('change');
  })();
  