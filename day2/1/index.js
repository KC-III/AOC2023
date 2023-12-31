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
var Marbles;
(function (Marbles) {
    Marbles[Marbles["red"] = 0] = "red";
    Marbles[Marbles["green"] = 1] = "green";
    Marbles[Marbles["blue"] = 2] = "blue";
})(Marbles || (Marbles = {}));
const marblesBag = new Map([
    [Marbles.red, 12],
    [Marbles.green, 13],
    [Marbles.blue, 14]
]);
function isValidGame(marblesBag, gameMarbles) {
    let result = true;
    marblesBag.forEach((value, key) => {
        if (gameMarbles.get(key) !== undefined && gameMarbles.get(key) > value) {
            console.log("false");
            result = false;
        }
    });
    return result;
}
function getGameData(gameData) {
    let parsedData = gameData.substring(5).split(":");
    /// Get ID
    let id = parseInt(parsedData[0]);
    /// Get Marbles
    let marbles = new Map([
        [Marbles.red, 0],
        [Marbles.green, 0],
        [Marbles.blue, 0]
    ]);
    parsedData[1].split(";").forEach((hand) => {
        hand.split(",").forEach(grab => {
            let [count, marbleColour] = grab.substring(1).split(" ");
            let key = Marbles[marbleColour];
            if (marbles.get(key) < parseInt(count)) {
                marbles.set(key, parseInt(count));
            }
        });
    });
    return [id, marbles];
}
fs.readFile('input.txt', 'utf8', (err, data) => {
    let total = 0;
    const lines = data.split("\n");
    lines.forEach(line => {
        let [id, marbles] = getGameData(line);
        console.log(getGameData(line));
        total += isValidGame(marblesBag, marbles) ? id : 0;
    });
    console.log(total);
    return total;
});
