import { ActivityType } from "./ActivityType";

export class Activity {
  private readonly name: string;
  private readonly type: ActivityType;

  constructor(name: string, type: ActivityType) {
    this.name = name;
    this.type = type;
  }

  public getName(): string {
    return this.name;
  }

  public getType(): ActivityType {
    return this.type;
  }

  public toString(): string {
    return `Activity{name='${this.name}', type=${this.type}}`;
  }

  //   public equals(o: any): boolean {
  //     if (this === o) return true;
  //     if (o == null || this.constructor !== o.constructor) return false;

  //     const activity: Activity = o;
  //     return this.name === activity.name && this.type === activity.type;
  //   }
}
