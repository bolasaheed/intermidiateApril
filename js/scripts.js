
/*board=[["5","3",".",".","7",".",".",".","."],
 ["6",".",".","1","9","5",".",".","."],
 [".","9","8",".",".",".",".","6","."],
 ["8",".",".",".","6",".",".",".","3"],
 ["4",".",".","8",".","3",".",".","1"],
 ["7",".",".",".","2",".",".",".","6"],
 [".","6",".",".",".",".","2","8","."],
 [".",".",".","4","1","9",".",".","5"],
 [".",".",".",".","8",".",".","7","9"]]

 grids=[grids[0],grids[3],grids[6],
        grids[1],grids[4],grids[7],
        grids[2],grids[5],grids[8]]
*/
class Sudoku {
  constructor(board) {
    this.board = board;
  }



  validate(array) {
    // filter out empty spaces
    const digits = array.filter(function (character) {
      return character !== '.'
    });
    return digits.length === [...new Set(digits)].length;
  };

  sudokuIsValid() {
    const [validated, grids] = [[], []];
    let board = this.board;
    let that = this;
    board.forEach(function (row, rowIndex) {
      // rows
      validated.push(that.validate(row));
      // columns
      const column = [];
      for (let columnIndex = 0; columnIndex < board.length; columnIndex++) {
        column.push(board[columnIndex][rowIndex]);
      }
      validated.push(that.validate(column));
      //grids
      grids.push([]);
    });
    //grids
    board.forEach(function (row, rowIndex) {
      row.forEach(function (character, charIndex) {
        let gridRow = 0;
        if (rowIndex >= 3 && rowIndex <= 5) {
          gridRow = 1;
        } else if (rowIndex >= 6 && rowIndex <= 8) {
          gridRow = 2;
        }
        if (charIndex >= 3 && charIndex <= 5) {
          gridRow += 3;
        } else if (charIndex >= 6 && charIndex <= 8) {
          gridRow += 6;
        }
        grids[gridRow].push(character);
      });
    });
    grids.forEach(function (grid) {
      validated.push(that.validate(grid));
    });
    return validated.every(function (value) {
      return value === true
    });
  };
}


