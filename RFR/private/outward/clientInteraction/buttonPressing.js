const { database } = require("../../gameDatabase.js")

function pressButton(game, player, buttonName) {
    // This function decides how to handle pressing of `button` objects created in the `renderField.mjs` function.
    // `game` is the game object that contains the player.
    // `player` is the player object that correlates to the player pressing the button.
    // `buttonName` is the name of the button that is being pressed.

    // imported `database` is a list of cards as game objects.
    
    const playerNum = +(game.player2 == player)
    switch(buttonName) {
        case "passTurn":
            if (playerNum == game.turn) {
                game.turn = +!game.turn;
                for (let i = 0; i < player.field.length; i++) {
                    if (player.field[i].onEnd)
                        player.field[i].onEnd();
                }
                for (let i = 0; i < player.opponent.field.length; i++) {
                    if (database[player.opponent.field[i].name].onBeginning)
                        database[player.opponent.field[i].name].onBeginning(game, player.opponent);
                }
            }
        break;
    }
}

module.exports = { pressButton };