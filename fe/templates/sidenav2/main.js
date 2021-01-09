$(document).ready(function(){

  $('.toggle-nav').click(function(){
    $('.full-scr-nav').show();
    $(this).fadeOut();
  });

  $('.dismiss').click(function(){
    $('.full-scr-nav').slideUp();
    $('.toggle-nav').fadeIn();
  });

});
