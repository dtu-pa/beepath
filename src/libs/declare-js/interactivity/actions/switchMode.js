export function switchMode(declare) {

    // Switch to view mode
    if (declare.enableEdit) {

        declare.enableEdit = false;

        declare.editMenu.menuContainer.style.display = "none";
        declare.ioMenu.menuContainer.style.display = "none";
        declare.helpMenu.menuContainer.style.display = "none";
        declare.contextMenu.menuContainer.style.display = "none";
        declare.editor.close();
        declare.editor.collapseButton.style.display = "none";
        declare.view.shape.firstChild.setAttribute("fill", "none");
    } 

    // Switch to edit mode
    else {

        declare.enableEdit = true;

        declare.editMenu.menuContainer.style.display = "unset";
        declare.ioMenu.menuContainer.style.display = "unset";
        declare.helpMenu.menuContainer.style.display = "unset";
        declare.contextMenu.menuContainer.style.display = "unset";
        declare.editor.collapseButton.style.display = "unset";
        declare.view.shape.firstChild.setAttribute('fill', 'url(#grid)');
    }
}