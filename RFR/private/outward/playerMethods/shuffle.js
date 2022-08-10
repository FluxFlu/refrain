

function shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        this.deck[i].visible = [false, false];
        this.deck[j].visible = [false, false];
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]]
    }
}