//# Not yet properly implemented.

import { showText } from "../app.mjs";

function chooseCard(text, x, y, size, color, font, align) {
    return {
        text: text,
        x: x,
        y: y,
        size: size,
        color: color,
        font: font,
        align: align,
        element: null,
        update: function () {
            if (this.element)
                this.element.remove();
            this.element = showText(this.text, this.x, this.y, this.size, this.color, this.font, this.align);
        }
    }
}

export { text }