function prueba(){
	/*let url="http://34.233.135.60/api/boleta/12345"
	fetch(url)
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.log(error))*/

	var buscar1 = document.getElementById('id_buscar').value.toString();
	var requestOptions = {
	  method: 'GET',
	  redirect: 'follow'
	};

	fetch("http://34.233.135.60/api/boleta/"+buscar1, requestOptions)
	  .then(response => response.text())
	  .then(result => console.log(result))
	  .catch(error => console.log('error', error));
}

const input = document.querySelector('input');
const button = document.querySelector('button');
const boletaContainer = document.querySelector('.boleta-container');
function TraerBoleta() {
	fetch("http://34.233.135.60/api/boleta/12345")
	.then(res => res.json())
	.then(data => {
		crearboleta(data);
	})

}

function crearboleta(data){
	const h3 = document.createElement('h3');

	h3.textContent = data.region;

	const div = document.createElement('div');
	div.appendChild(h3);
	boletaContainer.appendChild(div);

}

TraerBoleta();


/*function prueba(){

}
function appendData(data) {
  var mainContainer = document.getElementById("myData");
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = 'Name: ' + data[i].firstName + ' ' + data[i].lastName;
    mainContainer.appendChild(div);
  }
}*/