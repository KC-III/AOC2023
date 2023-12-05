import * as fs from 'fs';

const parseSeedLine = (line: string): Array<Array<number>>  => {
    let numbers = line.split(" ").slice(1);
    let result = new Array<Array<number>>;
    for (let i = 0; i < numbers.length; i = i + 2) {
        result.push(new Array(parseInt(numbers[i]), parseInt(numbers[i+1])))
    }
    return result;
}

const parseMapLine = (line: string): Array<Array<number>>  => {
    let results = new Array<Array<number>>();
    
    let ranges = line.split("\n").slice(1);
    ranges.forEach((range: string) => {
        let numbers = range.split(" ");
        results.push(numbers.map((rawNumber: string) => parseInt(rawNumber)))
    })

    return results;
}

const applyMapping = (map: Array<Array<number>>, value: number) => {
    for (let j = 0; j < map.length; j++) {
        let sourceStart: number = map[j][1];
        let destinationStart = map[j][0];
        let rangeLength = map[j][2];

        if (value >= sourceStart && value <= (sourceStart + rangeLength)) {
            return destinationStart + value - sourceStart;
        }
    }
    return value;
}

fs.readFile('input.txt', 'utf8', (err, input) => { 

    let seedRanges: Array<Array<number>> = new Array<Array<number>>();
    const lines = input.split("\n\n");
    seedRanges = parseSeedLine(lines.shift()!);

    let mappings = new Array<Array<Array<number>>>();
    lines.forEach((line: string) => {
        let ranges: Array<Array<number>> = parseMapLine(line);
        mappings.push(ranges);
    });

    let smallestSeeds = seedRanges.map((seedsRange) => {
        console.log(seedsRange);
        let smallestSeed = Infinity;
        for (let i = 0; i < seedsRange[1]; i++) {
            let seed = (seedsRange[0] + i);
            for (let j = 0; j < mappings.length; j++) {
                seed = applyMapping(mappings[j], seed);
            }

            if (seed < smallestSeed) {
                console.log("new smallest " + seed)
                smallestSeed = seed;
            }
        }       
        return smallestSeed;
    })

    console.log(Math.min(...smallestSeeds))

});