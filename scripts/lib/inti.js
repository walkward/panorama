$('.menu-btn').click(function(){
  $('#slide-out').toggleClass("closed");
  $('.panorama-wrapper').toggleClass("sidenav-closed");
});

$('.scene-selector').click(function() {
  var $el = $(this);
  viewer.loadScene($(this).attr("data-scene-name"));
  $('.scene-selector').each(function(){
    $(this).removeClass("active");
  });
  $('.scene-selector').promise().done(function() {
    $el.addClass("active");
  });
});

$('#content img').imgpreload(function()
{
    // callback invoked when all images have loaded
    // this = array of dom image objects
    // check for success with: $(this[i]).data('loaded')
});
