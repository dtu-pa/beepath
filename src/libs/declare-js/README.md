# declare-js

## Description

declare-js is an easy-to-use, web-based viewer and editor for declarative process models (DPMs). The tool enables users to import and export models while providing visual and textual interfaces for creating and editing declarative constraints. Moreover, given the complexity of understanding DPMs, declare-js offers features to enhance comprehension by visually linking visual and textual representations. The application is fully built in Javascript and can be embedded in any webpage.

## Integration

To use declare-js on your webpage just download the latest release and include it in your directory. In your HTML page you can then define a container for the declare-js canvas by giving it the id 'declareContainer' as shown in the example below.

```html
<div id="declareContainer"></div>
```

You can resize the editor by setting the height and width of the container element using CSS. If you want to switch between the viewer and editor you can do so by calling the 'switchMode' function as shown in the example below.

```html
<script>
    declare.switchMode();
</script>
```

## Requirements

declare-js has no dependencies.

## Getting Started

You can access the editor by clicking [here](https://declare-js.com/editor.html). When opening declare-js you see a blank canvas, which is split in two parts - the visual editor (on the left) and the textual editor (on the right). On the left you can also find the edit menu, which allows you to visually place or delete activites and constraints, or to activate the auto-layout functionality. The menu on the bottom left allows you start a model from scratch, or import and export the entire model in different file formats. However, models do not need to be edited using the visual editor but can also be modified in the textual editor. To do so just activate the editing mode by clicking on the 'edit off' button above the 'activities' or 'constraints' boxes.

## Contact

Mail: [snagel@uni-koblenz.de](mailto:snagel@uni-koblenz.de)
