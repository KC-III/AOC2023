"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function getLineValue(line) {
    var first = -1;
    var last = -1;
    for (var i = 0; i < line.length; i++) {
        var char = line[i];
        if (isNumeric(char) && first !== -1) {
            last = parseInt(char);
        }
        else if (isNumeric(char)) {
            first = parseInt(char);
        }
    }
    if (first === -1) {
        return 0;
    }
    else if (last === -1) {
        return 10 * first + first;
    }
    return 10 * first + last;
}
function isNumeric(string) {
    return !isNaN(string - parseFloat(string));
}
fs.readFile('input.txt', 'utf8', function (err, data) {
    var total = 0;
    var lines = data.split("\n");
    lines.forEach(function (line) {
        total += getLineValue(line);
    });
    console.log(total);
    return total;
});
