$( document ).ready(function() {
    $('.close').on('click', function() {
    $('#alert-border-2').hide();
    });

    $('.venir').on('click', function() {
      location.href='./venir.html';
    })

    $('.imagen').on('click', function() {
      $("#imglol").show();
      $("#imglol > img").attr('src', $(this).attr('src'));
      $('body').css('overflow', 'hidden');

      $('html').css({
        'overflow': 'hidden',
    });

    })

    $("#imglol").on('click', function() {
      $("#imglol").hide();
      
      $('html').css({
        'overflow': 'scroll',
      });
    });

    $('.imagen').on('click', function() {
      console.log($(this).attr('src'));
    })


  });