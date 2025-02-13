import { gridDefs } from "./svg/defs.js";

import { switchMode } from "./interactivity/actions/switchMode.js";

import { Editor } from "./editor/editor.js";
import { Menu } from "./interactivity/menu.js";
import { ExpansionMenu } from "./interactivity/expansionMenu.js";
import { ExistenceConstraintSubmenu } from "./interactivity/subMenu.js"
import { RelationConstraintSubmenu } from "./interactivity/subMenu.js"
import { ContextMenu } from "./interactivity/contextMenu.js";

import { addEventListeners } from "./interactivity/eventListeners.js";
import { zoom } from "./interactivity/actions/zoom.js";
import { HelpModal } from "./interactivity/modal.js";
import * as editMenuInteraction from "./interactivity/editMenu.js";
import * as ioMenuInteraction from "./interactivity/ioMenu.js";
import * as exportMenuInteraction from "./interactivity/exportMenu.js";
import * as navigationMenuInteraction from "./interactivity/navigationMenu.js";
import * as contextMenuInteraction from "./interactivity/contextMenuActions.js";

import { SvgElement } from "./elements/svgElement.js";
import { determineForces } from "./graphLayout.js";
import { DeclareModel } from "./declareModel.js";

import { handleFileUpload } from "./interactivity/importMenu.js";

export class DeclareContainer {

    constructor() {

        this.enableEdit = true;
        this.snapToGrid = true;

        this.container = document.getElementById("declareContainer");
        this.canvas;
        this.view;
        this.zoomLevel = 1;

        this.mode;
        this.editor;
        this.editMenu;
        this.ioMenu;
        this.navigationMenu;
        this.helpMenu;
        this.contextMenu;

        this.fileInput;
        this.mouseAttachment;

        this.selectedActivities = new Set();
        this.selectedExistenceConstraints = new Set();
        this.selectedRelationConstraints = new Set();

        this.declareModel;

        this.init();
    }

    //Initialize container
    init() {
        // Add classes and styles to container
        this.container.classList.add('declare-container');
        this.container.style.width = "100%";
        this.container.style.height = "100%";
        this.container.style.overflow = "hidden";
        this.container.style.position = "relative";
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        // Create svg canvas
        this.canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.container.appendChild(this.canvas);
        this.canvas.classList.add('declare-canvas');
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";
        this.canvas.style.position = "relative";

        // Create view
        this.view = new SvgElement('g', 'view', this.width / 2, this.height / 2);
        this.view.shape.setAttribute('draggable', 'true');
        this.view.addToView(this.canvas);

        // Generate background grid
        let viewRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        this.view.shape.appendChild(viewRect);
        viewRect.setAttribute('x', (-5000 + 175 + ((this.width / 2))));
        viewRect.setAttribute('y', (-5000 - (this.height / 2)));
        viewRect.setAttribute('width', 10000);
        viewRect.setAttribute('height', 10000);
        viewRect.setAttribute('fill', 'url(#grid)');

        this.canvas.appendChild(gridDefs);

        // Add text editor and declare model
        this.editor = new Editor(this);
        this.declareModel = new DeclareModel(this);

        // Add edit menu
        // this.editMenu = new Menu(this, ["MOVE", "ACTIVITY_PLACEMENT", "EXISTENCE_CONSTRAINT_PLACEMENT", "RELATION_CONSTRAINT_PLACEMENT", "DELETE", "AUTO_LAYOUT"], null, "vtl");
		this.editMenu = new Menu(this, ["MOVE", "AUTO_LAYOUT"], null, "vtl");
        this.existenceConstraintSubmenu = new ExistenceConstraintSubmenu(this);
        this.relationConstraintSubmenu = new RelationConstraintSubmenu(this);

        this.helpMenu = new Menu(this, [], null, "htr");
        this.exportMenu = new ExpansionMenu(this, "120px", ["JSON_EXPORT", "SVG_EXPORT", "TXT_EXPORT"]);
        this.ioMenu = new Menu(this, [], null, "hbl");
        this.navigationMenu = new Menu(this, ["ZOOM_IN", "ZOOM_OUT"], null, "vbr");

        var container = this;
        this.helpMenu.menuContainer.addEventListener('click', (evt) => {
            new HelpModal(this.container);
        });
        this.editMenu.menuContainer.addEventListener('click', (evt) => {
            if (this.mouseAttachment) {
                if (!(this.declareModel.relationConstraints.has(this.mouseAttachment)
                    || this.declareModel.existenceConstraints.has(this.mouseAttachment))) {
                        this.mouseAttachment.destroy();
                }
            }
            editMenuInteraction[evt.target.closest('.menuButton').getAttribute('data-action')](container);
        });
        this.ioMenu.menuContainer.addEventListener('click', (evt) => {
            ioMenuInteraction[evt.target.closest('.menuButton').getAttribute('data-action')](container);
        });
        this.exportMenu.menuContainer.addEventListener('click', (evt) => {
            exportMenuInteraction[evt.target.closest('.menuButton').getAttribute('data-action')](container);
        });
        this.navigationMenu.menuContainer.addEventListener('click', (evt) => {
            navigationMenuInteraction[evt.target.closest('.menuButton').getAttribute('data-action')](container);
        });

        // Add context menu
        this.contextMenu = new ContextMenu(container, ["DELETE", "LOCK", "UNLOCK"]);
        this.contextMenu.menuContainer.addEventListener('click', (evt) => {
            contextMenuInteraction[evt.target.getAttribute('data-action')](container);
            this.contextMenu.close();
        });

        this.mode = "MOVE";
        this.editMenu.setActive("MOVE");

        // Add file input
        this.fileInput = document.createElement('input');
        this.fileInput.style.display = 'none';
        this.fileInput.setAttribute('type', 'file');
        this.container.appendChild(this.fileInput);
        this.fileInput.addEventListener('change', (event) => handleFileUpload(event, container));

        // Add interactivity
        addEventListeners(this);
        zoom(this);

        // generation of random model (activities, existence constraints, relation constraints)
        //const constraintStrings = this.declareModel.generateRandomModel(10, 5, 15);
        
        const str = `
        End('hand over car')
        AtLeastOne('verify problem')
        ExactlyOne('hand over car')
        Init('get customer report')
        ChainResponse('get customer report','verify problem')
        Precedence('verify problem','ask customer for clarification')
        AlternateResponse('ask customer for clarification','verify problem')
        Succession('verify problem','repair car')
        Response('order spare parts','repair car')
        ChainSuccession('repair car','check repair')
        ChainSuccession('check repair','notify customer')
        ChainSuccession('notify customer','hand over car')
        NotResponse('repair car','ask customer for clarification')
        NotResponse('notify customer','repair car')
        NotResponse('hand over car','repair car')
        `;

        const constraintStrings = str.split(/\r?\n/);

        console.log(constraintStrings);

        for (const constraintString of constraintStrings) {
            this.declareModel.addConstraint(constraintString);
        }

        // Enable auto layout
        determineForces(this.declareModel);
        // Disable auto layout after after 10 seconds
        setTimeout(() => { 
            this.declareModel.autoLayout = false; 
            this.declareModel.alignActivities();
        }, 10000);



        // Apply selected mode
        this.enableEdit = !this.enableEdit;
        switchMode(this);
    }

    switchMode() {
        switchMode(this);
    }
}

