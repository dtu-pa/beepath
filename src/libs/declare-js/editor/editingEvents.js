import { determineForces } from "../graphLayout.js";

export function lineEditActivity(editor, declare) {

    editor.activitiesContainer.addEventListener("input", (evt) => {


        console.log(evt.inputType);
        // Get the edited line element
        var changedElem = window.getSelection();
        declare.editor.inUse = true;

        switch(evt.inputType) {
            case "insertParagraph":
                // Remove copied element ID from previous line for new ones
                changedElem.anchorNode.removeAttribute("elem_id");
                break;
            case "deleteContentBackward":
            case "deleteContentForward":
            case "insertText":
                editActivity(changedElem.anchorNode.parentElement, declare, evt);
                break;
            case "insertFromPaste":
                break;
            case "deleteByCut":
                break;
            case "historyUndo":
                break;
            case "historyRedo":
                break;
        }
        declare.editor.inUse = false;
    })
}

export function lineEditConstraint(editor, declare) {

    editor.constraintsContainer.addEventListener("input", (evt) => {

        // Get the edited line element
        var changedElem = window.getSelection();
        declare.editor.inUse = true;

        switch(evt.inputType) {
            case "insertParagraph":
                // Remove copied element ID from previous line for new ones
                changedElem.anchorNode.removeAttribute("elem_id");
                break;
            case "deleteContentBackward":
            case "deleteContentForward":
            case "insertText":
                removeConstraint(changedElem.anchorNode.parentElement, declare);
                addConstraint(changedElem.anchorNode.parentElement, declare);
                break;
            case "insertFromPaste":
                addConstraint(changedElem.anchorNode.parentElement, declare);
                break;
            case "deleteByCut":
                removeConstraint(changedElem.anchorNode.parentElement, declare);
            case "historyUndo":
                break;
            case "historyRedo":
                break;
        }
        declare.editor.inUse = false;
    })
}

function addActivity(lineElem, declare) {
    let activityLabel = lineElem.firstChild.wholeText;
    let activity = declare.declareModel.addActivity(activityLabel);
    lineElem.setAttribute("elem_id", activity);
    lineElem.innerHTML = activityLabel;
    declare.editor.activities.add(lineElem);

    for (const act of declare.declareModel.activities) {
        if (act.id !== activity) act.enablePhysics = false;
    }

    declare.declareModel.autoLayout = true;
    determineForces(declare.declareModel);
    // Disable auto layout after 10 seconds
    setTimeout(() => { 
        declare.declareModel.autoLayout = false; 
        declare.declareModel.alignActivities();
        for (const act of declare.declareModel.activities) {
            if(!act.lockIcon) act.enablePhysics = true;
        }
    }, 6000);
}

function editActivity(lineElem, declare, evt) {
    let activityLabel = lineElem.firstChild.wholeText;
    if (activityLabel) {
        var activityId = lineElem.getAttribute("elem_id");
        if (activityId) {
            var activity = declare.declareModel.getActivityById(activityId);
            activity.updateLabel(activityLabel, declare.editor);
        } else {
            addActivity(lineElem, declare);
        }
    } else {
        evt.preventDefault();
        for (const line of declare.editor.activities) {
            if (line.innerHTML === "<br>" && line.getAttribute("elem_id")) {
                declare.declareModel.deleteActivity(line.getAttribute("elem_id"));
            }
        }
    }
}

function removeConstraint(lineElem, declare) {
    let constraintId = lineElem.getAttribute("elem_id");

    if (constraintId && constraintId !== "undefined") {
        declare.declareModel.deleteExistenceConstraint(constraintId, false);
        declare.declareModel.deleteRelationConstraint(constraintId, false);
        lineElem.removeAttribute("elem_id");
    } else if (lineElem.getAttribute("class") === "editorContainer") {
        for (const line of lineElem.childNodes) {
            constraintId = line.getAttribute("elem_id");
            if(constraintId && constraintId !== "undefined" && !line.firstChild.wholeText) {
                declare.declareModel.deleteExistenceConstraint(constraintId);
                declare.declareModel.deleteRelationConstraint(constraintId);
                lineElem.removeAttribute("elem_id");
                return;
            }
        }
    }
}

function addConstraint(lineElem, declare) {
    let constraintStr = lineElem.firstChild.wholeText;
    let constraintId = declare.declareModel.addConstraint(constraintStr, true);
    if (constraintId) {
        lineElem.style.color = "black";
        lineElem.setAttribute("elem_id", constraintId);
    } else {
        lineElem.style.color = "red";
    }
}