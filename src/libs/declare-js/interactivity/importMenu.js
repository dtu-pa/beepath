import { determineForces } from "../graphLayout.js";

export function importFile(container) {
    container.fileInput.click();
}

export function handleFileUpload(event, container) {
    const file = event.target.files[0];

    if (!file) return;

    // Check file type by extension
    const fileExtension = file.name.split('.').pop().toLowerCase();
    let autoLayout = true;

    if (fileExtension === 'json') {
        autoLayout = processJSON(file, container);
    } else if (fileExtension === 'csv') {
        autoLayout = processCSV(file, container);
    } else if (fileExtension === 'txt') {
        autoLayout = processTXT(file, container);
    } else {
        alert('Unsupported file format. Please upload a TXT, JSON or CSV file.');
    }

    setTimeout(() => {
    // Enable auto layout after loading
    if (autoLayout) {
        container.declareModel.autoLayout = true;
        determineForces(container.declareModel);
        // Disable auto layout after after 10 seconds
        setTimeout(() => { 
            container.declareModel.autoLayout = false; 
            container.declareModel.alignActivities();
        }, 10000);
    }}, 100);
}

function processJSON(file, container) {
    const reader = new FileReader();
    reader.onload = function (e) {
        for (const activity of container.declareModel.activities) {
            container.declareModel.deleteActivity(activity.id);
        }
        try {
            const jsonData = JSON.parse(e.target.result);
            if (jsonData && jsonData.tasks) {
                jsonData.tasks.forEach(task => {
                    const name = task.name;
                    const posX = task.posX;
                    const posY = task.posY;
                    container.declareModel.createActivity(name, posX, posY);
                });
            }
            if (jsonData && jsonData.constraints) {
                jsonData.constraints.forEach(constraint => {
                    const template = constraint.template;
                    const parameters = constraint.parameters;
                    const constraintStr = `${template}(${parameters.join(",")})`;
                    container.declareModel.addConstraint(constraintStr);
                    const factors = {
                        support: constraint.support,
                        confidence: constraint.confidence,
                        interestFactor: constraint.interestFactor
                    };
                });
            }
        } catch (error) {
            console.error('Error parsing the JSON file:', error);
        }
    };
    reader.readAsText(file);
    return false;
}

function processTXT(file, container) {
    const reader = new FileReader();
    reader.onload = function (e) {
        for (const activity of container.declareModel.activities) {
            container.declareModel.deleteActivity(activity.id);
        }

        const constraints = e.target.result.split('\n');

        constraints.forEach(constraintStr => {
            if (constraintStr.trim()) {
                container.declareModel.addConstraint(constraintStr.trim());
            }
        });
    };
    reader.readAsText(file);
    return true;
}

function processCSV(file, container) {
    const reader = new FileReader();
    reader.onload = function (e) {
        for (const activity of container.declareModel.activities) {
            container.declareModel.deleteActivity(activity.id);
        }

        const rows = e.target.result.split('\n');

        rows.forEach(row => {
            const columns = row.split(';');

            const constraintStr = columns[0].trim();

            if (constraintStr) {
                container.declareModel.addConstraint(constraintStr);
            }
        });
    };
    reader.readAsText(file);
    return true;
}





