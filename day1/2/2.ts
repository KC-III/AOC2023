import * as fs from 'fs';

function getLineValue(line: String): number {

    let first = -1;
    let last = -1;

    for (var i = 0; i < line.length; i++) {

        let value:number = -1;

        value = numberDictionary.get(line[i]) ?? 
            (line.length - i >= 3 ? numberDictionary.get(line.substring(i, i+3)) : -1) ??
            (line.length - i >= 4 ? numberDictionary.get(line.substring(i, i+4)) : -1) ?? 
            (line.length - i >= 5 ? numberDictionary.get(line.substring(i, i+5)) : -1) ?? -1; 

        if (value !== -1 && first !== -1) {
            last = value;
        } else if (value !== -1) {
            first = value;
        }
    }

    if (first === -1) {
        return 0;
    } else if (last === -1) {
        return 10 * first + first;
    }
    return 10 * first + last;
}

const numberDictionary = new Map<string, number>([
    ["1", 1],
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6],
    ["7", 7],
    ["8", 8],
    ["9", 9],
    ["one", 1],
    ["two", 2],
    ["six", 6],
    ["four", 4],
    ["five", 5],
    ["nine", 9],
    ["seven", 7],
    ["eight", 8],
    ["three", 3],
]);

fs.readFile('input.txt', 'utf8', (err, data) => {

  let total = 0;
  const lines = data.split("\n");
  lines.forEach(line => {
    total += getLineValue(line);
  });

  console.log(total)
  return total;
});