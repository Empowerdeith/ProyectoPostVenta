

function productostore(data, id){
	var data1, id1;
	if(typeof data !== "undefined"){
		data1=data;
	}
	if(typeof  id !== "undefined"){
		id1=id;
	}
	console.log("recibi la información");
	console.log(data1);
	console.log(id1);
}



/*function mostrarproductos(info, ids){
	console.log(info);
	console.log(ids);

}*/



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
		var data1=data;
		$( "#table_checkbox").find( "tbody" ).html(content);
		test(data1);	
		//productostore(data, undefined);
		//selección de boleta
		function test(data1){
			console.log(data1);
			var data2=data1;
			$('input[type="checkbox"][name="boleta"]').click(
            	function(){
            		console.log(data2);
	                if($(this).prop("checked") == true) {
	                	//console.log(data1);
	                    var id;
	                    id = parseInt($(this).attr('id'));
	                    //creo que deberia rellenarla aca
	                    console.log(id);
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
	$( "#table_checkbox").find( "input" ).prop('checked', true);
}
function unselectall(){
	$( "#table_checkbox").find( "input" ).prop('checked', false);
}
//------------------------------------------------------------------------------------
function buscarcheckbox(data) {
    var ids, info;
    info = data;
    ids = $('input[name=boleta]:checked').map(function() {
        return $(this).attr('id');
    }).get();
    //mostrarproductos(info, ids);
}
		/*while(true){
			if($('input[name=boleta]:checked')==true){
				break;
				var ids, info;
	    		info = data;
	    		ids = $('input[name=boleta]:checked').map(function() {
	        		return $(this).attr('id');
	    		}).get();
	    		console.log(info);
	    		console.log(ids);
			}
		}*/
//content += "<td>" + data.boletas[i].created_at + "</td>";



//Seccion boleta
				//console.log(data);
                //console.log(data.boletas[0].productos);
                //console.log(data.boletas[ids].productos);
                //var contenido="";
                /*for(let k = 0; k < data.boletas[ids].productos.length; k++){


                }*/

/*var ids;
				ids = $('input[name=boleta]:checked').map(function() {
				return $(this).attr('id');
				}).get();
				console.log(ids);*/
/*		/*$('input[type="checkbox" name="boleta"]').click(function(){
			if($(this).prop("checked") == true) {
				var id=1;
				//id= $(this);
				console.log(id);
			}
		});*/
//console.log(data.boletas[0].productos[0].nombre_pro);


//seleccion boleta
/*		var hola;
		$('input[type="checkbox"][name="boleta"]').click(
			function(){
				if($(this).prop("checked") == true) {
	                var id;
	                id = parseInt($(this).attr('id'));
	                hola=id;
	                console.log(hola);
	                //console.log(id);
	                //productostore(undefined, id);
	            }
	        }
	    );
	    if(hola>=0){
	    	console.log(hola);
	    } */

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