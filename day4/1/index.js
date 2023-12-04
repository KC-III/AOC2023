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
const fs = __importStar(require("fs"));
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}
fs.readFile('input.txt', 'utf8', (err, input) => {
    input = input + "\n";
    let currentWord = "";
    let finishedReadingWinningNumbers = false;
    let totalScore = 0;
    let currentFoundWinningNumbers = 0;
    let cardBegun = false;
    let currentWinningNumbers = new Map();
    for (let i = 0; i < input.length; i++) {
        console.log(currentWinningNumbers);
        if (input[i] === ":") {
            cardBegun = true;
            continue;
        }
        if (!cardBegun) {
            continue;
        }
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
            totalScore += ((currentFoundWinningNumbers > 0) ? 2 ** (currentFoundWinningNumbers - 1) : 0);
            console.log(currentFoundWinningNumbers + " matches");
            console.log(((currentFoundWinningNumbers > 0) ? 2 ** (currentFoundWinningNumbers - 1) : 0) + " added");
            currentFoundWinningNumbers = 0;
            finishedReadingWinningNumbers = false;
            currentWinningNumbers.clear();
            cardBegun = false;
        }
        currentWord = "";
    }
    console.log(totalScore);
});
