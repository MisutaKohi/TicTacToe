const squares = document.getElementsByClassName('square');
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
    square.classList.add('active');
    
    const listener = () => {
      const [ row, col ] = event.target.id.split('-');
      square.classList.remove('active');
      game.takeTurn(row, col);
      renderBoard(game.getBoardState());
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