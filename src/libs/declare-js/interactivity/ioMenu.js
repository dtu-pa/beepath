import { importFile } from "./importMenu.js";

export function NEW(container) {
    const deleteModel = confirm('Are you sure you want to delete this model and start from scratch?');

    if (deleteModel) {
        for (const activity of container.declareModel.activities) {
            container.declareModel.deleteActivity(activity.id);
        }
    } else {
        console.log('Deletion cancelled.');
    }
}

export function IMPORT(container) {
    importFile(container);
}

export function EXPORT(container) {
    container.exportMenu.isOpen ? container.exportMenu.close() : container.exportMenu.open();
}



