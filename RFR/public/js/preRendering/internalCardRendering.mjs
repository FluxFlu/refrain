import { showCard, showCardBack } from "../app.mjs";

function camelCase(name) {
    return name.replace(' ', '_').replace(/[^A-Za-z_]/g, '').toLowerCase();
}

function renderCard(card) {
    if (!card.visible) {
        return showCardBack(card.x, card.y, card.width, card.height, card.owner * 180);
    } else {
        return showCard(camelCase(card.name), card.x, card.y, card.width, card.height, 0);
    }
}

export { renderCard }