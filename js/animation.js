// animation.js
//
// Bio and Skills animation
//
var bioAnimationCallback = () => {
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