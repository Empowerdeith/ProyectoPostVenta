function mostrarBoleta(data){
	var mainContainer = document.getElementById("myData");
	var div = document.createElement("div");
	div.innerHTML = 'Id: ' + data.id;
	div.innerHTML += 'Número Boleta: ' + data.numero_boleta.value;
	div.innerHTML += 'Comprador: ' + data.Comprador;
	div.innerHTML += 'Fecha de orden: ' + data.date_ordered;
	div.innerHTML += 'Producto: ' + data.producto;
	div.innerHTML += 'Cantidad: ' + data.cantidad;
	div.innerHTML += 'Total: ' + data.total;
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