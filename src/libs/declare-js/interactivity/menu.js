import * as icons from "../svg/icons.js";

export class Menu {

    constructor(declare, actions, input, placement) {
        this.declare = declare;
        this.orientation = placement[0];
        this.verticalPlacement = placement[1];
        this.horizontalPlacement = placement[2];

        this.menuContainer;
        this.buttons = new Set();
        this.activeButton;

        // Create and style container element
        this.menuContainer = document.createElement('div');
        this.declare.container.appendChild(this.menuContainer);
        this.orientation === "v" ? this.menuContainer.style.width = "50px" : this.menuContainer.style.heigth = "50px";
        this.menuContainer.style.position = "absolute";
        this.verticalPlacement === "t" ? this.menuContainer.style.top = "20px" : this.menuContainer.style.bottom = "20px";
        this.horizontalPlacement === "l" ? this.menuContainer.style.left = "20px" : this.menuContainer.style.right = "374px";
        this.menuContainer.style.backgroundColor = "F8F8F8";
        this.menuContainer.style.border = "0px";
        this.menuContainer.style.borderColor = "#BEBEBE";
        this.menuContainer.style.borderRadius = "4px";
        this.menuContainer.style.transition = "right 0.5s";
        
        //Create buttons
        for (const action of actions) {
            this.buttons.add(new MenuButton(this, action))
        }
        if (input !== null) {
            this.input = new MenuButton(this, input + "_SUBMIT");
            this.input = new MenuInput(this, input);
        } 
    }

    setActive(btnAction) {
        this.resetActive();
        let btn = Array.from(this.buttons).find(({action}) => action === btnAction);
        btn.setActive();
        this.activeButton = btn;
    }
    
    resetActive() {
        if(this.activeButton) {
            this.activeButton.setInactive();
            this.activeButton = null;
        }
    }
}

export class MenuButton {

    constructor(menu, action) {

        this.menu = menu;
        this.element = document.createElement('button');
        this.action = action;

        this.menu.menuContainer.appendChild(this.element);
        this.element.classList.add("menuButton");
        this.element.style.backgroundColor = "F8F8F8";
        this.element.style.width = "50px";
        this.element.style.height = "50px";
        this.element.style.border = "none";
        this.element.style.cursor = "pointer";
        this.element.setAttribute('data-action', this.action);

        this.element.innerHTML = icons[this.action];
    }

    setActive() {
        // this.element.style.backgroundColor = "rgb(200, 200, 200)";
    }

    setInactive() {
        this.element.style.backgroundColor = "F8F8F8";
    }
}

class MenuInput {

    constructor(menu, action) {
        this.menu = menu;
        this.inputElement = document.createElement('input');
        this.inputElement.setAttribute("id", action);
        this.inputElement.style.width = "200px";
        this.inputElement.style.margin ="5px";
        this.inputElement.style.height = "30px";
        this.inputElement.style.position = "relative";
        this.inputElement.style.top = "5px";

        this.menu.menuContainer.appendChild(this.inputElement);
    }
}