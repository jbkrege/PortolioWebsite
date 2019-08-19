//
// benkrege.dev
// 

var debugOffline = false

// console.log("MVP TODO: \n",
//             " * Complete MVP animations\n",
//             " * Lazy Load"
//             " * Reformat for mobile\n",
//             " * Give credit where due",
//             " * Refactor this shit!\n",
//             " * Move projectInfo somewhere else",
//             "Later TODO \n",
//             " * Could resizeProjectGrid be optimised?\n",
//             " * Write a helper for my use that adds\n",
//             "   Array.from(elems).forEach((elem, index)\n",
//             "   to the iterable returned by getElemBy...\n",
//             " * Hang on how do js docstrings work? \n",
//             " * Rewrite masthead and background scripts"
//             )

// console.log("Scroll disabled temporarily while the page loads.\n See https://github.com/bevacqua/dragula/issues/468 to prevent warnings")
disableScroll()

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


//
// Defined in index.js
//
populateProjects();

//
// Animation
//
var callback = () => {
  console.log("Bio visible")
  // 
  // Extend bio fill
  // 
  document.getElementById('bio-fill').classList.add('visible-bio-fill')

  document.getElementById('mission').classList.add('visible-mission')
  //
  // Animate skills
  //
  // Options
  var totalDegrees = 360
  var distanceFromMaster = 60

  // Arrange skills
  let skills = Array.from(document.getElementsByClassName('skill'))
  let skillsSkins = Array.from(document.getElementsByClassName('skill-skin'))
  console.log(skillsSkins)
  let numSkills = skills.length
  let headShotD = 150
  var degPerItem = (totalDegrees == 360) ? totalDegrees/numSkills : totalDegrees/(numSkills-1)
  skillsSkins.forEach((skin,i) => {
      let angle = degPerItem * i
      skin.style.transformOrigin = "30vh"
      skin.style.transform = "translate(-14vh,4.5vh) rotate("+angle+"deg)"
      skills[i].style.transform = "rotate(-"+angle+"deg)"
  })


}

window.addEventListener('load', function(){
  enableScroll();
  callFunctionWhenVisible('#headShot',callback,{"threshold": 0.5});
});