const { cardList } = require("../../cardDatabase");

function checkDecklist(decklist) {
    // Given a player submitted decklist and a list of all existing card names, this function should make sure the decklist submitted is valid.
    
    decklist = decklist.trim().split(/\r\n|\r|\n/g); // Use `trim()` to remove whitespace at the end and beginning of the file.
                                                     // Then split the decklist into an array, splitting at each newline. 
    if (decklist.length == 0)
        return false; // If there are no cards in the deck, return false.

    const allCardNames = cardList.map(e => e.toLowerCase()); // Case insensitive checking done with .toLowerCase()
    let total = 0;
    const usedNames = {};
    for (let i = 0; i < decklist.length; i++) {

        const e = decklist[i].split(' '); // *{ Split, for example, `decklist[i] = "4 White Rose"` into `num = 4; cardName = "white rose";`

        let num = e.shift();
        if (num[num.length - 1] == 'x')
            num = num.substring(0, num.length - 1);
        num = +num;
        const cardName = e.join(' '); // }* 

        if (num > 5 || num < 1) // You cannot have more than five of a card, or less than one of a card.
            return false;

        if (!allCardNames.includes(cardName.toLowerCase())) { // If your deck includes an invalid card name, skip past it.
            decklist.splice(i, 1);
            i--;
            continue;
        }

        if (usedNames[cardName])
            usedNames[cardName] += num;
        else
            usedNames[cardName] = num;

        if (usedNames[cardName] > 5) // Support checking of different instances of the same card within the list.
            return false;
            
        total += num
    }
    if (total < 20) // Enforce minimum deck size
        return false;
    return true;
}

module.exports = { checkDecklist }