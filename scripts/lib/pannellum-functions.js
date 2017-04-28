// Hot spot creation function
function hotspot(hotSpotDiv, args) {
    hotSpotDiv.classList.add('custom-tooltip');
    var span = document.createElement('span');
    span.innerHTML = '<span>' + args.title + '</span>';
    hotSpotDiv.appendChild(span);
    var img = document.createElement('img');
    img.src = args.image_src;
    span.insertBefore(img, span.firstChild );
    var viewBtn = document.createElement('a');
    viewBtn.setAttribute('data-view-product', args.variantID);
    viewBtn.innerHTML = "View";
    span.insertBefore(viewBtn, span.firstChild );
    var buyBtn = document.createElement('a');
    buyBtn.setAttribute('data-addtocart', args.variantID);
    buyBtn.innerHTML = "Buy Now";
    span.insertBefore(buyBtn, span.firstChild );
    span.style.marginLeft = -(span.scrollWidth - hotSpotDiv.offsetWidth) / 2 + 'px';
    span.style.marginTop = -span.scrollHeight + 'px';
}
function hotspotClick(hotSpotDiv, args) {
  var addToCartId = hotSpotDiv.srcElement.getAttribute("data-addtocart");
  var productId = hotSpotDiv.srcElement.getAttribute("data-view-product");
  if (productId) {
    document.getElementById("product-"+productId).style.backgroundColor = "#f4f4f4";
    openTab("tab-catalog");
    setTimeout(function(){
      document.getElementById("product-"+productId).style.backgroundColor = "#fff"; },
    1000);
  } else if (addToCartId) {
    CartJS.addItem(addToCartId, 1);
    openTab("tab-cart");
  }
}

// select a new scene by clicking the name of the scene
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

// go to the next scene function to be used by arrow keys, swiping, and next button
var goToScene = function goToScene(event, value) {
  // determine whether to go to the next or previous scene
  if (value == 'next') {
    var target = 1;
  } else if (value == 'prev') {
    var target = -1;
  } else {
    return;
  }
  // caching variables
  var $sceneList = $('.panorama-room-list');
  var $scene = $sceneList.find('.scene-selector.active');
  var $sceneIndex = +($scene.attr("data-scene-index")) + target;
  var $totalScenes = $('.scene-selector').size();
  // change scene without looping to the first or last scene
  if ($sceneIndex > 0 && $sceneIndex <= $totalScenes) {
    $scene.removeClass('active');
    $sceneList.find('[data-scene-index="'+$sceneIndex+'"]').addClass('active');
    viewer.loadScene($sceneList.find('[data-scene-index="'+$sceneIndex+'"]').attr("data-scene-name"));
  } else {
    // placeholder for when end handling is created
    console.log("you've reached the end!")
  }
};

// keyboard event listeners to control panorama viewer
document.onkeydown = checkKey;
function checkKey(e) {
  e = e || window.event;
  if (e.keyCode == '38' || e.keyCode == '37') {
    goToScene('keydown', 'prev');
  }
  else if (e.keyCode == '40' || e.keyCode == '39') {
    goToScene('keydown', 'next');
  }
}

// arrow event listeners
$('.next-scene-arrow').click(function(){goToScene('arrow','next')})
$('.prev-scene-arrow').click(function(){goToScene('arrow','prev')})
