function uuid(a) { return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid) }


const { checkDecklist } = require("./outward/decklist/checkDecklist");
const { cardDatabase } = require("./cardDatabase");
const { player } = require("./player");
const { game } = require("./game");
const { sanitizeGame } = require("./outward/sanitizeGame");
const { reorderList } = require("./outward/clientInteraction/listReordering");
const { playCard } = require("./outward/playCard");
const { pressButton } = require("./outward/clientInteraction/buttonPressing");
const { database } = require("./gameDatabase");


const players = [];
const matchmaking = [];
const decklists = [];
const games = [];
let ids = {};
function getSocket(id) {
  return ids[id];
}

function deepClone(object) {
  temp = {...object}
  for (const key in temp) {
    if (temp[key] instanceof Function) {
      delete temp[key];
    }
  }
  temp = structuredClone(temp);
  return temp;
}

function cleanseGame(game) {
  delete game.player1ID;
  delete game.player2ID;
  return game;
}

function applySockets(ids, str, fn) {
  ids.forEach(e => e.on(str, fn));
}

function onConnection(socket) {
  console.log('A user has connected.');
  const id = uuid();
  socket.emit("idAssignment", id);
  const currentPlayer = new player();
  ids[id] = socket;
  socket.on("matchmake", decklist => {
    if (!checkDecklist(decklist, cardDatabase)) {
      socket.emit("invalidDecklist");
      return;
    }
    if (matchmaking.length) {
      if (!matchmaking.includes(id)) {
        const opponent = matchmaking.shift();

        const currentPlayer = new player(); // All players (regardless of what is specified by the Refrain user) have the property "decklist".
        currentPlayer.decklist = decklist;

        const opponentPlayer = new player();
        opponentPlayer.decklist = decklists.shift();

        currentPlayer.opponent = opponentPlayer;
        opponentPlayer.opponent = currentPlayer;

        currentPlayer.num = 0;
        opponentPlayer.num = 1;

        const currentGame = new game(currentPlayer, opponentPlayer, id, opponent);
        games.push(currentGame);

        socket.on("reorderList", (name, pre, post) => {
          reorderList(currentGame, currentPlayer, name, pre, post);
          currentGame.update();
        });
        getSocket(opponent).on("reorderList", (name, pre, post) => {
          reorderList(currentGame, opponentPlayer, name, pre, post);
          currentGame.update();
        });
        socket.on("pressButton", name => {
        pressButton(currentGame, currentPlayer, name);
          currentGame.update();
        });
        getSocket(opponent).on("pressButton", name => {
          pressButton(currentGame, opponentPlayer, name);
          currentGame.update();
        });

        socket.on("playCard", (card) => {
          playCard(currentGame, currentPlayer, database[currentPlayer.hand[card].name], card);
          currentGame.update();
        });
        getSocket(opponent).on("playCard", (card) => {
          playCard(currentGame, opponentPlayer, database[opponentPlayer.hand[card].name], card);
          currentGame.update();
        });

        currentGame.start(() => {
          const sanitizedGame1 = sanitizeGame(cleanseGame(deepClone(currentGame)), 0);
          getSocket(id).emit("renderField", sanitizedGame1, sanitizedGame1.player1, sanitizedGame1.player2);
          const sanitizedGame2 = sanitizeGame(cleanseGame(deepClone(currentGame)), 1);
          getSocket(opponent).emit("renderField", sanitizedGame2, sanitizedGame2.player2,  sanitizedGame2.player1);
        });
        const sanitizedGame1 = sanitizeGame(cleanseGame(deepClone(currentGame)), 0);
        getSocket(id).emit("startGame", sanitizedGame1, sanitizedGame1.player1, sanitizedGame1.player2);
        const sanitizedGame2 = sanitizeGame(cleanseGame(deepClone(currentGame)), 1);
        getSocket(opponent).emit("startGame", sanitizedGame2, sanitizedGame2.player2,  sanitizedGame2.player1);
      }
    } else {
      matchmaking.unshift(id);
      decklists.unshift(decklist);
    }
  });
}


module.exports = { players, onConnection }