// Event triggered if mouse is moved over activities container
export function activityHighlights(editor, declare) {

    editor.activitiesContainer.addEventListener("mouseover", (evt) => {

        // Remove highlighting from all lines
        removeHighlights(editor, declare);
        // Get line element under mouse courser 
        var lineElem = evt.target.closest('.editorLine');
        if (lineElem) {
            editor.highlightLine(lineElem);
            highlightRelatedConstraints(lineElem, declare);
        }
    })
}

// Event triggered if mouse is moved over constraints container
export function constraintHighlights(editor, declare) {

    editor.constraintsContainer.addEventListener("mouseover", (evt) => {

        // Remove highlighting from all lines
        removeHighlights(editor, declare);
        // Get line element under mouse courser
        var lineElem = evt.target.closest('.editorLine');
        if (lineElem) {
            editor.highlightLine(lineElem);
            highlightRelatedActivities(lineElem, declare);
        }
    })
}

// Remove highlighting for all lines if the mouse is moved away from the line container
export function resetHighlights(editor, declare) {

    let containers = [editor.constraintsContainer, editor.activitiesContainer];
    for (const container of containers) {
        container.addEventListener("mouseleave", () => {
            removeHighlights(editor, declare);
        })
    }
}

// Highlight activities related to a constraint
function highlightRelatedActivities(lineElem, declare) {

    var constraint = declare.declareModel.getExistenceConstraint(lineElem.innerHTML);
    if (!constraint) constraint = declare.declareModel.getRelationConstraint(lineElem.innerHTML);
    if (constraint) {
        let activities = constraint.getActivities();
        let activityLine;
        for (const activity of activities) {
            activityLine = Array.from(declare.editor.activities).find((activityLine) => activityLine.innerHTML === activity.toString());
            // declare.editor.highlightLine(activityLine);
            activity.enableHighlight();
        }
        constraint.enableHighlight();
    }
}

// Highlight constraints related to an activity
function highlightRelatedConstraints(lineElem, declare) {

    var activity = declare.declareModel.getActivity(lineElem.innerHTML);
    if (activity) {
        let constraints = activity.getConstraints();
        let constraintLine;
        for (const constraint of constraints) {
            constraintLine = Array.from(declare.editor.constraints).find((constraintLine) => constraintLine.innerHTML === constraint.toString());
            declare.editor.highlightLine(constraintLine);
            constraint.enableHighlight();
        }
        activity.enableHighlight();
    }
}

// Remove highlighting from all lines
function removeHighlights(editor, declare) {
    for (const line of editor.highlightedLines) {
        editor.removeLineHighlight(line);
    }
    declare.declareModel.removeHighlights();
}