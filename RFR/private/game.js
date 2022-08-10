const { startGame } = require("./outward/startGame");


class game {
    static games = [];
    constructor(player1, player2, player1ID, player2ID) {
        game.games.push(this);
        this.player1 = player1;
        this.player2 = player2;
        this.player1ID = player1ID;
        this.player2ID = player2ID;//${game_json}
    }
    start(updateFunction) {
        this.update = updateFunction;
        startGame(this, this.player1, this.player2, this.player1.decklist, this.player2.decklist);
        this.update();
    }
}

module.exports = { game }