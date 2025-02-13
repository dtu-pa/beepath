import { Activity } from "../elements/activity.js";
import { ExistenceConstraint } from "../elements/existenceConstraint.js";
import { determineForces } from "../graphLayout.js";

export function MOVE(container) {

    container.mode = "MOVE";
    container.editMenu.setActive("MOVE");

    container.existenceConstraintSubmenu.close();
    container.relationConstraintSubmenu.close();
}

export function ACTIVITY_PLACEMENT(container) {


    container.mode = "ACTIVITY_PLACEMENT";

    container.editMenu.setActive("ACTIVITY_PLACEMENT");

    var shadow = new Activity("", 0, 0);
    shadow.addToView(container.view.shape);
    shadow.shape.setAttribute("opacity", 0.33);
    container.mouseAttachment = shadow;

    container.existenceConstraintSubmenu.close();
    container.relationConstraintSubmenu.close();

}

export function EXISTENCE_CONSTRAINT_PLACEMENT(container) {

    if (container.mode !== "EXISTENCE_CONSTRAINT_PLACEMENT") {
        container.mode = "EXISTENCE_CONSTRAINT_PLACEMENT";
        container.editMenu.setActive("EXISTENCE_CONSTRAINT_PLACEMENT");

        var shadow = new ExistenceConstraint(null, container.existenceConstraintSubmenu.getTemplate());
        shadow.addToView(container.view.shape);
        shadow.shape.setAttribute("opacity", 0.33);
        shadow.label.shape.setAttribute("opacity", 0.33);
        container.mouseAttachment = shadow;

        container.existenceConstraintSubmenu.heading.innerHTML = "Add Existence Constraint";
        container.existenceConstraintSubmenu.open();
        container.relationConstraintSubmenu.close();
    } else {
        MOVE(container);
    }
}

export function RELATION_CONSTRAINT_PLACEMENT(container) {

    if (container.mode !== "SELECT_RELATION_CONSTRAINT_START") {
        container.mode = "SELECT_RELATION_CONSTRAINT_START";
        container.editMenu.setActive("RELATION_CONSTRAINT_PLACEMENT");

        container.existenceConstraintSubmenu.close();
        container.relationConstraintSubmenu.heading.innerHTML = "Add Relation Constraint";
        container.relationConstraintSubmenu.open();
    } else {
        MOVE(container);
    }
}

export function DELETE(container) {
    for (const existenceConstraint of container.selectedExistenceConstraints) {
        container.declareModel.deleteExistenceConstraint(existenceConstraint.id, true);
    }
    for (const relationConstraint of container.selectedRelationConstraints) {
        container.declareModel.deleteRelationConstraint(relationConstraint.id, true);
    }
    for (const activity of container.selectedActivities) {
        container.declareModel.deleteActivity(activity.id);
    }
    container.existenceConstraintSubmenu.close();
    container.relationConstraintSubmenu.close();
}

export function AUTO_LAYOUT(container) {
    container.declareModel.autoLayout = true;
    determineForces(container.declareModel);
    // Disable auto layout after 10 seconds
    setTimeout(() => { 
        container.declareModel.autoLayout = false; 
        container.declareModel.alignActivities();
    }, 10000);
}