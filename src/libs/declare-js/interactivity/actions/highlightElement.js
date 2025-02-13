export function highlight(evt, container) {

    removeHighlights(container);
    var elemId = evt.target.closest('[draggable=true]').getAttribute('id');

    if (elemId && container.editor.menuContainer.style.right === "0px") {
        // Check if activity
        var activity = container.declareModel.getActivityById(elemId);
        if (activity) {
            highlightActivity(container, activity);
        } else {
            var elemId = evt.target.parentElement.parentElement.getAttribute('id');
            // Check if existence constraint
            var existenceConstraint = container.declareModel.getExistenceConstraintById(elemId);
            if (existenceConstraint) {
                highlightExistenceConstraint(container, existenceConstraint);
            } else {
                var elemId = evt.target.parentElement.getAttribute('id');
                // Check if relation constraint
                var relationConstraint = container.declareModel.getRelationConstraintById(elemId);
                if (relationConstraint) {
                    highlightRelationConstraint(container, relationConstraint);
                }
            }
        }
    } 
}

// Highlight activities related to a constraint
function highlightActivity(container, activity) {
    activity.enableHighlight();
    // Select activity in editor
    var lineElem = Array.from(container.editor.activities).find((line) => line.getAttribute('elem_id') === activity.id);
    container.editor.highlightLine(lineElem);
}

// Highlight constraints related to an activity
function highlightExistenceConstraint(container, constaint) {
    constaint.enableHighlight();
    var lineElem = Array.from(container.editor.constraints).find((line) => line.getAttribute('elem_id') === constaint.id);
    container.editor.highlightLine(lineElem);
}

// Highlight constraints related to an activity
function highlightRelationConstraint(container, constaint) {
    constaint.enableHighlight();
    var lineElem = Array.from(container.editor.constraints).find((line) => line.getAttribute('elem_id') === constaint.id);
    container.editor.highlightLine(lineElem);
}

// Remove highlighting from all lines
function removeHighlights(container) {
    for (const line of container.editor.highlightedLines) {
        container.editor.removeLineHighlight(line);
    }
    container.declareModel.removeHighlights();
}