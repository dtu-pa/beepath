import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { StatementMetadata } from "./model/StatementMetadata";

export interface SentenceParser {
  setInputFileName: (fileName: string) => void;
  setStatementMetadata: (statementMetadata: StatementMetadata) => void;

  handleInitialStatement: (initialTransition: TerminalNode[]) => void;
  handleClosingStatementSequence: () => void;
  handleClosingStatementAnd: () => void;
  handleClosingStatementOr: () => void;
  handleActivity: (activityText: TerminalNode[]) => void;
  handleAspDeclaration: (aspId: string) => void;
  handleOspDeclaration: (ospId: string) => void;

  handlePreSequencePostSequence: () => void;
  handlePreAndPostSequence: () => void;
  handlePreRepeatSincePostSequence: () => void;
  handlePreOrPostSequence: () => void;
  handlePreEventuallyPostSequence: () => void;
  handlePreSequencePostAnd: () => void;
  handlePreAndPostAnd: () => void;
  handlePreRepeatSincePostAnd: () => void;
  handlePreOrPostAnd: () => void;
  handlePreEventuallyPostAnd: () => void;
  handlePreSequencePostOr: () => void;
  handlePreAndPostOr: () => void;
  handlePreRepeatSincePostOr: () => void;
  handlePreOrPostOr: () => void;
  handlePreEventuallyPostOr: () => void;
  printAndSaveModel: () => void;
}
