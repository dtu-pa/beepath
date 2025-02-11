import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Flow } from "./model/Flow";
import { StatementMetadata } from "./model/StatementMetadata";
import { SentenceParser } from "./SentenceParser";
import { SharedModelStorage } from "./SharedModelStorage";
import { HelperFunctions } from "./HelperFunctions";
import { ActivityType } from "./model/ActivityType";
import { Activity } from "./model/Activity";

export enum SUBPROCESS_BORDERS {
	IN,
	OUT,
}

export class BPMNListener implements SentenceParser {

	private static readonly START_EVENT = "bpmn_start";
	private static readonly END_EVENT = "bpmn_end";

	private progress: number = 0;
	private tasks: Map<string,string> = new Map<string,string>();
	private gateways: Set<string> = new Set<string>();
	private flows: Set<string> = new Set<string>();

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
		for(const toActivity of this.currentStatement.getPreActivities()) {
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
		fontsize="12.0",
		penwidth=1
	];`;

		// adding tasks
		for (const label of this.tasks.keys()) {
			output = output + `\n${this.tasks.get(label)} [label=<<table border='0'><tr><td height='30'>${label}</td></tr></table>>];`;
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
			output = output + `\n${gateway.id} [label="${gateway.type == "PARALLEL"? "+" : "&times;"}"];`;
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
		this.gateways.add({id: id, type: "PARALLEL"});
		return id;
	}

	private createXorGateway(): string {
		const id = this.getId();
		this.gateways.add({id: id, type: "EXCLUSIVE"});
		return id;
	}

	private addFlow(source: string, target: string): void {
		this.flows.add({source: source, target: target});
	}
}
