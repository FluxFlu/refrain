import { cardList } from "../preRendering/cardList.mjs";
import { orderedCardList } from "../preRendering/orderedCardList.js";
import { cardStack } from "../preRendering/cardStack.mjs";
import { text } from "../preRendering/textRendering.mjs";
import { renderCard } from "../preRendering/cardRendering.mjs";
import { button } from "../preRendering/button.mjs";
import { makeDecision } from "../preRendering/makeDecision.mjs";

let stack;
let stackO;
let list;
let listO;
let field;
let fieldO;
let life;
let lifeO;
let juice;
let juiceO;
let passTurn;

function renderField(game, player, opponent) {
    // Draw the playing field.

    // This function will be called each time the field is meant to be updated.
    // For this reason, it is important to write a function that can do self-cleanup when called repeatedly.

    // `game` is the object that represents the game.
    //      You have been passed a deep clone of that object, that has had all of its methods removed, and has been sanitized as part of the `sanitizeGame` method.
    // `player` is the player object of the player whose field is being rendered. You have been passed a deep clone of that object.
    // `opponent` is the player object of the opponent to the player whose field is being rendered

    if (!stack)
        stack = cardStack({ name: "", visible: false, owner: 0, width: 7, height: 23 }, player.deck.length, 89, 42, 30,() => {

        });
    else {
        stack.size = player.deck.length;
    }

    if (!stackO)
        stackO = cardStack({ name: "", visible: false, owner: 1, width: 7, height: 23 }, opponent.deck.length, 2, 1.8, 30, () => {

        });
    else {
        stackO.size = opponent.deck.length;
    }

    stack.update();
    stackO.update();
    if (!field)
        field = orderedCardList(player.field, 2, 50, 77, "center");
    else {
        field.list = player.field;
    }
    
    if (!fieldO)
        fieldO = orderedCardList(opponent.field, 18, 25, 77, "center");
    else {
        fieldO.list = opponent.field;
    }

    field.update();
    fieldO.update();

    player.hand.forEach(e => e.owner = 0);
    if (!list)
        list = cardList("hand", player.hand, 2, 78, 77, (x, y, w, h) => {
            return (y + h < 78)
        }, "center");
    else
        list.list = player.hand;

    opponent.hand.forEach(e => e.owner = 1);
    if (!listO)
        listO = cardList("opponentHand", opponent.hand, 18, 0, 77, () => false, "center");
    else
        listO.list = opponent.hand

    list.update();
    listO.update();

    if (!life)
        life = text(player.life + 'l', 83, 50, 20, 20, 30, "#4d4d4d", "Monospace", "middle");
    else {
        life.text = player.life + 'l';
    }

    if (!lifeO)
        lifeO = text(opponent.life + 'l', -3.9, 10, 20, 20, 30, "#4d4d4d", "Monospace", "middle");
    else {
        lifeO.text = opponent.life + 'l';
    }

    life.update();
    lifeO.update();

    if (!juice)
        juice = text(player.juice + 'j', 74, 66, 20, 20, 30, "#4d4d4d", "Monospace", "end");
    else {
        juice.text = player.juice + 'j';
    }

    if (!juiceO)
        juiceO = text(opponent.juice + 'j', 5.5, 25, 20, 20, 30, "#4d4d4d", "Monospace", "start");
    else {
        juiceO.text = opponent.juice + 'j';
    }

    juice.update();
    juiceO.update();

    if (!passTurn)
        passTurn = button("passTurn", ">>", 89, 35, 7, 8, 130, "#4d4d4d", "Monospace", "#000", "#4d4d4d");

    passTurn.update();
}

export { renderField }