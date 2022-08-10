function playCard(game, player, card, cardNum) {
    // This function decides what to do when a player attempts to play a card from their hand.

    // `game` is the game object of the game in which the card exists.
    // `player` is the player object of the player playing the card.
    // `card` is the game object containing the game data for the card being played.
    //      (the object described within `cardProperties.json`, rather than the objects used for visual purposes).
    // `cardNum` is the index in that player's hand of the card being played.

    // This function should return true if the card is successfully played, and false otherwise.
    // (The card may not be successfully played if, for example, the player playing the card does not have enough mana).
    
    const cardVisual = player.hand[cardNum];

    const playerNum = player.num;
    
    if (player.juice < card.cost)
        return false;
    if (playerNum != game.turn)
        return false;

    cardVisual.visible = [true, true];
    
    player.juice -= card.cost;

    if (card.type == "Wildlife")
        player.field.push(player.hand.splice(cardNum, 1)[0]);
    else if (card.type == "Spell") {
        player.graveyard.push(player.hand.splice(cardNum, 1)[0]);
        card.spellCast(game, player);
    }

    return true;
}

module.exports = { playCard }