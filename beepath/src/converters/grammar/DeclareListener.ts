import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { DeclareConstraint } from "./model/DeclareConstraint";
import { StatementMetadata } from "./model/StatementMetadata";
import { SharedModelStorage } from "./SharedModelStorage";
import { DeclareConstraintType } from "./model/DeclareConstraintType";
import { HelperFunctions } from "./HelperFunctions";
import { ActivityType } from "./model/ActivityType";
import { Activity } from "./model/Activity";
import { SentenceParser } from "./SentenceParser";

export class DeclareListener implements SentenceParser {
  private constraints: Set<string> = new Set<string>();

  private inputFileName: string;
  private currentStatement: StatementMetadata;
  private modelStorage: SharedModelStorage;
  private activitiesToXORs: Map<string, Set<string>> = new Map<string, Set<string>>();
  private xorTagToActivities: Map<string, string> = new Map<string, string>();

  constructor() {
    this.modelStorage = SharedModelStorage.getInstance();
    this.inputFileName = ""; // redundant initialization
    this.currentStatement = new StatementMetadata(0); // redundant initialization
  }

  public setInputFileName(inputFileName: string): void {
    this.inputFileName = inputFileName;
  }

  public setStatementMetadata(statementMetadata: StatementMetadata): void {
    this.currentStatement = statementMetadata;
  }

  public handleInitialStatement(initialTransition: TerminalNode[]): void {
    this.constraints.add(
      JSON.stringify(
        new DeclareConstraint(DeclareConstraintType.INIT, HelperFunctions.getActivityText(initialTransition), null)
      )
    );
  }

  public handleClosingStatementSequence(): void {}

  public handleClosingStatementAnd(): void {}

  public handleClosingStatementOr(): void {}

  public handleActivity(activityText: TerminalNode[]): void {
    this.modelStorage.addTransition(HelperFunctions.getActivityText(activityText));
  }

  public handleAspDeclaration(aspId: string): void {}

  public handleOspDeclaration(ospId: string): void {}

  public handlePreSequencePostSequence(): void {
    const fromActivity = this.currentStatement.getPostActivities()[0].getName();
    const toActivity = this.currentStatement.getPreActivities()[0].getName();

    this.constraints.add(
      JSON.stringify(new DeclareConstraint(DeclareConstraintType.CHAIN_SUCCESSION, fromActivity, toActivity))
    );
    if (this.activitiesToXORs.has(fromActivity)) {
      const fromActivityXORs = this.activitiesToXORs.get(fromActivity) || new Set();
      if (this.activitiesToXORs.has(toActivity)) {
        this.activitiesToXORs.set(
          toActivity,
          HelperFunctions.mergeSets(this.activitiesToXORs.get(toActivity), fromActivityXORs)
        );
      } else {
        this.activitiesToXORs.set(toActivity, fromActivityXORs);
      }
      this.activitiesToXORs.delete(fromActivity);
    }
  }

  public handlePreAndPostSequence(): void {
    const fromActivity = this.currentStatement.getPostActivities()[0].getName();
    this.constraints.add(JSON.stringify(new DeclareConstraint(DeclareConstraintType.EXACTLY_ONE, fromActivity, null)));

    this.handlePreAnd(fromActivity);
  }

  public handlePreRepeatSincePostSequence(): void {
    this.handlePreOrPostSequence();
  }

  public handlePreOrPostSequence(): void {
    const fromActivity = this.currentStatement.getPostActivities()[0].getName();
    this.constraints.add(JSON.stringify(new DeclareConstraint(DeclareConstraintType.EXACTLY_ONE, fromActivity, null)));

    this.handlePreOr(fromActivity);
  }

  public handlePreEventuallyPostSequence(): void {
    const fromActivity = this.currentStatement.getPostActivities()[0].getName();
    const toActivity = this.currentStatement.getPreActivities()[0].getName();

    this.constraints.add(
      JSON.stringify(new DeclareConstraint(DeclareConstraintType.SUCCESSION, fromActivity, toActivity))
    );
  }

  public handlePreSequencePostAnd(): void {
    for (const preActivity of this.currentStatement.getPreActivities()) {
      const toActivity = preActivity.getName();
      this.constraints.add(JSON.stringify(new DeclareConstraint(DeclareConstraintType.EXACTLY_ONE, toActivity, null)));
      for (const postActivity of this.currentStatement.getPostActivities()) {
        const fromActivity = postActivity.getName();
        if (postActivity.getType() === ActivityType.ACTIVITY) {
          this.constraints.add(
            JSON.stringify(new DeclareConstraint(DeclareConstraintType.ALTERNATE_SUCCESSION, fromActivity, toActivity))
          );
        } else if (postActivity.getType() === ActivityType.OR_SUBPROCESS) {
          this.constraints = HelperFunctions.mergeSets(
            this.constraints,
            HelperFunctions.getConstraintsForOspPostActivity(
              toActivity,
              this.modelStorage.getOrSubProcessNames(fromActivity)
            ).map((dc) => JSON.stringify(dc))
          );
        }
      }
    }
  }

  public handlePreAndPostAnd(): void {}

  public handlePreRepeatSincePostAnd(): void {
    this.handlePreOrPostAnd();
  }

  public handlePreOrPostAnd(): void {}

  public handlePreEventuallyPostAnd(): void {
    this.handlePostAndExactlyOne();

    const toActivity = this.currentStatement.getPreActivities()[0].getName();
    this.constraints.add(JSON.stringify(new DeclareConstraint(DeclareConstraintType.EXACTLY_ONE, toActivity, null)));
    for (const postActivity of this.currentStatement.getPostActivities()) {
      const fromActivity = postActivity.getName();
      this.constraints.add(
        JSON.stringify(new DeclareConstraint(DeclareConstraintType.SUCCESSION, fromActivity, toActivity))
      );
    }
  }

  public handlePreSequencePostOr(): void {
    const toActivity = this.currentStatement.getPreActivities()[0].getName();
    this.handlePostOr(toActivity);
  }

  public handlePreAndPostOr(): void {}

  public handlePreRepeatSincePostOr(): void {
    this.handlePreOrPostOr();
  }

  public handlePreOrPostOr(): void {}

  public handlePreEventuallyPostOr(): void {
    this.handlePreSequencePostOr();
  }

  public printAndSaveModel(): void {
    let rumOutput: string = "";
    let declareJsOutput: string = "";

    for (const activity of this.modelStorage.getTransitions()) {
      rumOutput = rumOutput + `activity ${activity}\n`;
    }

    for (const constraint of this.constraints) {
      rumOutput = rumOutput + `${HelperFunctions.getRumString(JSON.parse(constraint))}\n`;
      declareJsOutput = declareJsOutput + `${HelperFunctions.getDeclareJsString(JSON.parse(constraint))}\n`;
    }

    this.modelStorage.addOutputText(rumOutput);
    this.modelStorage.addOutputText(declareJsOutput);
  }

  private handlePreAnd(fromActivity: string): void {
    const andActivities: string[] = []; // here we'll store all single pre activities. This means all except the OR subprocess

    for (const preActivity of this.currentStatement.getPreActivities()) {
      const toActivity = preActivity.getName();
      if (preActivity.getType() === ActivityType.ACTIVITY) {
        this.constraints.add(
          JSON.stringify(new DeclareConstraint(DeclareConstraintType.ALTERNATE_SUCCESSION, fromActivity, toActivity))
        );
        andActivities.push(toActivity);
      } else if (preActivity.getType() === ActivityType.OR_SUBPROCESS) {
        this.constraints = HelperFunctions.mergeSets(
          this.constraints,
          HelperFunctions.getConstraintsForOspPreActivity(
            fromActivity,
            this.modelStorage.getOrSubProcessNames(toActivity)
          ).map((dc) => JSON.stringify(dc))
        );
      }
    }

    // this.constraints = HelperFunctions.mergeSets(
    //   this.constraints,
    //   HelperFunctions.getCoExistenceConstraintsForAnd(andActivities).map((dc) => JSON.stringify(dc))
    // );
  }

  private handlePreOr(previousActivity: string): void {
    const xorTag = `xor_${this.currentStatement.getStatementNumber()}`;
    this.xorTagToActivities.set(xorTag, previousActivity);

    const orBranchesAndOneRepresentativeForEachAndBranch: string[] = this.currentStatement
      .getPreActivities()
      .filter((a) => a.getType() === ActivityType.ACTIVITY)
      .map((activity: Activity) => activity.getName());

    this.currentStatement.getPreActivities().forEach((a: Activity) => {
      if (a.getType() === ActivityType.AND_SUBPROCESS) {
        const andSubBranches: string[] = Array.from(this.modelStorage.getAndSubProcessNames(a.getName()));
        orBranchesAndOneRepresentativeForEachAndBranch.push(andSubBranches[0]); // we only need one branch from all that are part of the AND group
        this.constraints = HelperFunctions.mergeSets(
          this.constraints,
          HelperFunctions.getCoExistenceConstraintsForAnd(andSubBranches).map((dc) => JSON.stringify(dc))
        );
      }
    });

    this.constraints = HelperFunctions.mergeSets(
      this.constraints,
      HelperFunctions.getNotCoExistenceConstraintsForOr(orBranchesAndOneRepresentativeForEachAndBranch).map((dc) =>
        JSON.stringify(dc)
      )
    );

    for (const preActivity of this.currentStatement.getPreActivities()) {
      const toActivity = preActivity.getName();

      if (this.activitiesToXORs.has(toActivity)) {
        this.activitiesToXORs.get(toActivity)?.add(xorTag);
      } else {
        this.activitiesToXORs.set(toActivity, new Set<string>([xorTag]));
      }

      if (preActivity.getType() === ActivityType.ACTIVITY) {
        this.constraints.add(
          JSON.stringify(
            new DeclareConstraint(DeclareConstraintType.ALTERNATE_PRECEDENCE, previousActivity, toActivity)
          )
        );
      } else if (preActivity.getType() === ActivityType.AND_SUBPROCESS) {
        this.constraints = HelperFunctions.mergeSets(
          this.constraints,
          HelperFunctions.getConstraintsForAspPreActivity(
            previousActivity,
            this.modelStorage.getAndSubProcessNames(toActivity)
          ).map((dc) => JSON.stringify(dc))
        );
      }
    }
  }

  private handlePostOr(nextActivity: string): void {
    this.constraints.add(JSON.stringify(new DeclareConstraint(DeclareConstraintType.EXACTLY_ONE, nextActivity, null)));

    const activityWithTag = this.currentStatement
      .getPostActivities()
      .find((a) => this.activitiesToXORs.has(a.getName()))
      ?.getName()!;
    const xorTagsToRemove: string[] = [];
    if (!activityWithTag || !this.activitiesToXORs.has(activityWithTag)) {
      throw new Error(
        "Cannot generate declare model for sentences with multiple activities in both the left and the right part of a sentence."
      );
    }
    for (const xorTag of this.activitiesToXORs.get(activityWithTag)!) {
      const isTagUsedByAllPostActivities = this.currentStatement
        .getPostActivities()
        .every((a) => this.activitiesToXORs.has(a.getName()) && this.activitiesToXORs.get(a.getName())!.has(xorTag));

      if (isTagUsedByAllPostActivities) {
        const numberOfActivitiesWithTag = Array.from(this.activitiesToXORs.entries()).filter(([key, value]) =>
          value.has(xorTag)
        ).length;
        const setOfPostActivitiesIsEqualToSetOfActivitiesWithTag =
          numberOfActivitiesWithTag === this.currentStatement.getPostActivities().length;

        if (setOfPostActivitiesIsEqualToSetOfActivitiesWithTag) {
          const tagStartActivity = this.xorTagToActivities.get(xorTag) || "";
          this.constraints.add(
            JSON.stringify(
              new DeclareConstraint(DeclareConstraintType.NOT_CHAIN_SUCCESSION, tagStartActivity, nextActivity)
            )
          );
          this.constraints.add(
            JSON.stringify(
              new DeclareConstraint(DeclareConstraintType.NOT_CHAIN_SUCCESSION, nextActivity, tagStartActivity)
            )
          );

          this.xorTagToActivities.delete(xorTag);
          xorTagsToRemove.push(xorTag);
        }
      }
    }

    for (const [activityName, xors] of this.activitiesToXORs.entries()) {
      const newXors = new Set([...xors].filter((xor) => !xorTagsToRemove.includes(xor)));
      this.activitiesToXORs.set(activityName, newXors);
    }

    const orBranchesAndRepresentativesForAndBranches: string[] = [];
    this.currentStatement
      .getPostActivities()
      .filter((a) => a.getType() === ActivityType.ACTIVITY)
      .forEach((a) => orBranchesAndRepresentativesForAndBranches.push(a.getName()));

    for (const a of this.currentStatement.getPostActivities()) {
      if (a.getType() === ActivityType.ACTIVITY) {
        const fromActivity = a.getName();
        this.constraints.add(
          JSON.stringify(new DeclareConstraint(DeclareConstraintType.ALTERNATE_RESPONSE, fromActivity, nextActivity))
        );
      } else if (a.getType() === ActivityType.AND_SUBPROCESS) {
        const subProcessNames = this.modelStorage.getAndSubProcessNames(a.getName());
        subProcessNames.forEach((fromActivity) =>
          this.constraints.add(
            JSON.stringify(new DeclareConstraint(DeclareConstraintType.ALTERNATE_RESPONSE, fromActivity, nextActivity))
          )
        );
        this.constraints = HelperFunctions.mergeSets(
          this.constraints,
          HelperFunctions.getCoExistenceConstraintsForAnd(subProcessNames).map((dc) => JSON.stringify(dc))
        );
        orBranchesAndRepresentativesForAndBranches.push(subProcessNames[0]);
      }
    }
    this.constraints = HelperFunctions.mergeSets(
      this.constraints,
      HelperFunctions.getNotCoExistenceConstraintsForOr(orBranchesAndRepresentativesForAndBranches).map((dc) =>
        JSON.stringify(dc)
      )
    );
  }

  private handlePostAndExactlyOne(): void {
    for (const a of this.currentStatement.getPostActivities()) {
      if (a.getType() === ActivityType.ACTIVITY) {
        this.constraints.add(
          JSON.stringify(new DeclareConstraint(DeclareConstraintType.EXACTLY_ONE, a.getName(), null))
        );
        return;
      }
    }
  }
}
