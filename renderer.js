import gameStatusCodes from "./main.js";

const squares = document.getElementsByClassName('square');
const subheader = document.getElementById('subheader');
const startGameBtn = document.getElementById('start-game-btn');

let squaresEventListeners = [];

export function renderBoard(board) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const char = board[i][j];

      const idx = i * 3 + j;
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

export function addBoardEventListeners(game) {
  for (const square of squares) {
    square.classList.add('active'); // activate square

    const listener = () => {
      square.classList.remove('active'); // deactivate square
      square.removeEventListener('click', listener); // deactivate square
    
      const [ row, col ] = event.target.id.split('-');
      game.takeTurn(row, col);
      renderBoard(game.getBoardState());
    
      const gameStatus = game.getGameStatus();
    
      if (gameStatus === gameStatusCodes.IN_PROGRESS) {
        const turn = game.getTurnNumber();

        subheader.innerText = `Player ${(turn % 2 != 0) ? 'One' : 'Two'}'s turn`;

      } else {
        /* Game Over */
        removeBoardEventListeners();
        startGameBtn.innerText = 'New Game';

        if (gameStatus === gameStatusCodes.PLAYER_ONE_WINS) {
          subheader.innerText = 'Player One wins! Play again?';

        } else if (gameStatus === gameStatusCodes.PLAYER_TWO_WINS) {
          subheader.innerText = 'Player Two wins! Play again?';
          
        } else {
          subheader.innerText = 'Tie game... Play again?';
        }
      }
    }

    square.addEventListener('click', listener);
    squaresEventListeners.push({ square, listener });
  }
}

export function removeBoardEventListeners() {
  for (const { square, listener } of squaresEventListeners) {
    square.removeEventListener('click', listener);
    square.classList.remove('active');
  }
  squaresEventListeners = [];
}