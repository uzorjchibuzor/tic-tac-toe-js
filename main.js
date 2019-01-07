const Player = (name, shape) => {
  const selectedCells = [];
  const setName = newName => name = newName;
  return { name, setName, shape, selectedCells };
}


// console.log(uzor);

const Gameboard = () => {
  let board = Array(9);
  const player1 = Player("Player 1", "X");
  const player2 = Player("Player 2", "X");
  let  currentPlayer = player1;

  const swapTurn = () => currentPlayer == player1 ? player2 : player1;
  
  
  const choose = (currentPlayer.shape, index) => board[index] = currentPlayer.shape;

  const endGame = () => {
    const winningCondition =[[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  
  }
  

  return {board, choose, currentPlayer, swapTurn}
}

const game = Gameboard()

const gameplay = (() => {
  while
})();
