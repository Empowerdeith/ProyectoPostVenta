
function hide_table3() {
  $( "#myData3" ).hide();
}
setTimeout(hide_table3, 40);
//Todo esto es despacho
function mostrarOrden(data){
	if (data == "No existe la orden de retiro ingresada."){
		hide_table3()
		$("#error_msg7").html("<br><br>"+data);
	}
	else{
		$("#error_msg7").html("");
		$( "#myData3" ).show();
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
	var buscar1 = $('#id_buscar3').val().toString();
	// console.log(buscar1);
	if(!buscar1.isEmpty()){
		let url="http://3.88.62.216/orden_g/"+buscar1
		fetch(url)
		.then(response => response.json())
		.then(data => mostrarOrden(data))
		.catch(error => console.log(error))
	}
	else{
		hide_table3()
		$("#error_msg7").html("<br><br>Debe ingresar un número de orden.");
	}
}
//Todo Stock
function hide_table2() {
    $( "#myData2" ).hide();
}
setTimeout(hide_table2, 40);

function mostrarProducto(data){
	if (data == "No existe producto."){
	  hide_table2()
	  $("#error_msg8").html("<br><br>"+data);
	}
	else{
	  $("#error_msg8").html("");
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
	  $("#error_msg8").html("<br><br>Debe ingresar un producto.");
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
		.then(result => {
		  	swal({
				title: "El retiro se ha realizado exitosamente.",
				icon: "success"
			});
			clean_retiro_a_despacho();
		  	console.log(result);
		  })
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
				title: "La cantidad del producto:\n"+result.nombre_pro+",\nha sido exitosamente actualizada a: "+cantidad_despacho_stock1+".",
				icon: "success"
			});
			limpiar_agreg_cantidad_stock();
		})
		.catch(error => console.log('error', error));
	}


}
function limpiar_agreg_cantidad_stock(){
	$('#id_prod_despacho_stock').val("");
	$('#cantidad_despacho_stock').val("");
}

function enviar_anexo_boleta_func(){
	var check_results3 = true;
	var message_error_checksum3 = "";
	var rut_ret2 = $('#rut12').val();
	var nombrecli_ret2 = $('#nombre_cl12').val();
	var tel_ret2 = $('#num_telf12').val();
	var email_ret2 = $('#email12').val();
	var direcc_ret2 = $('#direccion12').val();
	var total_ret2 = $('#total12').val();
	var total_dev_ret2 = $('#total_dev12').val();
	var monto_dev_ret2 = $('#monto_dev12').val();

	if(rut_ret2.isEmpty()||nombrecli_ret2.isEmpty()||tel_ret2.isEmpty()||email_ret2.isEmpty()||direcc_ret2.isEmpty()||total_ret2.isEmpty()||
		total_dev_ret2.isEmpty()||monto_dev_ret2.isEmpty()){
		check_results3 = false;
		message_error_checksum3 += "\n-Complete los campos faltantes.";
	}
	if(isNaN(tel_ret2)){
		check_results3 = false;
		message_error_checksum3+="\n-El teléfono debe ser númerico.";
	}
	if(isNaN(total_ret2)){
		check_results3 = false;
		message_error_checksum3+="\n-El total antes de devolución debe ser númerico.";
	}
	if(isNaN(total_dev_ret2)){
		check_results3 = false;
		message_error_checksum3+="\n-El monto a devolver debe ser númerico.";
	}
	if(isNaN(monto_dev_ret2)){
		check_results3 = false;
		message_error_checksum3+="\n-El monto tras boleta de devolución debe ser númerico.";
	}
	if(!validateEmail(email_ret2)){
		check_results3 = false;
		message_error_checksum3+="\n-El correo no es válido.";
	}
	if(check_results3==false){
		swal({
			title: "Ha ocurrido un error.\n\n",
			text: ""+message_error_checksum3+"",
			icon: "error",
			button: "Ok",
		});
	}
	if(check_results3==true){
		var formdata = new FormData();
		formdata.append("rut", rut_ret2);
		formdata.append("nombre_cl", nombrecli_ret2);
		formdata.append("num_telf", tel_ret2);
		formdata.append("email", email_ret2);
		formdata.append("direccion", direcc_ret2);
		formdata.append("total", total_ret2);
		formdata.append("total_dev", total_dev_ret2);
		formdata.append("monto_dev", monto_dev_ret2);

		var requestOptions = {
		  method: 'POST',
		  body: formdata,
		  redirect: 'follow'
		};

		fetch("http://35.171.203.143/AnexoBoleta/", requestOptions)
		.then(response => response.text())
		.then(result => {
			swal({
				title: "Se ha creado exitosamente el anexo de boleta para este cliente.",
				icon: "success"
			});
			limpiar_anexus_boletus();
			console.log(result);
		})
		.catch(error => console.log('error', error));
	}
}
function limpiar_anexus_boletus(){
	$('#rut12').val("");
	$('#nombre_cl12').val("");
	$('#num_telf12').val("");
	$('#email12').val("");
	$('#direccion12').val("");
	$('#total12').val("");
	$('#total_dev12').val("");
	$('#monto_dev12').val("");
}
function anexoBoletaSearch(){
	var buscar10 = $('#id_buscar20').val().toString();
	if(!buscar10.isEmpty()){
		let url="http://18.207.25.202/api/cl2/"+buscar10
		fetch(url)
		.then(response => response.json())
		.then(data => anexoBoletaShow_stuff(data))
		.catch(error => console.log(error))
		$("#tabla_anexo_bol_prod").find("tbody").empty();
		esconder_anexo_bol_productos();
	}
	else{
		$("#error_msg10").html("<br><br>Debe ingresar un número de transacción.");
	}
}
function anexoBoletaShow_stuff(data){
	console.log(data);
	if (data == "No existe cliente."){
		esconder_todo_div_anexo_cli();
		$("#error_msg10").html("<br><br>No Existe el cliente ingresado.");
	}
	else{
		$("#error_msg10").html("");
		$( "#tabla_anexo_cli" ).show();
		var bloc = "";
		bloc +="<tr><td>" + data.rut + "</td>";
		bloc +="<td>" + data.nombre_cl + "</td>"
		bloc +="<td>" + data.num_telf + "</td>";
		bloc +="<td>" + data.email + "</td>";
		bloc +="<td>" + data.direccion + "</td></tr>";
		var bol_fill ="";

		for(let i = 0; i < data.boletas.length; i++){
			bol_fill += "<tr><td><input id=\""+i+"\" type=\"checkbox\" name=\"boleta_rev\" >"+"</td>";
			bol_fill += "<td>" + data.boletas[i].num_boleta + "</td>";
			$("#tabla_cliente_fill_anexo").find( "tbody" ).html(bloc);
			//---------Sección fechas---------------------------------
			var fecha_obtenida = new Date(data.boletas[i].created_at);
			var dia = fecha_obtenida.getDate();
			var mes = fecha_obtenida.getMonth()+1;
			var annio = fecha_obtenida.getFullYear();
			//-------------------------------------------------------
			var  dineros = new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'});
			bol_fill += "<td>" + dia+"/"+mes+"/"+annio + "</td>";
			bol_fill += "<td>" + dineros.format(data.boletas[i].total) + "</td>";
			bol_fill += "<td>" + dineros.format(data.boletas[i].total_dev) + "</td>";
			bol_fill += "<td>" + dineros.format(data.boletas[i].monto_dev) + "</td>";
			bol_fill += "</tr>";
		}
		$("#tabla_anexo_boleta_stuff").find( "tbody" ).html(bol_fill);
		mostrar_correspondientes_prod(data);
		function mostrar_correspondientes_prod(){
			var id_rev;
			$('input[type="checkbox"]').on('change', function() {$('input[name="boleta_rev"]').not(this).prop('checked', false);});
			$('input[type="checkbox"][name="boleta_rev"]').click(function(){
				if($(this).prop("checked") == true) {
					var contenido = "";
					id_rev = parseInt($(this).attr('id'));
					for(let j = 0; j < data.boletas[id_rev].ItemProductos.length; j++){
						var cantidad, precio_pro, nombre;
						nombre_producto = data.boletas[id_rev].ItemProductos[j].productos.nombre_pro;
						cantidad = data.boletas[id_rev].ItemProductos[j].cantidad;
						precio_pro = data.boletas[id_rev].ItemProductos[j].productos.precio;
						var  monea = new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'});
						//Llenado tabla de productos
						contenido += "<tr><td>" + nombre_producto + "</td>";
						contenido += "<td>" + monea.format(precio_pro) + "</td>";
						contenido += "<td>" + cantidad + "</td>";
						contenido += "</tr>";
					}
					$("#tabla_anexo_bol_prod").find( "tbody" ).html(contenido);
					$("#tabla_anexo_bol_productos_mostrar").show();
				}
			});
		}	
	}
}

function esconder_anexo_bol_productos(){
	$("#tabla_anexo_bol_productos_mostrar").hide();
}
function esconder_todo_div_anexo_cli(){
	$("#tabla_anexo_cli").hide();
}
setTimeout(esconder_todo_div_anexo_cli, 40);

setTimeout(esconder_anexo_bol_productos, 40);