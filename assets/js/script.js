$( window ).on( "load", function() {
  $('video-background').fadeIn("slow");
  const video = document.getElementById('video-background');
  video.currentTime += 6;
  console.log("lol")
});

function CheckSlugValidity(slug){
  console.log("mdr");
  return window.location.pathname.includes(slug);
}

//   return slug.indexOf(window.location.pathname) == 0; pour live server

$( document ).ready(function() {
  $('body').css("overflow", "hidden");
  console.log("ptdr");
  
  if ((CheckSlugValidity("/") || CheckSlugValidity("/index.html"))) {
    console.log("mdr");
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

function init() {

  document.getElementById("arrow").className = 'arrow_down animate__animated animate__flash';
  setTimeout(function () {
      
      $( "#arrow" ).fadeOut( "slow", function() {});
      $( "#visit" ).fadeOut( "slow", function() {});
      $('#main_page').fadeIn("slow");
      $('body').css("overflow", "auto");

  }, 1500); 
  
}
