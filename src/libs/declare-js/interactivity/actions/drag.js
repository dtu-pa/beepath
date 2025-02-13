import { getMousePosition } from "../../util.js";
import { getZoomCorrectedMousePosition } from "../../util.js";

//Executed at the beginning of the dragging event
export function start(evt, container) {

    var elem = evt.target.closest('[draggable=true]'),
        shapeId,
        isView,
        selectedObject,
        offset;

    if (elem) shapeId = elem.getAttribute('id');
    //Check if clicked object is view object
    if (container.view.id === shapeId || elem === null) {
        isView = true;
        selectedObject = container.view;
        offset = getMousePosition(evt, container.canvas);
        container.mode = "DRAG";
    } else {
        container.declareModel.autoLayout = false
        //Try to find the clicked object is an activity
        isView = false;
        offset = getZoomCorrectedMousePosition(evt, container);
        selectedObject = container.declareModel.getActivityById(shapeId);

        if (!evt.shiftKey && container.selectedActivities.size === 1) {
            for (const activity of container.selectedActivities) {
                activity.disableSelection();
                var lineElem = Array.from(container.editor.activities).find((line) => line.getAttribute('elem_id') === activity.id);
                container.editor.removeLineSelection(lineElem);
            }
            container.selectedActivities.clear();
        }
        container.mode = "DRAG";
    }

    return { "isView": isView, "offset": offset, "selectedActivity": selectedObject }
}

//Executed during dragging
export function drag(evt, container, objectInfo) {

    if (objectInfo) {
        evt.preventDefault();
        var coord = objectInfo.isView ? getMousePosition(evt, container.canvas) : getZoomCorrectedMousePosition(evt, container);

        if (objectInfo.isView) {
            container.view.setPosition({ x: container.view.posX - (objectInfo.offset.x - coord.x), y: container.view.posY - (objectInfo.offset.y - coord.y) });
        } else {
            if (!container.selectedActivities.has(objectInfo.selectedActivity)) objectInfo.selectedActivity.setPosition({ x: objectInfo.selectedActivity.posX - (objectInfo.offset.x - coord.x), y: objectInfo.selectedActivity.posY - (objectInfo.offset.y - coord.y) });
            for (const activity of container.selectedActivities) {
                activity.setPosition({ x: activity.posX - (objectInfo.offset.x - coord.x), y: activity.posY - (objectInfo.offset.y - coord.y) });
            }
        }
        objectInfo.offset = coord;
    }
}

export function end(evt, container, objectInfo) {
    if (objectInfo) {
        if (!objectInfo.isView) {
            if (!container.selectedActivities.has(objectInfo.selectedActivity)) objectInfo.selectedActivity.alignToGrid();
            for (const activity of container.selectedActivities) {
                activity.alignToGrid();
            }
        }
    }
    container.mode = "MOVE";
}
