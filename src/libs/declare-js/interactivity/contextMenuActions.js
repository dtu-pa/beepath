import { determineForces } from "../graphLayout.js";

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
}

export function LOCK(container) {
    for (const activity of container.selectedActivities) {
        activity.lock();
    }
}

export function UNLOCK(container) {
    for (const activity of container.selectedActivities) {
        activity.unlock();
    }
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