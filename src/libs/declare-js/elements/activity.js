import { addAll, gridAlign } from "../util.js";
import { SvgElement } from "./svgElement.js";
import { Label } from "./label.js";

export class Activity extends SvgElement {

    constructor(label, posX, posY) {
        super("g", "activity-group", posX, posY);
        this.width = 100;
        this.height = 60;

        // Create the rect inside the group
        this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.rect.setAttribute('x', 0);
        this.rect.setAttribute('y', 0);
        this.rect.setAttribute('width', this.width);
        this.rect.setAttribute('height', this.height);
        this.rect.setAttribute('rx', 10);
        this.rect.setAttribute('ry', 10);
        this.rect.setAttribute('style', 'fill:white; stroke:gray; stroke-width:1'); // default stroke: gray (is changed as soon as one constraint uses activity)
        this.rect.setAttribute('type', 'activity');
        this.shape.appendChild(this.rect); // Add the rectangle to the group
        this.shape.setAttribute('draggable', 'true');

        this.label = new Label(label, this);
        this.label.changeColor("gray");

        this.existenceConstraints = new Set();
        this.relationConstraints = new Set();

        this.hoverHighlight = false;
        this.selectionHighlight = false;

        this.forceX;
        this.forceY;

        this.enablePhysics = true;
        this.editMode = false;
    }

    addToView(view) {
        super.addToView(view);
        this.label.setPosition();
        this.label.addToView(view);
    }

    getCenterCoord() {
        return {
            x: this.posX + (this.width / 2),
            y: this.posY + (this.height / 2)
        };
    }

    // return all four edges, which is needed for the calculation of the intersection with the relation constraint
    getEdges() {
        const activityCenter = this.getCenterCoord();
        const topLeft = { x: activityCenter.x - this.width / 2, y: activityCenter.y - this.height / 2 };
        const topRight = { x: topLeft.x + this.width, y: topLeft.y };
        const bottomRight = { x: topRight.x, y: topRight.y + this.height };
        const bottomLeft = { x: topLeft.x, y: topLeft.y + this.height };

        // Calculate four edges of the rectangle
        return [
            { startPoint: topLeft, endPoint: topRight }, // Top edge
            { startPoint: topRight, endPoint: bottomRight }, // Right edge
            { startPoint: bottomRight, endPoint: bottomLeft }, // Bottom edge
            { startPoint: bottomLeft, endPoint: topLeft }, // Left edge
        ];
    }

    setPosition(position) {
        super.setPosition(position);
        for (const relationConstraint of this.relationConstraints) {
            relationConstraint.setPosition(relationConstraint.activityA === this, this.getCenterCoord());
        }
        this.positionExistenceConstraints();

    }

    alignToGrid() {       
        this.setPosition({x: gridAlign(this.posX), y: gridAlign(this.posY)})
    }

    physicsUpdate() {
        this.setPosition({ "x": this.posX + (this.forceX / 50), "y": this.posY + (this.forceY / 50) });
    }

    getConnectedActivities() {
        let activities = new Set();
        for (const relationConstraint of this.relationConstraints) {
            activities = addAll(activities, relationConstraint.getActivities());
        }
        activities.delete(this);
        return activities;
    }

    getConstraints() {
        let allConstraints = new Set();
        addAll(this.existenceConstraints, allConstraints);
        addAll(this.relationConstraints, allConstraints);
        return allConstraints;
    }

    positionExistenceConstraints() {
        const gap = 3;
        let totalWidth = 0;
        // turn gray stroke to black if activity is part of any constraint
        if (this.existenceConstraints.size !== 0 || this.relationConstraints.size !== 0) {
            this.rect.style.stroke = "black";
            this.label.changeColor("black");
        }
        this.existenceConstraints.forEach(existenceConstraint => {
            totalWidth += existenceConstraint.width + gap;
        });
        totalWidth -= gap;

        let currentX = this.getCenterCoord().x - totalWidth / 2;
        for (const existenceConstraint of this.existenceConstraints) {
            existenceConstraint.setPosition({
                "x": currentX,
                "y": this.getCenterCoord().y - (this.height / 2) - existenceConstraint.height
            });
            currentX += existenceConstraint.width + gap;
        }
    }

    enableEditMode(editor) {
        this.editMode = true;
        this.label.hide();

        const margin = 10;

        let foreignObj = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
        foreignObj.setAttribute('x', margin / 2);
        foreignObj.setAttribute('y', margin / 2);
        foreignObj.setAttribute('width', this.width - margin);
        foreignObj.setAttribute('height', this.height - margin);

        let inputElem = document.createElement('input');
        inputElem.style.width = '100%';
        inputElem.style.height = '100%';
        inputElem.style.border = '1px solid gray';
        inputElem.style.outline = 'none';
        inputElem.style.textAlign = 'center';
        inputElem.value = this.label.toString();

        foreignObj.appendChild(inputElem);
        this.shape.appendChild(foreignObj);

        inputElem.focus();

        inputElem.addEventListener('blur', () => {
            this.updateLabel(inputElem.value, editor);
            editor.updateActivity(this);
            this.shape.removeChild(foreignObj);
            this.disableEditMode();
        });

        inputElem.addEventListener('keydown', (evt) => {
            if (evt.key === 'Enter') {
                inputElem.blur();
            }
        });
    }

    disableEditMode() {
        this.editMode = false;
        this.label.show();
        this.shape.setAttribute("contenteditable", "false");
    }

    updateLabel(newLabel, editor) {
        this.label.setText(newLabel);

        // Update editor lines
        for (const existenceConstraint of this.existenceConstraints) {
            editor.updateConstraint(existenceConstraint);
        }
        for (const relationConstraint of this.relationConstraints) {
            editor.updateConstraint(relationConstraint);
        }
    }

    // selection
    enableSelection() {
        this.addFrame("#BD86E6");
        this.selectionHighlight = true;
    }

    disableSelection() {
        this.removeFrame();
        this.selectionHighlight = false;
    }

    // highlight (when hovering)
    enableHighlight() {
        this.rect.style.fill = "#d3d3d3";
        this.hoverHighlight = true;
    }

    disableHighlight() {
        this.rect.style.fill = "white";
        this.hoverHighlight = false;
    }

    // warning (red frame)
    enableWarning() {
        this.addFrame("#ffa9a9");
    }

    disableWarning() {
        if (this.selectionHighlight) {
            this.enableSelectionHighlight();
        }
        else {
            this.removeFrame();
        }
    }

    lock() {
        if (this.enablePhysics) {
            this.enablePhysics = false;
            this.addLockSymbol();
        }
    }

    unlock() {
        this.enablePhysics = true;
        if (this.lockIcon) {
            this.lockIcon.remove();
            this.lockIcon = null;
        }
    }

    addLockSymbol() {
        const ns = "http://www.w3.org/2000/svg";
        this.lockIcon = document.createElementNS(ns, "svg");

        this.lockIcon.setAttribute('viewBox', '0 0 94.38 122.88');
        this.lockIcon.setAttribute('width', '15');
        this.lockIcon.setAttribute('height', '20');
        this.lockIcon.setAttribute('x', this.width - 25);
        this.lockIcon.setAttribute('y', this.height - 25);

        const lockG = document.createElementNS(ns, "g");
        const lockPath = document.createElementNS(ns, "path");
        lockPath.setAttribute('d', "M8.723,45.706h2.894v-8.729c0-10.139,3.987-19.368,10.412-26.069C28.479,4.177,37.386,0,47.19,0 c9.805,0,18.711,4.177,25.163,10.907c6.424,6.701,10.411,15.931,10.411,26.069v8.729h2.894c2.401,0,4.583,0.98,6.162,2.56 s2.56,3.761,2.56,6.162v59.73c0,2.401-0.98,4.583-2.56,6.162s-3.761,2.56-6.162,2.56H8.723c-2.402,0-4.583-0.98-6.163-2.56 S0,116.56,0,114.158v-59.73c0-2.401,0.981-4.583,2.56-6.162C4.14,46.687,6.321,45.706,8.723,45.706L8.723,45.706z M44,87.301 L39.81,98.28h14.762l-3.884-11.13c2.465-1.27,4.15-3.84,4.15-6.803c0-4.223-3.425-7.647-7.647-7.647 c-4.223,0-7.648,3.425-7.648,7.647C39.542,83.432,41.369,86.091,44,87.301L44,87.301z M17.753,45.706h58.875v-8.729 c0-8.511-3.326-16.236-8.686-21.826C62.61,9.589,55.265,6.137,47.19,6.137S31.77,9.589,26.438,15.15 c-5.359,5.59-8.686,13.315-8.686,21.826V45.706L17.753,45.706z M85.658,51.843H8.723c-0.708,0-1.353,0.292-1.823,0.762 c-0.47,0.47-0.762,1.116-0.762,1.823v59.73c0,0.707,0.292,1.353,0.762,1.822c0.47,0.471,1.116,0.762,1.823,0.762h76.936 c0.708,0,1.354-0.291,1.823-0.762c0.47-0.47,0.762-1.115,0.762-1.822v-59.73c0-0.707-0.292-1.353-0.762-1.823 C87.011,52.135,86.366,51.843,85.658,51.843L85.658,51.843z");

        lockG.appendChild(lockPath);
        this.lockIcon.appendChild(lockG);

        this.shape.appendChild(this.lockIcon);
    }

    addFrame(color) {
        if (this.shape.contains(this.frame)) {
            this.shape.removeChild(this.frame);
        }
        this.frame = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.frame.setAttribute('x', -5);
        this.frame.setAttribute('y', -5);
        this.frame.setAttribute('width', this.width + 10);
        this.frame.setAttribute('height', this.height + 10);
        this.frame.setAttribute('rx', 15);
        this.frame.setAttribute('ry', 15);
        this.frame.setAttribute('style', 'fill:none; stroke-width:2');
        this.frame.style.stroke = color;
        this.shape.appendChild(this.frame); // Add the frame to the group
    }

    removeFrame() {
        if (this.frame) this.frame.remove();
    }

    exportToJSON() {
        return {
            name: this.toString(),
            posX: this.posX,
            posY: this.posY,
        };
    }

    toString() {
        return this.label.toString();
    }

    // remove the activity visualization
    destroy() {
        super.destroy();
        this.label.destroy();
    }
}

