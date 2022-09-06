$( document ).ready(function() {
  $('body').css("overflow", "auto");
  const video = document.getElementById('video-background');
  video.currentTime += 5;

  var typed = new Typed('#typed',{
    strings:["Bienvenue.","Criel-sur-Mer vous attend !", "Alors, vous venez ?"],
    backSpeed: 40,
    typeSpeed: 40
  });
});

function init() {

  document.getElementById("#navigando arrow").className = 'arrow_down animate__animated animate__flash';
  setTimeout(function () {
      
      $( "#arrow" ).fadeOut( "slow", function() {});

      $("#video-background").css({"overflow-y":"scroll"});
      console.log("lol")
  }, 1000); 
  
}
