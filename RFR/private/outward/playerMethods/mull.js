

function mulligan(player, num) {
    while(this.hand.length)
        this.deck.push(this.hand.shift());
    this.shuffle();
    this.drawMultiple(player, num);
}