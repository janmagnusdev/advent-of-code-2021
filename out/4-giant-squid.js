"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var getData = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.get("https://adventofcode.com/2021/day/4/input", {
                    headers: {
                        Cookie: "session=53616c7465645f5fcd01739818d6d32714847f740139d63198a1338a6890b2efde467b312dc5da5164680836385cb744",
                    },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var height = 5;
var width = 5;
var Board = /** @class */ (function () {
    function Board(boardNumbers, id) {
        this.numbers = [];
        var index = 0;
        for (var i = 0; i < height; i++) {
            this.numbers[i] = [];
            for (var j = 0; j < width; j++) {
                this.numbers[i][j] = { number: boardNumbers[index], marked: false };
                index++;
            }
        }
        this.id = id;
        this.won = false;
    }
    Board.prototype.markNumber = function (toMark) {
        for (var _i = 0, _a = this.numbers; _i < _a.length; _i++) {
            var numberLine = _a[_i];
            for (var _b = 0, numberLine_1 = numberLine; _b < numberLine_1.length; _b++) {
                var number = numberLine_1[_b];
                if (number.number === toMark) {
                    number.marked = true;
                }
            }
        }
    };
    Board.prototype.printPretty = function () {
        var string = "";
        for (var _i = 0, _a = this.numbers; _i < _a.length; _i++) {
            var line = _a[_i];
            line.forEach(function (number) { return (string = string + number.number + " "); });
            string = string + "\n";
        }
        return string;
    };
    Board.prototype.checkWon = function () {
        var numbers = this.numbers;
        // diagonal is no winner
        // check rows
        var wonLines = [];
        var wonColumns = [];
        for (var lineIndex = 0; lineIndex < numbers[0].length; lineIndex++) {
            if (numbers[lineIndex].every(function (number) { return number.marked === true; })) {
                wonLines.push(__spreadArray([], numbers[lineIndex], true));
                this.won = true;
            }
        }
        // check columns
        // assuming all columns are equally long
        for (var columnIndex = 0; columnIndex < numbers.length; columnIndex++) {
            var column = [];
            for (var rowIndex = 0; rowIndex < 5; rowIndex++) {
                column.push(numbers[columnIndex][rowIndex]);
            }
            if (column.every(function (number) { return number.marked === true; })) {
                wonColumns.push(__spreadArray([], column, true));
                this.won = true;
            }
        }
        return [wonLines, wonColumns];
    };
    Board.prototype.getUnmarkedNumbers = function () {
        return this.numbers
            .flatMap(function (numberLines) { return numberLines; })
            .filter(function (number) { return !number.marked; });
    };
    return Board;
}());
var markDrawnNumberOnAllBoards = function (draw, boards) {
    for (var _i = 0, boards_1 = boards; _i < boards_1.length; _i++) {
        var board = boards_1[_i];
        board.markNumber(draw);
    }
};
// return won boards if one has won, otherwise false
var checkBoardsWon = function (boards) {
    var wonBoards = [];
    for (var _i = 0, boards_2 = boards; _i < boards_2.length; _i++) {
        var board = boards_2[_i];
        var result = board.checkWon();
        if (result[0].length > 0 || result[1].length > 0) {
            wonBoards.push(board);
        }
    }
    return wonBoards;
};
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, input, cleaned, draws, boards, boardList, notWonBoards, lastBoardId, counter, _i, draws_1, draw, result, wonBoard, sum, wonLastBoard, sum;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getData()];
            case 1:
                res = _a.sent();
                input = res.data;
                cleaned = input.split("\n\n").map(function (x) {
                    return x
                        .replace(/[\n ,]+/g, " ")
                        .trim()
                        .split(" ");
                });
                draws = cleaned[0].map(function (y) { return parseInt(y); });
                boards = cleaned
                    .slice(1)
                    .map(function (board) { return board.map(function (numberString) { return parseInt(numberString); }); });
                boardList = boards.map(function (board, i) { return new Board(board, i); });
                notWonBoards = [];
                counter = 0;
                for (_i = 0, draws_1 = draws; _i < draws_1.length; _i++) {
                    draw = draws_1[_i];
                    markDrawnNumberOnAllBoards(draw, boardList);
                    result = checkBoardsWon(boardList);
                    if (result.length === 1) {
                        console.log("result: ");
                        console.log(result[0].printPretty());
                        wonBoard = result[0];
                        sum = wonBoard
                            .getUnmarkedNumbers()
                            .map(function (number) { return number.number; })
                            .reduce(function (acc, curr) { return acc + curr; });
                        console.log("Final score: " + sum * draw);
                    }
                    notWonBoards = boardList.filter(function (board) { return board.won === false; });
                    if (notWonBoards.length === 1) {
                        console.log("last board");
                        console.log(notWonBoards[0]);
                        lastBoardId = notWonBoards[0].id;
                    }
                    if (notWonBoards.length === 0 && lastBoardId) {
                        wonLastBoard = boardList.find(function (board) { return board.id === lastBoardId; });
                        sum = wonLastBoard
                            .getUnmarkedNumbers()
                            .map(function (number) { return number.number; })
                            .reduce(function (acc, curr) { return acc + curr; });
                        console.log("Final score last board: " + sum * draw);
                    }
                    counter++;
                }
                return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=4-giant-squid.js.map