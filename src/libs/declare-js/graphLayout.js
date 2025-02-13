import { calculateIntersection } from "./util.js";

export function determineForces(declareModel) {

    var gravityConstant = 3.5,
        forceConstant = 100000,
        forceConstantSingleActivity = 60000,
        existenceConstraintRepulsion = 60,
        physicsCuttoff = 4,
        allActivities,
        enabledActivities,
        existenceConstraintActivities;

    (function calculate() {

        if (declareModel.autoLayout === true) {
            allActivities = Array.from(declareModel.activities);
            enabledActivities  = Array.from(declareModel.activities).filter(activity => activity.enablePhysics === true);
            
            // Force towards center
            for (const activity of enabledActivities) {
                activity.forceX = (activity.posX + 175) * -1 * gravityConstant;
                activity.forceY = activity.posY * -1 * gravityConstant;
            }

            // Calculate activity repulsion
            for (let i = 0; i < allActivities.length; i++) {
                for (let j = i + 1; j < allActivities.length; j++) {
                    let force;
                    allActivities[i].relationConstraints.size === 0 || allActivities[j].relationConstraints.size === 0 ? force = forceConstantSingleActivity : force = forceConstant;
                    let posA = allActivities[i].getPosition();
                    let posB = allActivities[j].getPosition();
                    let dirX = posB.x - posA.x;
                    let dirY = posB.y - posA.y;
                    let mag = (dirX ** 2) + (dirY ** 2);
                    let x;
                    let y;
                    if (mag !== 0) {
                        x = (dirX / mag) * force;
                        y = (dirY / mag) * force;
                    } else {
                        x = Math.random();
                        y = Math.random();
                    }
                    allActivities[i].forceX -= x;
                    allActivities[i].forceY -= y;
                    allActivities[j].forceX += x;
                    allActivities[j].forceY += y;
                }
            }

            // Connection forces
            for (const activity1 of enabledActivities) {
                for (const activity2 of activity1.getConnectedActivities()) {
                    let distanceX = activity1.posX - activity2.posX;
                    let distanceY = activity1.posY - activity2.posY;
                    activity1.forceX -= distanceX;
                    activity1.forceY -= distanceY;
                    activity2.forceX += distanceX;
                    activity2.forceY += distanceY;
                }
            }

            // Force overhead activities away if existence constraints are in the way
            existenceConstraintActivities = Array.from(declareModel.activities).filter(activity => activity.existenceConstraints.size !== 0);
            for (const activity of existenceConstraintActivities) {
                let angleLimit = (activity.getConnectedActivities().size) * 20;
                for (const connectedActivity of activity.getConnectedActivities()) {
                    let posA = activity.getPosition();
                    let posB = connectedActivity.getPosition();
                    let uX = posB.x - posA.x;
                    let uY = posB.y - posA.y;
                    let angle = Math.acos((-1 * uY) / Math.sqrt((uX ** 2) + (uY ** 2))) * (180 / Math.PI);
                    if(angle < angleLimit) {
                        let force = (angleLimit - angle) * existenceConstraintRepulsion;
                        uX > 0 ? activity.forceX -= force : activity.forceX += force;
                        uX > 0 ? connectedActivity.forceX += force : connectedActivity.forceX -= force;
                    }
                }
            }

            // Get intersected activities
            let intersectedActivities = new Map();

            // CURRENTLY DEACTIVATED
            if (true === false ) {
            for (const activity of allActivities) {
                for (const relationConstraint of declareModel.relationConstraints) {
                    if (calculateIntersection(activity, relationConstraint) && !activity.relationConstraints.has(relationConstraint)) {
                        if (intersectedActivities.get(activity)) {
                            intersectedActivities.set(activity, intersectedActivities.get(activity) + 1);
                        } else {
                            intersectedActivities.set(activity, 1);
                        }
                        let posA = relationConstraint.activityA.getPosition();
                        let posB = relationConstraint.activityB.getPosition();
                        let forceX = posA.x - posB.x;
                        let forceY = posA.y - posB.y;

                        console.log("x: " + forceX);
                        console.log("y: " + forceY);
                        activity.forceX -= forceX;
                        activity.forceY += forceY;
                    }
                }
            }
            }

            // Calculate relation constraint repulsion
            declareModel.autoLayout = false;
            for (const activity of enabledActivities) {
                if (declareModel.autoLayout === false && Math.abs(activity.forceX) + Math.abs(activity.forceY) > physicsCuttoff) declareModel.autoLayout = true;
                activity.physicsUpdate();
            }
            setTimeout(calculate, 10);
        }
    })();
}