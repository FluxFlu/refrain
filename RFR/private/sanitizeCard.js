

function sanitize(card, player) {
    card = structuredClone(card)
    if (card?.visible[player]) {
        card.visible = true;
    } else {
        card.name = "";
        card.visible = false;
    }
    return card;
}

module.exports = { sanitize }