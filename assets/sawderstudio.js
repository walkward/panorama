/*! sawderstudio*/
//------ scripts/main.js
//Initialize Functions
$(document).ready( function(){

});

function resizedw(){
  theme.collectionGridMasonry();
  console.log("go")
}
var doit;
window.onresize = function(){
  clearTimeout(doit);
  doit = setTimeout(resizedw, 100);
};

$(window).load( function(){
  //Prevent Header Resizing Until Everything is loaded
  $("#header-wrapper").addClass("window-loaded");
});

//------ scripts/lib/autocomplete.js
$(function() {
  // Current Ajax request.
  var currentAjaxRequest = null;
  // Grabbing all search forms on the page, and adding a .search-results list to each.
  var searchForms = $('form[action="/search"]').css('position','relative').each(function() {
    // Grabbing text input.
    var input = $(this).find('input[name="q"]');
    // Adding a list for showing search results.
    var offSet = input.position().top + input.innerHeight();
    $('<ul class="search-results"></ul>').css( { 'position': 'absolute', 'left': '0px', 'top': offSet } ).appendTo($(this)).hide();
    // Listening to keyup and change on the text field within these search forms.
    input.attr('autocomplete', 'off').bind('keyup change', function() {
      // What's the search term?
      var term = $(this).val();
      // What's the search form?
      var form = $(this).closest('form');
      // What's the search URL?
      var searchURL = '/search?type=product&q=' + term;
      // What's the search results list?
      var resultsList = form.find('.search-results');
      // If that's a new term and it contains at least 3 characters.
      if (term.length > 3 && term != $(this).attr('data-old-term')) {
        // Saving old query.
        $(this).attr('data-old-term', term);
        // Killing any Ajax request that's currently being processed.
        if (currentAjaxRequest != null) currentAjaxRequest.abort();
        // Pulling results.
        currentAjaxRequest = $.getJSON(searchURL + '&view=json', function(data) {
          // Reset results.
          resultsList.empty();
          // If we have no results.
          if(data.results_count == 0) {
            // resultsList.html('<li><span class="title">No results.</span></li>');
            // resultsList.fadeIn(200);
            resultsList.hide();
          } else {
            // If we have results.
            $.each(data.results, function(index, item) {
              var link = $('<a></a>').attr('href', item.url);
              link.append('<span class="thumbnail"><img src="' + item.thumbnail + '" /></span>');
              link.append('<span class="title">' + item.title + '</span>');
              link.wrap('<li></li>');
              resultsList.append(link.parent());
            });
            // The Ajax request will return at the most 10 results.
            // If there are more than 10, let's link to the search results page.
            if(data.results_count > 10) {
              resultsList.append('<li><span class="title"><a href="' + searchURL + '">See all results (' + data.results_count + ')</a></span></li>');
            }
            resultsList.fadeIn(200);
          }
        });
      }
    });
  });
  // Clicking outside makes the results disappear.
  $('body').bind('click', function(){
    $('.search-results').hide();
  });
});

//------ scripts/lib/magnific.js
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
