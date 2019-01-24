//  Board Class
class Board {
  constructor() {
    this.options = ["", "", "", "", "", "", "", "", ""];
    this.gameOver = false
  }

  optionChosen(index, shape) {
    this.options[index] = shape
  }

  gameWon(playerSelections) {
    const winningCondition = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let combination of winningCondition) {
      let count = 0;
      for (let value of combination) {
        if (playerSelections.includes(value)) {
          count += 1;
        }
      }
      if (count === 3) {
        this.gameOver = true
        return this.gameOver
      }
    }
  }

  gameDrawn(selection1, selection2) {
    if ((selection1 + selection2) === 9) {
      this.gameOver = true
      return this.gameOver
    }
  }
}

//  Player Class

class Player {
  constructor(name, shape) {
  this.selectedCells = []
  this.name = name
  this.shape = shape
  }

  recordOption(index) {
    this.selectedCells.push(index)
  }
}

const player1 = new Player(prompt('Enter Your Name, Player 1'), 'X')
const player2 = new Player(prompt('Enter Your Name, Player 2'), 'O')

let currentPlayer = player1

const layout = document.querySelector(".row");

const gameBoard = new Board()

gameBoard.options.forEach((option, index) => {
  let div = document.createElement("div")
  div.innerHTML = option
  div.id = index
  div.className = "col-md-4"
  layout.appendChild(div)
})

let instructions = document.querySelector(".instructions");

instructions.innerHTML = `It's your turn ${currentPlayer.name}, your shape is ${currentPlayer.shape}`

const swapTurn = (current, first, second) => {
  return current = (current == first) ? second : first
}

const cells = document.querySelectorAll(".col-md-4");

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    gamePlay(cell, index)
  });
});

const gamePlay = (cell, index) => {
  if (!gameBoard.gameOver) {
  if (cell.innerHTML === '') {
    currentPlayer.recordOption(index)
    gameBoard.optionChosen(index, currentPlayer.shape)
    cell.innerHTML = currentPlayer.shape
    if (gameBoard.gameWon(currentPlayer.selectedCells)) {
      instructions.innerHTML = `Congratulations!!! ${currentPlayer.name}, You Win. Start New Game?`
      return instructions.innerHTML      
    } else if (gameBoard.gameDrawn(player1.selectedCells.length, player2.selectedCells.length)) {
      instructions.innerHTML = "What a bore!!! Start New Game?"
      return instructions.innerHTML
    } 
    console.log(gameBoard.gameOver);
    currentPlayer = swapTurn(currentPlayer, player1, player2)
    instructions.innerHTML = `It's your turn ${currentPlayer.name}, your shape is ${currentPlayer.shape}`
  } else {
    instructions.innerHTML = `That cell is already chosen ${currentPlayer.name}, Please select an empty cell`
}
} 
}


const startGame = () => {
  cells.forEach(cell => {
    cell.innerHTML = ''
    gameBoard.options = ['', '', '', '', '', '', '', '', '']
    gameBoard.gameOver = false
    player1.selectedCells = []
    player2.selectedCells = []
    currentPlayer = player1
    instructions.innerHTML = `It's your turn ${currentPlayer.name}, your shape is ${currentPlayer.shape}`
  })
}

// Restart Button

document.querySelector('button').addEventListener('click', () => startGame())

