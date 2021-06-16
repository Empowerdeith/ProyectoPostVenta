
function showvalues(data){
	console.log("--------------------------");
	console.log("Datos cliente");
	console.log("rut: "+data.rut);
	console.log("nombre: "+data.nombre_cl);
	console.log("dirección: "+data.direccion);
	console.log("--------------------------");
	if (data == "No existe cliente."){
		hide_table();
		$("#error_msg").html("<br><br>"+data);
	}
}





//Esconder todo el div con todo su contenido
function hide_table() {
  	$( "#myData" ).hide();
}
setTimeout(hide_table, 40);

function esconder_prod(){
	$( "#tabla_de_productos" ).hide();
}
setTimeout(esconder_prod, 40);

//Mostrar información principal de Boleta
function mostrarBoleta(data){
	var data2;
	console.log(data2);
	data2={};
	data2=data;
	if (data2 == "No existe cliente."){
		hide_table();
		$("#error_msg").html("<br><br>"+data2);
		data2={};
	}
	else{
		$("#error_msg").html("");
        $( "#myData" ).show();
        //table Cliente
		var rut_p = $("#rut_p");
		var nombre_cliente = $("#nombre_cliente");
		var direccion = $("#direccion");
		rut_p.html(data2.rut);
		nombre_cliente.html(data2.nombre_cl);
		direccion.html(data2.direccion);
		//table Boletas
		$("#table_checkbox").find("tbody").empty();
		var content = "";
		for(let i = 0; i < data2.boletas.length; i++){
			content += "<tr><td><input id=\""+i+"\" type=\"checkbox\" name=\"boleta\" >"+"</td>";
			content += "<td>" + data2.boletas[i].num_boleta + "</td>";
			//---------Sección fechas---------------------------------
			var fecha_obtenida = new Date(data2.boletas[i].created_at);
			var dia = fecha_obtenida.getDate();
			var mes = fecha_obtenida.getMonth()+1;
			var annio = fecha_obtenida.getFullYear();
			//-------------------------------------------------------
			var  dineros = new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'});
			content += "<td>" + dia+"/"+mes+"/"+annio + "</td>";
			content += "<td>" + dineros.format(data2.boletas[i].total) + "</td>";
			content += "</tr>";
		}
		$("#table_checkbox").find( "tbody" ).html(content);
		test(data2);
		//selección de boleta
		function test(data2){
			console.log("testing");
			console.log(data2);
			var id;
			$('input[type="checkbox"]').on('change', function() {$('input[name="boleta"]').not(this).prop('checked', false);});
			$('input[type="checkbox"][name="boleta"]').click(function(){
				if($(this).prop("checked") == true) {
					var contenido = "";
					id = parseInt($(this).attr('id'));
					var fecha_bol = new Date(data2.boletas[id].created_at);
					var fecha_actual = new Date();
					var calc;
					calc = fecha_actual.getTime() - fecha_bol.getTime();
					var days_difference = calc / (1000 * 60 * 60 * 24);
					//Validación de fechas
					if(days_difference>90){
						esconder_prod();
						$("#error_msg2").html("Su compra supera el plazo legal(90 días), para proceder a la devolución de su producto.");
					}
					else{
						$("#error_msg2").html("");
						$("#table_product").find("tbody").empty();
						$( "#tabla_de_productos" ).show();
						for(let k = 0; k < data2.boletas[id].productos.length; k++){
							contenido += "<tr><td><input id=\""+k+"\" type=\"checkbox\" name=\"producto\" >"+"</td>";
							contenido += "<td>" + data2.boletas[id].productos[k].nombre_pro + "</td>";
							var  monea = new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'});
							contenido += "<td>" + monea.format(data2.boletas[id].productos[k].precio) + "</td>";
							contenido += "</tr>";
						}
						$("#table_product").find( "tbody" ).html(contenido);
					}
				}
			});

			$('#button_save').click(function(){				
				var fecha_obtenida = new Date(data2.boletas[id].created_at);
				var dia = fecha_obtenida.getDate();
				var mes = fecha_obtenida.getMonth()+1;
				var annio = fecha_obtenida.getFullYear();
				console.log("Datos Boleta");
				console.log("id_boleta: "+id);
				console.log("numero boleta: "+data2.boletas[id].num_boleta);
				console.log("fecha: "+dia+"/"+mes+"/"+annio);
				console.log("total boleta: "+data2.boletas[id].total);
				console.log("--------------------------");
				console.log("Datos cliente");
				console.log("rut: "+data2.rut);
				console.log("nombre: "+data2.nombre_cl);
				console.log("dirección: "+data2.direccion);
				console.log("--------------------------");
				/*var arr = [];
				arr.splice(0, arr.length);*/
				/*$('input[name="producto"]:checked').click(function(){
					arr.push(parseInt($(this).attr('id')));
				});*/

				//----------------------Inicio operaciones Post-----------------------------------
				/*console.log("arreglo con cantidad de productos");
				console.log(arr);
				for(let k = 0; k < data2.boletas[id].productos.length; k++){
					console.log("producto: "+data2.boletas[id].productos[k].nombre_pro);
				}
				console.log("Termino boleta");*/
			});
		}
	}
}

//Función para verifica si esta vacío en input principal.
Object.prototype.isEmpty = function () {
    return Object.keys(this).length == 0;
}
//-------------------------------------------------------
//Función que realiza el fetch a la ip
function prueba(){
	var buscar1 = $('#id_buscar').val().toString();

	// console.log(buscar1);
	if(!buscar1.isEmpty()){
		let url="http://3.83.24.216/api/cl/"+buscar1
		fetch(url)
		.then(response => response.json())
		.then(data => showvalues(data))
		.catch(error => console.log(error))

	}
	else{
		hide_table()
		$("#error_msg").html("<br><br>Debe ingresar un número de transacción.");
	}
}
//Inside buscar.isEmpty
/*
		.then(data => mostrarBoleta(data))
		$("#table_checkbox").find("tbody").empty();
		$("#table_product").find("tbody").empty();
		//esconder_prod();

*/

/*-----------------------------------------------------------------------------------
			Funciones para Reset de checkboxes        
----------------------------------------------------------------------------------*/
function selectall(){
	$( "#table_product").find( "input" ).prop('checked', true);
}
function unselectall(){
	$( "#table_product").find( "input" ).prop('checked', false);
}
//------------------------------------------------------------------------------------
				//boleta();
				//productos();
				/*function productos(){
					for(let k = 0; k < arr.length; k++){
						var formprod = new FormData();
						formprod.append("id",data2.boletas[id].productos[k].id);
						formprod.append("nombre_pro", data2.boletas[id].productos[k].nombre_pro);
						formprod.append("precio", data2.boletas[id].productos[k].precio);
						var requestOptions = {
							method: 'POST',
							body: formprod,
							redirect: 'follow'
						};
						fetch("http://18.207.25.202/api/devolucion/Producto/", requestOptions)
						.then(response => response.json())
						//.then(data => console.log(data))
						.catch(error => console.log('error', error));
					}
				}*/
				/*function boleta(){
					var formboleta = new FormData();
					formboleta.append("num_boleta", data2.boletas[id].num_boleta);
					formboleta.append("created_at", data2.boletas[id].created_at);
					formboleta.append("total", data2.boletas[id].total);
					//arreglo id productos
					for(let k = 0; k < arr.length; k++){
    					formboleta.append("productos", data2.boletas[id].productos[k].id);
    				}
					var requestOptions = {
					  method: 'POST',
					  body: formboleta,
					  redirect: 'follow'
					};
					let status;
					fetch("http://18.207.25.202/api/devolucion/Boleta/", requestOptions)
					.then((response) => {
						// Get status using response.status
						status = response.ok;
						if (status==true){
							cliente();
						}
						//console.log(`status in first then ${status}`);
						return response.json();
					})
					.then (data => console.log(data))
					.catch(error => console.log('error', error));
				}*/
				//----Sección datos Cliente----------------------------------------------------------------
				/*function cliente(){

					var formdata = new FormData();
					formdata.append("rut", data2.rut);
					formdata.append("nombre_cl", data2.nombre_cl);
					formdata.append("direccion", data2.direccion);
					formdata.append("boletas", data2.boletas[id].num_boleta);
					var requestOptions = {
					  method: 'POST',
					  body: formdata,
					  redirect: 'follow'
					};
					fetch("http://18.207.25.202/api/devolucion/Cliente/", requestOptions)
					.then(response => response.json())
					.then(data => console.log(data))
					.catch(error => console.log('error', error));
				}*/
				//----------------------Término operaciones Post----------------------------------