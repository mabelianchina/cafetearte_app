$("#boton-expositores").on("click", getUsers);

function getUsers() {
	$listaexpositores.html("<div class='loader'></div>"); //le argego la animación de cargar
  $.ajax({
    url: 'https://reqres.in/api/users', //direccion donde esta mi api
    success: function(respuesta) {//funcion de respuesta ok el argumento "respuesta" va a tener el json con la respuesta del servidor

      var listaExpositores = $("#lista-expositores");
	  listaExpositores.empty();//vacio el contenedor para borrar el load
      $.each(respuesta.data, function(index, elemento) {//itero y voy agregando cada elemento al contenedor
        listaExpositores.append(
            '<div>'
          +     '<p>' + elemento.first_name + ' ' + elemento.last_name + '</p>'
          +     '<img src=' + elemento.avatar + '></img>'
          + '</div>'
        );    
      });
    },
    error: function() {//funcion de respuesta error
		$("#lista-expositor").html("<H4> No se ha encontrado el Expositor que busca</H4>");
		console.log("No se ha encontrado el expositor");
    }
  });
}