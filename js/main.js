//
// benkrege.dev
// 

var debugOffline = false

// console.log("MVP TODO: \n",
//             " * Give credit where due",
//             " * Double check project sites"
//             " * Reformat for mobile\n",
//             "Later TODO \n",
//             " * Could resizeProjectGrid be optimised?\n",
//             " * Write a helper for my use that adds\n",
//             "     Array.from(elems).forEach((elem, index)\n",
//             "     to the iterable returned by getElemBy...\n",
//             " * Hang on how do js docstrings work? \n",
//             " * Rewrite masthead and background scripts"
//             )

if (!debugOffline){
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
}

window.addEventListener('load', function(){
  // Defined in scroll.js
  callFunctionWhenVisible('#headShot',bioAnimationCallback,{"threshold": 0.5});

  // May need to move this down depending on whether the projects load fast enough
  //
  // Lazy load projects
  // Defined in index.js
  //
  populateProjects();
  enableScroll();
});