import { renderCard } from "./internalCardRendering.mjs";

function orderedCardList(list, x, y, width, reduce) {
    return {
        list: list,
        x: x,
        y: y,
        width: width,
        reduce: reduce,
        toRemove: [],
        update: function () {
            for (let i = 0; i < this.toRemove.length; i++)
                this.toRemove[i].remove();
                
            this.toRemove = [];

            if (this.list.length == 0)
                return;

            let cardSpacing = this.width / this.list.length;
            if (this.reduce && cardSpacing > this.list[0].width) {
                cardSpacing = this.list[0].width;
            }
            // reduce : 
            // false: don't reduce, spread list
            // "left": left align
            // "right": right align
            // "center": center align
            for (let i = 0; i < this.list.length; i++) {
                let align = 0;
                switch(this.reduce) {
                    case "right":
                        align = this.width - this.list[0].width * this.list.length;
                    break;
                    case "center":
                        align = (this.width - this.list[0].width * this.list.length) / 2;
                    break;
                }
                this.list[i].x = this.x + i * cardSpacing + align;
                this.list[i].y = this.y;
                this.toRemove.unshift(renderCard(this.list[i]));
                
            }
        }
    }
}

export { orderedCardList }