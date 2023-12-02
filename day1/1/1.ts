import * as fs from 'fs';

function getLineValue(line: String): number {

    let first = -1;
    let last = -1;

    for (var i = 0; i < line.length; i++) {

        let char = line[i];
        if (isNumeric(char) && first !== -1) {
            last = parseInt(char);
        } else if (isNumeric(char)) {
            first = parseInt(char);
        }    
    }

    if (first === -1) {
        return 0;
    } else if (last === -1) {
        return 10 * first + first;
    }

    return 10 * first + last;
}

function isNumeric(string) {
    return !isNaN(string - parseFloat(string));
}


fs.readFile('input.txt', 'utf8', (err, data) => {

  let total = 0;
  const lines = data.split("\n");
  lines.forEach(line => {
    total += getLineValue(line);
  });

  console.log(total)
  return total;
});