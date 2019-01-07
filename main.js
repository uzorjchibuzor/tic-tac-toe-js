const Player = (name, shape) => {
  const selectedCells = [];
  const setName = newName => name = newName;
  return { name, shape, selectedCells };
}

class Gameboard {
  constructor() {
    this.player1 = Player("Player 1", "X");
    this.player2 = Player("Player 2", "O");
    this.currentPlayer = this.player1;
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.gameOver = false;
  }

  swapTurn() {
    if (this.currentPlayer == this.player1) {
      return this.currentPlayer = this.player2
    } else return this.currentPlayer = this.player1;
  }

  playerSelection(shape, index) {
    if (!this.board[index]) {
      this.board[index] = shape;
      board.children[index].innerHTML = shape
      this.currentPlayer.selectedCells.push(index);
      if (this.endGame()) {
        alert(`${this.currentPlayer.name} Wins`);
        window.location.reload()
      }
      // this.drawGame();
      this.swapTurn();    
    } else {
      alert("Select an empty cell");
    }   
    
  }



  endGame() {
    const winningCondition =[[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
 
    for (let combination of winningCondition) {
      let count = 0;
      for (let i = 0; i < combination.length; i++) {
        if (this.currentPlayer.selectedCells.includes(combination[i])) {
          count++;
        }
        if (count == 3) {
        return true
        }
      }
    }

    if (this.player1.selectedCells.length + this.player2.selectedCells.lenght == 9) {
      return true
    }
    return false
  } 
  
}

const game = new Gameboard();

// console.log(game.endGame);

let board = document.querySelector(".row");

game.board.forEach((cell, index) => {
  let div = document.createElement("div");
  div.innerHTML = cell;
  div.id = index;
  div.classList = 'col-md-4';
  board.appendChild(div);
})

let instructions = document.querySelector('.instructions');



let cells = document.querySelectorAll('.col-md-4');

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => game.playerSelection(game.currentPlayer.shape, index));
})


  
