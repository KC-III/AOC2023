import * as fs from 'fs';


function isNumber(i : string) : boolean {
    return (i >= '0' && i <= '9');
}

function addMapValue(map:Map<number, number[]>, key:number, value:number) {
    if (map.get(key) !== undefined) {
        map.get(key)?.push(value)
    } else (
        map.set(key, [value])
    )
}

const symbolsRegex = new RegExp("[^A-Za-z0-9.\n]");


fs.readFile('input.txt', 'utf8', (err, input) => { 

    const lineLength = input.indexOf('\n') + 1;
    let total = 0;

    let unparsedCurrentNumber = "";
    let currentNumberHasSymbol = false;
    let connectedSymbols:number[] = [];
    let symbolsConnectedNumbers = new Map<number, number[]>([]);

    for (let i = 0; i < input.length; i++) {
        let character = input[i]

        if ((character === "." || character === "\n" || symbolsRegex.test(character) || (i+1) === input.length) && unparsedCurrentNumber !== "") {
            if (currentNumberHasSymbol) {

                let unique = [...new Set(connectedSymbols)];

                unique.forEach((value) => {
                    addMapValue(symbolsConnectedNumbers, value, parseInt(unparsedCurrentNumber))
                })

                console.log("adding " + unparsedCurrentNumber);
            } else {
                console.log("clearing " + unparsedCurrentNumber)
            }
            
            connectedSymbols = [];
            unparsedCurrentNumber = "";
            currentNumberHasSymbol = false; 
            continue;
        }

        if (isNumber(character)) {
            unparsedCurrentNumber += character;

            /// Check for symbols
            if (i % lineLength !== 0 && symbolsRegex.test(input[i-1])) { /// Ignore for first in line
                currentNumberHasSymbol = true;
                connectedSymbols.push(i-1);
            }

            if ((i - lineLength) % lineLength !== 0 && symbolsRegex.test(input[i+1])) { /// Ignore for last in line
                currentNumberHasSymbol = true;
                connectedSymbols.push(i+1);
            }
            
            if (i - lineLength > 0) { /// ignore first line

                if (symbolsRegex.test(input[i-lineLength])) {
                    currentNumberHasSymbol = true;
                    connectedSymbols.push(i-lineLength);
                }
                
                if (i % lineLength !== 0 && symbolsRegex.test(input[i-1-lineLength])) { /// Ignore for first in line
                    currentNumberHasSymbol = true;
                    connectedSymbols.push(i-1-lineLength);
                }

                if ((i - lineLength) % lineLength !== 0 && symbolsRegex.test(input[i+1-lineLength])) { /// Ignore for last in line
                    currentNumberHasSymbol = true;
                    connectedSymbols.push(i+1-lineLength);
                }
            } 

            if (i + lineLength < input.length) { /// ignore last line
                if (symbolsRegex.test(input[i+lineLength])) {
                    currentNumberHasSymbol = true;
                    connectedSymbols.push(i+lineLength);
                }

                if (i % lineLength !== 0 && symbolsRegex.test(input[i-1+lineLength])) { /// Ignore for first in line
                    currentNumberHasSymbol = true;
                    connectedSymbols.push(i-1+lineLength);
                }

                if ((i - lineLength) % lineLength !== 0 && symbolsRegex.test(input[i+1+lineLength])) { /// Ignore for last in line
                    currentNumberHasSymbol = true;
                    connectedSymbols.push(i+1+lineLength);
                }
            } 
        }

    };
  
    console.log(symbolsConnectedNumbers)
    symbolsConnectedNumbers.forEach((values) => {
        let multiple = 0;
        if (values.length >= 2) {
            multiple = 1;
            values.forEach((value) => {
                multiple = multiple*value;
            })
            total += multiple;
        }
    })

    console.log(total);
    return total;
});