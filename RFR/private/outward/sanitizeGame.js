const { sanitize } = require("../sanitizeCard");

function sanitizeGame(game, player) {
    // Sanitization, in this case, is the process of cleaning up an object so that any hidden information is not inadvertently passed to a player's client.
    // This function exists to sanitize a game object.
    // The function is passed a `game`, which is the game object to be sanitized, and a `player`, that determines which player this information is being sanitized for.
    // `player` will be 0 if it is for player 1, and 1 if it is for player 2.

    // Sanitization of cards is done by calling the imported `sanitize` function on each individual card object that exists within the passed game object.
    // The `sanitize` function is passed a card and a player, in that order.
    // The card passed should be the card object to be sanitized.
    // The player passed should be in the same format that was used previously (0 for player 1, 1 for player 2).
    // The function sanitizes and then returns the card object.
    // The function returns the modified card object without modifying the original card object.

    // This function, `sanitizeGame`, must return a new version of the game object that can be safely passed to players.
    // It is okay to modify the original game object, as the version you have been passed is a deep clone that has already been partially sanitized.
    // If your specific card game includes any other information that should be hidden from players, or you want to otherwise modify information before it is rendered, you should also be removing that here.
        
        game.player2.hand = game.player2.hand.map(e => sanitize(e, player));
        game.player2.deck = game.player2.deck.map(e => sanitize(e, player));
        game.player2.field = game.player2.field.map(e => sanitize(e, player));
        game.player2.graveyard = game.player2.graveyard.map(e => sanitize(e, player));

        delete game.player2.decklist;
        delete game.player2.opponent;

        game.player1.hand = game.player1.hand.map(e => sanitize(e, player));
        game.player1.deck = game.player1.deck.map(e => sanitize(e, player));
        game.player1.field = game.player1.field.map(e => sanitize(e, player));
        game.player1.graveyard = game.player1.graveyard.map(e => sanitize(e, player));

        delete game.player1.decklist;
        delete game.player1.opponent;

        return game;
}

module.exports = { sanitizeGame }