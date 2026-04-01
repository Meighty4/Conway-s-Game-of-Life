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
  if(this.classList.contains('active')){
    clearInterval(timeStepInterval);
    this.classList.remove('active');
    this.innerText = "Play"
  }
  else{
    timeStepInterval = setInterval(executeTimeStep, 100);
    this.classList.add('active');
    this.innerText = "Pause";
  }
})