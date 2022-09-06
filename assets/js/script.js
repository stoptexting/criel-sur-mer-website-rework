$( window ).on( "load", function() {
  $('video-background').fadeIn("slow");
  const video = document.getElementById('video-background');
  video.currentTime += 6;
});

$( document ).ready(function() {
  $('body').css("overflow", "hidden");

  
  const main = document.getElementById('main_page');
  main.style.display = "none";

  

  var typed = new Typed('#typed',{
    strings:["Bienvenue.","Criel-sur-Mer vous attend !", "Qu'attendez vous?"],
    backSpeed: 40,
    typeSpeed: 40
  });
});

function init() {

  document.getElementById("arrow").className = 'arrow_down animate__animated animate__flash';
  setTimeout(function () {
      
      $( "#arrow" ).fadeOut( "slow", function() {});
      $( "#visit" ).fadeOut( "slow", function() {});
      $('#main_page').fadeIn("slow");
      $('body').css("overflow", "auto");

  }, 1500); 
  
}
