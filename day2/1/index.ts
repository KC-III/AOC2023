import * as fs from 'fs';


enum Marbles {
    red,
    green,
    blue
}

const marblesBag = new Map<Marbles, number>([
    [Marbles.red, 12],
    [Marbles.green, 13],
    [Marbles.blue, 14]
]);

function isValidGame(marblesBag:Map<Marbles, number>, gameMarbles:Map<Marbles, number>) : boolean {

    let result = true;

    marblesBag.forEach((value, key) => {
        if (gameMarbles.get(key) !== undefined && gameMarbles.get(key)! > value) {
            console.log("false")
            result = false;
        }
    })
    
    return result;
}

function getGameData(gameData:string) : [number, Map<Marbles, number>] {


    let parsedData = gameData.substring(5).split(":");
    /// Get ID
    let id = parseInt(parsedData[0]);
    /// Get Marbles
    let marbles = new Map<Marbles, number>([
        [Marbles.red, 0],
        [Marbles.green, 0],
        [Marbles.blue, 0]
    ]);


    parsedData[1].split(";").forEach((hand) => {
        hand.split(",").forEach(grab => {
            let [count, marbleColour] = grab.substring(1).split(" ");
            let key:Marbles = Marbles[marbleColour as keyof typeof Marbles];

            if (marbles.get(key)! < parseInt(count)) {
                marbles.set(key, parseInt(count));
            }
        })
    })

    return[id, marbles]
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