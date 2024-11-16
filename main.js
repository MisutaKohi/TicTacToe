import createGame from "./game.js";
import {addBoardEventListeners, renderBoard} from './renderer.js';

const startGameBtn = document.getElementById('start-game-btn');
const subheader = document.getElementById('subheader');

const gameStatusCodes = Object.freeze({
  PAUSED: 0,
  PLAYER_ONE_WINS: 1,
  PLAYER_TWO_WINS: 2,
  IN_PROGRESS: 3,
  TIE: 4
});

startGameBtn.addEventListener('click', () => {
  const game = createGame();
  game.startGame();

  renderBoard(game.getBoardState());
  addBoardEventListeners(game);

  subheader.innerText = "Player One's turn";

  if (startGameBtn.innerText === 'Start Game' || startGameBtn.innerText === 'New Game') {
    startGameBtn.innerText = 'Reset';
  } 
});

export default gameStatusCodes;