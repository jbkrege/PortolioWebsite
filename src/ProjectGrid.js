
var projectInfo = [{
    'name'    : 'Melody Maker',
    'href'    : "https://melodymaker-17f94.firebaseapp.com/",
    'projPic' : 'project-thumbnails/melody-maker4.png',
    'projGif' : 'project-thumbnails/melody-maker-interact4.gif',
    'projText': "<b>Melody Maker</b> is designed to bridge the gap between growing AI technology and creatives. Musicians use its web interface to write music in a feedback cycle with a generative neural network trained with various genres of music. Built using TensorFlow and Magenta.js and hosted on Firebase. This project was supported by Northwestern's Undergraduate Research Grant in the fall of 2018."
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
    'name'    : "Musique Man",
    'href'    : "MusiqueMan/MusiqueMan.html",
    'projPic' : "project-thumbnails/musiqueman.png",
    'projGif' : "project-thumbnails/musiqueman.gif",
    'projText': "<b>MusiqueMan</b> explores the ability of neural nets to capture compositional style by training a generative network based on Daniel Johnson's novel biaxial LSTM architecture with Bach, Chopin, and Beatles-like music. (2016)"
},
{
    'name'    : "SMG",
    'href'    : "https://htmlpreview.github.io/?https://github.com/jbkrege/SMG/blob/master/Website/home.html",
    'projPic' : "project-thumbnails/smg.png",
    'projGif' : "project-thumbnails/smg.gif",
    'projText': "The Similarity Matrix Granulator, or <b>SMG</b>, is a granular synthesizer with an extra dimension – the ability to specify the similarity of grains to further sculpt sounds. (2016)"
}]

function ProjectTile({proj}) {
    return (
        <div className="col-6">
        <a href={proj.href}>
            <img className="proj-pic" src={proj.projPic}></img>
            <img className="proj-gif" src={proj.projGif}></img>
            <div className="proj-underlay">
            <div className="proj-underlay-text">{proj.projText}</div>
            </div>
        </a>
        </div>
    );
}



function ProjectGrid() {
    const projTiles = projectInfo.map((proj, ii) => (
        <ProjectTile proj={proj} key={"col" + proj.name}/>
    ));

    // Build 2 x 2 grid
    const rows = [];
    for (var ii = 0; ii < projectInfo.length; ii = ii + 2) {
        var columnsInRow = []
        var currProj = projectInfo[ii];
        columnsInRow.push(<ProjectTile proj={currProj} key={currProj.name}/>)
        
        // protect against odd numbered projects 
        if (ii + 1 < projectInfo.length)
        {
        var nextProj = projectInfo[ii + 1];
        columnsInRow.push(<ProjectTile proj={nextProj} key={nextProj.name} />)
        }

        rows.push(<div className="row" key={"row" + ii / 2}>{columnsInRow}</div>)
    }

    return (
        <div className="container-fluid">
            {rows}
        </div>
    )
}

const app = document.getElementById('proj-grid');
ReactDOM.render(<ProjectGrid />, app);