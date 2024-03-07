let tableMaterial;

document.addEventListener("DOMContentLoaded", function () {
  // Inicializar el DataTable
  var tableMaterial = $("#table-material").DataTable({
    processing: true,
    serverSide: true,
    responsive: true,
    destroy: true,
    pageLength: 10,
    order: [[0, "desc"]],
    ajax: {
      url: base_url + "/Materials/getMaterial",
      dataSrc: ""
    },
    columns: [
      { 
        data: "kit",
        render: function(data, type, row) {
          return data ? data : "N/A";
        }
      },
      { 
        data: "sizeKit",
        render: function(data, type, row) {
          return data ? data : "N/A";
        }
      },
      { 
        data: "material_empire",
        render: function(data, type, row) {
          return data ? data : "N/A";
        }
      },
      { data: "options" }
    ]
  });
});


///////////////////////////////////
// --- CARGAR SELECT EL KIT --- //
/////////////////////////////////

// function cargarKit() {
//   $.ajax({
//     type: "GET",
//     url: base_url + "Materials/mostrarKit",
//     success: function (response) {
//       let kit = JSON.parse(response);
//       console.log(kit);
//       $('#comboxKit').empty();
//       $('#comboxKit').append('<option value="" selected>-- Seleccionar --</option>');

//       kit.forEach((tipo) => {
//         let optionValue = tipo.cod_customer; //ID
//         let optionText = tipo.kit + " - " + tipo.nombres_empire; //kit - nombre cliente
//         let option = new Option(optionText, optionValue);

//         $('#comboxKit').append(option);
//       });

//       // Inicializar Select2 con la opción templateResult
//       $('#comboxKit').select2({
//         dropdownParent: $('#comboxKit').parent(),
//         templateResult: function(option) {
//           if (!option.id) {
//             return option.text;
//           }

//           var kitText = option.text.split(" - ")[0];
//           var clientName = option.text.split(" - ")[1];
//           var $optionSpan = $('<span></span>').text(kitText);
//           var $dashSpan = $('<span> - </span>'); // Agregar el guión "-"
//           var $clientSpan = $('<span></span>').text(clientName);
          
//           // Aplicar estilos solo al nombre del kit
//           $optionSpan.css({
//             'font-weight': '900',
//             'color': 'blue'
//           });

//           // Devolver el elemento con el kit con estilos, el guión y el nombre normal
//           return $optionSpan.add($dashSpan).add($clientSpan);
//         }
//       });
//     },
//   });
// }

function cargarKit() {
  $.ajax({
    type: "GET",
    url: base_url + "Materials/mostrarKit",
    success: function (response) {
      let kit = JSON.parse(response);
      console.log(kit);
      $('#comboxKit').empty();
      $('#comboxKit').append('<option value="" selected>-- Seleccionar --</option>');

      kit.forEach((tipo) => {
        let optionValue = tipo.cod_customer; //ID
        let optionText = tipo.kit + " - " + tipo.nombres_empire; //kit - nombre cliente
        let option = new Option(optionText, optionValue);

        $('#comboxKit').append(option);
      });

      // Inicializar Select2 con la opción templateResult
      $('#comboxKit').select2({
        dropdownParent: $('#comboxKit').parent(),
        templateResult: function(option) {
          if (!option.id) {
            return option.text;
          }

          var kitText = option.text.split(" - ")[0];
          var clientName = option.text.split(" - ")[1];
          var $optionSpan = $('<span></span>').text(kitText);
          var $dashSpan = $('<span> - </span>'); // Agregar el guión "-"
          var $clientSpan = $('<span></span>').text(clientName);
          
          // Aplicar estilos solo al nombre del kit
          $optionSpan.css({
            'font-weight': '900',
            'color': 'blue'
          });

          // Devolver el elemento con el kit con estilos, el guión y el nombre normal
          return $optionSpan.add($dashSpan).add($clientSpan);
        }
      });

      // Ajustar la altura del modal manualmente al abrir y cerrar el Select2
      $('#comboxKit').on('select2:open', function() {
        setTimeout(ajustarAlturaModal, 100); // Ajustar después de que Select2 abra completamente
      });

      $('#comboxKit').on('select2:closing', function() {
        setTimeout(function() {
          $('.modal-content').css('height', 'auto');
        }, 100); // Restablecer después de que Select2 cierre completamente
      });
    },
  });
}

// Función para ajustar la altura del modal
function ajustarAlturaModal() {
  var select2DropdownHeight = $('.select2-dropdown').outerHeight();
  var modalContentHeight = $('.modal-content').outerHeight();
  var newModalHeight = modalContentHeight + select2DropdownHeight;
  $('.modal-content').css('height', newModalHeight + 'px');
}

cargarKit();



///////////////////////////////////
//*** GUARDAR NUEVO MATERIAL ***//
/////////////////////////////////const formCliente = document.getElementById('formCliente');

// Agregar un event listener para el evento "keypress" en el formulario
formMaterial.addEventListener('keypress', function(event) {
  // Verificar si la tecla presionada es "Enter" y si el foco está en un campo de entrada
  if (event.key === 'Enter' && event.target.tagName.toLowerCase() !== 'textarea') {
    // Evitar el comportamiento predeterminado de enviar el formulario
    event.preventDefault();
    // Llamar a la función para guardar el cliente
    guardarMaterial();
  }
});

function convertirAMayusculas(idCampo) {
  var campo = document.getElementById(idCampo);
  campo.value = campo.value.toUpperCase();
}


function guardarMaterial() {
  // Capturar datos de cada campo
  let idMaterial      = document.querySelector('#idMaterial').value;
  let comboxKit       = document.querySelector('#comboxKit').value;
  let size            = document.querySelector('#size').value;
  let txtDescripcion  = document.querySelector('#txtDescripcion').value;

  // Verificar si el checkbox está marcado
  let isChecked = document.querySelector('#SwitchCheck1').checked;

  // Si el cliente es especial, validar los campos comboxKit y size
  if (isChecked) {
    if (comboxKit === '' || size === '') {
      mostrarError('El kit y el size no pueden estar vacios');
      return false;
    }
  } 
   else { // Si el cliente no es especial, validar el campo txtDescripcion
     if (txtDescripcion === '') {
       mostrarError('La descripcion no puede estar vacia');
       return false;
     }
   }

  // Crear objeto con los datos del formulario
  let formData = new FormData();

  // Agregar los valores de los campos al objeto formData
  formData.append('idMaterial', idMaterial);
  formData.append('comboxKit', comboxKit);
  formData.append('size', size);
  formData.append('txtDescripcion', txtDescripcion);

  // Realizar la solicitud Fetch para guardar los datos
  fetch(base_url + '/Materials/setMaterial', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('An error occurred while sending the data');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);

      // Mostrar mensaje de éxito
      Swal.fire({
        position: "top-end",
        toast: "true",
        icon: "success",
        title: "Correcto!",
        text: data.msg,
        confirmButtonText: "Aceptar",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });

      // Actualizar la tabla de materiales y ocultar el modal
      $("#modalMaterial").modal("hide");
      document.querySelector("#formMaterial").reset();
      $("#table-material").DataTable().ajax.reload();
    })
    .catch(error => {
      console.error('Error:', error);
      // Mostrar mensaje de error
      mostrarError('An error occurred while saving the material');
    });
}


//////////////////////////
//*** EDIT MATERUAK ***//
////////////////////////

function fntEditMaterial(idMaterial) {
  showEditModal();

  fetch(`${base_url}/Materials/EditMaterial/${idMaterial}`)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(objData => {
          if (objData.status) {
              const { cod_material_empire, material_empire, comboxKit, sizeKit } = objData.data;

              document.querySelector("#idMaterial").value = cod_material_empire;

              // Verificar si material_empire es nulo antes de establecerlo en el campo
              if (material_empire !== null) {
                  document.querySelector("#txtDescripcion").value = material_empire;
              } else {
                  document.querySelector("#txtDescripcion").value = ''; // Establecer el campo como vacío si material_empire es null
              }

              // Mostrar campo del kit si el cliente es especial
              const campoKit = document.getElementById("campoKit");
              const campoDescripcion = document.getElementById("campoDescripcion");
              const clienteEspecialCheckbox = document.getElementById("SwitchCheck1");

              if (comboxKit !== null && sizeKit !== null) {
                  campoKit.style.display = "block";
                  campoDescripcion.style.display = "none";
                  clienteEspecialCheckbox.checked = true; // Habilitar el checkbox
              } else {
                  campoKit.style.display = "none";
                  campoDescripcion.style.display = "block";
                  clienteEspecialCheckbox.checked = false; // Deshabilitar el checkbox
              }

              const sizeInput = document.getElementById("size");
              sizeInput.value = sizeKit;

              const kitSelect = $("#comboxKit");
              kitSelect.val(comboxKit).trigger('change');
          } else {
              throw new Error('Status is not true');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          swal("Attention!", "An error occurred while editing the material", "error");
      });

  $("#modalMaterial").modal("show");
}









// function fntEditMaterial(idMaterial) {
//   // console.log(idMaterial);
//   document
//     .querySelector(".modal-header")
//     .classList.replace("bg-pattern", "bg-pattern-2");

//    document.querySelector("#titleModal").innerHTML = "Update Material";
//    document
//      .querySelector(".modal-header")
//      .classList.replace("headerRegister", "headerEdit", "bg-pattern-2");
//    document
//      .querySelector("#btnActionForm")
//      .classList.replace("btn-primary", "btn-info");
//    document.querySelector("#btnText").innerHTML = "Update";
//    document.querySelector("#formMaterial").reset();

//    var idMaterial = idMaterial;

//    var request = (request = new XMLHttpRequest());
//    var ajaxUrl = base_url + "/Materials/EditMaterial/" + idMaterial;
//    request.open("GET", ajaxUrl, true);
//    request.send();

//    request.onload = function () {
//      if (request.readyState == 4 && request.status == 200) {
//        var objData = JSON.parse(request.responseText);

//        if (objData.status) {
//          document.querySelector("#idMaterial").value =
//            objData.data.cod_material_empire;
//            document.querySelector("#txtDescripcion").value =
//            objData.data.material_empire;
//            document.querySelector("#comboxKit").value =
//            objData.data.comboxKit;
//            document.querySelector("#size").value =
//            objData.data.sizeKit;
//          document.querySelector("#listStatus").value = objData.data.status;

//          //Renderiza los options: Tipo usuario y Estado

//          //Pongo por defaul el activo que es
//          if (objData.data.status == 1) {
//            var optionSelect =
//              '<option value="1" selected class="notBlock">Active</option>';
//          } else {
//            var optionSelect =
//              '<option value="2" selected class="notBlock">Inactive</option>';
//          }
//          var htmlSelect = `${optionSelect}
//                                      <option value="1">Active</option>
//                                      <option value="2">Inactive</option>
//                                    `;
//          document.querySelector("#listStatus").innerHTML = htmlSelect;
//        }
//      }

//      //$('#modalEmpleado').modal('show');
//    };
//    $("#modalMaterial").modal("show"); //Mostrar modal Editar
//  }


////////////////////////////
//*** REMOVE MATERIAL ***//
//////////////////////////

 function fntDelMaterial(idMaterial) {
 
   Swal.fire({
     title: "Delete Material",
     text: "¿You really want to remove the material?",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, delete",
   }).then((result) => {
     if (result.isConfirmed) {
       let request = new XMLHttpRequest();
       let ajaxUrl = base_url + "Materials/delMaterial";
       let strData = "idMaterial=" + idMaterial;
       request.open("POST", ajaxUrl, true);
       request.setRequestHeader(
         "Content-type",
         "application/x-www-form-urlencoded"
       );
       request.send(strData);
       request.onload = function () {
         if (request.status == 200) {
           let objData = JSON.parse(request.responseText);

           //objData.status: Valido si es verdadero.
           //Va a mostrar el mensaje
           if (objData.status) {
             $("#table-material").DataTable().ajax.reload();

             Swal.fire({
               position: "top-end",
               toast: "true",
               icon: "success",
               title: "DELETE!",
               text: objData.msg,
               icon: "success",
               confirmButtonText: "Accept",
               showConfirmButton: false,
               timer: 3000,
               timerProgressBar: true,
             });
           } else {
             swal("Attention!", objData.msg, "error");
           }
         }
       };
     }
   });
 }

//*** HACER QUE EL DATATABLE FUNCIONES ***//
$("#table-material").DataTable();

////////////////////////////////////////////////////
//////// CARGAR SELECT DEPARTAMENTO ////////////////
///////////////////////////////////////////////////

// function cargarDepartamento() {
//   let formAvaluo = document.querySelector("#formAvaluo");
//   let comboxDepa = document.querySelector("#selectDepart");

//   let request = new XMLHttpRequest();
//   let ajaxUrl = base_url + "/Clientes/obtenerDepartamento";
//   let formData = new FormData(formAvaluo);

//   request.open("POST", ajaxUrl, true);
//   //request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//   request.send(formData);
//   //console.log(request)

//   request.onload = function () {
//     if (request.status == 200) {
//       let objData = JSON.parse(this.response);

//       let template =
//         '<option class="form-control" selected disabled>-- Seleccione --</option>';

//       objData.forEach((tipo) => {
//         template += `<option class="form-control" value="${tipo.idDep}">${tipo.descripcion}</option>`;
//       });

//       comboxDepa.innerHTML = template;

//       $("#selectDepart").change(function () {
//         let id = this.id;
//         let idDepartamento = $("#" + id).val();

//         listar_municipios(idDepartamento);
//       });
//     }
//   };
// }


// Variable para controlar si el modal se ha abierto
var modalOpened = false;

// Agregar un controlador de eventos para la tecla "n"
document.addEventListener('keydown', function(event) {
  // Obtener el valor de la tecla presionada y convertirlo a minúscula
  var key = event.key.toLowerCase();

  // Verificar si la tecla presionada es la "n" (minúscula o mayúscula)
  if (key === "n") {
      // Verificar si el campo de nombres está vacío y el modal no se ha abierto previamente
      if (document.getElementById('txtDescripcion').value.trim() === '' && !modalOpened) {
          // Prevenir la acción por defecto de la tecla "n" para evitar que se inserte en el campo de nombres
          event.preventDefault();

          // Llamar a la función para abrir el modal solo si el campo de nombres está vacío
          openModal();
          
          // Establecer el indicador de que el modal se ha abierto
          modalOpened = true;
      }
  }
});

// Agregar un controlador de eventos para cerrar el modal
$('#modalMaterial').on('hidden.bs.modal', function () {
    // Restablecer el indicador de que el modal se ha abierto
    modalOpened = false;
});

//*** MANDAR A LLAMAR AL MODAL: Agregar una nueva marca ***//
function openModal() {
  showNewModal();  

  document.querySelector("#formMaterial").reset();
  $("#modalMaterial").modal("show");
  $('#txtDescripcion').focus(); //Pone el focus en el campo descripción
}


//+++++++ NUEVO MODAL +++++++//
function showNewModal() {
  // Cambiar el título del modal
  document.querySelector("#titleModal").innerHTML = "New material";

  // Cambiar el texto del botón de acción
  document.querySelector("#btnText").innerHTML = "(enter) Save";

  // Mostrar el botón "Cerrar"
  document.querySelector("#btnCerrar").style.display = "inline-block"; 

}

//+++++++ EDITAR MODAL +++++++//
function showEditModal() {
  // Cambiar el título del modal
  document.querySelector("#titleModal").innerHTML = "Update material";

  // Cambiar el texto del botón de acción
  document.querySelector("#btnText").innerHTML = "(enter) Update";

  // Ocultar el botón "Imprimir"
  // document.querySelector("#btnImprimir").style.display = "none";

  // Mostrar el botón "Cerrar"
  document.querySelector("#btnCerrar").style.display = "inline-block";

  // Desactivar el campo de entrada "orden"
  //  document.querySelector("#orden").setAttribute("readonly", "true");

  document.querySelector("#formMaterial").reset();
}

// FUNCTIONS

function mostrarError(mensaje) {
  Swal.fire({
    position: "top-end",
    toast: "true",
    icon: "warning",
    title: "Error!",
    text: mensaje,
    confirmButtonText: "Aceptar",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
  });
}

