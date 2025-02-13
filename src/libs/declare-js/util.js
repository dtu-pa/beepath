//Generate partially random string that can be used as identifier
export function generateId() {
    return Date.now().toString(36) + Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36);
}

export function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


//Make a coordinate align along the grid
export function gridAlign(value) {
    return Math.round(value / 20) * 20;
}

//Get the current mouse pointer position
export function getMousePosition(evt, canvas) {

    var CTM = canvas.getScreenCTM();

    if (evt.touches) { evt = evt.touches[0]; }
    return {
        x: evt.clientX - CTM.e / CTM.a,
        y: evt.clientY - CTM.f / CTM.d
    };
}

//Correct the calculated mouse position for zoom level
export function getZoomCorrectedMousePosition(evt, container) {

    var pos = getMousePosition(evt, container.canvas);

    return {
        x: (pos.x * (1 / container.zoomLevel)) - (container.view.posX * (1 / container.zoomLevel)),
        y: (pos.y * (1 / container.zoomLevel)) - (container.view.posY * (1 / container.zoomLevel))
    }
}

export function addAll(sourceSet, targetSet) {
    for (const element of sourceSet) {
        addElementToSet(element, targetSet);
    }
    return targetSet;
}

// add element to set if it doesn't already exist, else return existing element
export function addElementToSet(element, set) {
    for (const setElement of set) {
        if (setElement.toString() === element.toString()) {
            return setElement;
        }
    }
    set.add(element);
    return element;
}

export function calculateIntersection(activity, relationConstraint) {

    const curveSegments = 100;
    for (let edge of activity.getEdges()) {
        let lastPoint = relationConstraint.coordA;

        for (let i = 1; i <= curveSegments; i++) {
            const t = i / curveSegments;

            let B = relationConstraint.calculateBezierPoint(t);

            // Check if the line segment from lastPoint to B intersects the edge
            const intersection = relationConstraint.lineIntersection(lastPoint, B, edge.startPoint, edge.endPoint);
            if (intersection) {
                return intersection;
            }
            lastPoint = B;
        }
    }
}