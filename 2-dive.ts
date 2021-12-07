import fs = require("fs");

let input_file = fs.readFileSync("./2-input.txt", "utf8");
let input: string[] = input_file.split("\r\n");

const calcs = input.map((move) => {
  let moveParam = move.split(" ");
  let type = moveParam[0];
  let distance = parseInt(moveParam[1]);
  if (type === "forward") {
    return [0, distance];
  } else if (type === "up") {
    return [-1 * distance, 0];
  } else if (type === "down") {
    return [distance, 0];
  }
});

console.log("PART ONE");

// 0: x change, 1: y change

// depth
let x = 0;
// horizontal
let y = 0;

calcs.forEach((calc) => {
  x = x + calc[0];
  y = y + calc[1];
});

console.log(`Result distance: ${x * y}`);

console.log("PART TWO");

let x2 = 0;
let y2 = 0;
let aim = 0;
let log_steps = 1;

// 0: aim change, 1: forward value
calcs.forEach((calc, index) => {
  aim = aim + calc[0];
  y2 = y2 + calc[1];
  x2 = x2 + aim * calc[1];
  if (log_steps) {
    console.log(
      `Move ${
        index + 1
      }: Depth ${x2}, Horizontal ${y2}, Aim ${aim}. Current Distance ${x2 * y2}`
    );
  }
});

console.log(`Result distance: ${x2 * y2}`);
