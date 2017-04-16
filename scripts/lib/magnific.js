//Initialize Functions
$(document).ready( function(){
  var now, lastDatePopupShowed;
  now = new Date();

  if (localStorage.getItem('lastDatePopupShowed') !== null) {
    lastDatePopupShowed = new Date(parseInt(localStorage.getItem('lastDatePopupShowed')));
  }

  if (((now - lastDatePopupShowed) >= (15 * 86400000)) || !lastDatePopupShowed) {
    setTimeout(function(){
      var el = $('#newsletter-popup');
      if (el.length) {
          $.magnificPopup.open({
              items: {
                  src: el
              },
              type: 'inline',
              mainClass: 'mfp-zoom-in',
              removalDelay: 500
          });
      }
     }, 3000);

    localStorage.setItem('lastDatePopupShowed', now);
  }
  setTimeout(function(){
    var el = $('#newsletter-popup');
    if (el.length) {
        $.magnificPopup.open({
            items: {
                src: el
            },
            type: 'inline',
            mainClass: 'mfp-zoom-in',
            removalDelay: 500
        });
    }
   }, 3000);

});
