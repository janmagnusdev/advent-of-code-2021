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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var getData = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.get("https://adventofcode.com/2021/day/3/input", {
                    headers: {
                        Cookie: "session=53616c7465645f5fcd01739818d6d32714847f740139d63198a1338a6890b2efde467b312dc5da5164680836385cb744",
                    },
                })];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getMostCommonBit = function (input, position) {
    var ones = 0;
    var zeros = 0;
    var row = input.map(function (str) { return str[position]; });
    row.forEach(function (entry) {
        if (entry === "1") {
            ones++;
        }
        else if (entry === "0") {
            zeros++;
        }
    });
    if (ones > zeros) {
        return "1";
    }
    else {
        return "0";
    }
};
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, input, inputArray, positions, gammaString, i, gammaDec, epsilon, epsilonDec, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getData()];
            case 1:
                res = _a.sent();
                input = res.data;
                inputArray = input.split("\n").filter(function (input) { return input; });
                positions = inputArray[0].length;
                gammaString = "";
                for (i = 0; i < positions; i++) {
                    getMostCommonBit(inputArray, 0);
                    gammaString = gammaString + getMostCommonBit(inputArray, i);
                }
                gammaDec = parseInt(gammaString, 2);
                epsilon = gammaString
                    .split("")
                    .map(function (x) { return (x === "1" ? "0" : "1"); })
                    .join("");
                epsilonDec = parseInt(epsilon, 2);
                console.log(gammaDec * epsilonDec);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.error(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
var oxygenCriteria = function (input, bits, bitPosition) {
    // most common value and fallback is 1
    var ones = bits.filter(function (bit) { return bit === "1"; }).length;
    var zeros = bits.filter(function (bit) { return bit === "0"; }).length;
    var filterBit = zeros > ones ? "0" : "1";
    if (zeros === ones) {
        filterBit = "1";
    }
    return input.filter(function (input) { return input.charAt(bitPosition) !== filterBit; });
};
var carbonDyoxideCriteria = function (input, bits, bitPosition) {
    // least common value and fallback is 0
    var ones = bits.filter(function (bit) { return bit === "1"; }).length;
    var zeros = bits.filter(function (bit) { return bit === "0"; }).length;
    var filterBit = zeros > ones ? "1" : "0";
    if (zeros === ones) {
        filterBit = "0";
    }
    return input.filter(function (input) { return input.charAt(bitPosition) !== filterBit; });
};
var findRating = function (filterBitCriteria, input) {
    var bitPosition = 0;
    var maxBits = input[0].length;
    while (input.length != 1) {
        var newInput = [];
        var currentBits = input.map(function (number) { return number.charAt(bitPosition); });
        newInput = filterBitCriteria(input, currentBits, bitPosition);
        input = newInput;
        if (bitPosition < maxBits) {
            bitPosition++;
        }
        else {
            return "nothing found";
        }
    }
    return input[0];
};
var findOxygenRating = function (input) {
    return findRating(oxygenCriteria, input);
};
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var res, input, oxygenRatingBinary, oxygenRatingDec, carbonDyoxideRatingBinary, carbonDyoxideRatingDec, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getData()];
            case 1:
                res = _a.sent();
                input = res.data.split("\n").filter(function (input) { return input; });
                oxygenRatingBinary = findRating(oxygenCriteria, input);
                oxygenRatingDec = parseInt(oxygenRatingBinary, 2);
                carbonDyoxideRatingBinary = findRating(carbonDyoxideCriteria, input);
                carbonDyoxideRatingDec = parseInt(carbonDyoxideRatingBinary, 2);
                if (isNaN(oxygenRatingDec) || isNaN(carbonDyoxideRatingDec)) {
                    console.error("No number found");
                }
                console.log("Life Support Rating is: ".concat(oxygenRatingDec * carbonDyoxideRatingDec));
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.error(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
//# sourceMappingURL=3-binary-diag.js.map