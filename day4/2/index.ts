const start = Date.now();

import * as fs from 'fs';

function isNumeric(value: string): boolean {
    return /^-?\d+$/.test(value);
}

function appendMap(map: Map<number, number>, key: number, value: number): void {
     if (map.get(key) !== undefined) {
        map.set(key, map.get(key)! + value)
     } else {
        map.set(key, value)
     }
}

fs.readFile('input.txt', 'utf8', (err, input) => { 

    input = input + "\n";
    let currentWord = "";
    let finishedReadingWinningNumbers = false;
    let currentFoundWinningNumbers = 0;
    let currentWinningNumbers = new Map<number, boolean>();
    let line = 0;
    let copies = new Map<number, number>();
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
            } else {
                currentWinningNumbers.set(parseInt(currentWord), true);
            }
        }

        if (input[i] === "|") {
            finishedReadingWinningNumbers = true;
        }

        if (input[i] === "\n") {
            console.log("line " + (line + 1));
            console.log(currentFoundWinningNumbers + " matches")

            let currentCopies = (copies.get(line) ?? 0) + 1;
            console.log((currentCopies) + " copies!")

            appendMap(copies, line, 1);
            if (currentFoundWinningNumbers > 0) {
                for (let k = 1; k < currentFoundWinningNumbers + 1; k++) {
                    console.log("line " + (line + k + 1) + " copy added")
                    appendMap(copies, line + k, currentCopies)
                }
            }
            totalScore += ((currentFoundWinningNumbers > 0) ? 2**(currentFoundWinningNumbers - 1) : 0);

            currentFoundWinningNumbers = 0;
            finishedReadingWinningNumbers = false; 
            currentWinningNumbers.clear()
            line += 1;
        }
        currentWord = "";
    }

    let result = 0;
    copies.forEach((value, key) => {
        result += value;
    })

    console.log(result + " cards");
    console.log(totalScore + " score");
    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);
});

