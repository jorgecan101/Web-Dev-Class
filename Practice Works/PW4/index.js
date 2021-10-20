function loadDoc() {
    $.ajax({
        url:"movies.xml",
        dataType:"xml",
        success: function(data) {
            //alert("file is loaded");
            $("table").append('<tr><td>Title</td><td>Genre</td><td>Director</td><td>Cast</td><td>Synopsis</td><td>Score</td></tr>');
		    $(data).find('movie').each(function(){
				var title = $(this).find('title').text();
                var genre = "";
                $(this).find('genre').each(function(i) {
                    genre += $(this).text() + ", ";
                });
                //to get rid of trailing comma at end
                genre = genre.substring(0, genre.length - 2);

                var director = $(this).find('director').text();
                var cast = "";
                $(this).find('cast').each(function(i) {
                    //cast = "";
                    v1 = $(this).find('person').each(function(){
                        cast += $(this).attr("name") + ", ";
                    });
                    //to get rid of trailing comma at end
                    cast = cast.substring(0, cast.length - 2);
                });
                var synopsis = $(this).find('synopsis').text();
                var score = $(this).find('score').text();
				var info = '<tr><td>' + title +'</td><td>' +  genre + '</td> + <td>' +  director + '</td> + <td>' +  cast + '</td> + <td>' +  synopsis + '</td> + <td>' +  score + '</td></tr>';
				$("table").append(info);
		    });
        },
        error: function() { 
            alert("error loading file");  
        }
    });
}