$(document).ready(function() {

    var globalData;

    $.ajax({
        url:"js/data.json",
        dataType:"json",
        success: function(data) {
            //file is successfully loaded
            console.log("file has loaded successfully. Now adding images");
            globalData = data;
            data.forEach(element => {
                let path = element["path"];
                let title = element["title"];
                let input = `<img src="images/square/${path}" alt="${title}">`;
                $("#image-input").append(input);  
            });
        },
        error: function() {
            console.log("error loading file");
        }
    });
        
    $(document).on('mouseenter', 'img', function(i) {
        $(this).addClass("gray");
        var modalDiv = '<div id="big-img" class="modal-body">';
        var img = globalData.find(i => {
            return i.title === $(this).attr('alt')
        });
        var newImg = '<img src="' + $(this).attr('src').replace('square', 'medium') + '" '+ 'alt="' + $(this).attr('alt') + '">';
        newImg += '<p>' + img.title + '<br />' + img.city + '<br />' + img.taken + '</p>';
        modalDiv += newImg;
        modalDiv += "</div>";
        $(document.body).append(modalDiv);
        $("#big-img").css({
            "position":"absolute"
        });
        $("#big-img").offset({
            "left": i.pageX,
            "top": i.pageY + 10,
        });
    });

    $(document).on('mouseleave', 'img', function() {
        $(this).removeClass("gray");
        $("#big-img").remove();
    });

    $(document).on('mousemove', 'img', function(i) {
        $("#big-img").css({
            "position":"absolute"
        });
        $("#big-img").offset({
            "left": i.pageX,
            "top": i.pageY + 10,
        });
    });
});