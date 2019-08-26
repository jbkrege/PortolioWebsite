//
// scroll.js
//
// Ben Krege
// Utilities for scroll triggered animations
// s/o to css
//

function callFunctionWhenVisible(query, callback, options = null){
  //
  // Uses IntersectionObserver
  //  As of June 2019, IE does NOT support this.
  //
  // @query is a string with jQuery-like query
  // @callback is a function that is called  
  //
  // First, we wrap the callback in this if to prevent 
  //  the observer from triggering on initiation 
  let realCallback = (entries) => {
    if (entries[0].intersectionRatio <= 0) return;
    callback(entries)
  }

  const observer = new IntersectionObserver(realCallback,options)

  const targets = document.querySelectorAll(query)
  if (targets.length < 1){
    console.log("...sorry chief. didn't find \"",query,"\"")
  }
  targets.forEach((target) => {
    observer.observe(target)
  })
}

function addClassWhenVisible(query, visibleClass){
  //
  // query is a string with jQuery-like query
  // visibleClass is a string with the class visible elements will have 
  //
  if (typeof IntersectionObserver === 'function'){
    const callback = (entries) => {
    entries.forEach(entry => {
        entry.target.classList.toggle(visibleClass)
      })
    }
    callFunctionWhenVisible(query, callback)
  } else {
    addClassWhenVisibleOLD(query, visibleClass)
  }
}

function isElementInViewport(el){
  // 
  // returns bool
  // s/o to http://stackoverflow.com/a/7556433/274826
  // 
  if (typeof jQuery === "function" && el instanceof jQuery){
    el = el[0]
  }
  var rect = el.getBoundingclientRect()
  return (
    (rect.top <= 0
      && rect.bottom >=0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight)) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerheight || documentElement.clientHeight))
  )
}

function addClassWhenVisibleOLD(query, visibleClass){
  // 
  // Uses requestAnimationFrame to loop ~60tps, when available
  //  if requestAnimationFrame is not supported (IE 9?)
  //  loop ever 60s a
  //
  // query is a string with jQuery-like query
  // visibleClass is a string with the class visible elements will have 
  // 
  function loop() {
    var frame = window.requestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1000/60)
    }
    var elems = document.querySelectorAll(query)
    // Array.from(elems).forEach((elem, index) => {
    elems.forEach((el, index) => {
      if (isElementInViewport(el)){
        el.classList.add(visibleClass)
      } else {
        el.classList.remove(visibleClass)
      }
    })
    frame(loop)
  }
  loop()
}


//
// Stuff for disabling scrolling
// copy pasta from
// https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
//
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false; 
  var loader = document.getElementById("masthead-loader");
  loader.classList.remove('hidden')
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
  }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  document.addEventListener('wheel', preventDefault, {passive: false}); // Disable scrolling in Chrome
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function _enableScrolling(){
  window.onmousewheel = document.onmousewheel = null; 
  window.onwheel = null; 
  window.ontouchmove = null;  
  document.onkeydown = null;   
}

function makeArrowVisible(){
  var arrow = document.getElementsByClassName('arrow')[0];
  arrow.classList.add('hidden');
  _enableScrolling();
}

function enableScroll() {
  if (window.removeEventListener)
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
  
  var loader = document.getElementById("masthead-loader");
  loader.classList.add('hidden'); 

  var arrow = document.getElementsByClassName('arrow')[0];
  arrow.classList.remove('hidden');

  // Reenable scrolling
  document.removeEventListener('wheel', preventDefault, {passive: false}); // Enable scrolling in Chrome
  window.onmousewheel = document.onmousewheel = makeArrowVisible; 
  window.onwheel = makeArrowVisible; 
  window.ontouchmove = makeArrowVisible;  
  document.onkeydown = makeArrowVisible;  

}
//
// End copy from https://stackoverflow.com/questions/4770025/how-to-disable-scrolling-temporarily
//




