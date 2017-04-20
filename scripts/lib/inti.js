//Initialize Functions
$(document).ready( function(){

});

function resizedw(){
  theme.collectionGridMasonry();
}
var doit;
window.onresize = function(){
  clearTimeout(doit);
  doit = setTimeout(resizedw, 100);
};

$(window).load( function(){
  //Prevent Header Resizing Until Everything is loaded
  $("body").addClass("window-loaded");
});
