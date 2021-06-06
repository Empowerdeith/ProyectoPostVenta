function hide_table() {
  $( "#myData" ).hide();
}
setTimeout(hide_table, 40);
/*function mostrarBoleta(data){
	if (data == "No existe la boleta ingresada."){
		hide_table()
		$("#error_msg").html("<br><br>"+data);
	}
	else{
		$("#error_msg").html("");
		$( "#myData" ).show();
		var numero_bol = $("#numero_bol");
		var comprador = $("#comprador");
		var fecha = $("#fecha");
		var producto = $("#producto");
		var cantidad = $("#cantidad");
		var total = $("#total");
		var region = $("#region");
		var ciudad = $("#ciudad");
		var direccion = $("#direccion");
		//Tratamiento de fechas
		var fecha_formato =data.date_ordered.toString();
		var fecha_obtenida = new Date(fecha_formato);
		var dia = fecha_obtenida.getDate();
		var mes = fecha_obtenida.getMonth()+1;
		var annio = fecha_obtenida.getFullYear();
		var full_fecha= dia+"/"+mes+"/"+annio;
		numero_bol.html(data.numero_boleta);
		comprador.html(data.Comprador);
		fecha.html(full_fecha);
		producto.html(data.producto);
		cantidad.html(data.cantidad);
		total.html(data.total);
		region.html(data.region);
		ciudad.html(data.ciudad);
		direccion.html(data.direccion);
	}
}*/
Object.prototype.isEmpty = function () {
    return Object.keys(this).length == 0;
}


function prueba(){
	var buscar1 = $('#id_buscar').val().toString();
	// console.log(buscar1);
	if(!buscar1.isEmpty()){
		let url="http://3.83.24.216/Cliente/"+buscar1
		fetch(url)
		.then(response => response.json())
		.then(data => console.log(data))
		//.then(data => mostrarBoleta(data))
		.catch(error => console.log(error))
	}
	else{
		hide_table()
		$("#error_msg").html("<br><br>Debe ingresar un número de transacción.");
	}
}
/*function prueba(){
	var buscar1 = $('#id_buscar').val().toString();
	// console.log(buscar1);
	if(!buscar1.isEmpty()){
		let url="http://18.207.25.202/api/boleta/"+buscar1
		fetch(url)
		.then(response => response.json())
		.then(data => mostrarBoleta(data))
		.catch(error => console.log(error))
	}
	else{
		hide_table()
		$("#error_msg").html("<br><br>Debe ingresar un número de transacción.");
	}
}*/
function selectall(){
	$( "#table_checkbox").find( "input" ).prop('checked', true);
}
function unselectall(){
	$( "#table_checkbox").find( "input" ).prop('checked', false);
}