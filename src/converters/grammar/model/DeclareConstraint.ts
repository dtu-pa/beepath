import { DeclareConstraintType } from "./DeclareConstraintType";

export class DeclareConstraint {
  private type: DeclareConstraintType;
  private from: string;
  private to: string | null;

  constructor(type: DeclareConstraintType, from: string, to: string | null) {
    this.type = type;
    this.from = from;
    this.to = to;
  }

  public getType(): DeclareConstraintType {
    return this.type;
  }

  public getFrom(): string {
    return this.from;
  }

  public getTo(): string | null {
    return this.to;
  }

  public getRumString(): string {
    let baseString = `${this.type.getRumName()}[${this.from}`;
    if (this.to !== null) {
      baseString += `, ${this.to}`;
    }
    baseString += "]";
    baseString += "|".repeat(this.type.getTrailingPipes());

    return baseString;
  }

  public toString(): string {
    let basePrint = `${this.type}(${this.from}`;
    if (this.to !== null) {
      basePrint += `, ${this.to}`;
    }
    basePrint += ")";
    return basePrint;
  }
}
