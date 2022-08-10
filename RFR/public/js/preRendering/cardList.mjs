import { renderCard } from "./internalCardRendering.mjs";
import { socket } from "../app.mjs"

function truncateMeasurement(str) {
    if (isNaN(+str)) {
        if (str[str.length - 1] == '%')
            return +str.substring(0, str.length - 1)
        else
            return +str.substring(0, str.length - 2)
    } else
        return str;
}

const div = document.querySelector("div");

function cardList(name, list, x, y, width, playable, reduce) {
    return {
        list: list,
        x: x,
        y: y,
        width: width,
        playable: playable,
        reduce: reduce,
        toRemove: [],
        dragElement: function (elmnt, card) {
            let curr = this;
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
                elmnt.onmousedown = dragMouseDown;

            function dragMouseDown(e) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                curr.preX = truncateMeasurement(elmnt.style.left);
                curr.preY = truncateMeasurement(elmnt.style.top);
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }

            function elementDrag(e) {
                e = e || window.event;
                e.preventDefault();
                // calculate the new cursor position:
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                // set the element's new position:
                elmnt.style.top = 100 * (elmnt.offsetTop - pos2) / div.offsetHeight + "%";
                elmnt.style.left = 100 * (elmnt.offsetLeft - pos1) / div.offsetWidth + "%";
                elmnt.style.zIndex = 1;
            }

            function closeDragElement(e) {
                // stop moving when mouse button is released:
                document.onmouseup = null;
                document.onmousemove = null;
                
                let pre = curr.list.indexOf(card);
                let currentCard = curr.list.splice(curr.list.indexOf(card), 1)[0];
                if (curr.playable(truncateMeasurement(elmnt.style.left), truncateMeasurement(elmnt.style.top), truncateMeasurement(elmnt.style.width), truncateMeasurement(elmnt.style.height))) {
                    
                    socket.emit("playCard", pre);
                
                } else {
                    let max = 0;
                    let dirRight = truncateMeasurement(elmnt.style.left) > curr.preX;
                    for (let i = 0; i < curr.list.length; i++) {
                        if (
                            dirRight && 100 * (e.clientX - div.getBoundingClientRect().left) / div.clientWidth > curr.list[i].x ||
                            !dirRight&& 100 * (e.clientX - div.getBoundingClientRect().left) / div.clientWidth > curr.list[i].x + curr.list[i].width
                            ) {
                            max = i + 1;
                        }
                    }
                    
                    socket.emit("reorderList", name, pre, max);

                    curr.list.splice(max, 0, currentCard);
                }
                // snap back to hand
                curr.update();
            }
        },
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
                this.dragElement(this.toRemove[0], this.list[i]);
                
            }
        }
    }
}

export { cardList }