const { itemize } = require("../itemizeDecklist");
const { database } = require("../gameDatabase.js")

function startGame(game, player1, player2, player1Decklist, player2Decklist) {
    // When the game starts, this function is called. This is where you should perform setup actions, such as setting life and dealing out hands.

    player1.life = 20;
    player1.deck = itemize(player1Decklist);
    player1.mulligan(0, 7);

    player2.life = 20;
    player2.deck = itemize(player2Decklist);
    player2.mulligan(1, 7);
}

module.exports = { startGame }