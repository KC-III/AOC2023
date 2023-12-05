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
const parseSeedLine = (line) => {
    let numbers = line.split(" ").slice(1);
    return numbers.map((number) => parseInt(number));
};
const parseMapLine = (line) => {
    let results = new Array();
    let ranges = line.split("\n").slice(1);
    ranges.forEach((range) => {
        let numbers = range.split(" ");
        results.push(numbers.map((rawNumber) => parseInt(rawNumber)));
    });
    return results;
};
fs.readFile('input.txt', 'utf8', (err, input) => {
    let seeds = new Array();
    const lines = input.split("\n\n");
    seeds = parseSeedLine(lines.shift());
    console.log(seeds);
    lines.forEach((line) => {
        seeds = seeds.map((seed) => {
            let ranges = parseMapLine(line);
            for (let i = 0; i < ranges.length; i++) {
                let sourceStart = ranges[i][1];
                let destinationStart = ranges[i][0];
                let rangeLength = ranges[i][2];
                if (seed >= sourceStart && seed <= (sourceStart + rangeLength)) {
                    return destinationStart + seed - sourceStart;
                }
            }
            return seed;
        });
    });
    console.log(Math.min(...seeds));
});
