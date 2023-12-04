import * as fs from 'fs';

function isNumeric(value: string): boolean {
    return /^-?\d+$/.test(value);
}

fs.readFile('input.txt', 'utf8', (err, input) => { 

    input = input + "\n";
    let currentWord = "";
    let finishedReadingWinningNumbers = false;
    let totalScore = 0;
    let currentFoundWinningNumbers = 0;
    let cardBegun = false;
    let currentWinningNumbers = new Map<number, boolean>();

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
            } else {
                currentWinningNumbers.set(parseInt(currentWord), true);
            }
        }

        if (input[i] === "|") {
            finishedReadingWinningNumbers = true;
        }

        if (input[i] === "\n") {
            totalScore += ((currentFoundWinningNumbers > 0) ? 2**(currentFoundWinningNumbers - 1) : 0);
            console.log(currentFoundWinningNumbers + " matches")
            console.log(((currentFoundWinningNumbers > 0) ? 2**(currentFoundWinningNumbers - 1) : 0) + " added")
            currentFoundWinningNumbers = 0;
            finishedReadingWinningNumbers = false; 
            currentWinningNumbers.clear()
            cardBegun = false;
        }
        currentWord = "";
    }

    console.log(totalScore);
});
