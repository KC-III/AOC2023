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
    let result = new Array;
    for (let i = 0; i < numbers.length; i = i + 2) {
        result.push(new Array(parseInt(numbers[i]), parseInt(numbers[i + 1])));
    }
    return result;
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
const applyMapping = (map, value) => {
    for (let j = 0; j < map.length; j++) {
        let sourceStart = map[j][1];
        let destinationStart = map[j][0];
        let rangeLength = map[j][2];
        if (value >= sourceStart && value <= (sourceStart + rangeLength)) {
            return destinationStart + value - sourceStart;
        }
    }
    return value;
};
fs.readFile('input.txt', 'utf8', (err, input) => {
    let seedRanges = new Array();
    const lines = input.split("\n\n");
    seedRanges = parseSeedLine(lines.shift());
    let mappings = new Array();
    lines.forEach((line) => {
        let ranges = parseMapLine(line);
        mappings.push(ranges);
    });
    let smallestSeeds = seedRanges.map((seedsRange) => {
        console.log(seedsRange);
        let smallestSeed = Infinity;
        for (let i = 0; i < seedsRange[1]; i++) {
            let seed = (seedsRange[0] + i);
            for (let j = 0; j < mappings.length; j++) {
                seed = applyMapping(mappings[j], seed);
            }
            if (seed < smallestSeed) {
                console.log("new smallest " + seed);
                smallestSeed = seed;
            }
        }
        return smallestSeed;
    });
    console.log(Math.min(...smallestSeeds));
});
