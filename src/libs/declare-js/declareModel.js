import { ExistenceConstraint } from "./elements/existenceConstraint.js";
import { RelationConstraint } from "./elements/relationConstraint.js";
import { Activity } from "./elements/activity.js";
import { addElementToSet, generateId, generateRandomString } from "./util.js";


export class DeclareModel {

    constructor(declare) {
        this.activities = new Set();
        this.relationConstraints = new Set();
        this.existenceConstraints = new Set();

        // All valid Declare templates
        this.validExistenceTemplates = [
            'Init', 'End', 'Absence', 'AtLeastOne', 'AtLeastTwo', 'AtLeastThree',
            'ExactlyOne', 'ExactlyTwo', 'ExactlyThree', 'AtMostOne', 'AtMostTwo', 'AtMostThree'
        ];

        this.alternativeExistenceTemplates = [
            'Participation', 'AtLeast1', 'AtLeast2', 'AtLeast3',
            'Exactly1', 'Exactly2', 'Exactly3', 'AtMost1', 'AtMost2', 'AtMost3'
        ];

        this.existenceTemplateMapping = {
            "Participation": "AtLeastOne",
            "AtLeast1": "AtLeastOne",
            "AtLeast2": "AtLeastTwo",
            "AtLeast3": "AtLeastThree",
            "Exactly1": "ExactlyOne",
            "Exactly2": "ExactlyTwo",
            "Exactly3": "ExactlyThree",
            "AtMost1": "AtMostOne",
            "AtMost2": "AtMostTwo",
            "AtMost3": "AtMostThree",
        };

        this.validRelationTemplates = [
            'RespondedExistence', 'CoExistence', 'Response', 'AlternateResponse', 'ChainResponse',
            'Precedence', 'AlternatePrecedence', 'ChainPrecedence', 'Succession', 'AlternateSuccession',
            'ChainSuccession', 'NotRespondedExistence', 'NotCoExistence', 'NotResponse', 'NotChainResponse', 'NotPrecedence',
            'NotChainPrecedence', 'NotSuccession', 'NotChainSuccession'
        ];

        this.existenceConstraintMap = new Map();
        this.relationConstraintMap = new Map();

        this.validExistenceTemplates.forEach(template => {
            this.existenceConstraintMap.set(template, new Set());
        });

        this.validRelationTemplates.forEach(template => {
            this.relationConstraintMap.set(template, new Set());
        });

        this.declare = declare;
        this.view = declare.view.shape;
        this.id = generateId();
        this.name = this.id;
        this.autoLayout = true;
        this.alternativeTemplates = false;
    }

    addToView() {
        this.relationConstraints.forEach((relationConstraint) => {
            relationConstraint.addPathToView(this.view);
        });

        this.activities.forEach((activity) => {
            activity.positionExistenceConstraints();
            for (const existenceConstraint of activity.existenceConstraints) {
                existenceConstraint.addToView(this.view);
                existenceConstraint.label.addToView(this.view);
            }
            activity.addToView(this.view);
        });

        this.relationConstraints.forEach((relationConstraint) => {
            relationConstraint.addArrowsAndCirclesToView(this.view);
        });
    }

    // parse string to constraint
    stringToConstraint(constraintStr) {
        if (constraintStr) {
            // remove optional single and double quotes around activities
            constraintStr = constraintStr.replace(/[\"']/g, "");
            const pattern = /(\w+)\(([^,]+),? ?([^)]*)\)/;
            const matches = constraintStr.match(pattern);

            // parses textual constraint and returns existence or relation constraint, depending on number of activities
            if (matches) {
                const template = matches[1];
                const activityA = matches[2];
                const activityB = matches[3] || null;

                let updatedTemplate = template;

                if (activityA !== activityB) {
                    if (this.alternativeExistenceTemplates.includes(template)) {
                        updatedTemplate = this.existenceTemplateMapping[template];
                        if (!this.alternativeTemplates) {
                            this.alternativeTemplates = true;
                            alert("Please note that or more constraints have been slightly changed to match the set of supported templates (e.g., AtLeast1 vs. AtLeastOne).");
                        }
                    }

                    if (this.validExistenceTemplates.includes(updatedTemplate) && activityB == null) {
                        var currentActivity = this.createActivity(activityA);
                        var currentExistenceConstraint = this.createExistenceConstraint(currentActivity, updatedTemplate);
                        addElementToSet(currentExistenceConstraint, currentActivity.existenceConstraints);

                        if (this.existenceConstraintMap.has(updatedTemplate)) {
                            this.existenceConstraintMap.get(updatedTemplate).add(currentExistenceConstraint);
                        } else {
                            console.error(`Template ${updatedTemplate} not found in the map.`);
                        }

                        return currentExistenceConstraint.id;
                    }
                    else if (this.validRelationTemplates.includes(template) && activityB != null) {
                        var currentActivityA = this.createActivity(activityA);
                        var currentActivityB = this.createActivity(activityB);
                        var currentRelationConstraint = this.createRelationConstraint(currentActivityA, currentActivityB, template);
                        addElementToSet(currentRelationConstraint, currentActivityA.relationConstraints);
                        addElementToSet(currentRelationConstraint, currentActivityB.relationConstraints);

                        if (this.relationConstraintMap.has(template)) {
                            this.relationConstraintMap.get(template).add(currentRelationConstraint);
                        }

                        return currentRelationConstraint.id;
                    }
                }
                else {
                    console.log(`The constraint ${constraintStr} has been skipped due to a self-loop.`)
                }
            }
        }
    }

    addActivity(activityLabel) {
        let activity = this.getActivity(activityLabel);
        if (!activity) {
            return this.createActivity(activityLabel).id;
        }
    }

    addConstraint(constraintStr, preventActivityCreation) {

        // Prevent the creation of new activities
        constraintStr = constraintStr.replace(/[\"']/g, "");
        const pattern = /(\w+)\(([^,]+),? ?([^)]*)\)/;
        const matches = constraintStr.match(pattern);
        if (matches) {
            const activityA = matches[2];
            const activityB = matches[3] || null;
            if (preventActivityCreation && !this.getActivity(activityA) || (preventActivityCreation && activityB && !this.getActivity(activityB))) {
                console.log(this.getActivity(activityA));
                console.log(this.getActivity(activityB));
                return;
            }
            let constraintId = this.stringToConstraint(constraintStr);
            if (constraintId) {
                this.addToView();
                return constraintId;
            }
        }
    }

    createActivity(activityLabel, posX, posY) {
        // Check if activity already exists
        var activity = this.getActivity(activityLabel);
        if (!activity) {
            // Create new activity if none was found
            if (posX && posY) {
                activity = new Activity(activityLabel, posX, posY);
            } else {
                activity = new Activity(activityLabel, (Math.random() * 100) - 50, (Math.random() * 100) - 50);
            }
            this.declare.editor.addActivity(activity);
            this.activities.add(activity);
            this.addToView();
        }
        return activity;
    }

    createExistenceConstraint(activity, template) {
        // Check if existence constraint already exists
        var existenceConstraint = this.getExistenceConstraint(template + "('" + activity.toString() + "')");
        if (!existenceConstraint) {
            // Create new existence constraint if none was found
            existenceConstraint = new ExistenceConstraint(activity, template);
            this.declare.editor.addConstraint(existenceConstraint);
            this.existenceConstraints.add(existenceConstraint);
        }
        return existenceConstraint;
    }

    createRelationConstraint(activityA, activityB, template) {
        // Check if existence constraint already exists
        var relationConstraint = this.getRelationConstraint(template + "('" + activityA.toString() + "','" + activityB.toString() + "')");
        if (!relationConstraint) {
            // Create new existence constraint if none was found
            relationConstraint = new RelationConstraint(activityA, activityB, template);
            this.declare.editor.addConstraint(relationConstraint);
            this.relationConstraints.add(relationConstraint);
        }
        return relationConstraint;
    }

    deleteActivity(activityId) {
        let activity = Array.from(this.activities).find(({ id }) => id === activityId);
        if (activity) {
            // Remove related existence constraints
            for (const existenceConstraint of activity.existenceConstraints) {
                this.deleteExistenceConstraint(existenceConstraint.id, true);
            }
            // Remove related relation constraints
            for (const relationConstraint of activity.relationConstraints) {
                this.deleteRelationConstraint(relationConstraint.id, true);
            }
            this.declare.editor.removeActivity(activity);
            activity.destroy();
            this.activities.delete(activity);
        }
    }

    deleteExistenceConstraint(constraintId, removeLine) {
        let constraint = Array.from(this.existenceConstraints).find(({ id }) => id === constraintId);
        if (constraint) {
            this.existenceConstraintMap.get(constraint.template).delete(constraint);
            if (removeLine) this.declare.editor.removeConstraint(constraint);
            constraint.destroy();
            this.existenceConstraints.delete(constraint);
        }
    }

    deleteRelationConstraint(constraintId, removeLine) {
        let constraint = Array.from(this.relationConstraints).find(({ id }) => id === constraintId);
        if (constraint) {
            this.relationConstraintMap.get(constraint.template).delete(constraint);
            if (removeLine) this.declare.editor.removeConstraint(constraint);
            constraint.destroy();
            this.relationConstraints.delete(constraint);
        }
    }

    getActivity(activityLabel) {
        return Array.from(this.activities).find((activity) => activity.toString() === activityLabel);
    }

    getActivityById(activityId) {
        return Array.from(this.activities).find(({ id }) => id === activityId);
    }

    getExistenceConstraint(constraintStr) {
        return Array.from(this.existenceConstraints).find((exConst) => exConst.toString() === constraintStr);
    }

    getExistenceConstraintById(existenceConstraintId) {
        return Array.from(this.existenceConstraints).find(({ id }) => id === existenceConstraintId);
    }

    getRelationConstraint(constraintStr) {
        let constr = Array.from(this.relationConstraints).find((relConst) => relConst.toString() === constraintStr);
        if (constr) return constr;
        // Check if the reversed order of activities yields a result
        if (constraintStr.includes("CoExistence")) {
            let template = constraintStr.slice(0, constraintStr.indexOf('('));
            let activityA = constraintStr.slice(constraintStr.indexOf('(') + 1, constraintStr.indexOf(','));
            let activityB = constraintStr.slice(constraintStr.indexOf(',') + 1, constraintStr.indexOf(')'));
            constraintStr = template + '(' + activityB + ',' + activityA + ')';
            return Array.from(this.relationConstraints).find((relConst) => relConst.toString() === constraintStr);
        }
    }

    getRelationConstraintById(relationConstraintId) {
        return Array.from(this.relationConstraints).find(({ id }) => id === relationConstraintId);

    }

    constraintsToString() {
        var exportString;
        for (const existenceConstraint of this.existenceConstraints) {
            exportString += existenceConstraint.toString() + "\n";
        }
        for (const relationConstraint of this.relationConstraints) {
            exportString += relationConstraint.toString() + "\n";
        }
        return exportString;
    }

    setName(newName) {
        this.name = newName;
    }

    alignActivities() {
        for (const activity of this.activities) {
            activity.alignToGrid();
        }
    }

    exportToJSON(filename) {
        const tasks = [...this.activities].map(activity => activity.exportToJSON());

        const constraints = [...this.relationConstraints, ...this.existenceConstraints]
            .map(constraint => constraint.exportToJSON());

        const data = {
            name: this.name,
            tasks: tasks,
            constraints: constraints
        };

        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', filename);
        a.click();
        URL.revokeObjectURL(url);
        a.remove();
    }

    removeFrames() {
        for (this.activity of this.activities) {
            this.activity.removeFrame();
        }
    }

    removeHighlights() {
        for (this.activity of this.activities) {
            this.activity.disableHighlight();
        }
        for (this.existenceConstraint of this.existenceConstraints) {
            this.existenceConstraint.disableHighlight();
        }
        for (this.relationConstraint of this.relationConstraints) {
            this.relationConstraint.disableHighlight();
        }
    }


    generateRandomModel(numberOfActivities, numberOfExistenceConstraints, numberOfRelationConstraints) {
        const constraintStrings = [];
        const maxAttempts = 20;

        while (numberOfActivities > 0) {
            this.addActivity(generateRandomString(5));
            numberOfActivities--;
        }

        let attempts = 0;
        while (numberOfExistenceConstraints > 0) {
            if (attempts >= maxAttempts) {
                console.log("Maximum attempts reached. It's unlikely to find a unique existence constraint.");
                break;
            }

            if (this.activities.size === 0) {
                console.log("At least one activity is needed to generate an existence constraint.");
                break;
            }

            let template = this.randomExistenceTemplate();
            let activityA = this.randomActivity();
            let constraintStr = `${template}(${activityA})`;

            if (!constraintStrings.includes(constraintStr)) {
                constraintStrings.push(constraintStr);
                numberOfExistenceConstraints--;
            } else {
                attempts++;
            }
        }

        attempts = 0;
        while (numberOfRelationConstraints > 0) {
            if (attempts >= maxAttempts) {
                console.log("Maximum attempts reached. It's unlikely to find a unique relation constraint.");
                break;
            }

            if (this.activities.size < 2) {
                console.log("At least two activities are needed to generate a relation constraint.");
                break;
            }

            let template = this.randomRelationTemplate();
            let activityA = this.randomActivity();
            let activityB = this.randomActivity();
            let constraintStr = `${template}(${activityA},${activityB})`;

            if (activityA !== activityB && !constraintStrings.includes(constraintStr)) {
                constraintStrings.push(constraintStr);
                numberOfRelationConstraints--;
            } else {
                attempts++;
            }
        }
        return constraintStrings;
    }

    randomExistenceTemplate() {
        const randomIndex = Math.floor(Math.random() * this.validExistenceTemplates.length);
        return this.validExistenceTemplates[randomIndex];
    }

    randomRelationTemplate() {
        const randomIndex = Math.floor(Math.random() * this.validRelationTemplates.length);
        return this.validRelationTemplates[randomIndex];
    }

    randomActivity() {
        const activitiesArray = [...this.activities];
        const randomIndex = Math.floor(Math.random() * activitiesArray.length);
        return activitiesArray[randomIndex];
    }


}

