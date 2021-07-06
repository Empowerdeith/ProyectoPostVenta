function hide_table() {
  $( "#myData" ).hide();
}
setTimeout(hide_table, 40);
function mostrarOrden(data){
	if (data == "No existe la orden ingresada."){
		hide_table()
		$("#error_msg").html("<br><br>"+data);
	}
	else{
		$("#error_msg").html("");
		$( "#myData" ).show();
		var num_solicitud = $("#num_solicitud");
		var nombre_cl = $("#nombre_cl");
		var fecha_ingreso = $("#fecha_ingreso");
		var rut = $("#rut");
		var num_telf = $("#num_telf");
		var email = $("#email");
		var direccion = $("#direccion");
		var nombre_pro = $("#nombre_pro");
		var estado_orden = $("#estado_orden");
		//Tratamiento de fechas
		var fecha_formato = data.fecha_ingreso.toString();
		var fecha_obtenida = new Date(fecha_formato);
		var dia = fecha_obtenida.getDate();
		var mes = fecha_obtenida.getMonth()+1;
		var annio = fecha_obtenida.getFullYear();
		var full_fecha= dia+"/"+mes+"/"+annio;
		num_solicitud.html(data.num_solicitud);
		nombre_cl.html(data.nombre_cl);
		fecha_ingreso.html(full_fecha);
		rut.html(data.rut);
		num_telf.html(data.num_telf);
		email.html(data.email);
		direccion.html(data.direccion);
		nombre_pro.html(data.nombre_pro);
		estado_orden.html(data.estado_orden);
	}
}
Object.prototype.isEmpty = function () {
    return Object.keys(this).length == 0;
}
function prueba_g(){
	var buscar1 = $('#id_buscar').val().toString();
	// console.log(buscar1);
	if(!buscar1.isEmpty()){
		let url="http://3.88.62.216/orden_g/"+buscar1
		fetch(url)
		.then(response => response.json())
		.then(data => mostrarOrden(data))
		.catch(error => console.log(error))
	}
	else{
		hide_table()
		$("#error_msg").html("<br><br>Debe ingresar un número de orden.");
	}
}

function hide_table2() {
    $( "#myData2" ).hide();
  }
  setTimeout(hide_table2, 40);
  function mostrarProducto(data){
      if (data == "No existe la producto ingresada."){
          hide_table2()
          $("#error_msg").html("<br><br>"+data);
      }
      else{
          $("#error_msg").html("");
          $( "#myData2" ).show();
          var id_prod = $("#id_prod");
          var nombre_pro = $("#nombre_pro2");
          var precio = $("#precio");
          var cantidad = $("#cantidad");
          //Tratamiento de fechas
          id_prod.html(data.id_prod);
          nombre_pro.html(data.nombre_pro);
          precio.html(data.precio);
          cantidad.html(data.cantidad);
      }
  }
  Object.prototype.isEmpty = function () {
      return Object.keys(this).length == 0;
  }
  function prueba_s(){
      var buscar1 = $('#id_buscar2').val().toString();
      // console.log(buscar1);
      if(!buscar1.isEmpty()){
          let url="http://3.222.189.59/stk_get/"+buscar1
          fetch(url)
          .then(response => response.json())
          .then(data => mostrarProducto(data))
          .catch(error => console.log(error))
      }
      else{
          hide_table2()
          $("#error_msg").html("<br><br>Debe ingresar un producto.");
      }
  }

  function anexo_boletas_exec(){
  	var myForm = document.getElementById('myForm');
  	var formData = new FormData(myForm);
	fetch("http://35.171.203.143/AnexoBoleta/",{
		method: 'POST',
		body: formData,
	})
	.then(function (response){
		return response.text();
	})
	.then(function (text){
		console.log(text);
	})
	.catch(function(error){
		console.error(error);
	})

  }