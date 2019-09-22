
var IP_backend = '192.168.0.23'

function navegacion() {

    var trigger = $('nav ul li a'),
            container = $('#content');

    trigger.on('click', function() {
        var $this = $(this),
                target = $this.data('target');
        container.load(target);
        return false;
    });
}

function cargarCategorias() {
    jQuery.support.cors = true;

//                url: 'http:'+IP_backend+':8080/Cafe_BackEnd/api/categorias',

    $.ajax(
            {
                type: "GET",
                url: 'http://'+IP_backend+':8080/Cafe_BackEnd/api/categorias',
                data: {get_param: 'nombre'},
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                cache: false,
                success: function(data) {
                    var trHTML = '';
                    $.each(data, function(i, element) {
                        trHTML += '<div class="col-md-3 themed-grid-col \n\
                        bg-secundary rounded " align="center" >' +
                                '<img src="' + element.img +
                                '" class="img-fluid rounded">' +
                                '<a onclick="VerProductos(' + element.id 
                                + ')"   class="btn btn-warning btn-lg \n\
                                ">' + element.nombre + '</a>' +
                                '</div>';
                    });
                    /* #product es el nombre de una tabla, pero puedes utilizar 
                     * cualquier contenedor html*/
                    $('#lista-categorias').empty();
                    $('#lista-categorias').append(trHTML);
                },
                error: function(msg) {

                    trHTML += msg.responseText;
                }
            });
}

function VerProductos(categoriaId) {
    localStorage.setItem("categoriaId", categoriaId);
    $('#content').load("productos.html");
}

function VerProductosPorCategoria(categoriaId) {

    jQuery.support.cors = true;

    $.ajax(
            {
                type: "GET",
                url: 'http://'+IP_backend+':8080/Cafe_BackEnd/api/productos/cat/'
                        + categoriaId,
                data: {get_param: 'nombre'},
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                cache: false,
                success: function(data) {
                    var trHTML = '';
                    $.each(data, function(i, element) {
                        trHTML += '<div class="col-md-4 themed-grid-col bg-white\n\
                         rounded shadow-sm" align="center">' +
                                '<img src="' + element.img + '" class="img-fluid \n\
rounded">' +
                                '<h5 align="center">' + element.nombre + '</h5>' +
                                '<h5 align="center">' + element.precio + '</h5>' +
                                '</div>';

                    });
                    /* #product es el nombre de una tabla, se puede utilizar cualquier contenedor html*/
                    $('#lista-productos').append(trHTML);
                },
                error: function(msg) {

                    trHTML += msg.responseText;
                }
            });
}


function cargarProductos() {
    jQuery.support.cors = true;

    $.ajax(
            {
                type: "GET",
                url: 'http://'+IP_backend+':8080/Cafe_BackEnd/api/productos',
                data: {get_param: 'nombre'},
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                cache: false,
                success: function(data) {
                    var trHTML = '';
                    $.each(data, function(i, element) {
                        trHTML +=
                                '<div class="row">' +
                                ' <div class="col-sm" align="center">' +
                                element.id +
                                '</div>' +
                                '<div class="col-sm" align="center">' +
                                element.nombre +
                                '</div><div class="col-sm" align="center">' +
                                element.idCategoria +
                                '</div> <div class="col-sm" align="center">' +
                                element.precio +
                                '</div> <div class="col-sm" align="center">' +
                                '   <img src="img/modificar.ico" class="img-fluid" alt="Responsive image" onclick="ModificarProducto(' + element.id + ')">' +
                                '</div> <div class="col-sm" align="center">' +
                                '<img src="img/eliminar.ico" onclick="EliminarProducto(' + element.id + ')" class="img-fluid" alt="Responsive image"></div>' +
                                '</div>';

                    });
                    /* #product es el nombre de una tabla, pero se puede utilizar cualquier contenedor html*/
                    $('#list-productos').append(trHTML);
                },
                error: function(msg) {

                    trHTML += msg.responseText;
                }
            });
}
function ModificarProducto(id) {
    localStorage.setItem("prodId", id);
    $('#content').load("abmmodificarProducto.html");

}

function CargarProducto(id) {
    //alert("Modificar producto:" + id);
    jQuery.support.cors = true;

    $.ajax(
            {
                type: "GET",
                url: 'http://'+IP_backend+':8080/Cafe_BackEnd/api/productos/' + id,
                data: {get_param: 'nombre'},
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                cache: false,
                success: function(data) {
                    document.getElementById("prodId").value = data.id;
                    document.getElementById("nombre").value = data.nombre;
                    document.getElementById("precio").value = data.precio;
                    document.getElementById("categoria").value = data.idCategoria;

                },
                error: function(msg) {

                    trHTML += msg.responseText;
                }
            });
}


function EliminarProducto(id) {
    jQuery.support.cors = true;

    $.ajax(
            {
                type: "DELETE",
                url: 'http://'+IP_backend+':8080/Cafe_BackEnd/api/productos/' + id,
                data: {get_param: 'nombre'},
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                cache: false,
                success: function(data) {
                    alert('Producto Eliminado.')
                    $('#content').load("abmproductos.html");
                },
                error: function(msg) {

                    trHTML += msg.responseText;
                }
            });

}

function CargarLogin() {
    $('#content').load('login.html');
}


function actualizarProducto() {
    jQuery.support.cors = true;

    var dataProducto = {
        'id': document.getElementById("prodId").value,
        'precio': document.getElementById("precio").value,
        'idCategoria': document.getElementById("categoria").value,
        'nombre': document.getElementById("nombre").value
    };

    prod = JSON.stringify(dataProducto);

    $.ajax(
            {
                type: "PUT",
                url: 'http://'+IP_backend+':8080/Cafe_BackEnd/api/productos',
                data: prod,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                cache: false,
                success: function(data) {
                    alert('Producto Actualizado.')
                    $('#content').load("abmproductos.html");
                },
                error: function(msg) {

                    trHTML += msg.responseText;
                }
            });
}

function crearProducto() {
    jQuery.support.cors = true;

    var dataProducto = {
        'id': 0,
        'precio': document.getElementById("precio").value,
        'idCategoria': document.getElementById("categoria").value,
        'nombre': document.getElementById("nombre").value
    };

    prod = JSON.stringify(dataProducto);

    $.ajax(
            {
                type: "POST",
                url: 'http://'+IP_backend+':8080/Cafe_BackEnd/api/productos',
                data: prod,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                cache: false,
                success: function(data) {
                    alert('Producto Agregado.')
                    $('#content').load("abmproductos.html");
                },
                error: function(msg) {

                    trHTML += msg.responseText;
                }
            });
}

function login(form) {
    var usuario = form.elements["correo"].value;
    var clave = form.elements["clave"].value;

    jQuery.support.cors = true;

    var dataUsuario = {
        'email': usuario,
        'clave': clave,
    };

    usuarioJson = JSON.stringify(dataUsuario);
    $.ajax(
            {
                type: "POST",
                url: 'http://'+IP_backend+':8080/Cafe_BackEnd/api/usuarios',
                data: usuarioJson,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                crossDomain: true,
                cache: false,
                success: function(usuario) {
                    if (usuario != null)
                    {

                        if (usuario.tipoUsuario == 1) {

                            window.location.href = 'index3.html';
                        } else {
                            window.location.href = 'index2.html';
                        }
                    } else {
                        alert("Usuario y/o clave no corresponden a un usuario.");
                    }

                },
                error: function(msg) {
                    alert("Error al llamar al ingresar al sistema.");
                }
            });
}





