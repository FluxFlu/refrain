function interpretDecklist(decklist) {
    // Given a player submitted decklist, this function should turn the decklist into an array of card names.

    // This function must always return an array.

    decklist = decklist.split(/\r\n|\r|\n/g); // Split the decklist into an array, splitting at each newline
    const numArray = [];
    decklist = decklist.map(e => { // *{ Split, for example, `decklist[i] = "4 White Rose"` into `num = 4; cardName = "white rose";`
        e = e.split(' ');
        let num = e.shift();
        if (num[num.length - 1] == 'x')
            num = num.substring(0, num.length - 1);
        numArray.push(+num);
        e = e.join(' ').toLowerCase();
        return e;
    }) // }*
    const deckOut = [];
    decklist.forEach((e, i) => { // For each card in the decklist, put that card's name into an array n times, where n is the number of that card in the decklist.
                                 // ("4x White Rose" would put the White Rose object into the array 4 times)
        while(numArray[i]--)
            deckOut.push(e);
    });
    return deckOut;
}

module.exports = { interpretDecklist }