let currentPlayer = "X"
let gameActive = true

let resetButton = document.querySelector("button")
let gameStatus = document.querySelector(".game-status")
let p1ScoreContainer = document.querySelector(".p1-score")
let p2ScoreContainer = document.querySelector(".p2-score")
let p1Score = 0
let p2Score = 0


let currentTurn = () => `${currentPlayer} Turn`
let winningMessage = () => `${currentPlayer} has won`
let drawMessage = () => `DRAW GO AGAIN`

gameStatus.innerHTML = currentTurn()

//made the gameboard
let gameState = ["", "", "", "", "", "", "", "", ""]
let winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8], 
  [2, 4, 6],
  [1, 4, 7],
  [0, 3, 6],
  [2, 5, 8]
]

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X"
  gameStatus.innerHTML = currentTurn()
}

//function to chage from one player to the next
function checkWinner() {
  let roundWon = false;

  for (let i = 0; i < winningCombos.length; i++) {
    let winCondition = winningCombos[i]; // [1, 4, 7]
    let a = gameState[winCondition[0]]
    let b = gameState[winCondition[1]]
    let c = gameState[winCondition[2]]
    console.log(a, b, c)
      
    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    gameStatus.innerHTML = winningMessage();
    gameActive = false;

    if (currentPlayer === "X") {
      p1Score++
      p1ScoreContainer.innerText = `Score: ${p1Score.toString().padStart(2, "0")}`
    } else {
      p2Score++
      p2ScoreContainer.innerText = `Score: ${p2Score.toString().padStart(2, "0")}`
    }
    
    return;
  }
  
  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    gameStatus.innerHTML = drawMessage();
    gameActive = false;
    return;
  }
  changePlayer()
}
// p1Score++
// p1ScoreContainer.innerText=`score:${p1Score.pad(0,2)}`


function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.dataset.index);

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  checkWinner();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = ["", "", "", "", "", "", "", "", ""];
  gameStatus.innerHTML = currentTurn();
  document.querySelectorAll(".box").forEach((cell) => (cell.innerHTML = ""));
}

document
  .querySelectorAll(".box")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game-restart")
  .addEventListener("click", handleRestartGame);

// currentPlayer.style.color = "Red";