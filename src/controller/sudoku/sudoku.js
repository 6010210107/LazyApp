const genBoard = () => {
  let arr = [];

  for (let y = 0; y < 9; y++) {
    var arr2 = [];
    for (let x = 0; x < 9; x++) {
      arr2.push(Math.floor(Math.random() * 9 + 1));
    }
    arr.push(arr2);
  }
  //   console.log(Math.floor(Math.random()*9 + 1));
  console.log(arr);
};


export const solve = (board) => {
  if (solved(board)) {
    return board;
  } else {
    const possibilities = nextBoards(board);
    const validBoards = keepOnlyValid(possibilities);

    return searchForSolution(validBoards);
  }
};

const searchForSolution = (boards) => {
  if (boards.length < 1) return false;

  // backtracking search for solution
  var first = boards.shift();
  const tryPath = solve(first);
  if (tryPath !== false) {
    return tryPath;
  } else {
    return searchForSolution(boards);
  }
};

const solved = (board) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === null) {
        return false;
      }
    }
  }
  return true;
};

const nextBoards = (board) => {
  var res = [];
  const firstEmpty = findEmptySquare(board); // <-- (y, x)
  if (firstEmpty !== undefined) {
    const y = firstEmpty[0];
    const x = firstEmpty[1];
    for (let i = 1; i <= 9; i++) {
      var newBoard = [...board];
      var row = [...newBoard[y]];
      row[x] = i;
      newBoard[y] = row;
      res.push(newBoard);
    }
  }
  return res;
};

const findEmptySquare = (board) => {
  // board -> [Int, Int]
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == null) {
        return [i, j];
      }
    }
  }
};

const keepOnlyValid = (boards) => {
  return boards.filter((b) => validBoard(b));
};

const validBoard = (board) => {
  return rowGood(board) && columnGood(board) && boxesGood(board);
};

const rowGood = (board) => {
  for (let i = 0; i < 9; i++) {
    // row loop
    var cur = [];
    for (let j = 0; j < 9; j++) {
      // column loop
      if (cur.includes(board[i][j])) {
        return false;
      } else if (cur.includes(board[i][j] !== null)) {
        cur.push(board[i][j]);
      }
    }
  }
  return true;
};
const columnGood = (board) => {
  for (let i = 0; i < 9; i++) {
    // row loop
    var cur = [];
    for (let j = 0; j < 9; j++) {
      // column loop
      if (cur.includes(board[j][i])) {
        return false;
      } else if (cur.includes(board[j][i] !== null)) {
        cur.push(board[j][i]);
      }
    }
  }
  return true;
};

const boxesGood = (board) => {
  const boxCoordinates = [
    //
    [0, 0],
    [0, 1],
    [0, 2], //    | 00  | 01 | 02 |
    [1, 0],
    [1, 1],
    [1, 2], //    | 10  | 11 | 12 |
    [2, 0],
    [2, 1],
    [2, 2], //    | 20  | 21 | 22 |
  ];

  for (let y = 0; y < 9; y += 3) {
    // row loop
    for (let x = 0; x < 9; x += 3) {
      // column loop
      var cur = [];
      for (let i = 0; i < 9; i++) {
        var coordinates = [...boxCoordinates[i]];
        coordinates[0] += y;
        coordinates[1] += x;
        if (cur.includes(board[coordinates[0]][coordinates[1]])) {
          return false;
        } else if (board[coordinates[0]][coordinates[1]] !== null) {
          cur.push(board[coordinates[0]][coordinates[1]]);
        }
      }
    }
  }
  return true;
};
