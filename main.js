const Player = (name, shape) => {
  const selectedCells = [];
  const setName = newName => (name = newName);
  return { name, shape, selectedCells };
};

class Gameboard {
  constructor() {
    this.player1 = Player("Player 1", "X");
    this.player2 = Player("Player 2", "O");
    this.currentPlayer = this.player1;
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.gameOver = false
  }

  swapTurn() {
    if (this.currentPlayer == this.player1) {
      return (this.currentPlayer = this.player2);
    } else {
      //  instructions.innerHTML = `Its's your turn ${this.currentPlayer.name}, your shape is ${this.currentPlayer.shape}`
      return (this.currentPlayer = this.player1);
    }
  }

  gamePlay(shape, index) {
    if (!this.gameOver) {
    if (!this.board[index]) {
      this.board[index] = shape;
      board.children[index].innerHTML = shape;
      this.currentPlayer.selectedCells.push(index);
      if (this.endGame() == this.currentPlayer.name) {
        return instructions.innerHTML = `Congratulations!!! ${this.currentPlayer.name}, You Win`;
      } else if (this.endGame() == 'draw') {
        return instructions.innerHTML = `What a bore, Hit Restart`;
      }
      // this.checkWinner(this.endGame())
      this.swapTurn()
      instructions.innerHTML = `It's your turn ${this.currentPlayer.name}, your shape is ${this.currentPlayer.shape}`;
      
    } else {
      alert("Select an empty cell");
    }
  }

  }

  startNewGame() {
    return window.location.reload();
  }

  endGame() {
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
        if (this.currentPlayer.selectedCells.includes(value)) {
          count++;
        }
      }
      if (count == 3) {
        return this.gameOver = this.currentPlayer.name
      } else if (this.player1.selectedCells.length + this.player2.selectedCells.length == 9) {
        return this.gameOver = 'draw'
      } 
    }
  }

  // Tried to refactor out some part of the gamePlay function to make it cleaner but did not seem to work correctly

  // checkWinner(value) {
  //   if (value == this.currentPlayer.name) {
  //     return instructions.innerHTML = `Congratulations!!! ${this.currentPlayer.name}, You Win`;
  //   } else if (value == 'draw') {
  //     return instructions.innerHTML = `What a bore, Hit Restart`;
  //   }
  // }
  
}

const game = new Gameboard();

// console.log(game.endGame);

let board = document.querySelector(".row");

game.board.forEach((cell, index) => {
  let div = document.createElement("div");
  div.innerHTML = cell;
  div.id = index;
  div.classList = "col-md-4";
  board.appendChild(div);
});

let instructions = document.querySelector(".instructions");
instructions.innerHTML = `It's your turn ${game.currentPlayer.name}, your shape is ${game.currentPlayer.shape}`


let cells = document.querySelectorAll(".col-md-4");

cells.forEach((cell, index) => {
  cell.addEventListener("click", () =>
    game.gamePlay(game.currentPlayer.shape, index)
  );
});

const button = document.querySelector('button');

button.addEventListener('click', () => startNewGame());

const startNewGame = () => {
  return window.location.reload();
}

// function startNewGame() {
//   return window.location.reload();
// }
