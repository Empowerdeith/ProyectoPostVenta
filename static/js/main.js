function prueba(){
	var buscar1 = document.getElementById('id_buscar').value.toString();
	var formdata = new FormData();

	var requestOptions = {
	  method: 'GET',
	  body: formdata,
	  redirect: 'follow'
	};

	fetch("34.233.135.60/api/boleta/"+buscar1, requestOptions)
	  .then(response => response.text())
	  .then(result => console.log(result))
	  .catch(error => console.log('error', error));
}