

function draw(player) {
    const card = this.deck.shift();
    this.hand.push(card);
    card.visible[player] = true;
}