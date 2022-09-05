$( document ).ready(function() {
  $('body').css("overflow", "hidden");
  const video = document.getElementById('video-background');
  video.currentTime += 5;
});

// thanks to https://jsfiddle.net/rjSfP/
window.smoothScroll = function(target) {
  var scrollContainer = target;
  do { //find scroll container
      scrollContainer = scrollContainer.parentNode;
      if (!scrollContainer) return;
      scrollContainer.scrollTop += 1;
  } while (scrollContainer.scrollTop == 0);
  
  var targetY = 0;
  do { //find the top of target relatively to the container
      if (target == scrollContainer) break;
      targetY += target.offsetTop;
  } while (target = target.offsetParent);
  
  scroll = function(c, a, b, i) {
      i++; if (i > 30) return;
      c.scrollTop = a + (b - a) / 30 * i;
      setTimeout(function(){ scroll(c, a, b, i); }, 20);
  }
  // start scrolling
  scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
}

function init() {
  $('body').css("overflow", "show");
  document.getElementById("arrow_down").className = 'animate__animated animate__flash';
        setTimeout(function () {
            $( "#arrow_down" ).fadeOut( "slow", function() {});
            smoothScroll(document.getElementById('navigando'));
        }, 2500); 
  
}
