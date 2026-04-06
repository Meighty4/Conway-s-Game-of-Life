let gameDimention = parseInt(getComputedStyle(document.body).getPropertyValue("--game_dimention"));
console.log(gameDimention);

let grid = document.getElementById('grid');
let isLooping = false;

for(let i = 0; i<gameDimention*gameDimention; i++){
  var cellDiv = document.createElement('div');
  cellDiv.className = "cell";
  cellDiv.addEventListener('click',function(){
    if(this.classList.contains('active')){
      this.classList.remove('active');
    } else { this.classList.add('active');}
  })

  grid.appendChild(cellDiv);

}

let playButton = document.getElementById('playButton');
var timeStepInterval;
playButton.addEventListener('click',function(){
  if(this.classList.contains('active_btn')){
    clearInterval(timeStepInterval);
    this.classList.remove('active_btn');
    this.innerText = "Play"
  }
  else{
    timeStepInterval = setInterval(executeTimeStep, 100);
    this.classList.add('active_btn');
    this.innerText = "Pause";
  }
});

let loopButton = document.getElementById('loopToggle');

loopButton.addEventListener('click',function(){
  isLooping = !isLooping;
  console.log("Looping:", isLooping);
  if(isLooping){
    this.innerText = "Borderless : ON";
    this.classList.add("active_btn");
  }else{
    this.innerText = "Borderless : OFF";
    this.classList.remove("active_btn");
  }
});


function executeTimeStep(){
  let cells = Array.from(document.getElementsByClassName('cell'));
  var cellsCopy = copyCells(cells);
  for (let row = 0; row<gameDimention;row++){
    for (let col =0; col< gameDimention; col++){
      var activeNeighborCount = getActiveNeighborCount(cells, row, col, gameDimention);
      if (cells[toOneDimentionIndex(row,col,gameDimention)].classList.contains('active')){
        if(activeNeighborCount < 2){
          cellsCopy[toOneDimentionIndex(row,col,gameDimention)].classList.remove("active");
        } else if(activeNeighborCount == 2 || activeNeighborCount == 3){
          cellsCopy[toOneDimentionIndex(row,col,gameDimention)].classList.add("active");
        } else{cellsCopy[toOneDimentionIndex(row,col,gameDimention)].classList.remove("active");}
      } else if(!cells[toOneDimentionIndex(row,col,gameDimention)].classList.contains("active") && activeNeighborCount == 3){
        cellsCopy[toOneDimentionIndex(row,col,gameDimention)].classList.add("active");
      }
    }
  }

  grid.replaceChildren();
  cellsCopy.forEach(element => {
    grid.appendChild(element);
  })
}

function copyCells(cells){
  var out = [];
  for(let i = 0; i < cells.length; i++){
    var cellDiv = document.createElement('div');
    cellDiv.className = cells[i].className;
    cellDiv.addEventListener('click', function(){
      if(this.classList.contains('active')){
        this.classList.remove('active');
      } else{
        this.classList.add('active');
      }
    })
    out.push(cellDiv);
  }
  return out;
}

function toOneDimentionIndex(row, col, gameDimention){
  return row*gameDimention+col;
}

function getActiveNeighborCount(cells, row, col, gameDimention){
  let count = 0;

  for(let drow = -1; drow<=1; drow++){
    for(let dcol = -1; dcol<=1; dcol++){
      if( drow === 0 && dcol === 0){continue;}

      let newRow = row + drow;
      let newCol = col + dcol;

      if(isLooping){
        newRow = (newRow + gameDimention) % gameDimention;
        newCol = (newCol + gameDimention) % gameDimention;
      }else{
        if(newCol < 0 || newCol>= gameDimention|| newRow < 0 || newRow >= gameDimention){
          continue;
        }
      }

      let index = toOneDimentionIndex(newRow, newCol,gameDimention);

      if(cells[index].classList.contains("active")){count++;}
    }
  }
 
  return count;
}