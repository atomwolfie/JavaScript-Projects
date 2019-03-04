//TO do
//scoring
//HINT
//shortest path
//if time resize

var initialscore;
var crumbOn = false;
var shortPathOn = false;
var hintOn =  false;
let inputBuffer = {};
let canvas = null;
let context = null;
var gameWidthxHeight = 5;

var score;
var scores = [0,0,0];


let imgFloor = new Image();
imgFloor.isReady = false;
imgFloor.onload = function() {
    this.isReady = true;
};
imgFloor.src = 'space.png';

let maze = [];
let visited = [[],[]];
let crumbList = [];
var inMaze = [[],[]];
var inFrontier = [[],[]];
let frontierList = [];


for (let row = 0; row < 10; row++) {
    maze.push([]);
    for (let col = 0; col < 10; col++) {
      visited[row,col] = false;
        maze[row].push({
            x: col, y: row, edges: {
                n: null,
                s: null,
                w: null,
                e: null
            }
        });
    }
}

for( let i = 0; i < gameWidthxHeight; i++){
  for(let j = 0; j < gameWidthxHeight; j++){
    inMaze.push([]);
    inMaze[i][j] = false;
    inFrontier.push([]);
    inFrontier[i][j] = false;
  }
}



//1
//change this to random maybe at some point
//for now we will start from [0,0]
var frontierStartX = 0;
var frontierStartY = 0;
console.log("Start: [" + frontierStartX + "," + frontierStartY + "]");
inMaze[frontierStartX][frontierStartY] = true;




//2 frontier

frontierList.push({x: frontierStartX, y: frontierStartY + 1})
frontierList.push({x: frontierStartX + 1, y: frontierStartY})
console.log("starting frontier square: [" + frontierStartX + "," + (frontierStartY + 1) + "]");
console.log("starting frontier square: [" + (frontierStartX +1) + "," + frontierStartY + "]");
inFrontier[frontierStartX][(frontierStartY + 1)]= true;
inFrontier[(frontierStartX +1)][frontierStartY]= true;



primAlg(frontierStartX,frontierStartY);

function primAlg(x,y){
while(frontierList.length != 0){
carvePath(x,y);
  }
}



function carvePath(tox,toy){




  rand = getRandomInt(frontierList.length -1);

  var x = frontierList[rand].x;
  var y = frontierList[rand].y;

  xplus = x + 1;
  console.log("moving to: [" + x + "," + y + "]");




  var foundOne = false;
  var directionChooser;

  while(foundOne == false){
  directionChooser = getRandomInt(4);

  if(directionChooser == 1 && (x-1) >=0){
  if(inMaze[x-1][y] == true){
  //north
    console.log("carving path north [" + x + "," + y + "] --->" + "[" + (x-1) + "," + y + "]" );
  maze[x][y].edges.n = maze[x-1][y];
  maze[x-1][y].edges.s = maze[x][y];

  foundOne = true;
  }
  }

  if(directionChooser == 2 && xplus <= (gameWidthxHeight -1)){
  if(inMaze[(x+1)][y] == true){
    //south
  console.log("carving path south [" + x + "," + y + "] --->" + "[" + (x+1) + "," + y + "]" );
  maze[x][y].edges.s = maze[x+1][y];
  maze[x+1][y].edges.n = maze[x][y];
  foundOne = true;
  }
  }


  if(directionChooser == 3 && (y-1) >= 0){
  if(inMaze[x][y-1] == true){
    //west
console.log("carving path west [" + x + "," + y + "] --->" + "[" + x + "," + (y-1) + "]" );
  maze[x][y].edges.w = maze[x][y-1];
  maze[x][y-1].edges.e = maze[x][y];
  foundOne = true;

  }
  }


  if(directionChooser == 4 && (y+1)<= (gameWidthxHeight -1)){
  if(inMaze[x][y+1] == true){
    //east
  console.log("carving path east [" + x + "," + y + "] --->" + "[" + x + "," + (y+1) + "]" );
  maze[x][y].edges.e = maze[x][y+1];
  maze[x][y+1].edges.w = maze[x][y];
  foundOne = true;
  }
  }

  }

  inMaze[x][y] = true;
  markFrontier(x,y);

}



function markFrontier(x,y){


//add new squares to frontier

//north frontier
if(x -1 >= 0){
if(inMaze[x-1][y] == false && inFrontier[x-1][y] == false){
frontierList.push({x: x - 1, y: y})
console.log("new north frontier square: [" + (x-1) + "," + y + "]");
inFrontier[x-1][y] == true;
}
}

// south  frontier
if((x+1) <= (gameWidthxHeight - 1)){
if(inMaze[x+1][y] == false && inFrontier[x+1][y] == false){
frontierList.push({x: (x + 1), y: y})
console.log("new south frontier square: [" + (x+1) + "," + y + "]");
inFrontier[x+1][y] == true;
}
}

//east frontier
if((y+1) <= (gameWidthxHeight - 1)){
if(inMaze[x][y+1] == false && inFrontier[x][y+1] == false){
frontierList.push({x: x, y: (y + 1)})
console.log("new east frontier square: [" + x + "," + (y+1) + "]");
inFrontier[x][y+1] == true;
}
}


//west frontier
if( y-1 >= 0){
if(inMaze[x][y-1] == false && inFrontier[x][y-1] == false){
frontierList.push({x: x, y: y - 1})
console.log("new west frontier square: [" + x + "," + (y -1) + "]");
inFrontier[x][y-1] == true;
}
}


frontierList.splice(rand, 1);

//if frontier size = 1 render the end at the last frontier???

console.log("Frontier list AFTER:");

for (i in frontierList ){
  console.log("["+frontierList[i].x + "," + frontierList[i].y + "]");
}

curX = x;
curY = y;
}


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}



function drawCell(cell) {

    if (imgFloor.isReady) {
        context.drawImage(imgFloor,
        cell.x * (1000 / gameWidthxHeight), cell.y * (1000 / gameWidthxHeight),
        1000 / gameWidthxHeight, 1000 / gameWidthxHeight);
    }

    if (cell.edges.n === null) {
        context.moveTo(cell.x * (1000 / gameWidthxHeight), cell.y * (1000 / gameWidthxHeight));
        context.lineTo((cell.x + 1) * (1000 / gameWidthxHeight), cell.y * (1000 / gameWidthxHeight));
        //context.stroke();
    }

    if (cell.edges.s === null) {
        context.moveTo(cell.x * (1000 / gameWidthxHeight), (cell.y + 1) * (1000 / gameWidthxHeight));
        context.lineTo((cell.x + 1) * (1000 / gameWidthxHeight), (cell.y + 1) * (1000 / gameWidthxHeight));
        //context.stroke();
    }

    if (cell.edges.e === null) {
        context.moveTo((cell.x + 1) * (1000 / gameWidthxHeight), cell.y * (1000 / gameWidthxHeight));
        context.lineTo((cell.x + 1) * (1000 / gameWidthxHeight), (cell.y + 1) * (1000 / gameWidthxHeight));
        //context.stroke();
    }

    if (cell.edges.w === null) {
        context.moveTo(cell.x * (1000 / gameWidthxHeight), cell.y * (1000 / gameWidthxHeight));
        context.lineTo(cell.x * (1000 / gameWidthxHeight), (cell.y + 1) * (1000 / gameWidthxHeight));
        //context.stroke();
    }

    //
    // Can do all the moveTo and lineTo commands and then render them all with a single .stroke() call.
    context.stroke();
}

function renderCharacter(character) {
    if (character.image.isReady) {
        context.drawImage(character.image,
        character.location.x * (1000 / gameWidthxHeight), character.location.y * (1000 / gameWidthxHeight));
    }
}

function renderPlanet(planet) {
    if (planet.image.isReady) {
        context.drawImage(planet.image,
        planet.location.x * (1000 / gameWidthxHeight), planet.location.y * (1000 / gameWidthxHeight));
    }
}

function checkBclicked(key){
  if(key === 'b' && crumbOn == false){
    crumbOn = true;
  //  alert("crumbs are enabled");
  }
  else if(key === 'b' && crumbOn == true){
    crumbOn = false;
    //alert("crumbs are disabled");
  }
}

function checkHclicked(key){
  if(key === 'h'){
    alert("providing hint");
    score = score - 100;
  }
}

function checkPclicked(key){
  if(key === 'p' && shortPathOn == false){
    shortPathOn = true;
    alert("shorstest path is showing");
  }
  else if(key === 'p' && shortPathOn == true){
    shortPathOn = false;
    alert("shorstest path is off");
  }
}

function moveCharacter(key, character) {
    if (key === 'ArrowDown') {
        if (character.location.edges.s) {
            character.location = character.location.edges.s;
            console.log("moved here: [" + character.location.x + "," + character.location.y + "]");
            crumbList.push({x: character.location.x, y: character.location.y});
            console.log("visited: " + visited[character.location.x,character.location.y]);
            if(visited[character.location.x,character.location.y] == false){
              visited[character.location.x,character.location.y] = true;
            }
        }
    }
    if (key == 'ArrowUp') {
        if (character.location.edges.n) {
            character.location = character.location.edges.n;
            console.log("moved here: [" + character.location.x + "," + character.location.y + "]");
            console.log("visited: " + visited[character.location.x,character.location.y]);
            crumbList.push({x: character.location.x, y: character.location.y});
            if(visited[character.location.x,character.location.y] == false){
              visited[character.location.x,character.location.y] = true;
            }
        }
    }
    if (key == 'ArrowRight') {
        if (character.location.edges.e) {
            character.location = character.location.edges.e;
          console.log("moved here: [" + character.location.x + "," + character.location.y + "]");
          console.log("visited: " + visited[character.location.x,character.location.y]);
          crumbList.push({x: character.location.x, y: character.location.y});
          if(visited[character.location.x,character.location.y] == false){
            visited[character.location.x,character.location.y] = true;
          }
        }
    }
    if (key == 'ArrowLeft') {
        if (character.location.edges.w) {
            character.location = character.location.edges.w;
          console.log("moved here: [" + character.location.x + "," + character.location.y + "]");
          console.log("visited: " + visited[character.location.x,character.location.y]);
          crumbList.push({x: character.location.x, y: character.location.y});
          if(visited[character.location.x,character.location.y] == false){
            visited[character.location.x,character.location.y] = true;
          }
        }
    }
}

function renderMaze() {
    context.strokeStyle = 'rgb(255, 255, 255)';
    context.lineWidth = 6;

    for (let row = 0; row < gameWidthxHeight; row++) {
        for (let col = 0; col < gameWidthxHeight; col++) {
            drawCell(maze[row][col]);
        }
    }

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(999, 0);
    context.lineTo(999, 999);
    context.lineTo(0, 999);
    context.closePath();
    context.strokeStyle = 'rgb(0, 0, 0)';
    context.stroke();
}

//
// Immediately invoked anonymous function
//
let myCharacter = function(imageSource, location) {
    let image = new Image();
    image.isReady = false;
    image.onload = function() {
        this.isReady = true;
    };
    image.src = imageSource;
    return {
        location: location,
        image: image
    };
}('Webp.net-resizeimage.png', maze[0][0]);

let planet = function(imageSource, location) {
    let image = new Image();
    image.isReady = false;
    image.onload = function() {
        this.isReady = true;
    };
    image.src = imageSource;
    return {
        location: location,
        image: image
    };
}('smallplanet.png', maze[4][4]);

//breadcrumbs
let breadCrumbs = function(imageSource, location) {
    let image = new Image();
    image.isReady = false;
    image.onload = function() {
        this.isReady = true;
    };
    image.src = imageSource;
    return {
        location: location,
        image: image
    };
}


function renderCrumbs() {

        for(i in crumbList){
          console.log("rendering crumb at: [" + crumbList[i].x + "," + crumbList[i].y) + "]";
          crumb = breadCrumbs("smalll-yellow-circle.png",maze[crumbList[i].y][crumbList[i].x]);
          crumb.image.isReady = true;
          context.drawImage(crumb.image,
          crumb.location.x * (1000 / gameWidthxHeight), crumb.location.y * (1000 / gameWidthxHeight));

    }
}



function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    time_value.innerHTML = String(end());

    if(score_value.innerHTML == 0){
      score_value.innerHTML = 0;
    }
    else{
    score_value.innerHTML = String(initialscore - end());
    score = initialscore - end();
  }
    renderMaze();
    if(crumbOn == true){
      renderCrumbs();
    }
    renderCharacter(myCharacter);
    renderPlanet(planet);

}

function update(){

  //done
  if(myCharacter.location.x == 2 && myCharacter.location.y ==2){
    console.log("you won");
    //update scores
    for(let i = 0; i < scores.length; i++){
      if(score > scores[i]){
        scores[i] = score;
        score = 0;
        break;
      }
    }
    score1.innerHTML = String(scores[0]);
    score2.innerHTML = String(scores[1]);
    score3.innerHTML = String(scores[2]);

    //reset game???
  }
}

function processInput() {
    for (input in inputBuffer) {
        moveCharacter(inputBuffer[input], myCharacter);
        checkBclicked(inputBuffer[input]);
        checkHclicked(inputBuffer[input]);
        checkPclicked(inputBuffer[input]);
    }
    inputBuffer = {};
}

function gameLoop() {
    processInput();
    render();
    update();

    requestAnimationFrame(gameLoop);

}

var startTime, endTime;

function start() {
  startTime = new Date();
};

function end() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds
  var seconds = Math.round(timeDiff);
  return seconds;
}

function initialize() {
    canvas = document.getElementById('canvas-main');
    context = canvas.getContext('2d');
    start();
    initialscore= score_value.innerHTML;
    window.addEventListener('keydown', function(event) {
        inputBuffer[event.key] = event.key;
    });

    requestAnimationFrame(gameLoop);
}

//button stuff
function reply_click(clicked_id)
{
  if(clicked_id == "3by3"){
    gameWidthxHeight = 3;
    initialize();
  }
  if(clicked_id == "5by5"){
    gameWidthxHeight = 4;
    initialize();
  }
  if(clicked_id == "10by10"){
    gameWidthxHeight = 9;
    initialize();
  }
  if(clicked_id == "15by15"){
    gameWidthxHeight = 15;
    initialize();
  }
  if(clicked_id == "20by20"){
    gameWidthxHeight = 20;
    initialize();
  }
  if(clicked_id == "hint"){
    hintOn = true;
  }

  if(clicked_id == "crumbs"){
    if(crumbOn == false){
      crumbOn = true;
    //  alert("crumbs are enabled");
    }
    else{
      crumbOn = false;
    //  alert("crumbs are disabled");
    }
  }
  score_value.innerHTML = String(1000);
    initialize();
}
