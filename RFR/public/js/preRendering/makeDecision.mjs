//# Not yet properly implemented.

function makeDecision(text, options, textColor, textSize, textFont, buttonColor, buttonFont, buttonBackground, buttonTextSize, buttonWidth, buttonHeight) {
    return {
        text: text,
        options: options,
        textColor: textColor,
        textSize: textSize,
        textFont: textFont,
        buttonColor: buttonColor,
        buttonFont: buttonFont,
        buttonBackground: buttonBackground,
        buttonTextSize: buttonTextSize,
        buttonWidth: buttonWidth,
        buttonHeight: buttonHeight,
        toRemove: [],
        update: function () {
            for (let i = 0; i < this.toRemove.length; i++)
                this.toRemove[i].remove();
            this.toRemove = [];

            this.toRemove.push(showText(this.text, this.x, this.y, this.size, this.color, this.font, this.align));
            for (let i of this.options) {
                this.toRemove.push(i);
                
            }
        }
    }
}

export { makeDecision }