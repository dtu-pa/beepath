import { removeAllSelections } from "./actions/selectElement.js";

export function JSON_EXPORT(container) {
    container.declareModel.exportToJSON();
}

export function TXT_EXPORT(container) {
    const file = new Blob([container.declareModel.constraintsToString()], { type: 'text/plain' });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(file);
    link.download = "declare_model.txt";
    link.click();
    URL.revokeObjectURL(link.href);
}

export function SVG_EXPORT(container) {
    removeAllSelections(container);
    exportSVG(container);
}

function processCSV(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const csvData = e.target.result;
        } catch (error) {
            console.error('Error parsing the CSV file:', error);
        }
    };
    reader.readAsText(file);
}

export function exportSVG(container) {

    // Disable background grid
    if(container.enableEdit) container.view.shape.firstChild.setAttribute('fill', 'none');
    // Serialize the SVG content to a string
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(container.canvas);

    // Create a Blob object from the string
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });

    // Create a download link and click it
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'canvas.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    // Enable background grid
    if(container.enableEdit) container.view.shape.firstChild.setAttribute('fill', 'url(#grid)');
}