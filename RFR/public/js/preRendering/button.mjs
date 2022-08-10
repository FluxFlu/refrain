import { showButton, showText, socket } from "../app.mjs";


function button(name, text, x, y, width, height, textSize, textColor, textFont, backgroundColor, borderColor) {
    return {
        name: name,
        text: text,
        x: x,
        y: y,
        width: width,
        height: height,
        textColor: textColor,
        textFont: textFont,
        textSize: textSize,
        backgroundColor: backgroundColor,
        borderColor: borderColor,

        buttonElement: null,
        textElement: null,
        update: function () {
            if (this.buttonElement) {
                this.buttonElement.remove();
                this.textElement?.remove();
            }
            this.buttonElement = showButton(this.x, this.y, this.width, this.height, backgroundColor, borderColor);
            this.textElement = showText(this.text, this.x, this.y, this.width, this.height, this.textSize, this.textColor, this.textFont, "middle");

            this.buttonElement.addEventListener("click", () => socket.emit("pressButton", this.name));
        }
    }
}

export { button }