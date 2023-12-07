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
/**
 * Lumuto Partitioned Quicksort Code (Use stack to not hit recursion limit)
 */
function quickSort(hands) {
    if (hands.length <= 1) {
        return hands;
    }
    const stack = [];
    stack.push([0, hands.length - 1]);
    while (stack.length > 0) {
        console.log(stack);
        const [low, high] = stack.pop();
        if (low < high) {
            const pivotIndex = partition(hands, low, high);
            stack.push([low, pivotIndex - 1]);
            stack.push([pivotIndex + 1, high]);
        }
    }
    return hands;
}
function partition(hands, low, high) {
    const pivot = hands[high][0];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (isHandGreaterThanOrEqualToOther(pivot, hands[j][0])) {
            i++;
            console.log("swap " + hands[i] + " " + hands[j]);
            [hands[i], hands[j]] = [hands[j], hands[i]];
        }
    }
    console.log("partition " + i);
    i++;
    console.log("swap " + hands[i] + " " + hands[high]);
    [hands[i], hands[high]] = [hands[high], hands[i]];
    console.log("partition " + i);
    return i;
}
function getCards(hand) {
    var _a;
    let result = new Map();
    for (let card of hand) {
        result.set(card, ((_a = result.get(card)) !== null && _a !== void 0 ? _a : 0) + 1);
    }
    return result;
}
function getHandValue(handCards) {
    var _a;
    let handJokers = (_a = handCards.get("J")) !== null && _a !== void 0 ? _a : 0;
    if (handJokers > 0 && handJokers < 5) {
        handCards.delete("J");
        let largestCardCountKey = [...handCards.entries()].reduce((a, b) => b[1] > a[1] ? b : a)[0];
        handCards.set(largestCardCountKey, handCards.get(largestCardCountKey) + handJokers);
    }
    /// Five of a kind
    if (handCards.size === 1) {
        return 7;
    }
    /// Four of a Kind or Full House
    if (handCards.size === 2) {
        /// Four of a kind
        for (let cardCount of handCards.values()) {
            if (cardCount === 4) {
                return 6;
            }
        }
        /// Full house
        return 5;
    }
    /// Two Pair or Three of a Kind
    if (handCards.size === 3) {
        /// Three of a kind
        for (let cardCount of handCards.values()) {
            if (cardCount === 3) {
                return 4;
            }
        }
        /// Two pair
        return 3;
    }
    /// One Pair
    if (handCards.size === 4) {
        return 2;
    }
    /// High Card
    return 1;
}
const cardValues = new Map([
    ["J", 1],
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6],
    ["7", 7],
    ["8", 8],
    ["9", 9],
    ["T", 10],
    ["Q", 11],
    ["K", 12],
    ["A", 13]
]);
function isHandGreaterThanOrEqualToOther(hand, other) {
    console.log(hand + " " + getHandValue(getCards(hand)) + " vs " + other + " " + getHandValue(getCards(other)));
    if (getHandValue(getCards(hand)) !== getHandValue(getCards(other))) {
        return getHandValue(getCards(hand)) > getHandValue(getCards(other));
    }
    for (let i = 0; i < hand.length; i++) {
        if (cardValues.get(hand[i]) !== cardValues.get(other[i])) {
            return cardValues.get(hand[i]) > cardValues.get(other[i]);
        }
    }
    return true;
}
/**
 * Parsing Code
 */
function parseInput(rawInput) {
    let hands = [];
    rawInput.split("\n").forEach((line) => {
        let hand = line.split(" ");
        hands.push([hand[0], hand[1]]);
    });
    return hands;
}
/**
 * Part 1 Code
 */
fs.readFile('input.txt', 'utf8', (err, input) => {
    let sortedHands = quickSort(parseInput(input));
    let score = 0;
    for (let i = 0; i < sortedHands.length; i++) {
        score += (i + 1) * parseInt(sortedHands[i][1]);
    }
    console.log("Score: " + score);
});
