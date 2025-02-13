import { SvgElement } from "./svgElement.js";
import { ExistenceConstraint } from "./existenceConstraint.js";
import { Activity } from "./activity.js";

export class Label extends SvgElement {

    constructor(text, parent) {
        super("text", "label", 0, 0);
        this.parent = parent;
        this.text = text;

        this.shape.setAttribute('x', 0);
        this.shape.setAttribute('y', 0);
        this.shape.setAttribute('dominant-baseline', 'middle');
        this.shape.setAttribute('text-anchor', 'middle');
        this.shape.classList.add('label');
        this.shape.textContent = "";
        this.shape.style.fontFamily = "Arial, sans-serif";
        this.shape.style.fill = "black";
        this.shape.style.userSelect = "none";

        if (parent instanceof ExistenceConstraint) {
            this.shape.style.fontSize = '10px';
        } else {
            this.shape.style.fontSize = '14px';
        }

        this.changeFontSize(this.adjustFontSize());
        if (text) this.setText(text);
    }

    addToView() {
        this.parent.shape.appendChild(this.shape);
    }

    setPosition() {
        this.shape.transform.baseVal.getItem(0).matrix.e = this.parent.width / 2;
        this.shape.transform.baseVal.getItem(0).matrix.f = this.parent.height / 2;
    }

    toString() {
        if (this.text) return this.text;
        return "";
    }

    setText(text) {
        while (this.shape.firstChild) {
            this.shape.removeChild(this.shape.firstChild);
        }

        this.text = text;

        let canvas = document.createElement("canvas");
        let context = canvas.getContext("2d");
        context.font = this.shape.style.fontSize + " Arial, sans-serif";

        let maxWidth = 50;
        let lines = wrapText(context, text, maxWidth);

        const lineHeight = 1.2;
        const totalTextHeight = lines.length * lineHeight;

        // Calculate vertical shift to ensure text block remains centered
        const verticalShift = -(totalTextHeight / 2) + (lineHeight / 2);

        lines.forEach((line, index) => {
            let tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
            tspan.textContent = line;

            tspan.setAttribute('x', 0);
            tspan.setAttribute('dy', `${index === 0 ? verticalShift : lineHeight}em`);
            this.shape.appendChild(tspan);
        });

        this.changeFontSize(this.adjustFontSize(lines));
    }

    adjustFontSize(lines = [this.text]) {
        if (this.parent instanceof Activity) {
            let length = lines.join(" ").length;
            if (lines.length === 1) {
                if (length <= 10) {
                    return '14px';
                } else if (length > 10 && length <= 12) {
                    return '12px';
                } else if (length > 12 && length <= 15) {
                    return '10px';
                } else {
                    return '9px';
                }
            } else { // Multiple lines
                return '12px';
            }
        }
    }

    changeColor(color) {
        this.shape.style.fill = color;
    }

    changeFontSize(size) {
        this.shape.style.fontSize = size;
    }


    hide() {
        this.shape.setAttribute('visibility', 'hidden');
    }

    show() {
        this.shape.setAttribute('visibility', 'visible');
    }


}

// Utility Method: Wrap text
function wrapText(context, text, maxWidth) {
    let words = text.split(' ');
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        let word = words[i];
        let width = context.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}