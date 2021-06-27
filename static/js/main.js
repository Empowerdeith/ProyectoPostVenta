//Esconder todo el div con todo su contenido
function hide_table() {
  	$( "#myData" ).hide();
}
setTimeout(hide_table, 40);

function esconder_prod(){
	$( "#tabla_de_productos" ).hide();
}
function esconder_revision(){
	$( "#tabla_revision_cli" ).hide();
}
setTimeout(esconder_prod, 40);

setTimeout(esconder_revision, 40);

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
		var email_cli = $("#email");
		var tel_cli = $("#numero_tel");
		var direccion = $("#direccion");
		rut_p.html(data.rut);
		nombre_cliente.html(data.nombre_cl);
		email_cli.html(data.email);
		tel_cli.html(data.num_telf);
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
			var total=0;
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
						//console.log(data.boletas[id].ItemProductos.length);
						//Inicio Cálculo total
						//console.log("Inicio cálculo total");	
						for(let j = 0; j < data.boletas[id].ItemProductos.length; j++){
							var cantidad, precio_pro, nombre;
							nombre_producto = data.boletas[id].ItemProductos[j].productos.nombre_pro;
							cantidad = data.boletas[id].ItemProductos[j].cantidad;
							precio_pro = data.boletas[id].ItemProductos[j].productos.precio;
							var  monea = new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'});
							//Llenado tabla de productos
							//Checkbox
							contenido += "<tr><td><input id=\""+j+"\" type=\"checkbox\" name=\"producto\" >"+"</td>";
							contenido += "<td>" + nombre_producto + "</td>";
							contenido += "<td>" + monea.format(precio_pro) + "</td>";
							//Aquí va cantidad del producto
							contenido += "<td><input type=\"number\" name=\"cantidad_producto\" min=\"1\" max=\""+cantidad+"\" value=\""+cantidad+"\" onkeydown=\"return false;\">"+"</td>";
							contenido += "</tr>";
						}
						$("#table_product").find( "tbody" ).html(contenido);
						//console.log($('input[name="cantidad_producto"]').val());
					}
				}
			});
			$('#button_save').off('click');
			$('#button_save').click(function(){
				total=0;
				var arr = [];
				var arr_cantidad = [];
				$('input[name="producto"]:checked').each(function(){
					arr.push(parseInt($(this).attr('id')));

					arr_cantidad.push(parseInt($(this).parent().siblings().find('input[name="cantidad_producto"]').val()));
				});
				console.log("Cantidad de productos: "+arr_cantidad);
				console.log("Contenido de arreglo: "+arr);
				//console.log(arr_cantidad[0]);
				arr.forEach(function(arr, index){
						var result = data.boletas[id].ItemProductos[arr].productos.nombre_pro;
						var price = data.boletas[id].ItemProductos[arr].productos.precio;
						total += price*arr_cantidad[index];
						console.log(result, price);
					}
				);
				var total_bol = data.boletas[id].total;
				var calc_devolucion_costo = total_bol-total;
				console.log("Monto total boleta anterior: "+total_bol);
				console.log("Monto Total actual: "+total);
				console.log("Monto de devolución: "+calc_devolucion_costo);

				//-----------------------------------------Inicio Swal-----------------------------------
				swal({
					title: "¿Desea confirmar la devolución de está boleta?",
					text: "2<br>1\nAl confirmar, usted acepta nuestros términos y condiciones de devolución.",
					icon: "warning",
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
						//boleta();
					}
				});
				//-----------------------------------------Término Swal-----------------------------------
				function item_boleta(){

				}
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
		esconder_prod();

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
		esconder_revision();
		$("#error_msg5").html("<br><br>No Existe el cliente ingresado.");
	}
	else{
		$("#error_msg5").html("");
		$( "#tabla_revision_cli" ).show();
		var bloc = "";
		bloc +="<tr><td>" + data.rut + "</td>";
		bloc +="<td>" + data.nombre_cl + "</td>"
		bloc +="<td>" + data.direccion + "</td>";
		//console.log(data.boletas.length);
		//Todo esto es provisional y debe ser removido.
		for(let i = 0; i < data.boletas.length; i++){
			bloc +="<td>" + data.boletas[i].num_boleta + "</td></tr>";
			var prods = "";
			console.log(data.boletas[i].productos.length);
			for(let k = 0; k < data.boletas[i].productos.length; k++){
				prods += "<tr><td>" + data.boletas[i].productos[k].nombre_pro + "</td>";
				var  monea = new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'});
				prods += "<td>" + monea.format(data.boletas[i].productos[k].precio) + "</td>";
				prods += "</tr>";
			}
			$("#tabla_revision_prod").find( "tbody" ).html(prods);
		}
		$("#tabla_cliente").find( "tbody" ).html(bloc);
	}
}
function alerta_bton(){
	swal({
		title: "¿Desea confirmar la devolución de está boleta?",
		icon: "info",
		text: "Al aceptar, usted acepta nuestros términos y condiciones de devolución.",
		buttons: {
			cancel: "Cancelar",
			confirm: {text:'Confirmar',className: 'bton_confirmar_dev'}
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

/*---------------Zona de testing--------*/
