import { generateId, gridAlign } from "../util.js";

export class SvgElement {

    constructor(element, type, posX, posY) {

        this.id = type + '_' + generateId();

        this.posX = posX;
        this.posY = posY;
        this.shape = document.createElementNS('http://www.w3.org/2000/svg', element);
        this.shape.setAttribute('id', this.id);
        this.shape.setAttribute('transform', 'matrix(1, 0, 0, 1,' + this.posX + ',' + this.posY + ')');
    }

    addToView(view) {
        view.appendChild(this.shape);
    }

    setPosition(position) {
        this.posX = position.x;
        this.posY = position.y;

        this.shape.transform.baseVal.getItem(0).matrix.e = this.posX;
        this.shape.transform.baseVal.getItem(0).matrix.f = this.posY;
    }


    getPosition() {
        return { x: this.posX, y: this.posY }
    }

    destroy() {
        this.shape.remove();
    }
}