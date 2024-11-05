const gridContainer = document.getElementById('grid-container');
const subheader = document.getElementById('subheader');
const startGameBtn = document.getElementById('start-game-btn');
const squares = document.getElementsByClassName('clickable');

function createPlayer(char, gameBoard) {
  const board = gameBoard; // pass by reference
  const symbol = char;
  let hasWon = false;

  const rows = new Array(3).fill(0);
  const cols = new Array(3).fill(0);
  let diagonalForward = 0;
  let diagonalBackward = 0;
  
  function move(row, col) {
    board[row][col] = symbol;
    
    rows[row]++;
    cols[col]++;
    
    if (row == col) {
      diagonalBackward++;
    } 
    
    if (row + col === 2) {
      diagonalForward++;
    }

    hasWon = rows[row] === 3 || 
      cols[col] === 3 ||
      diagonalBackward === 3 ||
      diagonalForward === 3;
  }

  function hasPlayerWon() {
    return hasWon;
  }

  return {
    move,
    hasPlayerWon
  }
}

function createGame() {
  const board = resetBoard();
  let turn = 1;
  let isActive = false; // must call startGame to activate
  let squaresEventListeners = []; // add at start and remove at end for performance

  const playerOne = createPlayer('X', board);
  const playerTwo = createPlayer('O', board);

  function resetBoard() {
    return [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
  }
  
  function renderBoard() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const char = board[i][j];

        const idx = i * 3 + j;
        squares[idx].classList.remove('inactive');
        squares[idx].innerHTML = `<span>${char}</span>`;
        
        if (char === 'X') {
          squares[idx].classList.add('orange');
        } else if (char === 'O') {
          squares[idx].classList.add('blue');
        } else {
          squares[idx].classList.remove('orange');
          squares[idx].classList.remove('blue');
        }
      }
    }
  }
  
  function takeTurn(row, col) {
    if (board[row][col] != '' || !isActive) return;

    const player = (turn % 2 != 0) ? playerOne : playerTwo;
    player.move(row, col);
    game.renderBoard();
    
    if (player.hasPlayerWon()) {
      endGame(turn);
      return;
    }
    
    turn++;
    if (turn === 10) {
      tieGame();
      return;
    }

    if (turn % 2 != 0) {
      subheader.innerText = 'Player One\'s turn';
    } else {
      subheader.innerText = 'Player Two\'s turn';
    }
  }

  function startGame() {
    renderBoard();
    subheader.innerText = 'Player One\'s turn';
    isActive = true;

    for (const square of squares) {
      const listener = () => {
        const [ row, col ] = event.target.id.split('-');
        game.takeTurn(row, col);
      }

      square.addEventListener('click', listener);
      squaresEventListeners.push({ square, listener });
    }
  }

  function endGame(turn) {
    if (turn % 2 != 0) {
      subheader.innerText = 'Player One wins! Play again?';
    } else {
      subheader.innerText = 'Player Two wins! Play again?';
    }
    isActive = !isActive;
    
    for (const { square, listener } of squaresEventListeners) {
      square.removeEventListener('click', listener);
    }
    squaresEventListeners = [];

    for (const square of squares) {
      square.classList.add('inactive');
    }

    startGameBtn.innerText = 'New Game';
  }

  function tieGame() {
    subheader.innerText = 'Tie game... Try again?';
    startGameBtn.innerText = 'New Game';
    
    isActive = !isActive;

    for (const { square, listener } of squaresEventListeners) {
      square.removeEventListener('click', listener);
    }
    squaresEventListeners = [];

    for (const square of squares) {
      square.classList.add('inactive');
    }
  }

  function isGameActive() {
    return isActive;
  }

  return {
    renderBoard,
    isGameActive,
    startGame,
    takeTurn,
  };
};

let game = createGame();

startGameBtn.addEventListener('click', () => {
  if (startGameBtn.innerText === 'Reset') {
    game = createGame();
    game.startGame();
    return;
  }

  if (startGameBtn.innerText === 'New Game') {
    game = createGame();
    game.startGame();
    startGameBtn.innerText = 'Reset';
    return;
  }
  
  if (!game.isGameActive()) {
    game.startGame();
    startGameBtn.innerText = 'Reset';
  }
});