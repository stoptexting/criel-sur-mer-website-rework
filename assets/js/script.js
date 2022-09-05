$( document ).ready(function() {
  $('body').css("overflow", "hidden");
  const video = document.getElementById('video-background');
  video.currentTime += 5;
});

var scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: '#navigando'
})

