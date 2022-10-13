$( document ).ready(function() {
    document.getElementById("video-background").currentTime += 6;
    $('body').css("overflow", "hidden");
    $('#main').css("display", "none");
    $('footer').css("display", "none");
      
      var typed = new Typed('#typed',{
        strings:["Bienvenue.","Criel-sur-Mer vous attend !", "Qu'attendez vous ?"],
        backSpeed: 40,
        typeSpeed: 40
      });
  });
  
  setTimeout(function () {
    init()
  
  }, 120000); 
  
  function init() {
  
    document.getElementById("arrow").className = 'arrow_down animate__animated animate__flash';
    setTimeout(function () {
        
        $("#arrow").fadeOut("slow");
        $("#visit").fadeOut("slow", function(){
        $("#main").fadeIn("slow", function() {
            $('body').css("overflow", "auto");
            $('footer').css("display", "block");
        });

        
    });
  
    }, 1500); 
    
  }