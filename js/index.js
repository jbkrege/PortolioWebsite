function print(string){
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
    console.log("Resizing fonts");
    var elements = Array.from(document.getElementsByClassName(styleClass)).forEach(function(e){
        var style = window.getComputedStyle(e);
        var oldSize = style.fontSize;
        var newSize;
        while ((e.scrollHeight > e.parentNode.clientHeight) && (parseInt(oldSize,10) > 0)){
            newSize = (parseInt(oldSize,10)-1).toString()+"px";
            console.log(e,e.scrollHeight,e.parentNode.clientHeight,"Old: ",oldSize,"New", newSize);
            oldSize = newSize;
            e.style.setProperty('font-size', newSize,'important');
        }
    });
}

function minProjRows(){
    //\\//\//\\//\\//\\//\\//\\//\\//\\//\\//
    //
    // Make each row of the project grid be the height of the minimum element in it.
    // 
    //\\//\//\\//\\//\\//\\//\\//\\//\\//\\//
    var projPerRow = 2;
    var projPics = document.getElementsByClassName('proj-pic');
    var gridTemplateRows = "";
    var i;
    var rowHeights = []
    //
    // imageWidth
    //
    // margin is 5% -> width*.95
    // 10px collumn spacing
    // divide by number of pics per row
    var imageWidth = (window.innerWidth*.95-10)/projPerRow;
    //
    // minAspect is a ratio of height/width
    //
    var minAspect = projPics[0].height / projPics[0].width;

    for (i = 1 ; i < projPics.length-2; i++){
        var currAspect = projPics[i].height / projPics[i].width;
        minAspect = (currAspect < minAspect) ? currAspect : minAspect;

        if (i % projPerRow == projPerRow - 1){
            rowHeight = minAspect * imageWidth - 20;
            rowHeights.push(rowHeight);
            gridTemplateRows += rowHeight.toString()+"px ";
            minAspect = Infinity;
        }
    }
    //
    // Calculate last row
    //
    gridTemplateRows += "calc("+(projPics[5].height+projPics[6].height).toString()+"px + 4em)";

    //
    // Set gridTemplateRows to calculated heights
    //
    document.getElementById("proj-grid").style.gridTemplateRows = gridTemplateRows;

    forceFontFit("proj-overlay");
    resizeBackground();
}

minProjRows();
resizeBackground()
window.onresize = minProjRows;