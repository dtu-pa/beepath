import { MenuButton } from "./menu.js";

export class ExpansionMenu {

    constructor(declare, left, actions) {

        this.declare = declare;
        this.buttons = new Set();
        this.isOpen = false;

        this.width = "200px";

        // Define menu container style
        this.menuContainer = document.createElement('div');
        this.declare.container.appendChild(this.menuContainer);
        this.menuContainer.style.position = "absolute";
        this.menuContainer.style.bottom = "71px";
        this.menuContainer.style.width = "50px";
        this.menuContainer.style.height = "0px";
        this.menuContainer.style.left = left;

        this.menuContainer.style.backgroundColor = "F8F8F8";
        this.menuContainer.style.border = "solid 1px";
        this.menuContainer.style.borderColor = "#BEBEBE";
        this.menuContainer.style.borderRadius = "4px 4px 0px 0px";

        this.menuContainer.style.transition = "height 0.5s";
        this.menuContainer.style.visibility = "hidden";
        this.menuContainer.style.overflow = "hidden";

        //Create buttons
        for (const action of actions) {
            this.buttons.add(new MenuButton(this, action))
        }
    }

    // Open the submenu
    open() {
        this.menuContainer.style.visibility = "unset";
        this.menuContainer.style.height = 50 * this.buttons.size + "px";
        this.isOpen = true;
    }

    // Close the submenu
    close() {
        this.menuContainer.style.height = "0px";
        this.isOpen = false;
        setTimeout(() => { this.menuContainer.style.visibility = "hidden"; }, 500);
    }
}