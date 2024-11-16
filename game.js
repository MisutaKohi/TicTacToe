import createPlayer from "./player.js";
import gameStatusCodes from "./main.js";

function createGame() {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  let status = gameStatusCodes.PAUSED; // must call startGame to activate
  let turn = 1;

  const playerOne = createPlayer('X', board);
  const playerTwo = createPlayer('O', board);
  
  function takeTurn(row, col) {
    if (board[row][col] != '' || status === gameStatusCodes.PAUSED) return;

    const player = (turn % 2 != 0) ? playerOne : playerTwo;
    player.recordMove(row, col);
    board[row][col] = player.getSymbol();
    
    if (player.hasPlayerWon()) {
      endGame();
      return;
    }
    
    turn++;
    if (turn === 10) {
      tieGame();
      return;
    }
  }

  function startGame() {
    status = gameStatusCodes.IN_PROGRESS;
  }

  function endGame() {
    status = (turn % 2 != 0) ? gameStatusCodes.PLAYER_ONE_WINS : gameStatusCodes.PLAYER_TWO_WINS;
  }

  function tieGame() {
    status = gameStatusCodes.TIE;
  }

  /* Getters */

  function getBoardState() {
    return board;
  }

  function getTurnNumber() {
    return turn;
  }

  function getGameStatus() {
    return status;
  }

  return {
    takeTurn,
    startGame,
    endGame,
    tieGame,
    getBoardState,
    getTurnNumber,
    getGameStatus,
  };
};

export default createGame;