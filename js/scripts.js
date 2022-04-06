
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
      row.forEach(function (character, columnIndex) {
        let gridNo = 0;
        if (rowIndex >= 3 && rowIndex <= 5) {
          gridNo = 1;
        } else if (rowIndex >= 6 && rowIndex <= 8) {
          gridNo = 2;
        }
        if (columnIndex >= 3 && columnIndex <= 5) {
          gridNo += 3;
        } else if (columnIndex >= 6 && columnIndex <= 8) {
          gridNo += 6;
        }
        grids[gridNo].push(character);
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


function initializeSudokuBoard() {
  let board = [["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"]]

  let sudokuBoard = "<div class='row'><div class='col-1'> </div><div class='col-1'>0</div><div class='col-1'>1</div><div class='col-1'>2</div><div class='col-1'>3</div><div class='col-1'>4</div><div class='col-1'>5</div><div class='col-1'>6</div><div class='col-1'>7</div><div class='col-1'>8</div></div>";
  for (let row = 0; row < 9; row++) {
    sudokuBoard += `<div class='row '><div class='col-1'>${row}</div>`;
    //let rowDiv =``
    for (let column = 0; column < 9; column++) {
      let gridNo = 0;
      if (row >= 3 && row <= 5) {
        gridNo = 1;
      } else if (row >= 6 && row <= 8) {
        gridNo = 2;
      }
      if (column >= 3 && column <= 5) {
        gridNo += 3;
      } else if (column >= 6 && column <= 8) {
        gridNo += 6;
      }
      let bgClass = '';
      switch (gridNo) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 8:
          bgClass = 'bg-warning';
          break;
        default: bgClass = 'bg-info';


      }

      let val = ""
      if (board[row][column] === ".") { val = "" } else { val = board[row][column] }
      let rowDiv = `<div class='col-1 ${bgClass} '><input class='text-center ${bgClass} ' size='2' type='text'  value='${val}' id='txt${row.toString() + column.toString()}'></div>`
      sudokuBoard += rowDiv;


    }
    sudokuBoard += "</div>";
  }
  //sudokuBoard += "</div>";
  return sudokuBoard;
}
function readBoard() {
  let board = [];
  let boardRow = [];
  for (let row = 0; row < 9; row++) {

    for (let column = 0; column < 9; column++) {
      let inputId = `txt${row.toString() + column.toString()}`
      let val = $("#" + inputId).val();
      if (val === "") { val = "." }
      boardRow.push(val);


    }
    board.push(boardRow);
    boardRow = [];
  }


  return board;
}
$(document).ready(function () {


  $("#sudokuBoard").html(initializeSudokuBoard());

  $("#myButton").click(function (event) {

    event.preventDefault();
    let boardData = readBoard();
    let boad = new Sudoku(boardData);

    let result = boad.sudokuIsValid();
    $("#output").text(result);
  });


});
