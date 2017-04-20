$(document).ready(function(){
  $('.menu-btn').click(function(){
    $('#slide-out').toggleClass("closed");
    $('.panorama-wrapper').toggleClass("sidenav-closed");
  });
  $('ul.tabs').tabs();
});
