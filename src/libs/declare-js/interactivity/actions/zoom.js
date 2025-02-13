  //Add zoom to view
  export function zoom(container) {

    var scale = container.zoomLevel,
        maxScale = 3,
        minScale = 0.3;

    //Mousewheel zoom
    container.view.shape.onwheel = function(evt) {
        evt.preventDefault();
        var pos = container.view.getPosition();
        //Calculate zoom
        var xs = (evt.clientX - pos.x) / scale,
            ys = (evt.clientY - pos.y) / scale,
            delta = (evt.wheelDelta ? evt.wheelDelta : -evt.deltaY);
            (delta > 0) ? (scale *= 1.2) : (scale /= 1.2);
            if (scale > maxScale) {scale = maxScale}
            else if (scale < minScale) {scale = minScale}
            else {
                pos.x = evt.clientX - xs * scale;
                pos.y = evt.clientY - ys * scale;
            }

        //Apply transformations to view
        container.view.shape.transform.baseVal.getItem(0).matrix.a = scale;
        container.view.shape.transform.baseVal.getItem(0).matrix.d = scale;
        container.view.setPosition(pos);

        container.zoomLevel = scale;
    }
}
