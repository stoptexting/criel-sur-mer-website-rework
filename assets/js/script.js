$( window ).on( "load", function() {
  const video = document.getElementById('video-background');
  $('video-background').fadeIn("slow");
});

$( document ).ready(function() {
  $('body').css("overflow", "auto");

  
  const main = document.getElementById('main_page');
  main.style.display = "none";

  

  var typed = new Typed('#typed',{
    strings:["Bienvenue.","Criel-sur-Mer vous attend !", "Alors, vous venez ?"],
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

  }, 1500); 
  
}
