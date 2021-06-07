function hide_table() {
  $( "#myData" ).hide();
}
setTimeout(hide_table, 40);
function mostrarBoleta(data){
	console.log(data);
	if (data == "No existe cliente."){
		hide_table()
		$("#error_msg").html("<br><br>"+data);
	}
	else{
		$("#error_msg").html("");
        $( "#myData" ).show();
		var rut_p = $("#rut_p");
		var nombre_cliente = $("#nombre_cliente");
		var direccion = $("#direccion");
		rut_p.html(data.rut);
		nombre_cliente.html(data.nombre_cl);
		direccion.html(data.direccion);
		console.log(data.boletas.length);
		var content = "";
		for(let i = 0; i < data.boletas.length; i++){
			content += "<tr><td><input id=\"checkbox_" +i+ "\" type=\"checkbox\" name=\"boleta\" >"+"</td>";
			content += "<td>" + data.boletas[i].num_boleta + "</td>";
			//content += "<td>" + data.boletas[i].created_at + "</td>";
			var fecha_obtenida = new Date(data.boletas[i].created_at);
			var dia = fecha_obtenida.getDate();
			var mes = fecha_obtenida.getMonth()+1;
			var annio = fecha_obtenida.getFullYear();
			content += "<td>" + dia+"/"+mes+"/"+annio + "</td>";
			content += "<td>" + data.boletas[i].total + "</td>";
			content += "</tr>";
		}
		$( "#table_checkbox").find( "tbody" ).html(content);
	}
}
Object.prototype.isEmpty = function () {
    return Object.keys(this).length == 0;
}

function prueba(){
	var buscar1 = $('#id_buscar').val().toString();
	// console.log(buscar1);
	if(!buscar1.isEmpty()){
		let url="http://3.83.24.216/api/cl/"+buscar1
		fetch(url)
		.then(response => response.json())
		.then(data => mostrarBoleta(data))
		.catch(error => console.log(error))
	}
	else{
		hide_table()
		$("#error_msg").html("<br><br>Debe ingresar un número de transacción.");
	}
}

function selectall(){
	$( "#table_checkbox").find( "input" ).prop('checked', true);
}
function unselectall(){
	$( "#table_checkbox").find( "input" ).prop('checked', false);
}
/*function selectone(){
	$( "#table_checkbox").find( "input" ).on('change', function() {
  		$('input').not(this).prop('checked', false);
   		console.log($('input:checked').attr("id"));
  	});
}*/
function selectone(){
  	$('input[name="boleta"]').on('change', function() {
  		$('input[name="boleta"]').not(this).prop('checked', false);
   		alert("boleta is: " + $('input[name="boleta"]:checked').attr("id"));
  	});
  }