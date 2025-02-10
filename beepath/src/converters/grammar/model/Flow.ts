export class Flow {
  private readonly from: string;
  private readonly to: string;

  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
  }

  public getFrom(): string {
    return this.from;
  }

  public getTo(): string {
    return this.to;
  }

  public toString(): string {
    return `${this.from} => ${this.to}`;
  }
}
