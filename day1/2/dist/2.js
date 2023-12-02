"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
function getLineValue(line) {
    var _a, _b, _c, _d;
    var first = -1;
    var last = -1;
    for (var i = 0; i < line.length; i++) {
        var value = -1;
        value = (_d = (_c = (_b = (_a = numberDictionary.get(line[i])) !== null && _a !== void 0 ? _a : (line.length - i >= 3 ? numberDictionary.get(line.substring(i, i + 3)) : -1)) !== null && _b !== void 0 ? _b : (line.length - i >= 4 ? numberDictionary.get(line.substring(i, i + 4)) : -1)) !== null && _c !== void 0 ? _c : (line.length - i >= 5 ? numberDictionary.get(line.substring(i, i + 5)) : -1)) !== null && _d !== void 0 ? _d : -1;
        if (value !== -1 && first !== -1) {
            last = value;
        }
        else if (value !== -1) {
            first = value;
        }
    }
    if (first === -1) {
        return 0;
    }
    else if (last === -1) {
        return 10 * first + first;
    }
    return 10 * first + last;
}
var numberDictionary = new Map([
    ["1", 1],
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6],
    ["7", 7],
    ["8", 8],
    ["9", 9],
    ["one", 1],
    ["two", 2],
    ["six", 6],
    ["four", 4],
    ["five", 5],
    ["nine", 9],
    ["seven", 7],
    ["eight", 8],
    ["three", 3],
]);
fs.readFile('input.txt', 'utf8', function (err, data) {
    var total = 0;
    var lines = data.split("\n");
    lines.forEach(function (line) {
        total += getLineValue(line);
    });
    console.log(total);
    return total;
});
