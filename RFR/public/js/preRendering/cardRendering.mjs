import { showCard, showCardBack } from "../app.mjs";

function camelCase(name) {
    return name.replace(' ', '_').replace(/[^A-Za-z_]/g, '').toLowerCase();
}

function renderCard(card) {
    return {
        cardElement: null,
        update() {
            this.cardElement.delete();
            if (!card.visible) {
                this.cardElement = showCardBack(card.x, card.y, card.width, card.height, card.owner * 180);
            } else {
                this.cardElement = showCard(camelCase(card.name), card.x, card.y, card.width, card.height, 0);
            }
        }
    }
}

export { renderCard }