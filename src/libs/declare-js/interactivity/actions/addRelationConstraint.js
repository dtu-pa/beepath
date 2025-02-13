import { getZoomCorrectedMousePosition } from "../../util.js";
import { RelationConstraint } from "../../elements/relationConstraint.js";

// Begin the relation constraint placement by selecting the first activity
export function start(evt, container) {

    container.declareModel.autoLayout = false

    // Get start activity
    var elem = evt.target.closest('[draggable=true]');
    if (elem) {
        var activityId = elem.getAttribute('id');
        if (activityId.startsWith("activity-group")) {
            var activity = container.declareModel.getActivityById(activityId);
            var template = container.relationConstraintSubmenu.getTemplate();
            var relationConstraint = new RelationConstraint(activity, null, template);
            container.mouseAttachment = relationConstraint;

            relationConstraint.addPathToView(container.view.shape);
            activity.addToView(container.view.shape);
            for (const constraint of activity.relationConstraints) {
                constraint.addArrowsAndCirclesToView(container.view.shape);
            }
            relationConstraint.addArrowsAndCirclesToView(container.view.shape);
            relationConstraint.setPositionManually(getZoomCorrectedMousePosition(evt, container));

            container.mode = "SELECT_RELATION_CONSTRAINT_END";
        }
    }
}

export function move(evt, container) {
    var pos = getZoomCorrectedMousePosition(evt, container);
    var relConst = container.mouseAttachment;
    pos.x > relConst.activityA.posX ? pos.x -= 8 : pos.x += 8;
    pos.y > relConst.activityA.posy ? pos.y += 8 : pos.y -= 8;
    relConst.setPositionManually(pos);

    container.declareModel.removeHighlights();
    // Check if cursor is above eligible end activity
    var elem = evt.target.closest('[draggable=true]');
    if (elem) {
        var activityId = elem.getAttribute('id');
        if (activityId.startsWith("activity-group") && activityId !== relConst.activityA.id) {
            var activity = container.declareModel.getActivityById(activityId);
            if (activity) {
                if (!container.declareModel.getRelationConstraint(relConst.template + "('" + relConst.activityA.toString() + "','" + activity.toString() + "')")) {
                    activity.enableHighlight();
                }
            }
        }
    }
}

// Place the relation constraint after clicking on another activity
export function end(evt, container) {
    
    container.declareModel.removeHighlights();
    var elem = evt.target.closest('[draggable=true]');
    if (elem) {
        var activityId = elem.getAttribute('id');
        if (activityId.startsWith("activity-group") && activityId !== container.mouseAttachment.activityA.id) {
            container.mouseAttachment.activityB = container.declareModel.getActivityById(activityId);
            var constraintStr = container.mouseAttachment.toString();
            container.mouseAttachment.destroy();
            container.mouseAttachment = null;
            container.declareModel.addConstraint(constraintStr);

            container.relationConstraintSubmenu.close();
            container.mode = "MOVE";
            container.editMenu.setActive("MOVE");
        } else {
            abort(evt, container);
        }
    }
}

export function abort(evt, container) {

    container.mouseAttachment.destroy();
    container.mouseAttachment = null;
    container.relationConstraintSubmenu.close();
    container.mode = "MOVE";
    container.editMenu.setActive("MOVE");
}