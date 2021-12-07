import fs = require("fs");

let allText: string = fs.readFileSync("./1-input.txt", "utf8");

let input_strings = allText.replace(/\r\n/g, " ").split(" ");
let input = input_strings.map((x) => parseInt(x));
console.log(input);

const reducer = (acc, cur, index, array): number => {
  if (index === 0) {
    return 0;
  }
  if (cur > array[index - 1]) {
    acc++;
  }
  return acc;
};

const result = input.reduce(reducer, 0);

console.log(`Part one: ${result}`);

const createMeasurementWindows = (input: number[]): number[] => {
  const windows = [];
  for (let i = 2; i < input.length; i++) {
    let windowSum = input[i - 2] + input[i - 1] + input[i];
    windows.push(windowSum);
  }
  return windows;
};

const windows = createMeasurementWindows(input);
const result2 = windows.reduce(reducer, 0);
console.log(`Part two: ${result2}`);
