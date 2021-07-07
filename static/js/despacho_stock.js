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
function enviar_orden_retiro(){
	var check_results = true;
	var message_error_checksum = "";
	var rut_ret = $('#rut_1').val();
	var nom_ret = $('#nombre_cl_1').val();
	var tel_ret = $('#num_telf_1').val();
	var email_ret = $('#email_1').val();
	var produc_ret = $('#nombre_pro_1').val();
	var direc_ret = $('#direccion_1').val();

	if(rut_ret.isEmpty()||nom_ret.isEmpty()||tel_ret.isEmpty()||email_ret.isEmpty()||produc_ret.isEmpty()||direc_ret.isEmpty()){
		check_results = false;
		message_error_checksum+="\n-Complete los campos faltantes.";
	}
	if(isNaN(tel_ret)){
		check_results = false;
		message_error_checksum+="\n-El teléfono debe ser númerico.";
	}
	if(!validateEmail(email_ret)){
		check_results = false;
		message_error_checksum+="\n-El correo no es válido.";
	}
	if (check_results==false){
		swal({
			title: "Ha ocurrido un error.\n\n",
			text: ""+message_error_checksum+"",
			icon: "error",
			button: "Ok",
		});
	}
	if (check_results==true){
		swal({
			title: "El retiro se ha realizado exitosamente.",
			icon: "success"
		});
		var ordenretiro_postvt = new FormData();
		ordenretiro_postvt.append("rut", rut_ret);
		ordenretiro_postvt.append("nombre_cl", nom_ret);
		ordenretiro_postvt.append("num_telf", tel_ret);
		ordenretiro_postvt.append("email", email_ret);
		ordenretiro_postvt.append("direccion", direc_ret);
		ordenretiro_postvt.append("nombre_pro", produc_ret);

		var requestOptions = {
		  method: 'POST',
		  body: ordenretiro_postvt,
		  redirect: 'follow'
		};

		fetch("http://3.88.62.216/OrdenRetiro/", requestOptions)
		  .then(response => response.text())
		  .then(result => console.log(result))
		  .catch(error => console.log('error', error));
	}
}
function clean_retiro_a_despacho(){
	$('#rut_1').val("");
	$('#nombre_cl_1').val("");
	$('#num_telf_1').val("");
	$('#email_1').val("");
	$('#nombre_pro_1').val("");
	$('#direccion_1').val("");
}
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/*Sección despacho a Stock*/
//--------------------------------------------------------------------------------------
function agregar_cantidad_a_stock_prod(){
	var checkerman = true;
	var message_error_checksum2 = "";
	var id_prod_despacho_stock1 = $('#id_prod_despacho_stock').val();
	var cantidad_despacho_stock1 = $('#cantidad_despacho_stock').val();

	if(id_prod_despacho_stock1.isEmpty()||cantidad_despacho_stock1.isEmpty()){
		checkerman = false;
		message_error_checksum2+="\n-Complete los campos faltantes.";
	}
	if(isNaN(id_prod_despacho_stock1)){
		checkerman = false;
		message_error_checksum2+="\n-El Id de producto debe ser númerico.";
	}
	if(isNaN(cantidad_despacho_stock1)){
		checkerman = false;
		message_error_checksum2+="\n-La cantidad de producto debe ser númerico.";
	}
	if(checkerman==false){
		swal({
			title: "Ha ocurrido un error.\n\n",
			text: ""+message_error_checksum2+"",
			icon: "error",
			button: "Ok",
		});
	}
	if(checkerman==true){

		var formdata = new FormData();
		formdata.append("cantidad", cantidad_despacho_stock1);

		var requestOptions = {
		  method: 'PATCH',
		  body: formdata,
		  redirect: 'follow'
		};

		fetch("http://3.222.189.59/stk_patch/"+id_prod_despacho_stock1.toString()+"/", requestOptions)
		.then(response => response.json())
		.then(result => {
			swal({
				title: "La cantidad del producto:\n"+result.nombre_pro+"\n con id: "+id_prod_despacho_stock1+", \nha sido exitosamente cambiada a: "+cantidad_despacho_stock1+".",
				icon: "success"
			});
		})
		.catch(error => console.log('error', error));
	}


}
function limpiar_agreg_cantidad_stock(){
	$('#id_prod_despacho_stock').val("");
	$('#cantidad_despacho_stock').val("");
}