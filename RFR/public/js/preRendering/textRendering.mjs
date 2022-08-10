import { showText } from "../app.mjs";

function text(text, x, y, width, height, fontSize, color, font, align) {
    return {
        text: text,
        x: x,
        y: y,
        width: width,
        height: height,
        fontSize: fontSize,
        color: color,
        font: font,
        align: align,
        element: null,
        update: function () {
            if (this.element)
                this.element.remove();
            this.element = showText(this.text, this.x, this.y, this.width, this.height, this.fontSize, this.color, this.font, this.align);
        }
    }
}

export { text }