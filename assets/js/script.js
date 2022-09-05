$(window).on('scroll', function () {
  var pixs = $(document).scrollTop()
  pixs = pixs / 10;
  $(".out").css({"-webkit-filter": "blur("+pixs+"px)","filter": "blur("+pixs+"px)" })     
});

$( document ).ready(function() {
  $('body').css("overflow", "hidden");
});