import { Label } from "./label.js";
import { SvgElement } from "./svgElement.js";

export class ExistenceConstraint extends SvgElement {

    constructor(activityA, template) {
        super("g", "existenceConstraintGroup", 0, 0); // Create an SVG group

        this.activityA = activityA;
        this.template = template;
        this.factors;

        this.label = new Label(this.determineLabel(), this);

        this.width = 20;
        this.height = 15;

        this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");  // Create the rectangle element
        this.rect.setAttribute('x', 0);
        this.rect.setAttribute('y', 0);
        this.rect.setAttribute('width', this.width);
        this.rect.setAttribute('height', this.height);
        this.rect.setAttribute('style', 'fill:white; stroke:black; stroke-width:1');
        this.rect.setAttribute('type', 'existenceConstraint');

        this.shape.appendChild(this.rect);  // Append rectangle to the group

        //this.enableSelection();
    }

    addToView(view) {
        super.addToView(view);
        this.label.setPosition();
        this.label.addToView();
    }

    getActivities() {
        return new Set([this.activityA]);
    }

    updateTemplate(template) {
        this.template = template;
        this.label.shape.textContent = this.determineLabel();
    }

    getCenterCoord() {
        return {
            x: this.posX + (this.width / 4),
            y: this.posY + (this.height / 2)
        };
    }

    toString() {
        return this.template + "('" + this.activityA.label.toString() + "')";
    }

    addFactors(factors) {
        this.factors = factors;
    }

    // selection
    enableSelection() {
        this.addFrame("#BD86E6");
    }

    disableSelection() {
        this.removeFrame();
    }

    // highlight (when hovering)
    enableHighlight() {
        this.rect.style.fill = "#d3d3d3";
    }

    disableHighlight() {
        this.rect.style.fill = "white";
    }

    addFrame(color) {
        if (this.frame) {
            this.frame.remove();  // Remove the old frame if it exists
        }
        this.frame = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.frame.setAttribute('x', -2.5);
        this.frame.setAttribute('y', -2.5);
        this.frame.setAttribute('width', this.width + 5);
        this.frame.setAttribute('height', this.height + 5);
        this.frame.setAttribute('rx', 5);
        this.frame.setAttribute('ry', 5);
        this.frame.setAttribute('style', 'fill:transparent; stroke-width:2');
        this.frame.style.stroke = color;
        this.shape.appendChild(this.frame);  // Add the frame to the group after the rectangle
    }

    removeFrame() {
        if (this.frame) this.frame.remove();
    }

    // remove the constraint visualization
    destroy() {
        super.destroy();
        this.label.destroy();
        if (this.activityA) {
            this.activityA.existenceConstraints.delete(this);
        }
    }

    exportToJSON() {
        return {
            template: this.template,
            parameters: [this.activityA.label.toString()],
            ...this.factors,
        };
    }

    determineLabel() {
        switch (this.template) {
            case 'Init':
                return 'Init';
            case 'End':
                return 'End';
            case 'AtLeastOne':
                return '1..*'
            case 'AtLeastTwo':
                return '2..*';
            case 'AtLeastThree':
                return '3..*';
            case 'ExactlyOne':
                return '1'
            case 'ExactlyTwo':
                return '2';
            case 'ExactlyThree':
                return '3';
            case 'AtMostOne':
                return '0..1'
            case 'AtMostTwo':
                return '0..2';
            case 'AtMostThree':
                return '0..3';
            case 'Absence':
                return '0'
        }
    }
}
