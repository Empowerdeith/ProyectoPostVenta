
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
	//console.log(data);
	if (data == "No existe cliente."){
		hide_table();
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
			var  dineros = new Intl.NumberFormat('es-CL', {currency: 'CLP', style: 'currency'});
			content += "<td>" + dia+"/"+mes+"/"+annio + "</td>";
			content += "<td>" + dineros.format(data.boletas[i].total) + "</td>";
			content += "</tr>";
		}
		$("#table_checkbox").find( "tbody" ).html(content);
		//Comienzo tabla productos
		var data1=data;
		test(data1);
		//selección de boleta
		function test(data1){
			//console.log(data1);
			var data2=data1;
			var id;
			
			//revisión checkbox boleta para rellenar productos
			$('input[type="checkbox"]').on('change', function() {
    			$('input[name="boleta"]').not(this).prop('checked', false);
    		});
			$('input[type="checkbox"][name="boleta"]').click(
            	function(){
            		//console.log(data2);
	                if($(this).prop("checked") == true) {
	                    var contenido = "";	                    
	                    id = parseInt($(this).attr('id'));
	                    //Comprobación de fechas
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
	                    	$( "#tabla_de_productos" ).show();
		                    /*console.log(id);
		                    console.log(data2.boletas[id].productos.length);*/
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
		        }
		    );
			//Botón siguiente, para completar solicitud
	        $('#button_save').click(
	        	function(){
	        		//console.log("id de boleta:");
	        		//console.log(id);
					//console.log(data2);
					var arr = [];
					$('input[name="producto"]:checked').each(
						function () {
    						arr.push(parseInt($(this).attr('id')));
    					}
    				);
    				//productos();
    				//-------Sección productos operativa-----------------------------------------------
    				/*function productos(){
    					var check=false;
	    				for(let k = 0; k < arr.length; k++){	
	    					var formprod = new FormData();
	    					formprod.append("id",data2.boletas[id].productos[k].id);
							formprod.append("nombre_pro", data2.boletas[id].productos[k].nombre_pro);
							formprod.append("precio", data2.boletas[id].productos[k].precio);
							//console.log(formprod);
							var requestOptions = {
							method: 'POST',
							body: formprod,
							redirect: 'follow'
							};
							fetch("http://18.207.25.202/api/devolucion/Producto/", requestOptions)
							.then(response => response.json())
							//.then(data => console.log(data))
							.catch(error => console.log('error', error));
	    				};
	    				check=true;
						if(check==true){
							boleta();
						}	
    				}*/
    				//-------------------------------------------------------------------------------------

					//-------Sección boletas operativa-----------------------------------------------------
					function boleta(){
						var check = false;
						var formboleta = new FormData();
						formboleta.append("num_boleta", data2.boletas[id].num_boleta);
						formboleta.append("created_at", data2.boletas[id].created_at);
						formboleta.append("total", data2.boletas[id].total);
						//arreglo id productos
						for(let k = 0; k < arr.length; k++){
	    					formboleta.append("productos", data2.boletas[id].productos[k].id);
	    				}
						//console.log(formboleta);
						var requestOptions = {
						  method: 'POST',
						  body: formboleta,
						  redirect: 'follow'
						};

						fetch("http://18.207.25.202/api/devolucion/Boleta/", requestOptions)
						.then(response => response.json())
						//.then(data => console.log(data))
						.catch(error => console.log('error', error));
						check=true;
						if(check==true){
							cliente();
						}
					}


					//-----------------------------------------------------------------------------------------
					//----Sección datos Cliente----------------------------------------------------------------
					function cliente(){					
						var formdata = new FormData();
						formdata.append("rut", data2.rut);
						formdata.append("nombre_cl", data2.nombre_cl);
						formdata.append("direccion", data2.direccion);
						formdata.append("boletas", data2.boletas[id].num_boleta);
						//console.log(formdata);
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
					//-----------------------------------------------------------------------------------------
    			}
    		)
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
		esconder_prod();
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
