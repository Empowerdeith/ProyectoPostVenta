/*function mostrarBoleta(data){
	var mainContainer = document.getElementById("myData");
	var div = document.createElement("div");
	div.innerHTML = 'Número Boleta: ' + data.numero_boleta+'<br>';
	div.innerHTML += 'Comprador: ' + data.Comprador+'<br>';
	div.innerHTML += 'Fecha de orden: ' + data.date_ordered+'<br>';
	div.innerHTML += 'Producto: ' + data.producto+'<br>';
	div.innerHTML += 'Cantidad: ' + data.cantidad+'<br>';
	div.innerHTML += 'Total: ' + data.total+'<br>';
	div.innerHTML += 'Región: ' + data.region+'<br>';
	div.innerHTML += 'Ciudad: ' + data.ciudad+'<br>';
	div.innerHTML += 'Dirección: ' + data.direccion+'<br>';
	mainContainer.appendChild(div);
}*/
function mostrarBoleta(data){
	var numero_bol = document.getElementById("numero_bol");
	var comprador = document.getElementById("comprador");
	var fecha = document.getElementById("fecha");
	var producto = document.getElementById("producto");
	var cantidad = document.getElementById("cantidad");
	var total = document.getElementById("total");
	var region = document.getElementById("region");
	var ciudad = document.getElementById("ciudad");
	var direccion = document.getElementById("direccion");
	var fecha_formato =data.date_ordered.format('dd-mm-yy');
	console.log(fecha_formato)
	numero_bol.innerHTML = data.numero_boleta;
	comprador.innerHTML = data.Comprador;
	fecha.innerHTML = fecha_formato;
	producto.innerHTML =  data.producto;
	cantidad.innerHTML = data.cantidad;
	total.innerHTML = data.total;
	region.innerHTML =  data.region;
	ciudad.innerHTML = data.ciudad;
	direccion.innerHTML =  data.direccion;
}
//console.log(data)
function prueba(){
	var buscar1 = document.getElementById('id_buscar').value.toString();
	if(buscar1 != null || buscar1 != ""|| buscar1!="Escriba el Id de Transacción aquí..."){
		let url="http://18.207.25.202/api/boleta/"+buscar1
		fetch(url)
		.then(response => response.json())
		.then(data => mostrarBoleta(data))
		.catch(error => console.log(error))
	}
	else{
		window.alert("Debe ingresar un número de transacción.")
	}
}