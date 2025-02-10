import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Activity } from "./model/Activity";
import { Flow } from "./model/Flow";
import { DeclareConstraint } from "./model/DeclareConstraint";
import { DeclareConstraintType } from "./model/DeclareConstraintType";

export class HelperFunctions {
  static readonly END_SUFFIX = "_end";
  static readonly START_SUFFIX = "_start";
  static readonly EXECUTING_SUFFIX = "_executing";

  static getActivityText(words: TerminalNode[]): string {
    let sb = "";
    for (const word of words) {
      sb += word.text + "_";
    }
    return sb.slice(0, -1);
  }

  static getActivityTextStart(words: TerminalNode[]): string {
    return this.getActivityText(words) + this.START_SUFFIX;
  }

  static getActivityTextEnd(words: TerminalNode[]): string {
    return this.getActivityText(words) + this.END_SUFFIX;
  }

  static getActivityIntermediatePlaceText(words: TerminalNode[]): string {
    return this.getActivityText(words) + this.EXECUTING_SUFFIX;
  }

  static getPlaceBetweenActivities(fromActivity: string, toActivity: string): string {
    return fromActivity + "__" + toActivity;
  }

  static getSilentTransitionName(activityName: string, number: number): string {
    return "silent__" + activityName + "__" + number;
  }

  static getChainedActivityNames(activities: Activity[]): string {
    return activities.map((activity) => activity.getName()).join("_");
  }

  static getIntermediatePlace(fromActivities: Activity[], toActivities: Activity[]): string {
    let fromPlace = "";
    fromActivities.forEach((a) => (fromPlace += a.getName() + "_"));

    let toPlace = "";
    toActivities.forEach((a) => (toPlace += a.getName() + "_"));

    return this.getPlaceBetweenActivities(fromPlace.slice(0, -1), toPlace.slice(0, -1));
  }

  static getFlowsToActivity(toActivity: string, intermediatePlace: string): Flow[] {
    return this.getFlowsToActivityOrSilentTransition(toActivity, intermediatePlace, false);
  }

  static getFlowsToActivityOrSilentTransition(
    toActivity: string,
    intermediatePlace: string,
    isSilentToActivity: boolean
  ): Flow[] {
    const flows: Flow[] = [];

    if (isSilentToActivity) {
      flows.push(new Flow(intermediatePlace, toActivity));
    } else {
      flows.push(new Flow(intermediatePlace, toActivity + this.START_SUFFIX));
      flows.push(new Flow(toActivity + this.START_SUFFIX, toActivity + this.EXECUTING_SUFFIX));
      flows.push(new Flow(toActivity + this.EXECUTING_SUFFIX, toActivity + this.END_SUFFIX));
    }

    return flows;
  }

  static getFlowsBetweenActivities(
    fromActivity: string,
    toActivity: string,
    intermediatePlace: string,
    isSilentFromActivity: boolean
  ): Flow[] {
    const flows: Flow[] = [];

    const flowFrom = isSilentFromActivity ? fromActivity : fromActivity + this.END_SUFFIX;
    flows.push(new Flow(flowFrom, intermediatePlace));
    flows.push(...this.getFlowsToActivity(toActivity, intermediatePlace));
    return flows;
  }

  static getFlowsBetweenActivityAndOsp(orActivities: Activity[], intermediatePlace: string): Flow[] {
    const flows: Flow[] = [];

    for (const activity of orActivities) {
      flows.push(new Flow(intermediatePlace, activity.getName() + this.START_SUFFIX));
      flows.push(new Flow(activity.getName() + this.START_SUFFIX, activity.getName() + this.EXECUTING_SUFFIX));
      flows.push(new Flow(activity.getName() + this.EXECUTING_SUFFIX, activity.getName() + this.END_SUFFIX));
    }

    return flows;
  }

  static getFlowsBetweenActivityAndAsp(silentTransition: string, andActivities: Activity[]): Flow[] {
    const flows: Flow[] = [];

    for (const activity of andActivities) {
      const intermediatePlace = this.getPlaceBetweenActivities(silentTransition, activity.getName());
      flows.push(new Flow(silentTransition, intermediatePlace));
      flows.push(new Flow(intermediatePlace, activity.getName() + this.START_SUFFIX));
      flows.push(new Flow(activity.getName() + this.START_SUFFIX, activity.getName() + this.EXECUTING_SUFFIX));
      flows.push(new Flow(activity.getName() + this.EXECUTING_SUFFIX, activity.getName() + this.END_SUFFIX));
    }

    return flows;
  }

  static getFlowsFromOsp(orActivities: Activity[], intermediatePlace: string): Flow[] {
    const flows: Flow[] = [];

    for (const activity of orActivities) {
      flows.push(new Flow(activity.getName() + this.END_SUFFIX, intermediatePlace));
    }

    return flows;
  }

  static getFlowsBetweenAspAndActivity(silentTransition: string, andActivities: Activity[]): Flow[] {
    const flows: Flow[] = [];

    for (const activity of andActivities) {
      const intermediatePlace = this.getPlaceBetweenActivities(activity.getName(), silentTransition);
      flows.push(new Flow(activity.getName() + this.END_SUFFIX, intermediatePlace));
      flows.push(new Flow(intermediatePlace, silentTransition));
    }

    return flows;
  }

  static getConstraintsForAspPreActivity(fromActivity: string, aspActivities: string[]): DeclareConstraint[] {
    const constraints: DeclareConstraint[] = [];

    aspActivities.forEach((a) =>
      constraints.push(new DeclareConstraint(DeclareConstraintType.ALTERNATE_PRECEDENCE, fromActivity, a))
    );

    return constraints;
  }

  static getConstraintsForOspPreActivity(fromActivity: string, ospActivities: string[]): DeclareConstraint[] {
    const constraints: DeclareConstraint[] = [];

    ospActivities.forEach((a) =>
      constraints.push(new DeclareConstraint(DeclareConstraintType.ALTERNATE_PRECEDENCE, fromActivity, a))
    );
    constraints.push(...this.getNotCoExistenceConstraintsForOr(ospActivities));

    return constraints;
  }

  static getConstraintsForOspPostActivity(toActivity: string, ospActivities: string[]): DeclareConstraint[] {
    const constraints: DeclareConstraint[] = [];

    ospActivities.forEach((a) =>
      constraints.push(new DeclareConstraint(DeclareConstraintType.ALTERNATE_RESPONSE, a, toActivity))
    );
    constraints.push(...this.getNotCoExistenceConstraintsForOr(ospActivities));

    return constraints;
  }

  static getNotCoExistenceConstraintsForOr(orActivities: string[]): DeclareConstraint[] {
    const constraints: DeclareConstraint[] = [];

    for (let i = 0; i < orActivities.length - 1; i++) {
      for (let j = i + 1; j < orActivities.length; j++) {
        constraints.push(
          new DeclareConstraint(DeclareConstraintType.NOT_COEXISTENCE, orActivities[i], orActivities[j])
        );
      }
    }

    return constraints;
  }

  static getCoExistenceConstraintsForAnd(andActivities: string[]): DeclareConstraint[] {
    const constraints: DeclareConstraint[] = [];

    for (let i = 0; i < andActivities.length - 1; i++) {
      for (let j = i + 1; j < andActivities.length; j++) {
        constraints.push(new DeclareConstraint(DeclareConstraintType.COEXISTENCE, andActivities[i], andActivities[j]));
      }
    }

    return constraints;
  }

  static mergeSets(originalSet: Set<string> | undefined, setToBeAdded: Iterable<string> | undefined): Set<string> {
    if (!originalSet) {
      return new Set();
    }
    if (!setToBeAdded) {
      return originalSet;
    }

    for (const element of setToBeAdded) {
      originalSet.add(element);
    }

    return originalSet;
  }

  static getRumString(constraint: any): string {
    let baseString = `${constraint.type.rumName}[${constraint.from}`;
    if (constraint.to !== null) {
      baseString += `, ${constraint.to}`;
    }
    baseString += "]";
    baseString += " |".repeat(constraint.type.trailingPipes);

    return baseString;
  }

  static getDeclareJsString(constraint: any): string {
    let baseString = `${constraint.type.declareJsName}('${constraint.from}'`;
    if (constraint.to !== null) {
      baseString += `,'${constraint.to}'`;
    }
    baseString += ")";

    return baseString;
  }
}
