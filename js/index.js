function print(string){
    //
    // For convinience
    //
    console.log(string);
}

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


function getDistanceToTop(element) {
    //
    // Gets distance from an element to the top of the page.
    //   used in resizeBackground
    //
    // var xPosition = 0;
    var yPosition = 0;

    while(element) {
        // xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return yPosition ;
}


function resizeBackground(){
    var footer = document.getElementById("footer");
    var footerTop = getDistanceToTop(footer);
    var bottom = footerTop+footer.clientHeight;
    var backgroundSize = (bottom - window.innerHeight).toString()+"px";
    console.log("backgroundSize",backgroundSize);
    var polyBackground = document.getElementsByClassName("polyBackground")[0]
    polyBackground.style.setProperty('height',backgroundSize,'important');
    console.log(polyBackground);
}


function forceFontFit(styleClass){
    //
    // Todo: replace this with a direct calculation
    //
    console.log("Resizing fonts");
    var elements = Array.from(document.getElementsByClassName(styleClass)).forEach(function(e){
        e.style.setProperty('font-size', '1px','important');
        var style = window.getComputedStyle(e);
        var parentStyle = window.getComputedStyle(e.parentNode);
        var oldSize = style.fontSize;
        var newSize = 0;
        var prevSize;
        var pad = parseInt(parentStyle.paddingTop,10) + parseInt(parentStyle.paddingBottom,10);
        while ((e.clientHeight + pad < e.parentNode.clientHeight) && (parseInt(newSize,10) < 22)){
            newSize = (parseInt(oldSize,10)+1).toString()+"px";
            prevSize = oldSize;
            oldSize = newSize;
            e.style.setProperty('font-size', newSize,'important');
        }
        e.style.setProperty('font-size', prevSize,'important');
    });
}

var projectInfo = [{
                       'name'    : 'Melody Maker',
                       'href'    : "https://melodymaker-17f94.firebaseapp.com/",
                       'projPic' : 'project-thumbnails/melody-maker4.png',
                       'projGif' : 'project-thumbnails/melody-maker-interact4.gif',
                       'projText': "<b>Melody Maker</b> is designed to bridge the gap between growing AI technology and creatives. Musicians use its web interface to write music in a feedback cycle with a generative neural network trained with various genres of music. Built using TensorFlow and Magenta.js and hosted on Firebase. This project was supported by Northwestern's Undergraduate Research Grant in the fall of 2018."
                   },
                   {
                       'name'    : "Musique Man",
                       'href'    : "MusiqueMan/MusiqueMan.html",
                       'projPic' : "project-thumbnails/musiqueman.png",
                       'projGif' : "project-thumbnails/musiqueman.gif",
                       'projText': "<b>MusiqueMan</b> explores the ability of neural nets to capture compositional style by training a generative network based on Daniel Johnson's novel biaxial LSTM architecture with Bach, Chopin, and Beatles-like music. (2016)"
                   },
                   {
                       'name'    : "SMG",
                       'href'    : "SMG/Website/smg.html",
                       'projPic' : "project-thumbnails/smg.png",
                       'projGif' : "project-thumbnails/smg.gif",
                       'projText': "The Similarity Matrix Granulator, or <b>SMG</b>, is a granular synthesizer with an extra dimension – the ability to specify the similarity of grains to further sculpt sounds. (2016)"
                   },
                   {
                       'name'    : "Orpheus",
                       'href'    : "OrpheusDemoSite/orpheus.html",
                       'projPic' : "project-thumbnails/orpheus.png",
                       'projGif' : "project-thumbnails/orpheus.gif",
                       'projText': "The laser harp, <b>Orpheus</b>, embodies a dream of what electronic music performance could be. (2018)"
                   },
                   {
                       'name'    : "Marcia Fraerman Portfolio",
                       'href'    : "https://marciafraerman.com/",
                       'projPic' : "project-thumbnails/marcia3.png",
                       'projGif' : "project-thumbnails/marcia-interact2.gif",
                       'projText': "<b>Marcia Fraerman's</b> progressive single page website was a freelance project I took on to grow my web/design skills. (Summer 2018)"
                   },
                   {
                       'name'    : "HealthStrategy",
                       'href'    : "",
                       'projPic' : "resources/HealthStrategy.svg",
                       'projGif' : "",
                       'projText': "During my internship at <b>Health Strategy</b> I made a data mining pipeline using python and SciKit-Learn, then used it to make an insurance claim outlier-detection program. (Summer 2017)"
                   },
                   {
                       'name'    : "SWC",
                       'href'    : "",
                       'projPic' : "resources/swc-logo-white.svg",
                       'projGif' : "",
                       'projText': "An auditing tool for <b>SWC</b> that allows consultants to grade and display security portfolios graphically using the .Net framework and PowerBI. (Summer 2018)"
                   },]

//
// Function prototypes
//
var resizeGrid;
var minProjRows;

function populateProjects(){
    //
    // Add gifs, pics, and descriptions to project cells.
    //  fixes the need to resize after delivery 
    //  which caused performance and concistancy issues
    //
    // Options
    //
    var projPerRow = 2;
    var splitLastSquare = true;

    //
    // Init
    //
    var projGrid = document.getElementById('proj-grid');
    var currProj, i;
    var numProjects = projectInfo.length;
    var numGridSquares = splitLastSquare ? projectInfo.length - 2 : projectInfo.length;

    //
    // Row resizing math and vars
    //
    var cells = [];
    var imgAspects = splitLastSquare ? new Array(numGridSquares-1) : new Array(numGridSquares);
    var numLoadedImgs = 0;

    for (i = 0; i < numProjects; i++){
        //
        // Get info for this project
        //
        proj = projectInfo[i];

        //
        // Create new elements
        //
        var cell = document.createElement('div')
        var link = document.createElement('a');
        var projPic = document.createElement('img');
        var projGif = document.createElement('img');
        var underlayText = document.createElement('div');
        var underlay = document.createElement('div')

        //
        // Add info to elements
        //
        // Make all size size 0 until the pics load
        cell.classList.add('proj-cell');

        link.href = proj.href;

        projPic.classList.add('proj-pic');
        projPic.src = proj.projPic;
        projPic.gridLocation = i;

        projGif.classList.add('proj-gif');
        projGif.src = proj.projGif;

        underlayText.innerHTML = proj.projText;
        underlayText.classList.add('proj-underlay-text');

        underlay.classList.add('proj-underlay')

        //
        // Resize Closure
        //
        projPic.onload = (event) => {
            thisPic = event.path[0];
            numLoadedImgs += 1;

            //
            // Save all image aspects that are not part of the split one.
            //
            if (splitLastSquare && (thisPic.gridLocation < numGridSquares-1)){
                imgAspects[thisPic.gridLocation] = thisPic.height / thisPic.width;
            }

            // Wait to display the images until they all load
            // thisPic.style.height = 0;
            // thisPic.style.width = 0;

            //
            // After all imgs have loaded
            //
            if (numLoadedImgs == numProjects){
              print(imgAspects);
              var gridTemplateRows = "";
              // var rowHeights = []
              var minAspect = Math.min.apply(Math,imgAspects);

              resizeGrid = () => {
                  console.log("Resize Grid called");
                  var imageWidth = (window.innerWidth*.95-10)/projPerRow;
                  var rowHeight = minAspect*imageWidth - 20; //-20 b/c some margin thing
                  gridTemplateRows = ""
                  for (var j = 0 ; j < numGridSquares/projPerRow ; j++){
                      // margin is 5% -> width*.95
                      // 10px collumn spacing
                      // divide by number of pics per row
                      gridTemplateRows += rowHeight.toString()+"px ";
                  }
                  projGrid.style.gridTemplateRows = gridTemplateRows;
                  console.log("gridTemplateRows",gridTemplateRows);
              }
              resizeGrid();
              console.log('calling font resize');
              forceFontFit('proj-underlay-text');
              resizeBackground();
              window.onresize = minProjRows;
            }
        }

        //
        // Order elements correctly in the DOM tree
        //
        link.appendChild(projPic);

        underlay.appendChild(underlayText);

        cell.appendChild(link)
        cell.appendChild(projGif);
        cell.appendChild(underlay)

        projGrid.appendChild(cell);
        cells.push(cell);
    }
}

function minProjRows(){

    // resizeGrid();
    resizeGrid();
    forceFontFit("proj-underlay-text");
    resizeBackground();
}

populateProjects();


