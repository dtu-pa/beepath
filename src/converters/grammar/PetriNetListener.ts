import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Flow } from "./model/Flow";
import { StatementMetadata } from "./model/StatementMetadata";
import { SentenceParser } from "./SentenceParser";
import { SharedModelStorage } from "./SharedModelStorage";
import { HelperFunctions } from "./HelperFunctions";
import { ActivityType } from "./model/ActivityType";
import { Activity } from "./model/Activity";

export class PetriNetListener implements SentenceParser {
  private static readonly INITIAL_PLACE = "pn_initial";
  private static readonly FINAL_PLACE = "pn_final";

  private places: Set<string> = new Set<string>();
  private flows: Set<string> = new Set<string>();

  private inputFileName: string;
  private currentStatement: StatementMetadata;
  private modelStorage: SharedModelStorage;

  constructor() {
    this.places.add(PetriNetListener.INITIAL_PLACE);
    this.places.add(PetriNetListener.FINAL_PLACE);
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
    const activityIntermediatePlaceText = HelperFunctions.getActivityIntermediatePlaceText(initialTransition);

    this.flows.add(
      JSON.stringify(new Flow(PetriNetListener.INITIAL_PLACE, HelperFunctions.getActivityTextStart(initialTransition)))
    );
    this.flows.add(
      JSON.stringify(new Flow(HelperFunctions.getActivityTextStart(initialTransition), activityIntermediatePlaceText))
    );
    this.flows.add(
      JSON.stringify(new Flow(activityIntermediatePlaceText, HelperFunctions.getActivityTextEnd(initialTransition)))
    );
  }

  handleClosingStatementSequence(): void {
    const closingTransition = this.currentStatement.getPostActivities()[0].getName();
    this.flows.add(
      JSON.stringify(new Flow(closingTransition + HelperFunctions.END_SUFFIX, PetriNetListener.FINAL_PLACE))
    );
  }

  handleClosingStatementAnd(): void {
    const silentTransition = this.getSilentTransition("closing_and");
    this.handlePostAnd(silentTransition, true);
    this.flows.add(JSON.stringify(new Flow(silentTransition, PetriNetListener.FINAL_PLACE)));
  }

  handleClosingStatementOr(): void {
    this.handlePostOr(PetriNetListener.FINAL_PLACE);
  }

  handleActivity(activityText: TerminalNode[]): void {
    this.modelStorage.addTransition(HelperFunctions.getActivityTextStart(activityText));
    this.modelStorage.addTransition(HelperFunctions.getActivityTextEnd(activityText));
    this.places.add(HelperFunctions.getActivityIntermediatePlaceText(activityText));
  }

  handleAspDeclaration(aspId: string): void {}

  handleOspDeclaration(ospId: string): void {}

  handlePreSequencePostSequence(): void {
    const fromActivity = this.currentStatement.getPostActivities()[0].getName();
    const toActivity = this.currentStatement.getPreActivities()[0].getName();
    const intermediatePlace = HelperFunctions.getPlaceBetweenActivities(fromActivity, toActivity);

    this.places.add(intermediatePlace);
    this.flows = HelperFunctions.mergeSets(
      this.flows,
      HelperFunctions.getFlowsBetweenActivities(fromActivity, toActivity, intermediatePlace, false).map((f) =>
        JSON.stringify(f)
      )
    );
  }

  handlePreAndPostSequence(): void {
    const fromActivity = this.currentStatement.getPostActivities()[0].getName();
    this.handlePreAnd(fromActivity, false);
  }

  handlePreRepeatSincePostSequence(): void {
    const fromActivity = this.currentStatement.getPostActivities()[0].getName();
    const tempRepeatSinceActivity = this.currentStatement
      .getPreActivities()
      .find((a) => a.getType() === ActivityType.REPEAT_SINCE_ACTIVITY);
    let repeatSinceActivity = "";
    if (tempRepeatSinceActivity) {
      repeatSinceActivity = tempRepeatSinceActivity.getName();
    }

    const silentTransition = this.getSilentTransition("repeat_since");

    const xorPlace = HelperFunctions.getIntermediatePlace(
      this.currentStatement.getPostActivities(),
      this.currentStatement.getPreActivities()
    );
    this.places.add(xorPlace);
    this.flows.add(JSON.stringify(new Flow(fromActivity + HelperFunctions.END_SUFFIX, xorPlace)));

    const preActivities = this.getRepeatSincePreActivities(silentTransition);

    this.handlePreOr(preActivities, xorPlace);
    this.handlePreRepeatSince(silentTransition, repeatSinceActivity);
  }

  handlePreOrPostSequence(): void {
    const xorPlace = HelperFunctions.getIntermediatePlace(
      this.currentStatement.getPostActivities(),
      this.currentStatement.getPreActivities()
    );
    this.places.add(xorPlace);

    for (const postActivity of this.currentStatement.getPostActivities()) {
      const fromActivity = postActivity.getName();
      this.flows.add(JSON.stringify(new Flow(fromActivity + HelperFunctions.END_SUFFIX, xorPlace)));

      this.handleXorPlacePreOr(xorPlace);
    }
  }

  handlePreEventuallyPostSequence(): void {
    this.handlePreSequencePostSequence();
  }

  handlePreSequencePostAnd(): void {
    const toActivity = this.currentStatement.getPreActivities()[0].getName();
    this.handlePostAnd(toActivity, false);
  }

  handlePreAndPostAnd(): void {
    const silentTransition = this.getSilentTransition("pre_and_post_and");
    this.handlePostAnd(silentTransition, true);
    this.handlePreAnd(silentTransition, true);
  }

  handlePreRepeatSincePostAnd(): void {
    const tempRepeatSinceActivity = this.currentStatement
      .getPreActivities()
      .find((a) => a.getType() === ActivityType.REPEAT_SINCE_ACTIVITY);
    let repeatSinceActivity = "";
    if (tempRepeatSinceActivity) {
      repeatSinceActivity = tempRepeatSinceActivity.getName();
    }

    const silentTransition = this.getSilentTransition("repeat_since");

    const preActivities = this.getRepeatSincePreActivities(silentTransition);

    this.handlePreOrRepeatSincePostAnd(preActivities);
    this.handlePreRepeatSince(silentTransition, repeatSinceActivity);
  }

  handlePreOrPostAnd(): void {
    this.handlePreOrRepeatSincePostAnd(this.currentStatement.getPreActivities());
  }

  handlePreEventuallyPostAnd(): void {
    this.handlePreSequencePostAnd();
  }

  handlePreSequencePostOr(): void {
    const toActivity = this.currentStatement.getPreActivities()[0];
    const xorPlace = HelperFunctions.getIntermediatePlace(this.currentStatement.getPostActivities(), [toActivity]);
    this.places.add(xorPlace);
    this.flows = HelperFunctions.mergeSets(
      this.flows,
      HelperFunctions.getFlowsToActivity(toActivity.getName(), xorPlace).map((f) => JSON.stringify(f))
    );

    this.handlePostOr(xorPlace);
  }

  handlePreAndPostOr(): void {
    const silentTransition = this.getSilentTransition("pre_and_post_or");
    const xorPlace = HelperFunctions.getIntermediatePlace(this.currentStatement.getPostActivities(), [
      new Activity(silentTransition, ActivityType.ACTIVITY),
    ]);
    this.places.add(xorPlace);
    this.handlePostOr(xorPlace);
    this.flows.add(JSON.stringify(new Flow(xorPlace, silentTransition)));

    this.handlePreAnd(silentTransition, true);
  }

  handlePreRepeatSincePostOr(): void {
    const tempRepeatSinceActivity = this.currentStatement
      .getPreActivities()
      .find((a) => a.getType() === ActivityType.REPEAT_SINCE_ACTIVITY);
    let repeatSinceActivity = "";
    if (tempRepeatSinceActivity) {
      repeatSinceActivity = tempRepeatSinceActivity.getName();
    }

    const silentTransition = this.getSilentTransition("repeat_since");
    const xorPlace = HelperFunctions.getIntermediatePlace(
      this.currentStatement.getPostActivities(),
      this.currentStatement.getPreActivities()
    );
    this.places.add(xorPlace);
    const preActivities = this.getRepeatSincePreActivities(silentTransition);

    this.handlePostOr(xorPlace);
    this.handlePreOr(preActivities, xorPlace);
    this.handlePreRepeatSince(silentTransition, repeatSinceActivity);
  }

  handlePreOrPostOr(): void {
    const xorPlace = HelperFunctions.getIntermediatePlace(
      this.currentStatement.getPostActivities(),
      this.currentStatement.getPreActivities()
    );
    this.places.add(xorPlace);

    this.handlePostOr(xorPlace);
    this.handleXorPlacePreOr(xorPlace);
  }

  handlePreEventuallyPostOr(): void {
    this.handlePreSequencePostOr();
  }

  handleRoleForActivity(roleText: TerminalNode[], activityText: TerminalNode[]): void {}

  printAndSaveModel(): void {
    // console.log("Places: ", Array.from(this.places));
    // console.log("Transitions: ", this.modelStorage.getTransitions());
    // console.log("Flows: ", Array.from(this.flows));

    let output: string = "";
    for (const place of this.places) {
      const init = place == PetriNetListener.INITIAL_PLACE ? "1" : "0";
      output = output + `place ${place} init ${init};\n`;
    }

    for (const transition of this.modelStorage.getTransitions()) {
      const inPlaces: string[] = [];
      const outPlaces: string[] = [];

      for (const flowString of this.flows) {
        const flow = JSON.parse(flowString);
        if (flow.from === transition) {
          outPlaces.push(flow.to);
        } else if (flow.to === transition) {
          inPlaces.push(flow.from);
        }
      }

      output =
        output + `trans ${transition} in ${this.getPlacesString(inPlaces)} out ${this.getPlacesString(outPlaces)};\n`;
    }

    this.modelStorage.addOutputText(output);
  }

  private getPlacesString(places: string[]): string {
    return places.join(" ").trim();
  }

  private handlePreAnd(fromActivity: string, isSilentFromActivity: boolean): void {
    for (const preActivity of this.currentStatement.getPreActivities()) {
      const toActivity = preActivity.getName();
      const intermediatePlace = HelperFunctions.getPlaceBetweenActivities(fromActivity, toActivity);
      this.places.add(intermediatePlace);

      if (preActivity.getType() === ActivityType.ACTIVITY) {
        this.flows = HelperFunctions.mergeSets(
          this.flows,
          HelperFunctions.getFlowsBetweenActivities(
            fromActivity,
            toActivity,
            intermediatePlace,
            isSilentFromActivity
          ).map((f) => JSON.stringify(f))
        );
      } else if (preActivity.getType() === ActivityType.OR_SUBPROCESS) {
        const flowFrom = isSilentFromActivity ? fromActivity : fromActivity + HelperFunctions.END_SUFFIX;
        this.flows.add(JSON.stringify(new Flow(flowFrom, intermediatePlace)));
        this.flows = HelperFunctions.mergeSets(
          this.flows,
          HelperFunctions.getFlowsBetweenActivityAndOsp(
            this.modelStorage.getOrSubProcess(toActivity) || [],
            intermediatePlace
          ).map((f) => JSON.stringify(f))
        );
      }
    }
  }

  private handlePostAnd(toActivity: string, isSilentToActivity: boolean): void {
    for (const postActivity of this.currentStatement.getPostActivities()) {
      const fromActivity = postActivity.getName();
      const intermediatePlace = HelperFunctions.getPlaceBetweenActivities(fromActivity, toActivity);
      this.places.add(intermediatePlace);

      if (postActivity.getType() === ActivityType.ACTIVITY) {
        this.flows.add(JSON.stringify(new Flow(fromActivity + HelperFunctions.END_SUFFIX, intermediatePlace)));
      } else if (postActivity.getType() === ActivityType.OR_SUBPROCESS) {
        this.flows = HelperFunctions.mergeSets(
          this.flows,
          HelperFunctions.getFlowsFromOsp(this.modelStorage.getOrSubProcess(fromActivity) || [], intermediatePlace).map(
            (f) => JSON.stringify(f)
          )
        );
      }
      this.flows = HelperFunctions.mergeSets(
        this.flows,
        HelperFunctions.getFlowsToActivityOrSilentTransition(toActivity, intermediatePlace, isSilentToActivity).map(
          (f) => JSON.stringify(f)
        )
      );
    }
  }

  private handlePostOr(xorPlace: string): void {
    for (const postActivity of this.currentStatement.getPostActivities()) {
      const fromActivity = postActivity.getName();
      if (postActivity.getType() === ActivityType.ACTIVITY) {
        this.flows.add(JSON.stringify(new Flow(fromActivity + HelperFunctions.END_SUFFIX, xorPlace)));
      } else if (postActivity.getType() === ActivityType.AND_SUBPROCESS) {
        this.handleAspInPostActivity(fromActivity, xorPlace);
      }
    }
  }

  private handleXorPlacePreOr(xorPlace: string): void {
    this.handlePreOr(this.currentStatement.getPreActivities(), xorPlace);
  }

  private handlePreOr(preActivities: Activity[], xorPlace: string): void {
    for (const preActivity of preActivities) {
      const toActivity = preActivity.getName();
      if (preActivity.getType() === ActivityType.ACTIVITY) {
        this.flows = HelperFunctions.mergeSets(
          this.flows,
          HelperFunctions.getFlowsToActivity(toActivity, xorPlace).map((f) => JSON.stringify(f))
        );
      } else if (preActivity.getType() === ActivityType.AND_SUBPROCESS) {
        this.handleAspInPreActivity(toActivity, xorPlace);
      } else if (preActivity.getType() === ActivityType.SILENT_ACTIVITY) {
        this.flows = HelperFunctions.mergeSets(
          this.flows,
          HelperFunctions.getFlowsToActivityOrSilentTransition(toActivity, xorPlace, true).map((f) => JSON.stringify(f))
        );
      }
    }
  }

  private getRepeatSincePreActivities(silentTransition: string): Activity[] {
    const preActivities = this.currentStatement
      .getPreActivities()
      .filter((a) => a.getType() !== ActivityType.REPEAT_SINCE_ACTIVITY);
    preActivities.push(new Activity(silentTransition, ActivityType.SILENT_ACTIVITY));
    return preActivities;
  }

  private handlePreRepeatSince(silentTransition: string, repeatSinceActivity: string): void {
    const loopStart = repeatSinceActivity + HelperFunctions.START_SUFFIX;
    const tempFlows: Set<string> = new Set();
    this.flows.forEach((tempFlow) => {
      const flow = JSON.parse(tempFlow);
      if (loopStart === flow.to) {
        tempFlows.add(JSON.stringify(new Flow(silentTransition, flow.from)));
      }
    });

    this.flows = HelperFunctions.mergeSets(this.flows, tempFlows);
  }

  private handlePreOrRepeatSincePostAnd(preActivities: Activity[]): void {
    for (const postActivity of this.currentStatement.getPostActivities()) {
      const fromActivity = postActivity.getName();
      const xorPlace = HelperFunctions.getIntermediatePlace([postActivity], this.currentStatement.getPreActivities());
      this.places.add(xorPlace);

      if (postActivity.getType() === ActivityType.ACTIVITY) {
        this.flows.add(JSON.stringify(new Flow(fromActivity + HelperFunctions.END_SUFFIX, xorPlace)));
      } else if (postActivity.getType() === ActivityType.OR_SUBPROCESS) {
        this.flows = HelperFunctions.mergeSets(
          this.flows,
          HelperFunctions.getFlowsFromOsp(this.modelStorage.getOrSubProcess(fromActivity) || [], xorPlace).map((f) =>
            JSON.stringify(f)
          )
        );
      }
      this.handlePreOr(preActivities, xorPlace);
    }
  }

  private handleAspInPreActivity(toActivity: string, xorPlace: string): void {
    const silentTransition = this.getSilentTransition(toActivity);
    this.flows.add(JSON.stringify(new Flow(xorPlace, silentTransition)));
    this.flows = HelperFunctions.mergeSets(
      this.flows,
      HelperFunctions.getFlowsBetweenActivityAndAsp(
        silentTransition,
        this.modelStorage.getAndSubProcess(toActivity) || []
      ).map((f) => JSON.stringify(f))
    );
  }

  private handleAspInPostActivity(fromActivity: string, xorPlace: string): void {
    const silentTransition = this.getSilentTransition(fromActivity);
    this.flows.add(JSON.stringify(new Flow(silentTransition, xorPlace)));
    this.flows = HelperFunctions.mergeSets(
      this.flows,
      HelperFunctions.getFlowsBetweenAspAndActivity(
        silentTransition,
        this.modelStorage.getAndSubProcess(fromActivity) || []
      ).map((f) => JSON.stringify(f))
    );
  }

  private getSilentTransition(activityName: string): string {
    const silentTransition = HelperFunctions.getSilentTransitionName(
      activityName,
      this.currentStatement.getStatementNumber()
    );
    this.modelStorage.addTransition(silentTransition);
    return silentTransition;
  }
}
