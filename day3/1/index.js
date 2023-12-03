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
const symbolsRegex = new RegExp("[^A-Za-z0-9.\n]");
fs.readFile('input.txt', 'utf8', (err, input) => {
    const lineLength = input.indexOf('\n') + 1;
    let total = 0;
    let unparsedCurrentNumber = "";
    let currentNumberHasSymbol = false;
    for (let i = 0; i < input.length; i++) {
        let character = input[i];
        if ((character === "." || character === "\n" || symbolsRegex.test(character) || (i + 1) === input.length) && unparsedCurrentNumber !== "") {
            if (currentNumberHasSymbol) {
                total += parseInt(unparsedCurrentNumber);
                console.log("adding " + unparsedCurrentNumber);
            }
            else {
                console.log("clearing " + unparsedCurrentNumber);
            }
            unparsedCurrentNumber = "";
            currentNumberHasSymbol = false;
            continue;
        }
        if (isNumber(character)) {
            unparsedCurrentNumber += character;
            /// Check for symbols
            if (i % lineLength !== 0) { /// Ignore for first in line
                currentNumberHasSymbol = currentNumberHasSymbol
                    || symbolsRegex.test(input[i - 1]);
            }
            if ((i - lineLength) % lineLength !== 0) { /// Ignore for last in line
                currentNumberHasSymbol = currentNumberHasSymbol
                    || symbolsRegex.test(input[i + 1]);
            }
            if (i - lineLength > 0) {
                currentNumberHasSymbol = currentNumberHasSymbol || symbolsRegex.test(input[i - lineLength]);
                if (i % lineLength !== 0) { /// Ignore for first in line
                    currentNumberHasSymbol = currentNumberHasSymbol
                        || symbolsRegex.test(input[i - 1 - lineLength]);
                }
                if ((i - lineLength) % lineLength !== 0) { /// Ignore for last in line
                    currentNumberHasSymbol = currentNumberHasSymbol
                        || symbolsRegex.test(input[i + 1 - lineLength]);
                }
            }
            if (i + lineLength < input.length) {
                console.log(i + " " + input[i] + " " + input[i + 2 + lineLength]);
                currentNumberHasSymbol = currentNumberHasSymbol || symbolsRegex.test(input[i + lineLength]);
                if (i % lineLength !== 0) { /// Ignore for first in line
                    currentNumberHasSymbol = currentNumberHasSymbol
                        || symbolsRegex.test(input[i - 1 + lineLength]);
                }
                if ((i - lineLength) % lineLength !== 0) { /// Ignore for last in line
                    currentNumberHasSymbol = currentNumberHasSymbol
                        || symbolsRegex.test(input[i + 1 + lineLength]);
                }
            }
        }
    }
    ;
    console.log(total);
    return total;
});
