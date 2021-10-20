$(document).ready(function() {
    //making it so the textbox appears and disappears by clicking the plus
    $(".fa-plus").on("click", function() {
        $("#new").toggle();
        $("#new").val("");
    });
    //border color changes when user focuses on it
    $("#new").focus(function(){
        $(this).addClass("focused");
      });
    //remove once user clicks off
    $("#new").blur(function(){
        $(this).removeClass("focused");
    });
    //user presses enter and new thing shows up on list (should remove after enter is pressed)
    $("#new").keypress(function(event) {
        if (event.which == 13) {
            $("ul").append('<li><span class="start-hidden"><i class="fa fa-trash"></i></span>' + $("#new").val() + '</li>');
            $(this).val("");
        }
    });
    //clicking on member on the list gives it a strikethrough, click again and removes it
    $("ul").on("click", "li", function(){
        $(this).toggleClass("done");
    });
    //hover on text should show trash can
    $("ul").on("mouseenter","li", function(){
        $(this).find("span").fadeIn();
    }); 
    //hover off text should hide trash can again
    $("ul").on("mouseleave","li", function(){
        $(this).find("span").fadeOut("fast");
    });
    //clicking on trash can should remove from list
   $(document).on("click", "span", function(){
       $(this).closest("li").remove();
   });
});