import axios from "axios";

const getData = async () =>
  await axios.get("https://adventofcode.com/2021/day/4/input", {
    headers: {
      Cookie:
        "session=53616c7465645f5fcd01739818d6d32714847f740139d63198a1338a6890b2efde467b312dc5da5164680836385cb744",
    },
  });

// list of draws
// list of boards

// board is an interface

interface BingoNumber {
  number: number;
  marked: boolean;
}

const height = 5;
const width = 5;

class Board {
  numbers: BingoNumber[][];
  won: boolean;
  id: number;

  constructor(boardNumbers: number[], id: number) {
    this.numbers = [];
    let index = 0;
    for (let i = 0; i < height; i++) {
      this.numbers[i] = [];
      for (let j = 0; j < width; j++) {
        this.numbers[i][j] = { number: boardNumbers[index], marked: false };
        index++;
      }
    }
    this.id = id;
    this.won = false;
  }

  public markNumber(toMark: number) {
    for (let numberLine of this.numbers) {
      for (let number of numberLine) {
        if (number.number === toMark) {
          number.marked = true;
        }
      }
    }
  }

  public printPretty() {
    let string = "";
    for (let line of this.numbers) {
      line.forEach((number) => (string = string + number.number + " "));
      string = string + "\n";
    }
    return string;
  }

  public checkWon(): [Array<BingoNumber>, Array<BingoNumber>] {
    const numbers = this.numbers;
    // diagonal is no winner
    // check rows
    let wonLines = [];
    let wonColumns = [];
    for (let lineIndex = 0; lineIndex < numbers[0].length; lineIndex++) {
      if (numbers[lineIndex].every((number) => number.marked === true)) {
        wonLines.push([...numbers[lineIndex]]);
        this.won = true;
      }
    }
    // check columns
    // assuming all columns are equally long
    for (let columnIndex = 0; columnIndex < numbers.length; columnIndex++) {
      let column = [];
      for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
        column.push(numbers[rowIndex][columnIndex]);
      }
      if (column.every((number) => number.marked === true)) {
        wonColumns.push([...column]);
        this.won = true;
      }
    }
    return [wonLines, wonColumns];
  }

  public getUnmarkedNumbers() {
    return this.numbers
      .flatMap((numberLines) => numberLines)
      .filter((number: BingoNumber) => !number.marked);
  }
}

const markDrawnNumberOnAllBoards = (draw: number, boards: Board[]) => {
  for (let board of boards) {
    board.markNumber(draw);
  }
};

// return won boards if one has won, otherwise false
const checkBoardsWon = (boards: Board[]) => {
  let wonBoards: Board[] = [];
  for (let board of boards) {
    let result = board.checkWon();
    if (result[0].length > 0 || result[1].length > 0) {
      wonBoards.push(board);
    }
  }
  return wonBoards;
};

(async () => {
  const res = await getData();
  const input = res.data;
  const cleaned = input.split("\n\n").map((x: string) => {
    return x
      .replace(/[\n ,]+/g, " ")
      .trim()
      .split(" ");
  });

  const draws = cleaned[0].map((y) => parseInt(y));
  let boards = cleaned
    .slice(1)
    .map((board) => board.map((numberString) => parseInt(numberString)));

  const boardList = boards.map((board, i) => new Board(board, i));
  let notWonBoards = [];
  let lastBoardId;
  let counter = 0;

  for (let draw of draws) {
    markDrawnNumberOnAllBoards(draw, boardList);
    let result = checkBoardsWon(boardList);
    if (result.length === 1) {
      console.log("result: ");
      let wonBoard = result[0] as Board;
      let sum = wonBoard
        .getUnmarkedNumbers()
        .map((number) => number.number)
        .reduce((acc, curr) => acc + curr);
      console.log("Final score: " + sum * draw);
    }
    notWonBoards = boardList.filter((board) => board.won === false);
    if (notWonBoards.length === 1) {
      console.log("last board");
      console.log(notWonBoards[0]);
      lastBoardId = notWonBoards[0].id;
      console.log(
        notWonBoards[0].numbers.map((numberLine) =>
          numberLine.map((number) => number.marked)
        )
      );
    }
    if (notWonBoards.length === 0 && lastBoardId) {
      let wonLastBoard = boardList.find((board) => board.id === lastBoardId);
      let sum = wonLastBoard
        .getUnmarkedNumbers()
        .map((number) => number.number)
        .reduce((acc, curr) => acc + curr);
      console.log("Final score last board: " + sum * draw);
      break;
    }
    counter++;
  }
})();
