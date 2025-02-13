import * as drag from "./actions/drag.js";
import * as activityPlacement from "./actions/addActivity.js";
import * as existenceConstraintPlacement from "./actions/addExistenceConstraint.js";
import * as relationConstraintPlacement from "./actions/addRelationConstraint.js";
import * as activitySelection from "./actions/selectElement.js";
import * as activityEditing from "./actions/editActivity.js";
import * as elementHighlighting from "./actions/highlightElement.js";

export function addEventListeners(container) {

    var objectInfo = null;

    // Mouse click event listener
    container.canvas.addEventListener('click', (evt) => {
        switch (container.mode) {
            case 'MOVE': if (container.enableEdit) activitySelection.selection(evt, container); break;
            case 'ACTIVITY_PLACEMENT': activityPlacement.place(evt, container); break;
            case 'EXISTENCE_CONSTRAINT_PLACEMENT': existenceConstraintPlacement.place(evt, container); break;
            case 'SELECT_RELATION_CONSTRAINT_START': relationConstraintPlacement.start(evt, container); break;
            case 'SELECT_RELATION_CONSTRAINT_END': relationConstraintPlacement.end(evt, container); break;
            //container.editor.updateConstraintStrings();
        }
    });

    container.canvas.addEventListener('dblclick', (evt) => {
        switch (container.mode) {
            case 'MOVE': activityEditing.enableEdit(evt, container); break;
        }
    });

    // Left mouse pressed event listener
    container.canvas.addEventListener('mousedown', (evt) => {
        switch (container.mode) {
            case 'MOVE': objectInfo = drag.start(evt, container); break;
        }
        container.contextMenu.close();
    });

    // Pressed mouse movement event listener
    container.canvas.addEventListener('mousemove', (evt) => {
        switch (container.mode) {
            case 'DRAG': drag.drag(evt, container, objectInfo); break;
            case 'ACTIVITY_PLACEMENT': activityPlacement.move(evt, container); break;
            case 'EXISTENCE_CONSTRAINT_PLACEMENT': existenceConstraintPlacement.move(evt, container); break;
            case 'SELECT_RELATION_CONSTRAINT_END': relationConstraintPlacement.move(evt, container); break;
            default: elementHighlighting.highlight(evt, container);
        }
    });

    // Left mouse released event listener
    container.canvas.addEventListener('mouseup', (evt) => {
        switch (container.mode) {
            case 'DRAG': 
            drag.end(evt, container, objectInfo); 
            objectInfo = null;
            break;
        }
    });

    // Mouse leaving the canvas event listener
    container.canvas.addEventListener('mouseleave', (evt) => {
        switch (container.mode) {
            case 'MOVE': 
            drag.end(evt, container, objectInfo); 
            objectInfo = null;
            break;
        }
    });

    // Key press event listener
    document.addEventListener('keydown', (evt) => {

        if (evt.key === "Escape") {
            switch (container.mode) {
                case 'ACTIVITY_PLACEMENT': activityPlacement.abort(evt, container); break;
                case 'EXISTENCE_CONSTRAINT_PLACEMENT': existenceConstraintPlacement.abort(evt, container); break;
                case 'SELECT_RELATION_CONSTRAINT_START':
                case 'SELECT_RELATION_CONSTRAINT_END': relationConstraintPlacement.abort(evt, container); break;
            }
        }

        if (evt.key === "Delete") {
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
    });

    // Context menu
    container.canvas.addEventListener('contextmenu', (evt) => {
        container.contextMenu.close();
        evt.preventDefault();
        container.contextMenu.open(evt);
    });

    // Touch input events
    /* svg.addEventListener('touchstart', startDrag);
    svg.addEventListener('touchmove', drag);
    svg.addEventListener('touchend', endDrag);
    svg.addEventListener('touchleave', endDrag);
    svg.addEventListener('touchcancel', endDrag); */


    // Listener for file input
    container.fileInput.onchange = () => {
        var fileReader = new FileReader();
        fileReader.onload = function () {
            let constraints = fileReader.result.split(/[;\r\n]+/);

            for (const constraintString of constraints) {
                container.declareModel.stringToConstraint(constraintString);
            }
            container.declareModel.addToView(container.view.shape);
        }
        fileReader.readAsText(container.fileInput.files[0]);
    }
}