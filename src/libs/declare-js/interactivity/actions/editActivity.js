export function enableEdit(evt, container) {

    var elem = evt.target.closest('[draggable=true]');
    if (elem) {
        var activityId = elem.getAttribute('id');
        if (activityId) {
            var activity = container.declareModel.getActivityById(activityId);
            if (activity) activity.enableEditMode(container.editor);
        }
    }
}