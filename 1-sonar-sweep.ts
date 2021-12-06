const fs = require("fs");

let allText: string = fs.readFileSync(
  "C:/Users/jan.kister/OneDrive/projects/advent-of-code/1-input.txt",
  "utf8"
);

console.log(allText);
let input_strings = allText.replace(/\r\n/g, " ").split(" ");
let input = input_strings.map((x) => parseInt(x));
console.log(input);

const result = input.reduce((acc, cur, index, array): any => {
  if (index === 0) {
    return 0;
  }
  if (cur > array[index - 1]) {
    acc++;
  }
  return acc;
}, 0);

console.log(result);
