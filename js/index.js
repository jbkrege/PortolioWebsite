//
// Mostly handles population of projects grid
// and dynamic resizing
//

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
    var polyBackground = document.getElementsByClassName("polyBackground")[0]
    polyBackground.style.setProperty('height',backgroundSize,'important');
}


function forceFontFit(styleClass){
    //
    // Todo: replace this with a direct calculation
    //
    var elements = Array.from(document.getElementsByClassName(styleClass)).forEach((e) =>{
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