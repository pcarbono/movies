let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const cargarPeliculas = async() => {
	try{
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=ae67338b8d26bf7fed601ecd94f1c078&language=es-CO&page=${pagina}`);
		console.log(respuesta)

	//Si la respuesta es correcta
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas +=`
				<div class = 'pelicula'>
					<img class = 'poster' src = "https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
					<h3 class='titulo'>${pelicula.title}</h3>
				</div>`
				
			});
			document.getElementById('contenedor').innerHTML=peliculas;
			
		}else if(respuesta.status === 401){
			console.log('error en los parametros')
		}else if(respuesta.status === 404){
			console.log('la pelicula no existe')
		}else{
			console.log('error fatal')
		}
		
	} catch(error){
		console.log(error)
	}
}


cargarPeliculas();


let siguiente = function() {
	if(pagina < 1000){
		pagina += 1;
 		cargarPeliculas();
	}
};

let anterior = function() {
	if(pagina > 1){
		pagina -= 1;
 		cargarPeliculas();
	}
}

btnSiguiente.addEventListener('click', siguiente);
btnSiguiente.addEventListener('touchstart', siguiente);
	
btnAnterior.addEventListener('click', anterior);
btnAnterior.addEventListener('touchstart', anterior);