"use strict";
const getProduct = ((numbers) => numbers.reduce((a, b) => a * b, 1));
const calculateDistanceTravelled = ((velocity, time) => velocity * time);
const getAllDistanceBeaters = ((time, record) => {
    let result = 0;
    for (let i = 0; i < time; i++) {
        result += calculateDistanceTravelled(i, time - i) > record ? 1 : 0;
    }
    return result;
});
const timeRecordPairs = [[59, 430], [70, 1218], [78, 1213], [78, 1276]]; /// cbf parsing them this time
console.log("Part 1: " + getProduct(timeRecordPairs.map((pair) => getAllDistanceBeaters(pair[0], pair[1]))));
const part2Pair = [59707878, 430121812131276]; /// cbf parsing them this time
console.log("Part 2: " + getAllDistanceBeaters(part2Pair[0], part2Pair[1]));
