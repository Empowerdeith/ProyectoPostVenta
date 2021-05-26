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



function prueba(){
	var buscar1 = document.getElementById('id_buscar').value.toString();
	let url="http://34.233.135.60/api/boleta/"+buscar1
	fetch(url)
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.log(error))

}
/*function appendData(data) {
  var mainContainer = document.getElementById("myData");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = 'Name: ' + data[i].firstName + ' ' + data[i].lastName;
    mainContainer.appendChild(div);
  }
}*/	
/**/