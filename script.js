var gameDimention = getComputedStyle(document.body).getPropertyValue("--game_dimention");
console.log(gameDimention);

let grid = document.getElementById('grid');

for(let i = 0; i<gameDimention*gameDimention; i++){
  var cellDiv = document.createElement('div');
  cellDiv.className = "cell";
  cellDiv.addEventListener('click',function(){
    if(this.classList.contains('active')){
      this.classList.remove('active');
    } else { this.classList.add('active')}
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
  if(row<0 || row >= gameDimention || col<0 || col>= gameDimention){
    throw 'row or col values out of index';
  }

  cells.forEach(element =>{
    if(!element.classList.contains('cell')){
      throw 'at least on of the cells doesnt contain the "cell" class';
    }
  })

  if(cells.length != gameDimention*gameDimention){
    throw 'invalid cells length';
  }

  var count = 0;

  if(row - 1>=0 && cells[toOneDimentionIndex(row-1,col,gameDimention)].classList.contains('active')){
    count +=1;
  }
  if(row-1>=0 && col+1< gameDimention && cells[toOneDimentionIndex(row-1,col+1,gameDimention)].classList.contains('active')){
    count +=1;
  }
  if(col+1<gameDimention && cells[toOneDimentionIndex(row,col+1,gameDimention)].classList.contains('active')){
    count +=1;
  }
  if(row+1<gameDimention && col+1<gameDimention && cells[toOneDimentionIndex(row+1,col+1,gameDimention)].classList.contains('active')){
    count+=1;
  }
  if(row+1<gameDimention && cells[toOneDimentionIndex(row+1,col,gameDimention)].classList.contains('active')){
    count+=1;
  }
  if(row+1<gameDimention && col-1>=0 && cells[toOneDimentionIndex(row+1,col-1,gameDimention)].classList.contains('active')){
    count+=1;
  }
  if(col-1>=0 && cells[toOneDimentionIndex(row,col-1,gameDimention)].classList.contains('active')){
    count+=1;
  }
  if(col-1>=0 && row-1>=0 && cells[toOneDimentionIndex(row-1,col-1,gameDimention)].classList.contains('active')){
    count+=1;
  }
  return count;
}