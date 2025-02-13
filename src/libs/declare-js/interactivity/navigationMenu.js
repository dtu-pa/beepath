export function ZOOM_OUT(container) {
    var scale = container.zoomLevel,
        minScale = 0.3;

    scale /= 1.2;
    if (scale < minScale) scale = minScale;
    applyZoom(scale, container);
}

export function ZOOM_IN(container) {
    var scale = container.zoomLevel,
        maxScale = 3;

    scale *= 1.2;
    if (scale > maxScale) scale = maxScale;
    applyZoom(scale, container);
}

function applyZoom(scale, container) {
    container.zoomLevel = scale;

    container.view.shape.transform.baseVal.getItem(0).matrix.a = scale;
    container.view.shape.transform.baseVal.getItem(0).matrix.d = scale;
}