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
function isNumber(i) {
    return (i >= '0' && i <= '9');
}
function addMapValue(map, key, value) {
    var _a;
    if (map.get(key) !== undefined) {
        (_a = map.get(key)) === null || _a === void 0 ? void 0 : _a.push(value);
    }
    else
        (map.set(key, [value]));
}
const symbolsRegex = new RegExp("[^A-Za-z0-9.\n]");
fs.readFile('input.txt', 'utf8', (err, input) => {
    const lineLength = input.indexOf('\n') + 1;
    let total = 0;
    let unparsedCurrentNumber = "";
    let currentNumberHasSymbol = false;
    let connectedSymbols = [];
    let symbolsConnectedNumbers = new Map([]);
    for (let i = 0; i < input.length; i++) {
        let character = input[i];
        if ((character === "." || character === "\n" || symbolsRegex.test(character) || (i + 1) === input.length) && unparsedCurrentNumber !== "") {
            if (currentNumberHasSymbol) {
                let unique = [...new Set(connectedSymbols)];
                unique.forEach((value) => {
                    addMapValue(symbolsConnectedNumbers, value, parseInt(unparsedCurrentNumber));
                });
                console.log("adding " + unparsedCurrentNumber);
            }
            else {
                console.log("clearing " + unparsedCurrentNumber);
            }
            connectedSymbols = [];
            unparsedCurrentNumber = "";
            currentNumberHasSymbol = false;
            continue;
        }
        if (isNumber(character)) {
            unparsedCurrentNumber += character;
            /// Check for symbols
            if (i % lineLength !== 0 && symbolsRegex.test(input[i - 1])) { /// Ignore for first in line
                currentNumberHasSymbol = true;
                connectedSymbols.push(i - 1);
            }
            if ((i - lineLength) % lineLength !== 0 && symbolsRegex.test(input[i + 1])) { /// Ignore for last in line
                currentNumberHasSymbol = true;
                connectedSymbols.push(i + 1);
            }
            if (i - lineLength > 0) { /// ignore first line
                if (symbolsRegex.test(input[i - lineLength])) {
                    currentNumberHasSymbol = true;
                    connectedSymbols.push(i - lineLength);
                }
                if (i % lineLength !== 0 && symbolsRegex.test(input[i - 1 - lineLength])) { /// Ignore for first in line
                    currentNumberHasSymbol = true;
                    connectedSymbols.push(i - 1 - lineLength);
                }
                if ((i - lineLength) % lineLength !== 0 && symbolsRegex.test(input[i + 1 - lineLength])) { /// Ignore for last in line
                    currentNumberHasSymbol = true;
                    connectedSymbols.push(i + 1 - lineLength);
                }
            }
            if (i + lineLength < input.length) { /// ignore last line
                if (symbolsRegex.test(input[i + lineLength])) {
                    currentNumberHasSymbol = true;
                    connectedSymbols.push(i + lineLength);
                }
                if (i % lineLength !== 0 && symbolsRegex.test(input[i - 1 + lineLength])) { /// Ignore for first in line
                    currentNumberHasSymbol = true;
                    connectedSymbols.push(i - 1 + lineLength);
                }
                if ((i - lineLength) % lineLength !== 0 && symbolsRegex.test(input[i + 1 + lineLength])) { /// Ignore for last in line
                    currentNumberHasSymbol = true;
                    connectedSymbols.push(i + 1 + lineLength);
                }
            }
        }
    }
    ;
    console.log(symbolsConnectedNumbers);
    symbolsConnectedNumbers.forEach((values) => {
        let multiple = 0;
        if (values.length >= 2) {
            multiple = 1;
            values.forEach((value) => {
                multiple = multiple * value;
            });
            total += multiple;
        }
    });
    console.log(total);
    return total;
});
