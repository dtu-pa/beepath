import * as icons from "../svg/icons.js";

class Submenu {

    constructor(declare) {

        this.declare = declare;
        this.segments = new Set();

        this.top;
        this.left;
        this.width = "200px";

        // Define menu container style
        this.menuContainer = document.createElement('div');
        this.declare.container.appendChild(this.menuContainer);
        this.menuContainer.style.position = "absolute";
        this.menuContainer.style.left = "71px";
        this.menuContainer.style.width = "0px";

        this.menuContainer.style.backgroundColor = "F8F8F8";
        this.menuContainer.style.border = "solid 1px";
        this.menuContainer.style.borderColor = "#BEBEBE";
        this.menuContainer.style.borderRadius = "0px 4px 4px 4px";

        this.menuContainer.style.transition = "width 0.5s";
        this.menuContainer.style.visibility = "hidden";
        this.menuContainer.style.overflow = "hidden";
        this.menuContainer.style.whiteSpace = "nowrap";

        // Define heading
        this.heading = document.createElement('div');
        this.menuContainer.appendChild(this.heading);
        this.heading.style.width = "100%";
        this.heading.style.height = "10px";
        this.heading.style.padding = "7px 0";
        this.heading.style.backgroundColor = "rgb(200, 200, 200)";
        this.heading.style.textAlign = "center";
        this.heading.style.fontFamily = "Arial, sans-serif";
        this.heading.style.fontSize = "12px";
        this.heading.style.fontWeight = "bold";

        // Define subheading
        this.subheading = document.createElement('div');
        this.menuContainer.appendChild(this.subheading);
        this.subheading.style.width = "100%";
        this.subheading.style.height = "10px";
        this.subheading.style.padding = "7px 0";
        this.subheading.style.backgroundColor = "rgb(200, 200, 200)";
        this.subheading.style.textAlign = "center";
        this.subheading.style.fontFamily = "Arial, sans-serif";
        this.subheading.style.fontSize = "9px";
        this.subheading.style.fontStyle = "italic";
        this.subheading.innerHTML = "(Hover over buttons for additional information.)";

    }

    // Open the submenu
    open() {
        this.menuContainer.style.visibility = "unset";
        this.menuContainer.style.width = "200px";
    }

    // Close the submenu
    close() {
        this.menuContainer.style.width = "0px";
        setTimeout(() => { if (this.menuContainer.style.width !== "200px") this.menuContainer.style.visibility = "hidden"; }, 500);
    }

    getSelectedOptions() {
        let selectedOptions = new Map();
        for (const segment of this.segments) {
            selectedOptions.set(segment.name, segment.buttonGroup.getSelection());
        }
        return selectedOptions;
    }

    displayAllOptions() {
        for (const segment of this.segments) {
            segment.display()
            segment.buttonGroup.displayButtons();
        }
    }

    getSegment(segmentName) {
        return Array.from(this.segments).find(({ name }) => name === segmentName);
    }
}

export class ExistenceConstraintSubmenu extends Submenu {

    constructor(container) {
        super(container);

        this.menuContainer.style.top = "121px"
        this.heading.innerHTML = "Edit Existence Constraint";

        // Add segments
        this.segments.add(new Segment(this, "Category", ["POSITION", "CARDINALITY"]));
        this.segments.add(new Segment(this, "Position", ["INIT", "END"]));
        this.segments.add(new Segment(this, "Cardinality Type", ["AT_LEAST", "EXACTLY", "AT_MOST", "ABSENCE"]));
        this.segments.add(new Segment(this, "Cardinality", ["ONE", "TWO", "THREE"]));

        this.hideOptions();
    }

    // Hide options that can't be used together
    hideOptions() {
        this.displayAllOptions();
        let options = this.getSelectedOptions();

        if (options.get("Category") === "POSITION") {
            this.getSegment("Cardinality Type").hide();
            this.getSegment("Cardinality").hide();
        }
        if (options.get("Category") === "CARDINALITY") {
            this.getSegment("Position").hide();
        }
        if (options.get("Cardinality Type") === "ABSENCE") {
            this.getSegment("Cardinality").hide();
        }
    }

    getTemplate() {
        let options = this.getSelectedOptions();

        if (options.get("Category") === "POSITION") {
            return options.get("Position") === "INIT" ? "Init" : (options.get("Position") === "END" ? "End" : undefined);
        } else if (options.get("Category") == "CARDINALITY") {
            if (options.get("Cardinality Type") === "ABSENCE") return "Absence";

            const cardinalityTypeMapping = {
                "AT_LEAST": "AtLeast",
                "EXACTLY": "Exactly",
                "AT_MOST": "AtMost"
            };

            const cardinalityNumberMapping = {
                "ONE": "One",
                "TWO": "Two",
                "THREE": "Three"
            }

            return cardinalityTypeMapping[options.get("Cardinality Type")] + cardinalityNumberMapping[options.get("Cardinality")];
        } else return undefined;
    }

    setOptions(constraint) {

        var segment = this.getSegment("Category");
        if (constraint.template === "Init" || constraint.template === "End") {
            segment.buttonGroup.selectSetting("POSITION");

            segment = this.getSegment("Position");
            constraint.template === "Init" ? segment.buttonGroup.selectSetting("INIT") : segment.buttonGroup.selectSetting("END");
        } else {
            segment.buttonGroup.selectSetting("CARDINALITY");

            segment = this.getSegment("Cardinality Type");
            if (constraint.template === "Absence") {
                segment.buttonGroup.selectSetting("ABSENCE");
            } else {
                if (constraint.template.startsWith("AtLeast")) {
                    segment.buttonGroup.selectSetting("AT_LEAST");
                } else if (constraint.template.startsWith("Exactly")) {
                    segment.buttonGroup.selectSetting("EXACTLY");
                } else {
                    segment.buttonGroup.selectSetting("AT_MOST");
                }

                segment = this.getSegment("Cardinality");
                if (constraint.template.endsWith("One")) {
                    segment.buttonGroup.selectSetting("ONE");
                } else if (constraint.template.endsWith("Two")) {
                    segment.buttonGroup.selectSetting("TWO");
                } else {
                    segment.buttonGroup.selectSetting("THREE");
                }
            }
        }
        this.hideOptions();
    }

    close() {
        super.close();
        setTimeout(() => {this.heading.innerHTML = "Edit Existence Constraint"}, 500);
    }
}

export class RelationConstraintSubmenu extends Submenu {

    constructor(container) {
        super(container);

        this.menuContainer.style.top = "171px"
        this.heading.innerHTML = "Edit Relation Constraint";

        // Add segments
        this.segments.add(new Segment(this, "Order", ["ARROW", "NO_ARROW"]));
        this.segments.add(new Segment(this, "Prefix", ["ONE_LINE", "TWO_LINES", "THREE_LINES"]));
        this.segments.add(new Segment(this, "Activation", ["A", "B", "BOTH"]));
        this.segments.add(new Segment(this, "Negation", ["NO_NEGATION", "NEGATION"]));

        this.hideOptions();
    }

    // Hide options that can't be used together
    hideOptions() {
        this.displayAllOptions();
        let options = this.getSelectedOptions();

        if (options.get("Order") === "NO_ARROW") {
            let segment = this.getSegment("Prefix");
            segment.hide();
            segment.buttonGroup.selectSetting("ONE_LINE");
        }
        if (options.get("Prefix") !== "ONE_LINE") {
            let segment = this.getSegment("Order");
            segment.hide();
            segment.buttonGroup.selectSetting("ARROW");
        }

        if (options.get("Prefix") === "TWO_LINES") {
            let segment = this.getSegment("Negation");
            segment.hide();
            segment.buttonGroup.selectSetting("NO_NEGATION");
        }
        if (options.get("Negation") === "NEGATION") {
            let segment = this.getSegment("Prefix");
            segment.buttonGroup.hideButton("TWO_LINES");
            if (options.get("Prefix") === "TWO_LINES") segment.buttonGroup.selectSetting("ONE_LINE");
        }
    }

    getTemplate() {
        let options = this.getSelectedOptions();

        if (options.get("Order") === "NO_ARROW") {
            if (options.get("Activation") === "BOTH") {
                return options.get("Negation") === "NO_NEGATION" ? "CoExistence" : "NotCoExistence";
            } else if ((options.get("Activation") === "A" || options.get("Activation") === "B") && options.get("Negation") === "NEGATION") {
                return "NotRespondedExistence";
            } else {
                return "RespondedExistence";
            }
        }

        const prefixMapping = {
            "TWO_LINES": "Alternate",
            "THREE_LINES": "Chain"
        };

        const typeMapping = {
            "A": "Response",
            "B": "Precedence",
            "BOTH": "Succession"
        };

        const prefix = prefixMapping[options.get("Prefix")] || "";
        const neg = options.get("Negation") === "NEGATION" ? "Not" : "";
        const type = typeMapping[options.get("Activation")] || "";

        // can be removed if this case is prevented in the first place
        if (neg === "Not" && prefix === "Alternate") return undefined;

        return neg + prefix + type;
    }

    setOptions(constraint) {

        let segment = this.getSegment("Order");
        constraint.directed ? segment.buttonGroup.selectSetting("ARROW") : segment.buttonGroup.selectSetting("NO_ARROW");

        segment = this.getSegment("Prefix");
        constraint.pathCount === 1 ? segment.buttonGroup.selectSetting("ONE_LINE") : (constraint.pathCount === 2 ? segment.buttonGroup.selectSetting("TWO_LINES") : segment.buttonGroup.selectSetting("THREE_LINES"));

        segment = this.getSegment("Activation");
        constraint.activationA ? (constraint.activationB ? segment.buttonGroup.selectSetting("BOTH") : segment.buttonGroup.selectSetting("A")) : segment.buttonGroup.selectSetting("B");

        segment = this.getSegment("Negation");
        constraint.negation ? segment.buttonGroup.selectSetting("NEGATION") : segment.buttonGroup.selectSetting("NO_NEGATION");

        this.hideOptions();
    }

    close() {
        super.close();
        setTimeout(() => {this.heading.innerHTML = "Edit Relation Constraint"}, 500);
    }
}

// Segment in submenu
class Segment {

    constructor(submenu, segmentName, buttons) {

        this.submenu = submenu;
        this.name = segmentName;

        // Define heading
        this.heading = document.createElement('div');
        this.submenu.menuContainer.appendChild(this.heading);
        this.heading.style.width = "100%";
        this.heading.style.height = "10px";
        this.heading.style.padding = "4px 8px 8px 8px"
        this.heading.style.whiteSpace = "nowrap";
        this.heading.style.overflow = "hidden";
        this.heading.style.fontSize = "11px";
        this.heading.style.fontFamily = "Arial, sans-serif";
        this.heading.innerHTML = this.name;
        this.heading.style.display = "block";


        // Create buttons
        this.buttonGroup = new Buttongroup(this, buttons);
        this.buttonGroup.buttonGroup.style.display = "flex";
    }

    hide() {
        for (const btn of this.buttonGroup.buttons) {
            btn.style.opacity = 0.3;
        }
    }

    display() {
        for (const btn of this.buttonGroup.buttons) {
            btn.style.opacity = 1;
        }
    }
}

// Buttongroup in segment
class Buttongroup {

    constructor(segment, buttons) {

        this.segment = segment;
        this.selectedButton;
        this.buttons = new Set();

        this.buttonGroup = document.createElement('div');
        this.segment.submenu.menuContainer.appendChild(this.buttonGroup);
        this.buttonGroup.style.heigth = "30px";
        this.buttonGroup.style.width = "calc(100% - 20px)";
        this.buttonGroup.style.margin = "0px 10px 10px 10px";
        this.buttonGroup.style.position = "relative";

        this.buttonGroup.style.backgroundColor = "F8F8F8";
        this.buttonGroup.style.border = "solid 1px";
        this.buttonGroup.style.borderColor = "#BEBEBE";
        this.buttonGroup.style.borderRadius = "4px";

        for (const button of buttons) {

            const buttonDescriptions = {
                "AT_MOST": "AtMost",
                "AT_LEAST": "AtLeast",
                "EXACTLY": "Exactly",
                "ABSENCE": "Absence",
                "ONE_LINE": "(none)",
                "TWO_LINES": "Alternate",
                "THREE_LINES": "Chain",
                "A": "activated by first activity",
                "B": "activated by second activity",
                "BOTH": "activated by both activities",
                "ARROW": "directed",
                "NO_ARROW": "undirected",
                "NEGATION": "Not",
                "NO_NEGATION": "(no negation)",
                "POSITION": "Position in a trace.",
                "CARDINALITY": "Number of occurrences in a trace.",
                "INIT": "First element in a trace.",
                "END": "Last element in a trace.",
            };

            let buttonElem = document.createElement('button');
            this.buttons.add(buttonElem);

            this.buttonGroup.appendChild(buttonElem);
            buttonElem.classList.add("subMenuButton")
            //buttonElem.style.width = 100 / buttons.length + "%";
            buttonElem.style.flexGrow = "1";
            buttonElem.style.flexBasis = "0";
            buttonElem.style.backgroundColor = "F8F8F8";
            buttonElem.style.height = "30px";
            buttonElem.style.border = "none";
            buttonElem.style.cursor = "pointer";
            buttonElem.setAttribute('data-option', button);
            buttonElem.title = buttonDescriptions[button] || "";

            buttonElem.innerHTML = icons[button];

        }
        // Select the first option as default
        this.selectSetting(buttons[0]);


        this.buttonGroup.addEventListener("click", (evt) => {
            let dataOption = evt.target.closest(".subMenuButton").getAttribute('data-option')
            this.selectSetting(dataOption);
            this.segment.submenu.hideOptions();
            if (this.segment.submenu.declare.mouseAttachment) this.segment.submenu.declare.mouseAttachment.updateTemplate(this.segment.submenu.getTemplate(), this.segment.submenu.declare.view.shape);
        })
    }

    getButton(dataOption) {
        return Array.from(this.buttons).find((btn) => btn.getAttribute("data-option") === dataOption);
    }

    selectSetting(dataOption) {
        let selection = this.getButton(dataOption);
        if (selection.style.opacity !== "0.3") {
            if (this.selectedButton) this.selectedButton.style.backgroundColor = "F8F8F8";
            this.selectedButton = selection;
            this.selectedButton.style.backgroundColor = "rgb(200, 200, 200)";
        }
    }

    getSelection() {
        return this.selectedButton.getAttribute("data-option");
    }

    hideButton(dataOption) {
        let btn = this.getButton(dataOption);
        btn.style.opacity = 0.3;
    }

    displayButtons() {
        for (const btn of this.buttons) {
            btn.style.opacity = 1;
        }
    }
}