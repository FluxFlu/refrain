const { database } = require("../../gameDatabase.js")

function reorderList(game, player, listName, pre, post) {
    // This function decides how to handle client reordering of `cardList` objects created in the `renderField.mjs` function.
    // `game` is the game object that contains the player.
    // `player` is the player object that correlates to the player reordering the list.
    // `listName` is the name of the list that is being reordered.
    // `pre` is the index that the card was in prior to being moved by the player.
    // `post` is the index within the list that the card was moved to.

    // imported `database` is a list of cards as game objects.

    switch(listName) {
        case "hand":
            const card = player.hand.splice(pre, 1)[0];
            player.hand.splice(post, 0, card);
        break;
    }
}

module.exports = { reorderList };