import * as fs from 'fs';


enum Marbles {
    red,
    green,
    blue
}

function getGameValue(gameData:string) : number {


    let parsedData = gameData.substring(5).split(":");
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


    let result = 1;
    console.log(marbles);
    marbles.forEach((value) => {
        result = result * value;
    })

    return result;
}




fs.readFile('input.txt', 'utf8', (err, data) => {

    let total = 0;
    const lines = data.split("\n");
    lines.forEach(line => {

        total += getGameValue(line);
    });
  
    console.log(total);
    return total;
  });