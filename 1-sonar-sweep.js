"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var allText = fs.readFileSync("./1-input.txt", "utf8");
var input_strings = allText.replace(/\r\n/g, " ").split(" ");
var input = input_strings.map(function (x) { return parseInt(x); });
console.log(input);
var reducer = function (acc, cur, index, array) {
    if (index === 0) {
        return 0;
    }
    if (cur > array[index - 1]) {
        acc++;
    }
    return acc;
};
var result = input.reduce(reducer, 0);
console.log("Part one: ".concat(result));
var createMeasurementWindows = function (input) {
    var windows = [];
    for (var i = 2; i < input.length; i++) {
        var windowSum = input[i - 2] + input[i - 1] + input[i];
        windows.push(windowSum);
    }
    return windows;
};
var windows = createMeasurementWindows(input);
var result2 = windows.reduce(reducer, 0);
console.log("Part two: ".concat(result2));
