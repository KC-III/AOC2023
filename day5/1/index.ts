import * as fs from 'fs';

const parseSeedLine = (line: string): Array<number>  => {
    let numbers = line.split(" ").slice(1);
    return numbers.map((number) => parseInt(number));
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

fs.readFile('input.txt', 'utf8', (err, input) => { 

    let seeds: Array<number> = new Array<number>();
    const lines = input.split("\n\n");
    seeds = parseSeedLine(lines.shift()!);

    lines.forEach((line: string) => {
        seeds = seeds.map((seed: number) => {
            let ranges: Array<Array<number>> = parseMapLine(line);
            for (let i = 0; i < ranges.length; i++) {
                let sourceStart = ranges[i][1];
                let destinationStart = ranges[i][0];
                let rangeLength = ranges[i][2];

                if (seed >= sourceStart && seed <= (sourceStart + rangeLength)) {
                    return destinationStart + seed - sourceStart;
                }
            }

            return seed;
        })
    })

    console.log(Math.min(...seeds))
});