import { ErrorNode } from "antlr4ts/tree/ErrorNode";
import { MScGrammarListener } from "./generated/MScGrammarListener";
import {
  ActivityContext,
  AfterStatementContext,
  AndEndActivityExpressionContext,
  AndStartActivityExpressionContext,
  AndSubProcessContext,
  AndSubProcessIdContext,
  ClosingStatementContext,
  DescriptionContext,
  EventuallyExpressionContext,
  ImmediatelyExpressionContext,
  InitialStatementContext,
  OrEndActivityExpressionContext,
  OrStartActivityExpressionContext,
  OrSubProcessContext,
  OrSubProcessIdContext,
  EndActivityExpressionContext,
  RepeatSinceStartActivityExpressionContext,
  SequenceEndActivityExpressionContext,
  SequenceStartActivityExpressionContext,
  StatementContext,
} from "./generated/MScGrammarParser";
import { HelperFunctions } from "./HelperFunctions";
import { Activity } from "./model/Activity";
import { ActivityType } from "./model/ActivityType";
import { ContextType } from "./model/ContextType";
import { PostActivityType } from "./model/PostActivityType";
import { PreActivityType } from "./model/PreActivityType";
import { StatementMetadata } from "./model/StatementMetadata";
import { StatementType } from "./model/StatementType";
import { SentenceParser } from "./SentenceParser";
import { SharedModelStorage } from "./SharedModelStorage";

export class ContextListener implements MScGrammarListener {
  private sentenceParser: SentenceParser;
  private modelStorage: SharedModelStorage;

  private currentStatement: StatementMetadata;
  private statementNumber: number = 0;

  constructor(sentenceParser: SentenceParser) {
    this.sentenceParser = sentenceParser;
    this.modelStorage = SharedModelStorage.getInstance();
    this.currentStatement = new StatementMetadata(0); // redundant initialization
  }

  public enterClosingStatement(ctx: ClosingStatementContext): void {
    if (this.currentStatement.getPreActivities().length > 0 || this.currentStatement.getPostActivities().length > 0) {
      this.statementNumber += 1;
      this.currentStatement = new StatementMetadata(this.statementNumber);
    }
    this.currentStatement.setStatementType(StatementType.CLOSING);
  }

  public exitClosingStatement(ctx: ClosingStatementContext): void {
    this.sentenceParser.setStatementMetadata(this.currentStatement);
    if (this.currentStatement.getPostActivityType() == PostActivityType.SEQUENCE) {
      this.sentenceParser.handleClosingStatementSequence();
    } else if (this.currentStatement.getPostActivityType() == PostActivityType.AND) {
      this.sentenceParser.handleClosingStatementAnd();
    } else if (this.currentStatement.getPostActivityType() == PostActivityType.OR) {
      this.sentenceParser.handleClosingStatementOr();
    } else {
      throw new Error("Cannot handle " + this.currentStatement.getPostActivityType());
    }
  }

  public enterAndEndActivityExpression(ctx: AndEndActivityExpressionContext): void {
    this.currentStatement.setPostActivityType(PostActivityType.AND);
  }

  public exitAndEndActivityExpression(ctx: AndEndActivityExpressionContext): void {
    this.handleAndExpression(ctx.activity(), ctx.orSubProcessId());
  }

  public enterAndStartActivityExpression(ctx: AndStartActivityExpressionContext): void {
    this.currentStatement.setPreActivityType(PreActivityType.IMMEDIATELY_AND);
  }

  public exitAndStartActivityExpression(ctx: AndStartActivityExpressionContext): void {
    this.handleAndExpression(ctx.activity(), ctx.orSubProcessId());
  }

  public enterOrEndActivityExpression(ctx: OrEndActivityExpressionContext): void {
    this.currentStatement.setPostActivityType(PostActivityType.OR);
  }

  public exitOrEndActivityExpression(ctx: OrEndActivityExpressionContext): void {
    this.handleOrExpression(ctx.activity(), ctx.andSubProcessId());
  }

  public enterOrStartActivityExpression(ctx: OrStartActivityExpressionContext): void {
    this.currentStatement.setPreActivityType(PreActivityType.IMMEDIATELY_OR);
  }

  public exitOrStartActivityExpression(ctx: OrStartActivityExpressionContext): void {
    this.handleOrExpression(ctx.activity(), ctx.andSubProcessId());
  }

  public enterRepeatSinceStartActivityExpression(ctx: RepeatSinceStartActivityExpressionContext): void {
    this.currentStatement.setPreActivityType(PreActivityType.IMMEDIATELY_REPEAT_SINCE);
  }

  public exitRepeatSinceStartActivityExpression(ctx: RepeatSinceStartActivityExpressionContext): void {
    this.currentStatement.addActivity(
      new Activity(HelperFunctions.getActivityText(ctx.activity(0).WORD()), ActivityType.REPEAT_SINCE_ACTIVITY)
    );
    if (ctx.activity().length > 1) {
      for (let i = 1; i < ctx.activity().length; i++) {
        this.handleSequenceExpression(ctx.activity(i));
      }
    }
    for (let i = 0; i < ctx.andSubProcessId().length; i++) {
      this.currentStatement.addActivity(
        new Activity(HelperFunctions.getActivityText(ctx.andSubProcessId(i).WORD()), ActivityType.AND_SUBPROCESS)
      );
    }
  }

  public enterEndActivityExpression(ctx: EndActivityExpressionContext): void {
    this.currentStatement.setCurrentContextType(ContextType.POST_ACTIVITY);
  }

  public enterSequenceEndActivityExpression(ctx: SequenceEndActivityExpressionContext): void {
    this.currentStatement.setPostActivityType(PostActivityType.SEQUENCE);
  }

  public exitSequenceEndActivityExpression(ctx: SequenceEndActivityExpressionContext): void {
    this.handleSequenceExpression(ctx.activity());
  }

  public enterStatement(ctx: StatementContext): void {
    this.statementNumber += 1;
    this.currentStatement = new StatementMetadata(this.statementNumber);
  }

  public enterAfterStatement(ctx: AfterStatementContext): void {
    this.currentStatement.setStatementType(StatementType.AFTER);
  }

  public exitAfterStatement(ctx: AfterStatementContext): void {
    this.sentenceParser.setStatementMetadata(this.currentStatement);

    if (this.currentStatement.getPostActivityType() === PostActivityType.SEQUENCE) {
      switch (this.currentStatement.getPreActivityType()) {
        case PreActivityType.IMMEDIATELY_SEQUENCE:
          this.sentenceParser.handlePreSequencePostSequence();
          break;
        case PreActivityType.IMMEDIATELY_AND:
          this.sentenceParser.handlePreAndPostSequence();
          break;
        case PreActivityType.IMMEDIATELY_OR:
          this.sentenceParser.handlePreOrPostSequence();
          break;
        case PreActivityType.IMMEDIATELY_REPEAT_SINCE:
          this.sentenceParser.handlePreRepeatSincePostSequence();
          break;
        case PreActivityType.EVENTUALLY_SEQUENCE:
          this.sentenceParser.handlePreEventuallyPostSequence();
          break;
        default:
          throw new Error("Cannot handle " + this.currentStatement.getPreActivityType());
      }
    } else if (this.currentStatement.getPostActivityType() === PostActivityType.AND) {
      switch (this.currentStatement.getPreActivityType()) {
        case PreActivityType.IMMEDIATELY_SEQUENCE:
          this.sentenceParser.handlePreSequencePostAnd();
          break;
        case PreActivityType.IMMEDIATELY_AND:
          this.sentenceParser.handlePreAndPostAnd();
          break;
        case PreActivityType.IMMEDIATELY_OR:
          this.sentenceParser.handlePreOrPostAnd();
          break;
        case PreActivityType.IMMEDIATELY_REPEAT_SINCE:
          this.sentenceParser.handlePreRepeatSincePostAnd();
          break;
        case PreActivityType.EVENTUALLY_SEQUENCE:
          this.sentenceParser.handlePreEventuallyPostAnd();
          break;
        default:
          throw new Error("Cannot handle " + this.currentStatement.getPreActivityType());
      }
    } else if (this.currentStatement.getPostActivityType() === PostActivityType.OR) {
      switch (this.currentStatement.getPreActivityType()) {
        case PreActivityType.IMMEDIATELY_SEQUENCE:
          this.sentenceParser.handlePreSequencePostOr();
          break;
        case PreActivityType.IMMEDIATELY_AND:
          this.sentenceParser.handlePreAndPostOr();
          break;
        case PreActivityType.IMMEDIATELY_OR:
          this.sentenceParser.handlePreOrPostOr();
          break;
        case PreActivityType.IMMEDIATELY_REPEAT_SINCE:
          this.sentenceParser.handlePreRepeatSincePostOr();
          break;
        case PreActivityType.EVENTUALLY_SEQUENCE:
          this.sentenceParser.handlePreEventuallyPostOr();
          break;
        default:
          throw new Error("Cannot handle " + this.currentStatement.getPreActivityType());
      }
    } else {
      throw new Error("Cannot handle " + this.currentStatement.getPostActivityType());
    }
  }

  public enterAndSubProcess(ctx: AndSubProcessContext): void {
    this.currentStatement.setStatementType(StatementType.AND_SUBPROCESS);
  }

  public exitAndSubProcess(ctx: AndSubProcessContext): void {
    const aspActivities: Activity[] = ctx
      .activity()
      .map((a) => new Activity(HelperFunctions.getActivityText(a.WORD()), ActivityType.ACTIVITY));
    const aspId: string = HelperFunctions.getActivityText(ctx.andSubProcessId().WORD());
    this.modelStorage.addAndSubProcess(aspId, aspActivities);
    this.sentenceParser.handleAspDeclaration(aspId);
  }

  public enterOrSubProcess(ctx: OrSubProcessContext): void {
    this.currentStatement.setStatementType(StatementType.OR_SUBPROCESS);
  }

  public exitOrSubProcess(ctx: OrSubProcessContext): void {
    const ospActivities: Activity[] = ctx
      .activity()
      .map((a) => new Activity(HelperFunctions.getActivityText(a.WORD()), ActivityType.ACTIVITY));
    const ospId: string = HelperFunctions.getActivityText(ctx.orSubProcessId().WORD());
    this.modelStorage.addOrSubProcess(ospId, ospActivities);
    this.sentenceParser.handleOspDeclaration(ospId);
  }

  public enterImmediatelyExpression(ctx: ImmediatelyExpressionContext): void {
    this.currentStatement.setCurrentContextType(ContextType.PRE_ACTIVITY_IMMEDIATELY);
  }

  public enterEventuallyExpression(ctx: EventuallyExpressionContext): void {
    this.currentStatement.setCurrentContextType(ContextType.PRE_ACTIVITY_EVENTUALLY);
  }

  public enterSequenceStartActivityExpression(ctx: SequenceStartActivityExpressionContext): void {
    if (this.currentStatement.getCurrentContextType() === ContextType.PRE_ACTIVITY_EVENTUALLY) {
      this.currentStatement.setPreActivityType(PreActivityType.EVENTUALLY_SEQUENCE);
    } else if (this.currentStatement.getCurrentContextType() === ContextType.PRE_ACTIVITY_IMMEDIATELY) {
      this.currentStatement.setPreActivityType(PreActivityType.IMMEDIATELY_SEQUENCE);
    }
  }

  public exitSequenceStartActivityExpression(ctx: SequenceStartActivityExpressionContext): void {
    this.handleSequenceExpression(ctx.activity());
  }

  public exitInitialStatement(ctx: InitialStatementContext): void {
    this.sentenceParser.handleInitialStatement(ctx.activity().WORD());
  }

  public exitActivity(ctx: ActivityContext): void {
    this.sentenceParser.handleActivity(ctx.WORD());
  }

  public visitErrorNode(node: ErrorNode): void {
    console.log("Visit error node: " + node);
  }

  public exitDescription(ctx: DescriptionContext): void {
    this.sentenceParser.printAndSaveModel();
  }

  private handleSequenceExpression(activityContext: ActivityContext): void {
    this.currentStatement.addActivity(
      new Activity(HelperFunctions.getActivityText(activityContext.WORD()), ActivityType.ACTIVITY)
    );
  }

  private handleAndExpression(activities: ActivityContext[], ospIdContexts: OrSubProcessIdContext[]): void {
    for (const activity of activities) {
      this.currentStatement.addActivity(
        new Activity(HelperFunctions.getActivityText(activity.WORD()), ActivityType.ACTIVITY)
      );
    }
    for (const ospId of ospIdContexts) {
      this.currentStatement.addActivity(
        new Activity(HelperFunctions.getActivityText(ospId.WORD()), ActivityType.OR_SUBPROCESS)
      );
    }
  }

  private handleOrExpression(activities: ActivityContext[], aspIdContexts: AndSubProcessIdContext[]): void {
    for (const activity of activities) {
      this.currentStatement.addActivity(
        new Activity(HelperFunctions.getActivityText(activity.WORD()), ActivityType.ACTIVITY)
      );
    }
    for (const aspId of aspIdContexts) {
      this.currentStatement.addActivity(
        new Activity(HelperFunctions.getActivityText(aspId.WORD()), ActivityType.AND_SUBPROCESS)
      );
    }
  }
}
