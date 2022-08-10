import { renderCard } from "./internalCardRendering.mjs";

function cardStack(topCard, size, x, y, maxCardsRepresented, hover) {
    return {
        topCard: topCard,
        toRemove: [],
        size: size,
        x: x,
        y: y,
        maxCardsRepresented: maxCardsRepresented,
        update: function () {
            for (let i = 0; i < this.toRemove.length; i++)
                this.toRemove[i].remove();

            const cardSpacing = 0.5;
            const e = Math.floor(0.3 * (size > maxCardsRepresented ? maxCardsRepresented : size)); // number of cards to display in the deck
            for (let i = 0; i < e; i++) {
                const card = {name: "", visible: false, width: topCard.width, height: topCard.height};
                card.y = this.y + this.topCard.height - cardSpacing * i;
                card.x = this.x;
                this.toRemove.push(renderCard(card));
                this.toRemove[this.toRemove.length - 1].addEventListener("mouseover", () => hover());
            }
            this.topCard.x = this.x;
            this.topCard.y = this.y + this.topCard.height - cardSpacing * e;
            this.toRemove.push(renderCard(this.topCard));
            this.toRemove[this.toRemove.length - 1].addEventListener("mouseover", () => hover());
        }
    }
}

export { cardStack }