function createPlayer(char) {
  const symbol = char;
  let hasWon = false;

  const rows = new Array(3).fill(0);
  const cols = new Array(3).fill(0);
  let diagonalForward = 0;
  let diagonalBackward = 0;
  
  function recordMove(row, col) {
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

  function getSymbol() {
    return symbol;
  }

  return {
    recordMove,
    hasPlayerWon,
    getSymbol
  }
}

export default createPlayer;