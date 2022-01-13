"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var input_file = fs.readFileSync("./2-input.txt", "utf8");
var input = input_file.split("\r\n");
var calcs = input.map(function (move) {
    var moveParam = move.split(" ");
    var type = moveParam[0];
    var distance = parseInt(moveParam[1]);
    if (type === "forward") {
        return [0, distance];
    }
    else if (type === "up") {
        return [-1 * distance, 0];
    }
    else if (type === "down") {
        return [distance, 0];
    }
});
console.log("PART ONE");
// 0: x change, 1: y change
// depth
var x = 0;
// horizontal
var y = 0;
calcs.forEach(function (calc) {
    x = x + calc[0];
    y = y + calc[1];
});
console.log("Result distance: ".concat(x * y));
console.log("PART TWO");
var x2 = 0;
var y2 = 0;
var aim = 0;
var log_steps = 1;
// 0: aim change, 1: forward value
calcs.forEach(function (calc, index) {
    aim = aim + calc[0];
    y2 = y2 + calc[1];
    x2 = x2 + aim * calc[1];
    if (log_steps) {
        console.log("Move ".concat(index + 1, ": Depth ").concat(x2, ", Horizontal ").concat(y2, ", Aim ").concat(aim, ". Current Distance ").concat(x2 * y2));
    }
});
console.log("Result distance: ".concat(x2 * y2));
