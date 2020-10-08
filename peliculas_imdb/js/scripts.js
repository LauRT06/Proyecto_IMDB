$(document).ready(function() {
    let endpoint = 'https://api.themoviedb.org/3/movie/now_playing'
    let apiKey = '3e4d90cc981994d2cf858de33c365791'
    let poster_path = 'https://image.tmdb.org/t/p/w500' // + poster_path
    let background_path = 'https://image.tmdb.org/t/p/w500' // + backdrop_path
    var referencia_actual = ""

    $(document).on("click", ".boton_info" , function() {
        $('.input-3').rating({step: 0.5})
        $( "#listado_peliculas" ).hide()
        referencia_actual = "#"+$(this).attr("referencia_oculta")
        $(referencia_actual ).show()
        $("#info_peliculas").append('<a href="#" id="botonAtras" class="btn btn-secondary boton_atras ">Atrás</a>');
        // Boton que nos permita esconder la lista y mostrar referencia.

        $('.kv-lrt-theme-svg-star').rating({
            hoverOnClear: false,
            theme: 'krajee-svg',
            displayOnly: true
        })
   
    });

    $(document).on("click", ".boton_atras" , function() {
        $( "#listado_peliculas" ).show()
        $( referencia_actual).hide()
        // Boton que nos permite volver atras.
        $("#botonAtras").detach();
    });

    $.ajax({
        url: endpoint + "?api_key=" + apiKey + '&language=es-ES',
        contentType: "application/json",
        dataType: 'json',
        success: function(result){

           var lista_peliculas = result.results

           for(var item=0; item<lista_peliculas.length; item++){
                var pelicula_actual = lista_peliculas[item]

                // https://getbootstrap.com/docs/4.5/components/card/
                $( "#listado_peliculas" ).append(
                    '<div class="col-12 col-sm-6 col-md-4 col-xl-3">' +
                        '<div class="card mt-3">' +
                          '<img src="' + poster_path + pelicula_actual.poster_path + '" class="card-img-top img_card" alt="...">' +
                          '<div class="card-body">' +
                            '<h5 class="card-title">' + pelicula_actual.title +'</h5>' +
                            '<p class="card-text pelicula_card_overview">' + pelicula_actual.overview +'</p>' +
                            '<a href="#" class="stretched-link boton_info " referencia_oculta="peli'+item+'"></a>' +
                          '</div>' +
                        '</div>' +
                    '</div>');

                    $( "#info_peliculas" ).append(
                        "<div style='display:none' id='peli"+item+"'>"+
                            "<h1>"+pelicula_actual.title+"</h1>"+
                            "<h4>"+"<i>"+pelicula_actual.original_title+"</i>"+"</h4>"+
                            "<p>"+pelicula_actual.overview+"</p>"+
                            "<p>Fecha de lanzamiento: "+pelicula_actual.release_date+"</p>"+
                            "<p>Idioma original: "+pelicula_actual.original_language+"</p>"+
                            "<p>Popularidad: "+pelicula_actual.popularity+"</p>"+
                            '<img src="' + background_path + pelicula_actual.backdrop_path + '" class="backdrop_img" alt="...">' +
                            
                            '<input id="input-3-lrt-star-md" name="input-3-lrt-star-md" class="kv-lrt-theme-svg-star rating-loading" value="'+(pelicula_actual.vote_average / 2)+'" dir="lrt" data-size="md">'+
                            //'<label for="input-3" class="control-label">Nota</label><input class="input-3" name="input-3" value="'+pelicula_actual.vote_average+'" class="rating-loading">'+
                        "</div>"
                        
                    );

           }

        }
    })

});