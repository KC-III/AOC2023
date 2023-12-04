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
const start = Date.now();
const fs = __importStar(require("fs"));
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}
function appendMap(map, key, value) {
    if (map.get(key) !== undefined) {
        map.set(key, map.get(key) + value);
    }
    else {
        map.set(key, value);
    }
}
fs.readFile('input.txt', 'utf8', (err, input) => {
    var _a;
    input = input + "\n";
    let currentWord = "";
    let finishedReadingWinningNumbers = false;
    let currentFoundWinningNumbers = 0;
    let currentWinningNumbers = new Map();
    let line = 0;
    let copies = new Map();
    let totalScore = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== "\n" && input[i] !== "|" && input[i] !== " ") {
            currentWord += input[i];
            continue;
        }
        if (isNumeric(currentWord)) {
            if (finishedReadingWinningNumbers) {
                if (currentWinningNumbers.get(parseInt(currentWord))) {
                    currentFoundWinningNumbers += 1;
                }
            }
            else {
                currentWinningNumbers.set(parseInt(currentWord), true);
            }
        }
        if (input[i] === "|") {
            finishedReadingWinningNumbers = true;
        }
        if (input[i] === "\n") {
            console.log("line " + (line + 1));
            console.log(currentFoundWinningNumbers + " matches");
            let currentCopies = ((_a = copies.get(line)) !== null && _a !== void 0 ? _a : 0) + 1;
            console.log((currentCopies) + " copies!");
            appendMap(copies, line, 1);
            if (currentFoundWinningNumbers > 0) {
                for (let k = 1; k < currentFoundWinningNumbers + 1; k++) {
                    console.log("line " + (line + k + 1) + " copy added");
                    appendMap(copies, line + k, currentCopies);
                }
            }
            totalScore += ((currentFoundWinningNumbers > 0) ? 2 ** (currentFoundWinningNumbers - 1) : 0);
            currentFoundWinningNumbers = 0;
            finishedReadingWinningNumbers = false;
            currentWinningNumbers.clear();
            line += 1;
        }
        currentWord = "";
    }
    let result = 0;
    copies.forEach((value, key) => {
        result += value;
    });
    console.log(result + " cards");
    console.log(totalScore + " score");
    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);
});
