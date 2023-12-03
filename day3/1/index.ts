import * as fs from 'fs';


function isNumber(i : string) : boolean {
    return (i >= '0' && i <= '9');
}

const symbolsRegex = new RegExp("[^A-Za-z0-9.\n]");


fs.readFile('input.txt', 'utf8', (err, input) => { 

    const lineLength = input.indexOf('\n') + 1;
    let total = 0;

    let unparsedCurrentNumber = "";
    let currentNumberHasSymbol = false;

    for (let i = 0; i < input.length; i++) {
        let character = input[i]

        if ((character === "." || character === "\n" || symbolsRegex.test(character) || (i+1) === input.length) && unparsedCurrentNumber !== "") {
            if (currentNumberHasSymbol) {
                total += parseInt(unparsedCurrentNumber);
                console.log("adding " + unparsedCurrentNumber);
            } else {
                console.log("clearing " + unparsedCurrentNumber)
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
                || symbolsRegex.test(input[i-1]);
            }

            if ((i - lineLength) % lineLength !== 0) { /// Ignore for last in line
                currentNumberHasSymbol = currentNumberHasSymbol 
                || symbolsRegex.test(input[i+1]);
            }
            
            if (i - lineLength > 0) {
                currentNumberHasSymbol = currentNumberHasSymbol || symbolsRegex.test(input[i-lineLength]);
                
                if (i % lineLength !== 0) { /// Ignore for first in line
                    currentNumberHasSymbol = currentNumberHasSymbol 
                    || symbolsRegex.test(input[i-1-lineLength]);
                }

                if ((i - lineLength) % lineLength !== 0) { /// Ignore for last in line
                    currentNumberHasSymbol = currentNumberHasSymbol 
                    || symbolsRegex.test(input[i+1-lineLength]);
                }
            } 

            if (i + lineLength < input.length) {
                console.log(i + " " + input[i] + " " + input[i+2+lineLength])
                currentNumberHasSymbol = currentNumberHasSymbol || symbolsRegex.test(input[i+lineLength]);
                
                if (i % lineLength !== 0) { /// Ignore for first in line
                    currentNumberHasSymbol = currentNumberHasSymbol 
                    || symbolsRegex.test(input[i-1+lineLength]);
                }

                if ((i - lineLength) % lineLength !== 0) { /// Ignore for last in line
                    currentNumberHasSymbol = currentNumberHasSymbol 
                    || symbolsRegex.test(input[i+1+lineLength]);
                }
            } 
        }

    };
  
    console.log(total);
    return total;
});