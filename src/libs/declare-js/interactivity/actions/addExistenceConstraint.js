import { getZoomCorrectedMousePosition } from "../../util.js";

// Move the constraint before placing it
export function move(evt, container) {

    container.declareModel.autoLayout = false

    var pos = getZoomCorrectedMousePosition(evt, container);
    var shadow = container.mouseAttachment;
    pos.x -= shadow.width / 2;
    pos.y -= (shadow.height / 2) + 13;
    container.mouseAttachment.setPosition(pos);
}

// Place a new constraint on the canvas
export function place(evt, container) {

    var activityId = evt.target.closest('[draggable=true]').getAttribute('id');
    if (activityId) {
        var activity = container.declareModel.getActivityById(activityId);
        var constraint = container.mouseAttachment;
        constraint.activityA = activity;
        
        container.declareModel.addConstraint(constraint.toString());

        container.mouseAttachment = null;
        constraint.destroy();
        container.existenceConstraintSubmenu.close();
        container.mode = "MOVE";
        container.editMenu.setActive("MOVE");
    }
}

// Abort the constraint placement
export function abort(evt, container) {

    container.mouseAttachment.destroy();
    container.mouseAttachment = null;
    container.existenceConstraintSubmenu.close();

    container.mode = "MOVE";
    container.editMenu.setActive("MOVE");
}