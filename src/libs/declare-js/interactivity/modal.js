export class Modal {

    constructor(container) {

        this.background = document.createElement('div');
        container.appendChild(this.background);
        this.background.style.width = "100%";
        this.background.style.height = "100vh";

        this.background.style.position = "absolute";
        this.background.style.top = "0px";

        this.background.style.backgroundColor = "rgba(0,0,0,0.5)";

        this.elem = document.createElement('div');
        this.background.appendChild(this.elem);
        this.elem.style.position = "absolute";
        this.elem.style.top = "10vh";
        this.elem.style.left = "20%";

        this.elem.style.width = "50%";
        this.elem.style.maxWidth = "60%";
        this.elem.style.maxHeight = "80vh";
        this.elem.style.borderRadius = "5px";

        this.elem.style.backgroundColor = "F8F8F8";
        this.elem.style.border = "solid 1px";
        this.elem.style.borderColor = "#BEBEBE";
        this.elem.style.overflow = "hidden";

        this.body = document.createElement('div');
        this.elem.appendChild(this.body);
        this.body.style.width = "calc(100% - 30px)";
        this.body.style.maxHeight = "calc(80vh - 80px)";
        this.body.style.padding = "15px";
        this.body.style.fontFamily = "Tahoma, sans-serif";
        this.body.style.overflowY = "auto";


        this.background.addEventListener("click", (evt) => {
            if (evt.target === this.background) this.close();
        })
    }

    open() {
        this.background.style.display = "unset";
    }

    close() {
        this.background.style.display = "none";
    }
}

export class HelpModal extends Modal {

    constructor(container) {
        super(container);

        this.body.innerHTML = `

        <h3>Import & Export</h3>
        Import: JSON, CSV, TXT<br>
        Export: JSON, SVG, TXT

        <h3>Visual Editor</h3>
        <b>Activities</b> (rounded rectangles) can be placed anywhere on the canvas.<br>
        <b>Existence constraints</b> (small rectangles) must be defined first by choosing a category (position or cardinality) and then selecting the desired value. Afterward, they can be attached to any activity.<br>
        <b>Relation Constraints</b> can be added and edited using the arrow button. Here, properties can be defined to represent specific templates, a list of all supported templates is shown below.<br>
        <br>
        The <b>edit menu</b> on the left also allows to <b>delete</b> and <b>auto-position</b> elements. 
        The <b>context menu</b> can be opened by right-clicking on elements and also allows deleting, as well as locking and unlocking elements, to enable auto-positioning of all unlocked activities. 

        <h3>Textual Editor</h3>
        The textual editor contains three sections:<br>
        <b>Activities</b> & <b>Constraints</b> can be added and changed when the edit mode is turned on. Newly created constraints are automatically added to the visual model as soon as they are valid, until then they are displayed in red.<br>
        A <b>textual description</b> is available when a single visual or textual constraint is selected.<br> 
        <br>
        The text editor also allows sorting activities alphabetically and constraints based on their underlying templates. 

        <h3>Comprehension</h3>
        The visual and textual models are linked, so <b>hovering</b> over elements in the textual editor highlights the visual constraint and related activities, and vice versa. This also applies to the <b>selection</b> of activities and constraints.


        The following templates are currently supported by declare-js:
        <br><br>
        <h3>Template Overview</h3>
        <table border="1" cellspacing="0" cellpadding="5" style="text-align: left;">
            <thead>
                <tr>
                <th><b>Existence Templates </b><br><span>(one parameter)</span></th>
                    <th colspan="2"><b>Relation Templates </b><br><span>(two parameters)</span></th>
                </tr>
            </thead>
            <tbody>
                <!-- Row for Templates -->
                <tr>
                    <!-- Existence Templates -->
                    <td valign="top">
                        Init/End <br>
                        AtLeastOne | AtLeastTwo | AtLeastThree <br>
                        ExactlyOne | ExactlyTwo | ExactlyThree <br>
                        AtMostOne | AtMostTwo | AtMostThree <br>
                        Absence
                    </td>

                    <!-- Relation Templates - First Column -->
                    <td valign="top">
                        RespondedExistence <br>
                        CoExistence <br>
                        [Chain | Alternate]Response <br>
                        [Chain | Alternate]Precedence <br>
                        [Chain | Alternate]Succession <br>
                    </td>

                    <!-- Relation Templates - Second Column -->
                    <td valign="top">
                        NotRespondedExistence <br>
                        NotCoExistence <br>
                        Not[Chain]Response <br>
                        Not[Chain]Precedence <br>
                        Not[Chain]Succession
                    </td>
                </tr>
            </tbody>
        </table>

        
        `;
    }
}