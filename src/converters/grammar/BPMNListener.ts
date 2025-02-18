import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Flow } from "./model/Flow";
import { StatementMetadata } from "./model/StatementMetadata";
import { SentenceParser } from "./SentenceParser";
import { SharedModelStorage } from "./SharedModelStorage";
import { HelperFunctions } from "./HelperFunctions";
import { ActivityType } from "./model/ActivityType";
import { Activity } from "./model/Activity";
import BpmnModdle from 'bpmn-moddle';
import { Writer } from 'moddle-xml';
  

export enum SUBPROCESS_BORDERS {
	IN,
	OUT,
}

export class BPMNListener implements SentenceParser {

	private static readonly START_EVENT = "bpmn_start";
	private static readonly END_EVENT = "bpmn_end";

	private progress: number = 0;
	private tasks: Map<string, string> = new Map<string, string>();
	private gateways: Set<string> = new Set<string>();
	private flows: Set<string> = new Set<string>();
	private roles: Map<string, Set<string>> = new Map<string, Set<string>>(); // role -> activities

	private inputFileName: string;
	private currentStatement: StatementMetadata;
	private modelStorage: SharedModelStorage;

	constructor() {
		this.modelStorage = SharedModelStorage.getInstance();
		this.inputFileName = ""; // redundant initialization
		this.currentStatement = new StatementMetadata(0); // redundant initialization
	}

	setInputFileName(inputFileName: string): void {
		this.inputFileName = inputFileName;
	}

	setStatementMetadata(statementMetadata: StatementMetadata): void {
		this.currentStatement = statementMetadata;
	}

	handleInitialStatement(initialTransition: TerminalNode[]): void {
		const activityIntermediatePlaceText = HelperFunctions.getActivityText(initialTransition);
		this.addFlow(BPMNListener.START_EVENT, this.getOrCreateActivityFromLabel(activityIntermediatePlaceText));
	}

	handleClosingStatementSequence(): void {
		for (const preActivity of this.currentStatement.getPostActivities()) {
			this.addFlow(this.getOrCreateActivity(preActivity), BPMNListener.END_EVENT);
		}
	}

	handleClosingStatementAnd(): void {
		let idGateway = this.createAndGateway();
		this.addFlow(idGateway, BPMNListener.END_EVENT);
		for (const postActivity of this.currentStatement.getPostActivities()) {
			this.addFlow(this.getOrCreateActivity(postActivity), idGateway);
		}
	}

	handleClosingStatementOr(): void {
		let idGateway = this.createXorGateway();
		this.addFlow(idGateway, BPMNListener.END_EVENT);
		for (const postActivity of this.currentStatement.getPostActivities()) {
			this.addFlow(this.getOrCreateActivity(postActivity), idGateway);
		}
	}

	handleActivity(activityText: TerminalNode[]): void {
		this.getOrCreateActivityFromLabel(HelperFunctions.getActivityText(activityText));
	}

	handleAspDeclaration(aspId: string): void { }

	handleOspDeclaration(ospId: string): void { }

	handlePreSequencePostSequence(): void {
		const fromActivity = this.currentStatement.getPostActivities()[0];
		const toActivity = this.currentStatement.getPreActivities()[0];
		this.addFlow(this.getOrCreateActivity(fromActivity, SUBPROCESS_BORDERS.OUT), this.getOrCreateActivity(toActivity, SUBPROCESS_BORDERS.IN));
	}

	handlePreAndPostSequence(): void {
		let idGateway = this.createAndGateway();

		for (const fromActivity of this.currentStatement.getPostActivities()) {
			this.addFlow(this.getOrCreateActivity(fromActivity, SUBPROCESS_BORDERS.OUT), idGateway);
		}

		for (const toActivity of this.currentStatement.getPreActivities()) {
			this.addFlow(idGateway, this.getOrCreateActivity(toActivity, SUBPROCESS_BORDERS.IN));
		}
	}

	handlePreRepeatSincePostSequence(): void {
		let idGateway = this.createXorGateway();

		for (const fromActivity of this.currentStatement.getPostActivities()) {
			this.addFlow(this.getOrCreateActivity(fromActivity, SUBPROCESS_BORDERS.OUT), idGateway);
		}

		for (const toActivity of this.currentStatement.getPreActivities()) {
			this.addFlow(idGateway, this.getOrCreateActivity(toActivity, SUBPROCESS_BORDERS.IN));
		}
	}

	handlePreOrPostSequence(): void {
		let idGateway = this.createXorGateway();
		for (const postActivity of this.currentStatement.getPostActivities()) {
			let splitActivity = this.getOrCreateActivity(postActivity);
			this.addFlow(splitActivity, idGateway);
		}
		for (const preActivity of this.currentStatement.getPreActivities()) {
			let joinActivity = this.getOrCreateActivity(preActivity);
			this.addFlow(idGateway, joinActivity);
		}
	}

	handlePreEventuallyPostSequence(): void {
		this.handlePreSequencePostSequence();
	}

	handlePreSequencePostAnd(): void {
		let idGateway = this.createAndGateway();
		for (const toActivity of this.currentStatement.getPreActivities()) {
			this.addFlow(idGateway, this.getOrCreateActivity(toActivity, SUBPROCESS_BORDERS.IN));
		}
		for (const postActivity of this.currentStatement.getPostActivities()) {
			let fromActivity = postActivity;
			this.addFlow(this.getOrCreateActivity(fromActivity, SUBPROCESS_BORDERS.OUT), idGateway);
		}
	}

	handlePreAndPostAnd(): void {
		let idGateway1 = this.createAndGateway();
		let idGateway2 = this.createAndGateway();
		this.addFlow(idGateway1, idGateway2);
		for (const fromActivity of this.currentStatement.getPostActivities()) {
			this.addFlow(this.getOrCreateActivity(fromActivity, SUBPROCESS_BORDERS.OUT), idGateway1);
		}
		for (const toActivity of this.currentStatement.getPreActivities()) {
			this.addFlow(idGateway2, this.getOrCreateActivity(toActivity, SUBPROCESS_BORDERS.IN));
		}
	}

	handlePreRepeatSincePostAnd(): void {
		let idGateway1 = this.createAndGateway();
		let idGateway2 = this.createXorGateway();
		this.addFlow(idGateway1, idGateway2);

		for (const fromActivity of this.currentStatement.getPostActivities()) {
			this.addFlow(this.getOrCreateActivity(fromActivity, SUBPROCESS_BORDERS.OUT), idGateway1);
		}

		for (const toActivity of this.currentStatement.getPreActivities()) {
			this.addFlow(idGateway2, this.getOrCreateActivity(toActivity, SUBPROCESS_BORDERS.IN));
		}
	}

	handlePreOrPostAnd(): void {
		let idGateway1 = this.createAndGateway();
		let idGateway2 = this.createXorGateway();
		this.addFlow(idGateway1, idGateway2);
		for (const fromActivity of this.currentStatement.getPostActivities()) {
			this.addFlow(this.getOrCreateActivity(fromActivity, SUBPROCESS_BORDERS.OUT), idGateway1);
		}
		for (const toActivity of this.currentStatement.getPreActivities()) {
			this.addFlow(idGateway2, this.getOrCreateActivity(toActivity, SUBPROCESS_BORDERS.IN));
		}
	}

	handlePreEventuallyPostAnd(): void {
		this.handlePreSequencePostAnd();
	}

	handlePreSequencePostOr(): void {
		let idGateway = this.createXorGateway();
		for (const fromActivity of this.currentStatement.getPostActivities()) {
			this.addFlow(this.getOrCreateActivity(fromActivity, SUBPROCESS_BORDERS.OUT), idGateway);
		}
		for (const toActivity of this.currentStatement.getPreActivities()) {
			this.addFlow(idGateway, this.getOrCreateActivity(toActivity, SUBPROCESS_BORDERS.IN));
		}
	}

	handlePreAndPostOr(): void {
		let idGateway1 = this.createXorGateway();
		let idGateway2 = this.createAndGateway();
		this.addFlow(idGateway1, idGateway2);

		for (const fromActivity of this.currentStatement.getPostActivities()) {
			this.addFlow(this.getOrCreateActivity(fromActivity, SUBPROCESS_BORDERS.OUT), idGateway1);
		}
		for (const toActivity of this.currentStatement.getPreActivities()) {
			this.addFlow(idGateway2, this.getOrCreateActivity(toActivity, SUBPROCESS_BORDERS.IN));
		}
	}

	handlePreRepeatSincePostOr(): void {
		let idGateway1 = this.createXorGateway();
		let idGateway2 = this.createXorGateway();
		this.addFlow(idGateway1, idGateway2);

		for (const fromActivity of this.currentStatement.getPostActivities()) {
			this.addFlow(this.getOrCreateActivity(fromActivity, SUBPROCESS_BORDERS.OUT), idGateway1);
		}

		for (const toActivity of this.currentStatement.getPreActivities()) {
			this.addFlow(idGateway2, this.getOrCreateActivity(toActivity, SUBPROCESS_BORDERS.IN));
		}
	}

	handlePreOrPostOr(): void {
		let idGatewayJoin = this.createXorGateway();
		let idGatewaySplit = this.createXorGateway();
		this.addFlow(idGatewayJoin, idGatewaySplit);

		for (const fromActivity of this.currentStatement.getPostActivities()) {
			this.addFlow(this.getOrCreateActivity(fromActivity, SUBPROCESS_BORDERS.OUT), idGatewayJoin);
		}

		for (const toActivity of this.currentStatement.getPreActivities()) {
			this.addFlow(idGatewaySplit, this.getOrCreateActivity(toActivity, SUBPROCESS_BORDERS.IN));
		}
	}

	handlePreEventuallyPostOr(): void {
		this.handlePreSequencePostOr();
	}

	handleRoleForActivity(roleText: TerminalNode[], activityText: TerminalNode[]): void {
		let role = HelperFunctions.getActivityText(roleText);
		let activity = HelperFunctions.getActivityText(activityText);
		for (const roleKey of this.roles.keys()) {
			if (this.roles.get(roleKey).has(activity)) {
				this.roles.get(roleKey).delete(activity);
			}
		}
		if (this.roles.has(role)) {
			this.roles.get(role).add(activity);
		} else {
			this.roles.set(role, new Set([activity]));
		}
	}

	printAndSaveModel(): void {
		// console.log("Places: ", Array.from(this.places));
		// console.log("Transitions: ", this.modelStorage.getTransitions());
		// console.log("Flows: ", Array.from(this.flows));

		let output: string = `digraph G {
	rankdir="LR";
	
	// start events
	node [
		label="",
		shape="circle",
		width="0.3",
		fontcolor="#000000",
		fontname="sans-serif",
		fontsize=12.0,
		penwidth=1,
	];
	${BPMNListener.START_EVENT};
	
	// end events
	node [
		label="",
		shape="circle",
		width="0.3",
		fontcolor="#000000",
		fontname="sans-serif",
		fontsize=12.0,
		penwidth=4,
	];
	${BPMNListener.END_EVENT};

	// activities
	node [
		shape="box",
		style="rounded,filled",
		fillcolor="#ffffff:#ffffcb",
		gradientangle=300,
		color="#303030",
		width="0.5",
		fontcolor="#303030",
		fontname="sans-serif",
		fontsize="10.0",
		penwidth=1
	];`;

		// adding tasks
		for (const label of this.tasks.keys()) {
			output = output + `\n${this.tasks.get(label)} [label=<<table border='0'><tr><td height='30'>${label}</td></tr></table>>];`;
		}

		// adding roles
		for (const role of this.roles.keys()) {
			output = output + `\nsubgraph cluster_${role} {
		label = "${role}";
    fontname="sans-serif";
	fontsize="10.0";
	fontcolor = "#333333";
	style = "filled";
    color = "#DDDDDD";\n\n`;
			for (const activity of this.roles.get(role)) {
				output = output + `${this.getOrCreateActivityFromLabel(activity)};\n`;
			}
			output = output + "\n}";
		}

		// adding gateways
		output = output + `
		// gateways
	node [
		shape="diamond",
		style="solid",
		fixedsize=true,
		width="0.4",
		height="0.4",
		fontsize=25,
		fontcolor="#000000",
		fontname="sans-serif"
	];`
		for (const gateway of this.gateways) {
			output = output + `\n${gateway.id} [label="${gateway.type == "PARALLEL" ? "+" : "&times;"}"];`;
		}

		// adding edges
		output = output + `\n// edges
	edge[
		color="#303030"
	];`;
		for (const flow of this.flows) {
			output = output + `\n${flow.source} -> ${flow.target};`;
		}

		output = output + "\n}";

		this.modelStorage.addOutputText(output);
		this.modelStorage.addOutputText(this.getBPMNModel());
	}

	getBPMNModel(): string {

		const moddle = new BpmnModdle();

		let allElements = new Map<string, any>();
		let elements = [];
		let shapes = [];

		let i = 0;

		// add tasks
		for (const label of this.tasks.keys()) {
			let element = moddle.create('bpmn:Task', { id: this.tasks.get(label), name: label });
			elements.push(element);
			allElements.set(this.tasks.get(label), element);
			shapes.push(moddle.create('bpmndi:BPMNShape', {
				id: this.tasks.get(label) + "_di",
				bpmnElement: element,
				bounds: moddle.create('dc:Bounds', { x: 200 * i, y: 100 * i, width: 80, height: 60 })
			}));
			i++;
		}

		// add gateways
		for (const gateway of this.gateways) {
			let element = moddle.create((gateway.type === 'PARALLEL' ? 'bpmn:ParallelGateway' : 'bpmn:ExclusiveGateway'), { id: gateway.id });
			elements.push(element);
			allElements.set(gateway.id, element);
			shapes.push(moddle.create('bpmndi:BPMNShape', {
				id: gateway.id + "_di",
				bpmnElement: element,
				bounds: moddle.create('dc:Bounds', { x: 200 * i, y: 100 * i, width: 50, height: 50 })
			}));
			i++;
		}

		// add start and end events
		let start_element = moddle.create('bpmn:StartEvent', { id: BPMNListener.START_EVENT });
		elements.push(start_element);
		allElements.set(BPMNListener.START_EVENT, start_element);
		shapes.push(moddle.create('bpmndi:BPMNShape', {
			id: BPMNListener.START_EVENT + "_di",
			bpmnElement: start_element,
			bounds: moddle.create('dc:Bounds', { x: 100, y: 100, width: 36, height: 36 })
		}));
		let end_element = moddle.create('bpmn:EndEvent', { id: BPMNListener.END_EVENT });
		elements.push(end_element);
		allElements.set(BPMNListener.END_EVENT, end_element);
		shapes.push(moddle.create('bpmndi:BPMNShape', {
			id: BPMNListener.END_EVENT + "_di",
			bpmnElement: end_element,
			bounds: moddle.create('dc:Bounds', { x: 350, y: 100, width: 36, height: 36 })
		}));

		// add flows
		for (const flow of this.flows) {
			let element = moddle.create('bpmn:SequenceFlow', {
				id: flow.source + "_" + flow.target,
				sourceRef: allElements.get(flow.source),
				targetRef: allElements.get(flow.target)
			});
			elements.push(element);
			shapes.push(moddle.create('bpmndi:BPMNEdge', {
				id: flow.source + "_" + flow.target + "_di",
				bpmnElement: element,
				sourceElement: allElements.get(flow.source),
				targetElement: allElements.get(flow.target),
				waypoint: [] //moddle.create('dc:Point', { x: 100, y: 100 }), moddle.create('dc:Point', { x: 200, y: 200 })]
			}));
		}

		// add lanes -- currently not exported
		// const laneSet = moddle.create('bpmn:LaneSet', { id: 'LaneSet_1', lanes: [] });
		// let lanesTmp = [];
		// for (const role of this.roles.keys()) {
		// 	let lane = moddle.create('bpmn:Lane', { id: role, name: role });
		// 	let laneFlowElements = [];
		// 	for (const activity of this.roles.get(role)) {
		// 		laneFlowElements.push(allElements.get(activity));
		// 	}
		// 	lane.flowNodeRef = laneFlowElements;
		// 	lanesTmp.push(lane);
		// 	laneSet.lanes.push(lane);
		// }

		// Create a BPMN model
		const process = moddle.create('bpmn:Process', {
			id: 'Process_1',
			isExecutable: true,
			flowElements: elements,
		});
		// process.laneSets = [laneSet];

		// Create BPMN diagram elements (needed for visualization)
		const bpmnDiagram = moddle.create('bpmndi:BPMNDiagram', {
			id: 'BPMNDiagram_1',
			bpmnElement: process
		});
		const bpmnPlane = moddle.create('bpmndi:BPMNPlane', {
			id: 'BPMNPlane_1',
			bpmnElement: process
		});

		// Add shapes to the diagram
		bpmnPlane.set('planeElement', shapes);
		bpmnDiagram.set('plane', bpmnPlane);

		// Create BPMN definitions
		const definitions = moddle.create('bpmn:Definitions', {
			targetNamespace: 'http://bpmn.io/schema/bpmn',
			rootElements: [process, bpmnDiagram]
		});

		var writer = new Writer();
		return writer.toXML(definitions);
	}

	private getId(): string {
		return "c_" + this.progress++;
	}

	private getOrCreateActivity(act: Activity, direction = SUBPROCESS_BORDERS.IN): string {
		if (act.getType() === ActivityType.ACTIVITY) {
			return this.getOrCreateActivityFromLabel(act.getName());
		} else if (act.getType() === ActivityType.AND_SUBPROCESS) {
			const id = this.createAndGateway();
			for (const andActivity of this.modelStorage.getAndSubProcess(act.getName())) {
				if (direction === SUBPROCESS_BORDERS.IN) {
					this.addFlow(id, this.getOrCreateActivity(andActivity));
				} else {
					this.addFlow(this.getOrCreateActivity(andActivity), id);
				}
			}
			return id;
		} else if (act.getType() === ActivityType.OR_SUBPROCESS) {
			const id = this.createXorGateway();
			for (const andActivity of this.modelStorage.getOrSubProcess(act.getName())) {
				if (direction === SUBPROCESS_BORDERS.IN) {
					this.addFlow(id, this.getOrCreateActivity(andActivity));
				} else {
					this.addFlow(this.getOrCreateActivity(andActivity), id);
				}
			}
			return id;
		} else if (act.getType() === ActivityType.REPEAT_SINCE_ACTIVITY) {
			// const id = this.createXorGateway();
			// this.addFlow(id, this.getOrCreateActivityFromLabel(act.getName()));
			// return id;
			return this.getOrCreateActivityFromLabel(act.getName());
		}
		return "";
	}

	private getOrCreateActivityFromLabel(label: string): string {
		if (this.tasks.has(label)) {
			return this.tasks.get(label);
		} else {
			const id = this.getId();
			this.tasks.set(label, id);
			return id;
		}
	}

	private createAndGateway(): string {
		const id = this.getId();
		this.gateways.add({ id: id, type: "PARALLEL" });
		return id;
	}

	private createXorGateway(): string {
		const id = this.getId();
		this.gateways.add({ id: id, type: "EXCLUSIVE" });
		return id;
	}

	private addFlow(source: string, target: string): void {
		this.flows.add({ source: source, target: target });
	}
}
