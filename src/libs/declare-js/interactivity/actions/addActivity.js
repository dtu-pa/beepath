import { getZoomCorrectedMousePosition } from "../../util.js";
import { determineForces } from "../../graphLayout.js";

// Move the activity before placing it
export function move(evt, container) {

    var pos = getZoomCorrectedMousePosition(evt, container);
    var shadow = container.mouseAttachment;
    pos.x -= shadow.width/2;
    pos.y -= shadow.height/2;
    container.mouseAttachment.setPosition(pos);
}

// Place a new activity on the canvas
export function place(evt, container) {

    var activity = container.mouseAttachment;
    container.mouseAttachment = null;
    activity.destroy();

    activity = container.declareModel.createActivity();
    activity.setPosition(getZoomCorrectedMousePosition(evt, container));
    activity.alignToGrid();
    activity.enableEditMode(container.editor);

    container.mode = "MOVE";
    container.editMenu.setActive("MOVE");
}

// Abort the activity placement
export function abort(evt, container) {

    container.mouseAttachment.destroy();
    container.mouseAttachment = null;

    container.mode = "MOVE";
    container.editMenu.setActive("MOVE");
}