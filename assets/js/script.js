$( window ).on( "load", function() {
  $('video-background').fadeIn("slow");
  const video = document.getElementById('video-background');
  video.currentTime += 6;
});

$(document).ready(function() {
  jQuery.fn.carousel.Constructor.TRANSITION_DURATION = 5000;  // 2 seconds
});

function CheckSlugValidity(slug){
  console.log(window.location.pathname);
  return window.location.pathname.includes(slug);
}

//   return slug.indexOf(window.location.pathname) == 0; pour live server

$( document ).ready(function() {
  $('body').css("overflow", "hidden");
  
  if (window.location.pathname === "/" || CheckSlugValidity("/index.html")) {
    const main = document.getElementById('main_page');
    main.style.display = "none";
    
  
    var typed = new Typed('#typed',{
      strings:["Bienvenue.","Criel-sur-Mer vous attend !", "Qu'attendez vous?"],
      backSpeed: 40,
      typeSpeed: 40
    });
  }

  else {
    const main = document.getElementById('main_page');
    main.style.display = "block";
    main.style.visibility = "visible";
  }
  
});

setTimeout(function () {
  init()
}, 120000); 

function init() {

  document.getElementById("arrow").className = 'arrow_down animate__animated animate__flash';
  setTimeout(function () {
      
    $("#arrow").fadeOut("slow");
    $("#visit").fadeOut("slow", function(){
      $("#main_page").fadeIn("slow", function() {
        $('body').css("overflow", "auto");
      });
  });
      

  }, 1500); 
  
}
