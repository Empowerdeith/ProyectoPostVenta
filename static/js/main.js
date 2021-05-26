function mostrarBoleta(data){
	var mainContainer = document.getElementById("myData");
	var div = document.createElement("div");
	div.innerHTML = 'Id: ' + data.id+'<br>';
	div.innerHTML += 'Número Boleta: ' + data.numero_boleta.value+'<br>';
	div.innerHTML += 'Comprador: ' + data.Comprador+'<br>';
	div.innerHTML += 'Fecha de orden: ' + data.date_ordered+'<br>';
	div.innerHTML += 'Producto: ' + data.producto+'<br>';
	div.innerHTML += 'Cantidad: ' + data.cantidad+'<br>';
	div.innerHTML += 'Total: ' + data.total+'<br>';
	mainContainer.appendChild(div);
}
//console.log(data)
function prueba(){
	var buscar1 = document.getElementById('id_buscar').value.toString();
	let url="http://18.207.25.202/api/boleta/"+buscar1
	fetch(url)
	.then(response => response.json())
	.then(data => mostrarBoleta(data))
	.catch(error => console.log(error))
}