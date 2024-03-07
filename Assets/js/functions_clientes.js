let tableClientes;

document.addEventListener("DOMContentLoaded", function () {
  //*** MOSTRAR DATOS EN DATATABLE Y TRADUCCIÓN ***//
  tableClientes = $("#table-clientes").dataTable({
    aProcessing: true,
    aServerSide: true,
    // language: {
    //   url: "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json",
    // },
    ajax: {
      url: " " + base_url + "/Customers/getClientes",
      dataSrc: "",
    },
    columns: [
      { 
        data: "kit",
        render: function(data, type, row, meta) {
          if (data) {
            return '<i class="ri-medal-2-fill" style="color:#F2B705;"></i> ' + data; // Agrega una estrella como distintivo y muestra el valor de "kit"
          } else {
            return ''; // No muestra nada si el valor de "kit" no está presente
          }
        }
      },
      { data: "nombres_empire" },
      { data: "horario_completo" },
      { data: "options" },
    ],
    responsive: true,
    destroy: true,
    pageLength: 10,
    order: [[0, "desc"]], // Ordenar por la columna "kit"
  });
});



//////////////////////////
//*** SAVE CUSTOMER ***//
////////////////////////

// Capturar el formulario
const formCliente = document.getElementById('formCliente');

// Agregar un event listener para el evento "keypress" en el formulario
formCliente.addEventListener('keypress', function(event) {
  // Verificar si la tecla presionada es "Enter" y si el foco está en un campo de entrada
  if (event.key === 'Enter' && event.target.tagName.toLowerCase() !== 'textarea') {
    // Evitar el comportamiento predeterminado de enviar el formulario
    event.preventDefault();
    // Llamar a la función para guardar el cliente
    guardarCliente();
  }
});

function convertirAMayusculas(idCampo) {
  var campo = document.getElementById(idCampo);
  campo.value = campo.value.toUpperCase();
}
function guardarCliente() {
  // Capturar datos de cada campo
  let idCliente = document.getElementById('idCliente').value;

  let kit = document.getElementById('kit').value;
  let nombres = document.getElementById('nombres').value;
  let horaApertura = document.getElementById('horaApertura').value;
  let horaCierre = document.getElementById('horaCierre').value;
  // let lStatus = document.getElementById('lStatus').value;

  if (nombres == "") {
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

  // Crear objeto con los datos del formulario
  let formData = new FormData();
  formData.append('kit', kit);
  formData.append('idCliente', idCliente);
  formData.append('nombres', nombres);
  formData.append('horaApertura', horaApertura);
  formData.append('horaCierre', horaCierre);
  // formData.append('lStatus', lStatus);

  // Realizo la solicitud Fetch
  fetch(base_url + '/Customers/setClientes', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ocurrio un error al enviar los datos');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);

      // alert('Datos guardados correctamente');
      $("#modalCliente").modal("hide");
      ocultarCampoKit(); // Oculta el campo del kit
      document.querySelector("#formCliente").reset();
      $("#table-clientes").DataTable().ajax.reload();

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

    })
    .catch(error => {
      console.error('Error:', error);
    });
}



////////////////////////
//*** EDIT CLIENT ***//
//////////////////////

function fntEditCliente(idClient) {
  showEditModal();

  fetch(`${base_url}/Customers/EditClient/${idClient}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(objData => {
      if (objData.status) {
        const { cod_customer, nombres_empire, opening_hours_empire, closing_time_empire, kit } = objData.data;

        document.querySelector("#idCliente").value = cod_customer;
        document.querySelector("#nombres").value = nombres_empire;       
        document.querySelector("#horaApertura").value = opening_hours_empire;
        document.querySelector("#horaCierre").value = closing_time_empire;     
      
        // Mostrar campo del kit si tiene valor y establecer el valor en el input
        const campoKit = document.getElementById("campoKit");
        const kitInput = document.getElementById("kit");
        if (kit) {
          campoKit.style.display = "block";
          kitInput.value = kit;
          document.getElementById("SwitchCheck1").checked = true;
        } else {
          campoKit.style.display = "none";
          kitInput.value = ""; // Asegurarse de que el input esté vacío si kit no tiene valor
          document.getElementById("SwitchCheck1").checked = false;
        }
      } else {
        throw new Error('Status is not true');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      swal("Attention!", "An error occurred while editing the client", "error");
    });

  $("#modalCliente").modal("show"); //Mostrar modal Editar
}

//////////////////////////
//*** DEL CUSTOMER ***//
////////////////////////

function fntDelCliente(idCliente) {
  Swal.fire({
    title: "Delete Client",
    text: "¿You really want to delete the client?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete",
  }).then((result) => {
    if (result.isConfirmed) {
      eliminarCliente(idCliente);
    }
  });
}

function eliminarCliente(idCliente) {
  // Crear objeto con los datos a enviar
  let formData = new FormData();
  formData.append('idCliente', idCliente);

  // Realizar la solicitud Fetch
  fetch(base_url + "/Customers/delCliente", {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Manejar la respuesta del servidor
    if (data.status) {
      $("#table-clientes").DataTable().ajax.reload();

      Swal.fire({
        position: "top-end",
        toast: "true",
        icon: "success",
        title: "Eliminate!",
        text: data.msg,
        confirmButtonText: "Accept",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      swal("Attention!", data.msg, "error");
    }
  })
  .catch(error => {
    console.error('Error:', error);
    swal("Attention!", "An error occurred while deleting the client", "error");
  });
}


////////////////////////////////////////////
/******** SHORTCUT OPEN THE MODAL *********/
///////////////////////////////////////////


//LETTER: N - OPEN MODAL

// Variable para controlar si el modal se ha abierto
var modalOpened = false;

// Agregar un controlador de eventos para la tecla "n"
document.addEventListener('keydown', function(event) {
  // Obtener el valor de la tecla presionada y convertirlo a minúscula
  var key = event.key.toLowerCase();

  // Verificar si la tecla presionada es la "n" (minúscula o mayúscula)
  if (key === "n") {
      // Verificar si el campo de nombres está vacío y el modal no se ha abierto previamente
      if (document.getElementById('nombres').value.trim() === '' && !modalOpened) {
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
$('#modalCliente').on('hidden.bs.modal', function () {
    // Restablecer el indicador de que el modal se ha abierto
    modalOpened = false;
});


//+++++++ ABRIR MODAL +++++++//
function openModal() {
  // Mostrar el modal con los elementos necesarios para un nuevo registro
  showNewModal();  


  $("#modalCliente").modal("show");
  $('#nombres').focus();
}


////////////////
// FUNCTIONS///
//////////////

function ocultarCampoKit() {
  // Oculta el campo del kit estableciendo su estilo display en "none"
  document.getElementById("campoKit").style.display = "none";
}

//+++++++ NUEVO MODAL +++++++//
function showNewModal() {
  // Cambiar el título del modal
  document.querySelector("#titleModal").innerHTML = "New client";

  // Cambiar el texto del botón de acción
  document.querySelector("#btnText").innerHTML = "(enter) Save";

  // Mostrar el botón "Imprimir"
  // document.querySelector("#btnImprimir").style.display = "inline-block";

  // Mostrar el botón "Cerrar"
  document.querySelector("#btnCerrar").style.display = "inline-block"; 

  document.querySelector("#formCliente").reset();
}

//+++++++ EDITAR MODAL +++++++//
function showEditModal() {
  // Cambiar el título del modal
  document.querySelector("#titleModal").innerHTML = "Update client";

  // Cambiar el texto del botón de acción
  document.querySelector("#btnText").innerHTML = "(enter) Update";

  // Ocultar el botón "Imprimir"
  // document.querySelector("#btnImprimir").style.display = "none";

  // Mostrar el botón "Cerrar"
  document.querySelector("#btnCerrar").style.display = "inline-block";

  // Desactivar el campo de entrada "orden"
  //  document.querySelector("#orden").setAttribute("readonly", "true");

  document.querySelector("#formCliente").reset();
}

//+++++++ SHOW OR HIDE  +++++++//
 function mostrarOcultarCampo() {
   var switchCheck = document.getElementById("SwitchCheck1");
   var campoKit = document.getElementById("campoKit");
   var inputKit = document.getElementById("kit");

   if (switchCheck.checked) {
       campoKit.style.display = "block";
   } else {
       campoKit.style.display = "none";
       inputKit.value = ""; // Limpiar el contenido del input del kit
   }
 }

// // Agregar un controlador de eventos para el evento show.bs.modal
 $('#modalCliente').on('show.bs.modal', function () {
   // Ocultar el campo de kit si el switch no está marcado
   var switchCheck = document.getElementById("SwitchCheck1");
   var campoKit = document.getElementById("campoKit");

   if (!switchCheck.checked) {
       campoKit.style.display = "none";
   }
 });

// Agregar un controlador de eventos para el evento hidden.bs.modal
$('#modalCliente').on('hidden.bs.modal', function () {
  // Limpiar el contenido del input del kit
  var inputKit = document.getElementById("kit");
  inputKit.value = "";
});

/////////////
// Others///
///////////

// Pone el menu activo de acuerdo a la URL actual
// document.addEventListener("DOMContentLoaded", function() {
//   // Obtener la URL actual
//   var path = window.location.pathname;
//   console
//   var currentPage = path.substring(path.lastIndexOf('/') + 1);

//   // Obtener los elementos del menú
//   var menuItems = document.querySelectorAll(".nav-item a.nav-link");

//   // Iterar sobre los elementos del menú
//   menuItems.forEach(function(item) {
//     // Obtener la parte final de la URL del enlace
//     var urlParts = item.href.split('/');
//     var menuItemPage = urlParts[urlParts.length - 1];

//     // Comparar con la página actual
//     if (currentPage === menuItemPage) {
//       item.closest(".nav-item").classList.add("active");
//     }
//   });
// });




