import * as fs from 'fs';

/**
 * Lumuto Partitioned Quicksort Code (Use stack to not hit recursion limit)
 */

function quickSort(hands: [string, string][]): [string, string][] {
    if (hands.length <= 1) {
        return hands;
    }

    const stack: [number, number][] = [];
    stack.push([0, hands.length - 1]);

    while (stack.length > 0) {
        console.log(stack)
        const [low, high] = stack.pop()!;
        if (low < high) {
          const pivotIndex = partition(hands, low, high);
          stack.push([low, pivotIndex - 1]);
          stack.push([pivotIndex + 1, high]);
        }
      }

    return hands;
}

function partition(hands: [string, string][], low: number, high: number): number {
    const pivot = hands[high][0];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (isHandGreaterThanOrEqualToOther(pivot, hands[j][0])) {
            i++;
            console.log("swap " + hands[i] + " " + hands[j]);
            [hands[i], hands[j]] = [hands[j], hands[i]];
        }
    }

    console.log("partition " + i)

    i++;
    console.log("swap " + hands[i] + " " + hands[high]);
    [hands[i], hands[high]] = [hands[high], hands[i]];
    console.log("partition " + i)
    return i;
}

function getCards(hand: string): Map<string, number> {

    let result = new Map<string, number>();
    for (let card of hand) {
        result.set(card, (result.get(card) ?? 0) + 1); 
    }
    return result;
}

function getHandValue(handCards: Map<string, number>): number {

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

const cardValues = new Map<string, number>([
    ["2", 1],
    ["3", 2],
    ["4", 3],
    ["5", 4],
    ["6", 5],
    ["7", 6],
    ["8", 7],
    ["9", 8],
    ["T", 9],
    ["J", 10],
    ["Q", 11],
    ["K", 12],
    ["A", 13]
]);

function isHandGreaterThanOrEqualToOther(hand: string, other: string): boolean {
    console.log(hand + " " + getHandValue(getCards(hand)) + " vs " + other + " " + getHandValue(getCards(other)));
    if (getHandValue(getCards(hand)) !== getHandValue(getCards(other))) {
        return getHandValue(getCards(hand)) > getHandValue(getCards(other));
    }


    for (let i = 0; i < hand.length; i++) {
        if (cardValues.get(hand[i])! !== cardValues.get(other[i])!) {
            return cardValues.get(hand[i])! > cardValues.get(other[i])!;
        }
    }

    return true;
}


/**
 * Parsing Code
 */
function parseInput(rawInput: string) : [string, string][] {

    let hands: [string, string][] = [];
    rawInput.split("\n").forEach((line: String) => {
        let hand = line.split(" ");
        hands.push([hand[0], hand[1]])
    })

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
})


