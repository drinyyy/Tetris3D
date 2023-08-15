export class GameBoard {
    constructor(rows, columns) {
      this.rows = rows;
      this.columns = columns;
      this.board = Array.from({ length: rows }, () => Array(columns).fill(false));
    }
  
    isCellOccupied(row, column) {
      if (row < 0 || row >= this.rows || column < 0 || column >= this.columns) {
        return true; 
      }
      return this.board[row][column];
    }
  
    occupyCell(row, column) {
      this.board[row][column] = true;
    }
  
    clearCell(row, column) {
      this.board[row][column] = false;
    }
  }
  