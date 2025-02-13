import { getMousePosition } from "../util.js";

export class ContextMenu {

    constructor(declare, buttons) {

        this.declare = declare;
        this.buttons = new Set();

        this.menuContainer = document.createElement('div');
        this.declare.container.appendChild(this.menuContainer);
        this.menuContainer.style.position = "absolute";
        this.menuContainer.style.backgroundColor = "F8F8F8";
        this.menuContainer.style.border = "solid 1px";
        this.menuContainer.style.borderColor = "#BEBEBE";
        this.menuContainer.style.borderRadius = "4px";

        this.menuContainer.style.display = "none";

        // Add buttons to the context menu
        for (const btn of buttons) {
            this.buttons.add(new ContextMenuButton(this, btn));
        }

        this.menuContainer.style.width = "150px";
    }

    // Show the context menu
    open(evt) {
        if (this.declare.enableEdit) {
            this.menuContainer.style.display = "unset";
            let pos = getMousePosition(evt, this.declare.canvas);
            this.menuContainer.style.top = pos.y;
            this.menuContainer.style.left = pos.x;
        }
    }

    // Hide the context menu
    close() {
        this.menuContainer.style.display = "none";
    }
}

class ContextMenuButton {

    constructor(contextMenu, action) {

        this.contextMenu = contextMenu;
        this.action = action;

        this.element = document.createElement('button');
        this.contextMenu.menuContainer.appendChild(this.element);
        this.element.innerHTML = action.charAt(0) + action.substring(1).toLowerCase();
        this.element.style.width = "150px";
        this.element.style.height = "25px";
        this.element.style.border = "none";
        this.element.style.backgroundColor = "none";
        this.element.style.cursor = "pointer";
        this.element.setAttribute('data-action', this.action);
    }
}