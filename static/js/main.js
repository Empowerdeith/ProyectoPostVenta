function mostrarBoleta(data){
	var mainContainer = document.getElementById("myData");
	var div = document.createElement("div");
	div.innerHTML = 'Id: ' + data[0].id;
	mainContainer.appendChild(div);
  	/*for (var i = 0; i < data.length; i++) {
		var div = document.createElement("div");*/
		
		//console.log(data[i].numero_boleta.value);
		/*div.innerHTML = 'Número Boleta: ' + data[i].numero_boleta.value;
		div.innerHTML = 'Comprador: ' + data[i].Comprador;
		div.innerHTML = 'Producto: ' + data[i].producto;
		div.innerHTML = 'Cantidad: ' + data[i].cantidad;
		div.innerHTML = 'Total: ' + data[i].total;*/
		
	//}
}
//mostrarBoleta(data)
function prueba(){
	var buscar1 = document.getElementById('id_buscar').value.toString();
	let url="http://18.207.25.202/api/boleta/"+buscar1
	fetch(url)
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.log(error))
}

