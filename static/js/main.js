
//Esconder todo el div con todo su contenido
function hide_table() {
  $( "#myData" ).hide();
}
setTimeout(hide_table, 40);



//Mostrar información principal de Boleta
function mostrarBoleta(data){
	//console.log(data);
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
		var content = "";
		for(let i = 0; i < data.boletas.length; i++){
			content += "<tr><td><input id=\""+i+"\" type=\"checkbox\" name=\"boleta\" >"+"</td>";
			content += "<td>" + data.boletas[i].num_boleta + "</td>";
			//Probablemente se puede optimizar
			var fecha_obtenida = new Date(data.boletas[i].created_at);
			var dia = fecha_obtenida.getDate();
			var mes = fecha_obtenida.getMonth()+1;
			var annio = fecha_obtenida.getFullYear();
			//--------------------------------------------------
			content += "<td>" + dia+"/"+mes+"/"+annio + "</td>";
			content += "<td>" + data.boletas[i].total + "</td>";
			content += "</tr>";
		}
		$("#table_checkbox").find( "tbody" ).html(content);
		//Comienzo tabla productos
		var data1=data;
		test(data1);	
		//productostore(data, undefined);
		//selección de boleta
		function test(data1){
			//console.log(data1);
			var data2=data1;
			var id;
			$('input[type="checkbox"][name="boleta"]').click(
            	function(){
            		//console.log(data2);
	                if($(this).prop("checked") == true) {
	                    var contenido = "";	                    
	                    id = parseInt($(this).attr('id'));
	                    console.log(id);
	                    console.log(data2.boletas[id].productos.length);
	                    for(let k = 0; k < data2.boletas[id].productos.length; k++){
	                    	contenido += "<tr><td><input id=\""+k+"\" type=\"checkbox\" name=\"producto\" >"+"</td>";
	                    	contenido += "<td>" + data2.boletas[id].productos[k].nombre_pro + "</td>";
	                    	contenido += "<td>" + data2.boletas[id].productos[k].precio + "</td>";
	                    	contenido += "</tr>";
	                    }
	                    $("#table_product").find( "tbody" ).html(contenido);   
	                }
	            }
	        );
		}
		//end checkbox
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
	}
	else{
		hide_table()
		$("#error_msg").html("<br><br>Debe ingresar un número de transacción.");
	}
}

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
function buscarcheckbox() {
    var ids, info;
    info = data;
    ids = $('input[name=boleta]:checked').map(function() {
        return $(this).attr('id');
    }).get();
}

/*golden code
$('input[type="checkbox"][name="boleta"]').click(
            function(){
                if($(this).prop("checked") == true) {
                    var id;
                    id = parseInt($(this).attr('id'));
                    //creo que deberia rellenarla aca
                    console.log(id);
                }
            }
        );*/