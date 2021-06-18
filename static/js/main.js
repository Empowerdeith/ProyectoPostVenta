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
	if (data == "No existe cliente."){
		hide_table();
		$("#error_msg").html("<br><br>No Existe el cliente ingresado.");
	}
	else{
		$("#error_msg").html("");
        $( "#myData" ).show();
        //table Cliente
		var rut_p = $("#rut_p");
		var nombre_cliente = $("#nombre_cliente");
		var direccion = $("#direccion");
		rut_p.html(data.rut);
		nombre_cliente.html(data.nombre_cl);
		direccion.html(data.direccion);
		//table Boletas
		$("#table_checkbox").find("tbody").empty();
		var content = "";
		for(let i = 0; i < data.boletas.length; i++){
			content += "<tr><td><input id=\""+i+"\" type=\"checkbox\" name=\"boleta\" >"+"</td>";
			content += "<td>" + data.boletas[i].num_boleta + "</td>";
			//---------Sección fechas---------------------------------
			var fecha_obtenida = new Date(data.boletas[i].created_at);
			var dia = fecha_obtenida.getDate();
			var mes = fecha_obtenida.getMonth()+1;
			var annio = fecha_obtenida.getFullYear();
			//-------------------------------------------------------
			var  dineros = new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'});
			content += "<td>" + dia+"/"+mes+"/"+annio + "</td>";
			content += "<td>" + dineros.format(data.boletas[i].total) + "</td>";
			content += "</tr>";
		}
		$("#table_checkbox").find( "tbody" ).html(content);
		test(data);
		//selección de boleta
		function test(data){
			console.log("testing");
			console.log(data);
			var id;
			$('input[type="checkbox"]').on('change', function() {$('input[name="boleta"]').not(this).prop('checked', false);});
			$('input[type="checkbox"][name="boleta"]').click(function(){
				if($(this).prop("checked") == true) {
					var contenido = "";
					id = parseInt($(this).attr('id'));
					var fecha_bol = new Date(data.boletas[id].created_at);
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
						for(let k = 0; k < data.boletas[id].productos.length; k++){
							contenido += "<tr><td><input id=\""+k+"\" type=\"checkbox\" name=\"producto\" >"+"</td>";
							contenido += "<td>" + data.boletas[id].productos[k].nombre_pro + "</td>";
							var  monea = new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'});
							contenido += "<td>" + monea.format(data.boletas[id].productos[k].precio) + "</td>";
							contenido += "</tr>";
						}
						$("#table_product").find( "tbody" ).html(contenido);
					}
				}
			});
			$('#button_save').off('click');
			$('#button_save').click(function(){
				var arr = [];
				$('input[name="producto"]:checked').each(function(){
					arr.push(parseInt($(this).attr('id')));
				});
				swal({
					title: "¿Desea confirmar la devolución de está boleta?",
					text: "Al aceptar, usted acepta nuestros términos y condiciones de devolución.",
					buttons: {
						cancel: "Cancelar",
						confirm: "Confirmar"
					}
				}).then (val => {
					console.log(val);
					if(val){
						swal({
							title: "Su devolución ha sido ingresada.",
							icon: "success"
						});
						boleta();
					}
				});
				//boleta();
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
				function boleta(){
					var formboleta = new FormData();
					formboleta.append("num_boleta", data.boletas[id].num_boleta);
					formboleta.append("created_at", data.boletas[id].created_at);
					formboleta.append("total", data.boletas[id].total);
					//arreglo id productos
					arr.forEach(function(arr, index){
						formboleta.append("productos", data.boletas[id].productos[arr].id);
					});
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
				}
				//----Sección datos Cliente----------------------------------------------------------------
				function cliente(){

					var formdata = new FormData();
					formdata.append("rut", data.rut);
					formdata.append("nombre_cl", data.nombre_cl);
					formdata.append("direccion", data.direccion);
					formdata.append("boletas", data.boletas[id].num_boleta);
					var requestOptions = {
						method: 'POST',
						body: formdata,
						redirect: 'follow'
					};
					fetch("http://18.207.25.202/api/devolucion/Cliente/", requestOptions)
					.then(response => response.json())
					.then(data => console.log(data))
					.catch(error => console.log('error', error));
				}
				//----------------------Término operaciones Post----------------------------------

				/*var fecha_obtenida = new Date(data.boletas[id].created_at);
				var dia = fecha_obtenida.getDate();
				var mes = fecha_obtenida.getMonth()+1;
				var annio = fecha_obtenida.getFullYear();
				console.log("Datos Boleta");
				console.log("id_boleta: "+id);
				console.log("numero boleta: "+data.boletas[id].num_boleta);
				console.log("fecha: "+dia+"/"+mes+"/"+annio);
				console.log("total boleta: "+data.boletas[id].total);
				console.log("--------------------------");
				console.log("Datos cliente");
				console.log("rut: "+data.rut);
				console.log("nombre: "+data.nombre_cl);
				console.log("dirección: "+data.direccion);
				console.log("--------------------------");
				var arr = [];
				$('input[name="producto"]:checked').each(function(){
					arr.push(parseInt($(this).attr('id')));
				});
				//----------------------Inicio operaciones Post-----------------------------------
				console.log("arreglo con cantidad de productos");
				//console.log(arr);
				//console.log(arr.length);
				arr.forEach(function(arr, index){
					console.log("producto: "+data.boletas[id].productos[arr].nombre_pro);
				});
				console.log("Termino boleta");
				*/
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
		.then(data => mostrarBoleta(data))
		.catch(error => console.log(error))
		$("#table_product").find("tbody").empty();
		//esconder_prod();

	}
	else{
		hide_table()
		$("#error_msg").html("<br><br>Debe ingresar un número de transacción.");
	}
}
//
/*-----------------------------------------------------------------------------------
			Funciones para Reset de checkboxes        
----------------------------------------------------------------------------------*/
function selectall(){
	$( "#table_product").find( "input" ).prop('checked', true);
}
function unselectall(){
	$( "#table_product").find( "input" ).prop('checked', false);
}
/*--------------------------------------------------------------------------------------------------------------------------------------------------------
																GEt Api PostVenta																									
---------------------------------------------------------------------------------------------------------------------------------------------------------*/
function revision_search(){
	var buscar2 = $('#id_buscar5').val().toString();

	// console.log(buscar1);
	if(!buscar2.isEmpty()){
		let url="http:18.207.25.202/api/cl2/"+buscar2
		fetch(url)
		.then(response => response.json())
		.then(data => revisionShow(data))
		.catch(error => console.log(error))
	}
	else{
		$("#error_msg5").html("<br><br>Debe ingresar un número de transacción.");
	}
}
function revisionShow(data){
	console.log(data);
	if (data == "No existe cliente."){
		hide_table();
		$("#error_msg5").html("<br><br>No Existe el cliente ingresado.");
	}
	else{
		$("#error_msg5").html("");
		var bloc = "";
		bloc +="<tr><td>" + data.rut + "</td>";
		bloc +="<td>" + data.nombre_cl + "</td>"
		bloc +="<td>" + data.direccion + "</td>";
		bloc +="<td>" + data.boletas.num_boleta + "</td></tr>";
		$("#tabla_cliente").find( "tbody" ).html(bloc);

		/*let url="http:18.207.25.202/api/bol2/"+data.boletas.num_boleta
		fetch(url)
		.then(response => response.json())
		.then(data)*/
	
		/*var prods = "";
		for(let k = 0; k < data.boletas.productos.length; k++){	
			prods += "<tr><td><input id=\""+k+"\" type=\"checkbox\" name=\"producto\" >"+"</td>";
			prods += "<td>" + data.boletas.productos[k].nombre_pro + "</td>";
			var  monea = new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'});
			prods += "<td>" + monea.format(data.boletas.productos[k].precio) + "</td>";
			prods += "</tr>";
		}
		$("#tabla_revision_prod").find( "tbody" ).html(prods);*/
	}	
}
function alerta_bton(){
	swal({
		title: "¿Desea confirmar la devolución de está boleta?",
		text: "Al aceptar, usted acepta nuestros términos y condiciones de devolución.",
		buttons: {
			cancel: "Cancelar",
			confirm: "Confirmar"
		}
	}).then (val => {
		console.log(val);
		if(val){
			swal({
				title: "Su devolución ha sido ingresada.",
				icon: "success"
			});
		}
	});
}