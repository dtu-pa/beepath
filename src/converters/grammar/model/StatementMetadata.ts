import { Activity } from "./Activity";
import { ContextType } from "./ContextType";
import { PostActivityType } from "./PostActivityType";
import { PreActivityType } from "./PreActivityType";
import { StatementType } from "./StatementType";

export class StatementMetadata {
  private statementType: StatementType = 0;
  private preActivityType: PreActivityType = 0;
  private postActivityType: PostActivityType = 0;
  private currentContextType: ContextType = 0;

  private preActivities: Activity[];
  private postActivities: Activity[];
  private statementNumber: number;

  constructor(statementNumber: number) {
    this.statementNumber = statementNumber;
    this.preActivities = [];
    this.postActivities = [];
  }

  public getCurrentContextType(): ContextType {
    return this.currentContextType;
  }

  public setCurrentContextType(currentContextType: ContextType): void {
    this.currentContextType = currentContextType;
  }

  public getStatementType(): StatementType {
    return this.statementType;
  }

  public setStatementType(statementType: StatementType): void {
    this.statementType = statementType;
  }

  public getPreActivityType(): PreActivityType {
    return this.preActivityType;
  }

  public setPreActivityType(preActivityType: PreActivityType): void {
    this.preActivityType = preActivityType;
  }

  public getPostActivityType(): PostActivityType {
    return this.postActivityType;
  }

  public setPostActivityType(postActivityType: PostActivityType): void {
    this.postActivityType = postActivityType;
  }

  public getStatementNumber(): number {
    return this.statementNumber;
  }

  public addActivity(activity: Activity): void {
    if (
      this.currentContextType == ContextType.PRE_ACTIVITY_IMMEDIATELY ||
      this.currentContextType == ContextType.PRE_ACTIVITY_EVENTUALLY
    ) {
      this.preActivities.push(activity);
    } else if (this.currentContextType == ContextType.POST_ACTIVITY) {
      this.postActivities.push(activity);
    }
  }

  public getPreActivities(): Activity[] {
    return this.preActivities;
  }

  public getPostActivities(): Activity[] {
    return this.postActivities;
  }

  public toString(): string {
    return (
      "StatementMetadata{" +
      "statementType=" +
      this.statementType +
      ", preActivityType=" +
      this.preActivityType +
      ", postActivityType=" +
      this.postActivityType +
      ", preActivities=" +
      this.preActivities +
      ", postActivities=" +
      this.postActivities +
      ", currentContextType=" +
      this.currentContextType +
      ", statementNumber=" +
      this.statementNumber +
      "}"
    );
  }

  //   public equals(o: any): boolean {
  //     if (this === o) return true;
  //     if (o == null || this.constructor !== o.constructor) return false;

  //     const activity: Activity = o;
  //     return this.name === activity.name && this.type === activity.type;
  //   }
}
