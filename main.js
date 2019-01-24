const Player = (name, shape) => {
  this.selectedCells = [];
  (this.name = name), (this.shape = shape);

  return { name, shape, selectedCells };
};

class Gameboard {
  constructor() {
    this.player1 = Player(prompt("Player 1, Enter Your Name"), "X");
    this.player2 = Player(prompt("Player 2, Enter Your Name"), "O");
    this.currentPlayer = this.player1;
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.gameOver = false;
  }

  swapTurn() {
    if (this.currentPlayer === this.player1) {
      this.currentPlayer = this.player2;
      return this.currentPlayer;
    } else {
      this.currentPlayer = this.player1;
      return this.currentPlayer;
    }
  }

  gamePlay(shape, index) {
    if (!this.gameOver) {
      if (!this.board[index]) {
        this.board[index] = shape;
        board.children[index].innerHTML = shape;
        this.currentPlayer.selectedCells.push(index);
        if (this.winning() == this.currentPlayer.name) {
          instructions.innerHTML = `Congratulations!!! ${this.currentPlayer.name}, You Win`;
          return instructions.innerHTML
        } else if (this.drawGame() == "draw") {
          instructions.innerHTML = "What a bore!!! Start New Game?";
          return instructions.innerHTML
        }

        this.currentPlayer = this.swapTurn();
         instructions.innerHTML = `It's your turn ${this.currentPlayer.name}, your shape is ${this.currentPlayer.shape}`;
      } else {
        alert("Select an empty cell");
      }
    }
  }

  winning() {
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
          count += 1;
        }
      }
      if (count === 3) {
        this.gameOver = true;
        return this.currentPlayer.name;
      }
    }
  }

  drawGame() {
    if (!this.winning() &&
      this.player1.selectedCells.length + this.player2.selectedCells.length == 9) {
      this.gameOver = true
      return 'draw'
    }
  }

}

const game = new Gameboard();

let board = document.querySelector(".row");

game.board.forEach((cell, index) => {
  let div = document.createElement("div");
  div.innerHTML = cell;
  div.id = index;
  div.classList = "col-md-4";
  board.appendChild(div);
});

let instructions = document.querySelector(".instructions");
instructions.innerHTML = `It's your turn ${
  game.currentPlayer.name
}, your shape is ${game.currentPlayer.shape}`;

let cells = document.querySelectorAll(".col-md-4");

cells.forEach((cell, index) => {
  cell.addEventListener("click", () =>
    game.gamePlay(game.currentPlayer.shape, index)
  );
});