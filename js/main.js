//
// benkrege.dev
// 

//
// Disables scroll while the page loads.
// Currently disabled pending debugging
//
// console.log("Scroll disabled temporarily while the page loads.\n See https://github.com/bevacqua/dragula/issues/468 to prevent warnings");
// disableScroll();

//
// Draw Triangified content background
// 
var pattern = Trianglify({
  width: window.innerWidth,
  height: window.innerHeight*1.5,
  x_colors: ['#013220','#000', '#222', '#444','#aaa'],
  cell_size: 40
});
var polyCanvas = pattern.canvas();
polyCanvas.classList.add("polyBackground");
document.body.appendChild(polyCanvas);

window.addEventListener('load', function(){
  // Defined in scroll.js
  callFunctionWhenVisible('#headShot',bioAnimationCallback,{"threshold": 0.5});

  // May need to move this down depending on whether the projects load fast enough
  //
  // Lazy load projects
  // Defined in index.js
  //
  populateProjects();
});