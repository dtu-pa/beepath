export class DeclareConstraintType {
  static readonly INIT = new DeclareConstraintType("Init", "Init", 2);
  static readonly EXACTLY_ONE = new DeclareConstraintType("Exactly1", "ExactlyOne", 2);
  static readonly NOT_COEXISTENCE = new DeclareConstraintType("Not Co-Existence", "NotCoExistence", 3);
  static readonly COEXISTENCE = new DeclareConstraintType("Co-Existence", "CoExistence", 3);
  static readonly CHAIN_SUCCESSION = new DeclareConstraintType("Chain Succession", "ChainSuccession", 3);
  static readonly ALTERNATE_SUCCESSION = new DeclareConstraintType("Alternate Succession", "AlternateSuccession", 3);
  static readonly ALTERNATE_RESPONSE = new DeclareConstraintType("Alternate Response", "AlternateResponse", 3);
  static readonly ALTERNATE_PRECEDENCE = new DeclareConstraintType("Alternate Precedence", "AlternatePrecedence", 3);
  static readonly SUCCESSION = new DeclareConstraintType("Succession", "Succession", 3);
  static readonly NOT_CHAIN_SUCCESSION = new DeclareConstraintType("Not Chain Succession", "NotChainSuccession", 3);

  private constructor(
    private readonly rumName: string,
    private readonly declareJsName: string,
    private readonly trailingPipes: number
  ) {}

  public getRumName(): string {
    return this.rumName;
  }

  public getDeclareJsName(): string {
    return this.declareJsName;
  }

  public getTrailingPipes(): number {
    return this.trailingPipes;
  }
}
