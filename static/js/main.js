/*function prueba(){
	var buscar1 = document.getElementById('id_buscar').value.toString();
	var requestOptions = {
	  method: 'GET',
	  redirect: 'follow'
	};

	fetch("http://34.233.135.60/api/boleta/"+buscar1, requestOptions)
	  .then(response => response.text())
	  .then(result => console.log(result))
	  .catch(error => console.log('error', error));
}*/



/*function prueba(){
	var buscar1 = document.getElementById('id_buscar').value.toString();
	let url="http://34.233.135.60/api/boleta/"+buscar1
	fetch(url)
		.then(response => response.json())
		.then(data => mostrarBoleta(data))
		.catch(error => console.log(error))

}*/
function prueba(){
	var buscar1 = document.getElementById('id_buscar').value.toString();
	let url="http://34.233.135.60/api/boleta/"+buscar1
	fetch(url)
	.then(function (response) {
                return response.json();
            })
            .then(function (data) {
                mostrarBoleta(data);
            })
            .catch(function (err) {
                console.log('error: ' + err);
            });
}

function mostrarBoleta(data){
	var mainContainer = document.getElementById("myData");
  	for (var i = 0; i < data.length; i++) {
		var div = document.createElement("div");
		//div.innerHTML = 'Id: ' + data[i].id;
		div.innerHTML = 'Número Boleta: ' + data[i].numero_boleta;
		div.innerHTML = 'Comprador: ' + data[i].Comprador;
		div.innerHTML = 'Producto: ' + data[i].producto;
		div.innerHTML = 'Cantidad: ' + data[i].cantidad;
		div.innerHTML = 'Total: ' + data[i].total;
		mainContainer.appendChild(div);
	}
}