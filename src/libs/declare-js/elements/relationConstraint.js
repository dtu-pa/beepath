import { generateId, calculateIntersection } from "../util.js";

export class RelationConstraint {

    constructor(activityA, activityB, template) {

        this.id = 'relationConstraint_' + generateId();

        this.activityA = activityA;
        this.activityB = activityB;
        this.template = template;

        this.factors;

        this.pathCount = this.identifyPathCount(template);
        this.directed = this.isDirected(template);
        this.activationA = this.isActivatedByA(template);
        this.activationB = this.isActivatedByB(template);
        this.negation = this.isNegation(template);

        this.pathGroup = document.createElementNS('http://www.w3.org/2000/svg', "g");
        this.pathGroup.setAttribute('id', this.id);
        this.paths = Array.from({ length: this.pathCount }, () => {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute('style', "stroke:black; stroke-width:1; fill:none");

            return path;
        });

        this.coordA = { "x": 0, "y": 0 };
        this.coordB = { "x": 0, "y": 0 };

        this.intersectionA = { "x": 0, "y": 0 };
        this.intersectionB = { "x": 0, "y": 0 };

        this.curveMagnitude = this.calculateCurvatureMagnitude();

        this.coloredPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.coloredPath.setAttribute('style', "stroke:transparent; stroke-width:18; fill:none");  // Hidden by default

        this.selectionHighlight = false;

        this.createArrowsAndCircles();
        this.setPosition();

    }

    addPathToView(view) {
        view.appendChild(this.pathGroup);
        this.pathGroup.appendChild(this.coloredPath);
        for (const path of this.paths) {
            this.pathGroup.appendChild(path);
        }
        if (this.directed && this.pathCount > 1) {
            this.pathGroup.appendChild(this.whiteCover1);
            this.pathGroup.appendChild(this.whiteCover2);
        }
        if (this.negation) {
            this.pathGroup.appendChild(this.negationLine1);
            this.pathGroup.appendChild(this.negationLine2);
        }
    }

    addArrowsAndCirclesToView(view) {
        if (this.activationA) {
            view.appendChild(this.circleA);
        }
        if (this.activationB) {
            view.appendChild(this.circleB);
        }
        if (this.directed) {
            view.appendChild(this.arrow);
        }
    }

    createArrowsAndCircles() {
        if (this.activationA) {
            this.circleA = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            this.circleA.setAttribute('r', '7');
            this.circleA.style.fill = '#000000';
            this.circleA.style.pointerEvents = 'none';
        }
        if (this.activationB) {
            this.circleB = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            this.circleB.setAttribute('r', '7');
            this.circleB.style.fill = '#000000';
            this.circleB.style.pointerEvents = 'none';
        }
        if (this.directed) {
            this.arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            this.arrow.setAttribute('points', '-8,-8 10,0 -8,8');
            this.arrow.style.fill = '#000000';
            this.arrow.style.pointerEvents = 'none';
        }
        if (this.directed && this.pathCount > 1) {
            this.whiteCover1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            this.whiteCover1.setAttribute('r', '8');
            this.whiteCover1.style.fill = '#FFFFFF';
            this.whiteCover1.style.pointerEvents = 'none';
            this.whiteCover2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            this.whiteCover2.setAttribute('r', '10');
            this.whiteCover2.style.fill = '#FFFFFF';
            this.whiteCover2.style.pointerEvents = 'none';
        }
        if (this.negation) {
            this.negationLine1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            this.negationLine1.setAttribute('style', "stroke:black; stroke-width:1");

            this.negationLine2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
            this.negationLine2.setAttribute('style', "stroke:black; stroke-width:1");
        }
        this.setPosition();
    }

    setPosition() {
        if (this.activityA) this.coordA = this.activityA.getCenterCoord();
        if (this.activityB) this.coordB = this.activityB.getCenterCoord();

        // Calculate intersection for activityA and activityB
        if (this.activityA) this.intersectionA = calculateIntersection(this.activityA, this);
        if (this.activityB) this.intersectionB = calculateIntersection(this.activityB, this);

        this.updatePaths();
        this.updateArrows();
        this.updateNegations();
    }

    updatePaths() {

        const angle = Math.atan2(this.coordB.y - this.coordA.y, this.coordB.x - this.coordA.x);
        const pathOffset = 3;

        // Update position for all paths
        this.paths = this.paths.map((path, index) => {
            // Calculate the direction vector from coordA to coordB
            let dirX = this.coordB.x - this.coordA.x;
            let dirY = this.coordB.y - this.coordA.y;

            // Normalize the direction vector
            let length = Math.sqrt(dirX * dirX + dirY * dirY);
            dirX /= length;
            dirY /= length;

            // Calculate control point position
            this.cpX = (this.coordA.x + this.coordB.x) / 2 - dirY * this.curveMagnitude * length;
            this.cpY = (this.coordA.y + this.coordB.y) / 2 + dirX * this.curveMagnitude * length;

            path.setAttribute('d', `M ${this.coordA.x} ${this.coordA.y} Q ${this.cpX} ${this.cpY}, ${this.coordB.x} ${this.coordB.y}`);
            this.coloredPath.setAttribute('d', `M ${this.coordA.x} ${this.coordA.y} Q ${this.cpX} ${this.cpY}, ${this.coordB.x} ${this.coordB.y}`);

            // Compute offset for paths in the perpendicular direction to the angle for multiple paths (Alternate & Chain)
            if (this.pathCount > 1) {
                const scaledPathOffset = pathOffset * (1 + this.curveMagnitude);
                const perpOffset = scaledPathOffset * (index - (this.paths.length - 1) / 2);
                const dx = perpOffset * Math.sin(-angle);  // perpendicular x offset
                const dy = perpOffset * Math.cos(-angle);  // perpendicular y offset
                path.setAttribute('transform', `translate(${dx},${dy})`);
            }

            return path;
        });
    }

    updateArrows() {
        // calculate length of Relation Constraint
        this.length = this.calculateCurveLength();


        // Update the positions of the circles
        if (this.intersectionA === undefined && this.circleA) {
            this.circleA.style.visibility = "hidden";
        }
        else if (this.activationA && this.circleA) {
            this.circleA.style.visibility = "unset";
            this.circleA.setAttribute('cx', this.intersectionA.x);
            this.circleA.setAttribute('cy', this.intersectionA.y);
        }

        if (this.intersectionB === undefined && this.circleB) {
            this.circleB.style.visibility = "hidden";
        }
        else if (this.activationB && this.circleB) {
            this.circleB.style.visibility = "unset";
            this.circleB.setAttribute('cx', this.intersectionB.x);
            this.circleB.setAttribute('cy', this.intersectionB.y);
        }

        if (this.intersectionB === undefined && this.arrow) {
            this.arrow.style.visibility = "hidden";
        }
        else if (this.directed && this.arrow) {



            this.arrow.style.visibility = "unset";

            const tangent = this.calculateBezierTangent(0.9);
            const tangentAngle = Math.atan2(tangent.y, tangent.x);

            const arrowOffset = this.activationB ? 16 : 9; // Adjust the offset based on existence ofactivationB

            const arrowX = this.intersectionB.x - arrowOffset * Math.cos(tangentAngle);  // Adjust these constants if needed
            const arrowY = this.intersectionB.y - arrowOffset * Math.sin(tangentAngle);

            if (this.whiteCover1 && this.whiteCover2) {
                this.whiteCover1.setAttribute('cx', arrowX);
                this.whiteCover1.setAttribute('cy', arrowY);
                this.whiteCover2.setAttribute('cx', this.intersectionB.x);
                this.whiteCover2.setAttribute('cy', this.intersectionB.y);
            }

            this.arrow.setAttribute(
                'transform',
                `translate(${arrowX},${arrowY}) rotate(${(tangentAngle * 180) / Math.PI})`
            );
        }
    }

    updateNegations() {
        if (this.negation && this.negationLine1 && this.negationLine2) {
            const tangent = this.calculateBezierTangent(0.5); // tangent at midpoint
            const tangentAngle = Math.atan2(tangent.y, tangent.x);

            const lineLength = 15;
            const lineSpacing = 3;

            const midPoint = this.calculateBezierPoint(0.5);

            // Compute the midpoints of each negation line
            const midLine1 = {
                x: midPoint.x - (lineSpacing / 2) * Math.cos(tangentAngle),
                y: midPoint.y - (lineSpacing / 2) * Math.sin(tangentAngle)
            };
            const midLine2 = {
                x: midPoint.x + (lineSpacing / 2) * Math.cos(tangentAngle),
                y: midPoint.y + (lineSpacing / 2) * Math.sin(tangentAngle)
            };

            // Set the coordinates for the negation lines
            this.negationLine1.setAttribute('x1', midLine1.x - (lineLength / 2) * Math.sin(tangentAngle));
            this.negationLine1.setAttribute('y1', midLine1.y + (lineLength / 2) * Math.cos(tangentAngle));
            this.negationLine1.setAttribute('x2', midLine1.x + (lineLength / 2) * Math.sin(tangentAngle));
            this.negationLine1.setAttribute('y2', midLine1.y - (lineLength / 2) * Math.cos(tangentAngle));

            this.negationLine2.setAttribute('x1', midLine2.x - (lineLength / 2) * Math.sin(tangentAngle));
            this.negationLine2.setAttribute('y1', midLine2.y + (lineLength / 2) * Math.cos(tangentAngle));
            this.negationLine2.setAttribute('x2', midLine2.x + (lineLength / 2) * Math.sin(tangentAngle));
            this.negationLine2.setAttribute('y2', midLine2.y - (lineLength / 2) * Math.cos(tangentAngle));

        }
    }

    setPositionManually(pos) {

        if (this.activityA) this.intersectionA = calculateIntersection(this.activityA, this);
        this.coordB = pos;
        this.intersectionB = pos;

        this.updatePaths();
        this.updateArrows();
        this.updateNegations();
    }

    updateTemplate(template, view) {
        this.removeDecorations();
        this.template = template;
        this.pathCount = this.identifyPathCount(template);
        this.paths = Array.from({ length: this.pathCount }, () => {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute('style', "stroke:black; stroke-width:1; fill:none");

            return path;
        });
        this.directed = this.isDirected(template);
        this.activationA = this.isActivatedByA(template);
        this.activationB = this.isActivatedByB(template);
        this.negation = this.isNegation(template);
        this.createArrowsAndCircles();
        this.addPathToView(view);
        if (this.activityA) {
            this.activityA.addToView(view);
            for (const constraint of this.activityA.relationConstraints) {
                constraint.addArrowsAndCirclesToView(view);
            }
        }
        if (this.activityB) {
            this.activityB.addToView(view);
            for (const constraint of this.activityB.relationConstraints) {
                constraint.addArrowsAndCirclesToView(view);
            }
        }
    }

    getActivities() {
        return new Set([this.activityA, this.activityB]);
    }

    toString() {
        return `${this.template}('${this.activityA.label.toString()}','${this.activityB.label.toString()}')`;
    }

    addFactors(factors) {
        this.factors = factors;
    }

    calculateBezierPoint(t) {
        const x = (1 - t) * (1 - t) * this.coordA.x + 2 * (1 - t) * t * this.cpX + t * t * this.coordB.x;
        const y = (1 - t) * (1 - t) * this.coordA.y + 2 * (1 - t) * t * this.cpY + t * t * this.coordB.y;

        return { x, y };
    }

    lineIntersection(pointA1, pointA2, pointB1, pointB2) {
        const lineCrossProduct = ((pointB2.y - pointB1.y) * (pointA2.x - pointA1.x) - (pointB2.x - pointB1.x) * (pointA2.y - pointA1.y));

        const uA = ((pointB2.x - pointB1.x) * (pointA1.y - pointB1.y) - (pointB2.y - pointB1.y) * (pointA1.x - pointB1.x)) / lineCrossProduct;
        const uB = ((pointA2.x - pointA1.x) * (pointA1.y - pointB1.y) - (pointA2.y - pointA1.y) * (pointA1.x - pointB1.x)) / lineCrossProduct;

        if (0 <= uA && uA <= 1 && 0 <= uB && uB <= 1) {
            return {
                x: pointA1.x + uA * (pointA2.x - pointA1.x),
                y: pointA1.y + uA * (pointA2.y - pointA1.y),
            };
        }
    }

    calculateBezierTangent(t) {
        // Define the control points
        const P0 = this.coordA;
        const P1 = { x: this.cpX, y: this.cpY };
        const P2 = this.coordB;

        // Calculate the tangent
        const tangentX = 2 * (1 - t) * (P1.x - P0.x) + 2 * t * (P2.x - P1.x);
        const tangentY = 2 * (1 - t) * (P1.y - P0.y) + 2 * t * (P2.y - P1.y);

        return { x: tangentX, y: tangentY };
    }

    calculateCurveLength() {
        const curveSegments = 100;
        let length = 0;
        const dt = 1 / curveSegments;

        for (let i = 0; i < curveSegments; i++) {
            const t = i / curveSegments;
            const tangent = this.calculateBezierTangent(t);
            const segmentLength = Math.sqrt(tangent.x * tangent.x + tangent.y * tangent.y);
            length += segmentLength * dt;
        }

        return length;
    }

    calculateCurvatureMagnitude() {
        var parallelEdges = 0;
        for (const relationConstraint of this.activityA.relationConstraints) {
            if (relationConstraint.getActivities().has(this.activityB)) parallelEdges++;
        }
        return 0.27 * parallelEdges;
    }


    // selection
    enableSelection() {
        this.coloredPath.setAttribute('style', "stroke:#BD86E6; stroke-width:15; fill:none");
        if (this.whiteCover1) this.whiteCover1.style.fill = "#BD86E6";
        if (this.whiteCover1) this.whiteCover2.style.fill = "#BD86E6";
        this.selectionHighlight = true;
    }

    disableSelection() {
        this.coloredPath.setAttribute('style', "stroke:transparent; stroke-width:15; fill:none");
        if (this.whiteCover1) this.whiteCover1.style.fill = "#FFFFFF";
        if (this.whiteCover2) this.whiteCover2.style.fill = "#FFFFFF";

        this.selectionHighlight = false;
    }

    enableHighlight() {
        if (!this.selectionHighlight) {
            this.coloredPath.setAttribute('style', "stroke:#d3d3d3; stroke-width:15; fill:none");
            if (this.whiteCover1) this.whiteCover1.style.fill = "#d3d3d3";
            if (this.whiteCover2) this.whiteCover2.style.fill = "#d3d3d3";

        }
    }

    disableHighlight() {
        if (!this.selectionHighlight) {
            this.coloredPath.setAttribute('style', "stroke:transparent; stroke-width:15; fill:none");
            if (this.whiteCover1) this.whiteCover1.style.fill = "#FFFFFF";
            if (this.whiteCover2) this.whiteCover2.style.fill = "#FFFFFF";

        }
    }

    // warning (red frame)
    enableWarning() {
        this.coloredPath.setAttribute('style', "stroke:#ffa9a9; stroke-width:15; fill:none");
    }

    disableWarning() {
        if (this.selectionHighlight) {
            this.enableSelectionHighlight();
        }
        else {
            this.removeFrame();
        }
    }

    // remove the constraint visualization
    destroy() {
        this.pathGroup.remove();
        this.removeDecorations();
        if (this.activityA) this.activityA.relationConstraints.delete(this);
        if (this.activityB) this.activityB.relationConstraints.delete(this);
    }

    removeDecorations() {
        for (const path of this.paths) {
            path.remove();
        }
        if (this.activationA) this.circleA.remove();
        if (this.activationB) this.circleB.remove();
        if (this.directed) this.arrow.remove();
        if (this.directed && this.pathCount > 1) {
            this.whiteCover1.remove();
            this.whiteCover2.remove();
        }
        if (this.negation) {
            this.negationLine1.remove();
            this.negationLine2.remove();
        }
    }

    exportToJSON() {
        return {
            template: this.template,
            parameters: [[this.activityA.label.toString()], [this.activityB.label.toString()]],
            ...this.factors,
        };
    }


    //--------------------
    // determine edge properties
    //--------------------

    // dermine number of paths based on template prefix
    identifyPathCount(template) {
        if (template.includes("Chain")) {
            return 3;
        } else if (template.includes("Alternate")) {
            return 2;
        } else {
            return 1;
        }
    }

    // determine if edge is directed or not (i.e., requires an arrowhead)
    isDirected(template) {
        return template.includes("Response") ||
            template.includes("Succession") ||
            template.includes("Precedence")
    }

    // determine if template is activated by activityA
    isActivatedByA(template) {
        return template.includes("Response") ||
            template.includes("Succession") ||
            template.includes("RespondedExistence") ||
            template.includes("CoExistence");
    }

    // determine if template is activated by activityB
    isActivatedByB(template) {
        return template.includes("Precedence") ||
            template.includes("Succession") ||
            template.includes("CoExistence");
    }

    // determine if template is negated
    isNegation(template) {
        return template.includes("Not");
    }
}