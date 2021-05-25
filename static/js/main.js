function prueba(){
	/*let url="34.233.135.60/api/boleta/12345"
	fetch(url)
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.log(error))*/

	/*var buscar1 = document.getElementById('id_buscar').value.toString();*/
	//var formdata = new FormData();

	var requestOptions = {
	  method: 'GET',
	  //body: formdata,
	  redirect: 'follow'
	};

	fetch("34.233.135.60/api/boleta/12345", requestOptions)
	  .then(response => response.text())
	  .then(result => console.log(result))
	  .catch(error => console.log('error', error));
}