// Generated from src/converters/grammar/MScGrammar.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { DescriptionContext } from "./MScGrammarParser";
import { LeadingTextContext } from "./MScGrammarParser";
import { StatementListContext } from "./MScGrammarParser";
import { InitialStatementContext } from "./MScGrammarParser";
import { StatementContext } from "./MScGrammarParser";
import { ClosingStatementContext } from "./MScGrammarParser";
import { AfterStatementContext } from "./MScGrammarParser";
import { AndSubProcessContext } from "./MScGrammarParser";
import { OrSubProcessContext } from "./MScGrammarParser";
import { BelongStatementContext } from "./MScGrammarParser";
import { ImmediatelyExpressionContext } from "./MScGrammarParser";
import { EventuallyExpressionContext } from "./MScGrammarParser";
import { SequenceStartActivityExpressionContext } from "./MScGrammarParser";
import { AndStartActivityExpressionContext } from "./MScGrammarParser";
import { OrStartActivityExpressionContext } from "./MScGrammarParser";
import { RepeatSinceStartActivityExpressionContext } from "./MScGrammarParser";
import { EndActivityExpressionContext } from "./MScGrammarParser";
import { SequenceEndActivityExpressionContext } from "./MScGrammarParser";
import { AndEndActivityExpressionContext } from "./MScGrammarParser";
import { OrEndActivityExpressionContext } from "./MScGrammarParser";
import { ActivityContext } from "./MScGrammarParser";
import { AndSubProcessIdContext } from "./MScGrammarParser";
import { OrSubProcessIdContext } from "./MScGrammarParser";
import { RoleContext } from "./MScGrammarParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `MScGrammarParser`.
 */
export interface MScGrammarListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `MScGrammarParser.description`.
	 * @param ctx the parse tree
	 */
	enterDescription?: (ctx: DescriptionContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.description`.
	 * @param ctx the parse tree
	 */
	exitDescription?: (ctx: DescriptionContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.leadingText`.
	 * @param ctx the parse tree
	 */
	enterLeadingText?: (ctx: LeadingTextContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.leadingText`.
	 * @param ctx the parse tree
	 */
	exitLeadingText?: (ctx: LeadingTextContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.statementList`.
	 * @param ctx the parse tree
	 */
	enterStatementList?: (ctx: StatementListContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.statementList`.
	 * @param ctx the parse tree
	 */
	exitStatementList?: (ctx: StatementListContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.initialStatement`.
	 * @param ctx the parse tree
	 */
	enterInitialStatement?: (ctx: InitialStatementContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.initialStatement`.
	 * @param ctx the parse tree
	 */
	exitInitialStatement?: (ctx: InitialStatementContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStatement?: (ctx: StatementContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStatement?: (ctx: StatementContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.closingStatement`.
	 * @param ctx the parse tree
	 */
	enterClosingStatement?: (ctx: ClosingStatementContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.closingStatement`.
	 * @param ctx the parse tree
	 */
	exitClosingStatement?: (ctx: ClosingStatementContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.afterStatement`.
	 * @param ctx the parse tree
	 */
	enterAfterStatement?: (ctx: AfterStatementContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.afterStatement`.
	 * @param ctx the parse tree
	 */
	exitAfterStatement?: (ctx: AfterStatementContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.andSubProcess`.
	 * @param ctx the parse tree
	 */
	enterAndSubProcess?: (ctx: AndSubProcessContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.andSubProcess`.
	 * @param ctx the parse tree
	 */
	exitAndSubProcess?: (ctx: AndSubProcessContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.orSubProcess`.
	 * @param ctx the parse tree
	 */
	enterOrSubProcess?: (ctx: OrSubProcessContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.orSubProcess`.
	 * @param ctx the parse tree
	 */
	exitOrSubProcess?: (ctx: OrSubProcessContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.belongStatement`.
	 * @param ctx the parse tree
	 */
	enterBelongStatement?: (ctx: BelongStatementContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.belongStatement`.
	 * @param ctx the parse tree
	 */
	exitBelongStatement?: (ctx: BelongStatementContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.immediatelyExpression`.
	 * @param ctx the parse tree
	 */
	enterImmediatelyExpression?: (ctx: ImmediatelyExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.immediatelyExpression`.
	 * @param ctx the parse tree
	 */
	exitImmediatelyExpression?: (ctx: ImmediatelyExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.eventuallyExpression`.
	 * @param ctx the parse tree
	 */
	enterEventuallyExpression?: (ctx: EventuallyExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.eventuallyExpression`.
	 * @param ctx the parse tree
	 */
	exitEventuallyExpression?: (ctx: EventuallyExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.sequenceStartActivityExpression`.
	 * @param ctx the parse tree
	 */
	enterSequenceStartActivityExpression?: (ctx: SequenceStartActivityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.sequenceStartActivityExpression`.
	 * @param ctx the parse tree
	 */
	exitSequenceStartActivityExpression?: (ctx: SequenceStartActivityExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.andStartActivityExpression`.
	 * @param ctx the parse tree
	 */
	enterAndStartActivityExpression?: (ctx: AndStartActivityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.andStartActivityExpression`.
	 * @param ctx the parse tree
	 */
	exitAndStartActivityExpression?: (ctx: AndStartActivityExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.orStartActivityExpression`.
	 * @param ctx the parse tree
	 */
	enterOrStartActivityExpression?: (ctx: OrStartActivityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.orStartActivityExpression`.
	 * @param ctx the parse tree
	 */
	exitOrStartActivityExpression?: (ctx: OrStartActivityExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.repeatSinceStartActivityExpression`.
	 * @param ctx the parse tree
	 */
	enterRepeatSinceStartActivityExpression?: (ctx: RepeatSinceStartActivityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.repeatSinceStartActivityExpression`.
	 * @param ctx the parse tree
	 */
	exitRepeatSinceStartActivityExpression?: (ctx: RepeatSinceStartActivityExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.endActivityExpression`.
	 * @param ctx the parse tree
	 */
	enterEndActivityExpression?: (ctx: EndActivityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.endActivityExpression`.
	 * @param ctx the parse tree
	 */
	exitEndActivityExpression?: (ctx: EndActivityExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.sequenceEndActivityExpression`.
	 * @param ctx the parse tree
	 */
	enterSequenceEndActivityExpression?: (ctx: SequenceEndActivityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.sequenceEndActivityExpression`.
	 * @param ctx the parse tree
	 */
	exitSequenceEndActivityExpression?: (ctx: SequenceEndActivityExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.andEndActivityExpression`.
	 * @param ctx the parse tree
	 */
	enterAndEndActivityExpression?: (ctx: AndEndActivityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.andEndActivityExpression`.
	 * @param ctx the parse tree
	 */
	exitAndEndActivityExpression?: (ctx: AndEndActivityExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.orEndActivityExpression`.
	 * @param ctx the parse tree
	 */
	enterOrEndActivityExpression?: (ctx: OrEndActivityExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.orEndActivityExpression`.
	 * @param ctx the parse tree
	 */
	exitOrEndActivityExpression?: (ctx: OrEndActivityExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.activity`.
	 * @param ctx the parse tree
	 */
	enterActivity?: (ctx: ActivityContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.activity`.
	 * @param ctx the parse tree
	 */
	exitActivity?: (ctx: ActivityContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.andSubProcessId`.
	 * @param ctx the parse tree
	 */
	enterAndSubProcessId?: (ctx: AndSubProcessIdContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.andSubProcessId`.
	 * @param ctx the parse tree
	 */
	exitAndSubProcessId?: (ctx: AndSubProcessIdContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.orSubProcessId`.
	 * @param ctx the parse tree
	 */
	enterOrSubProcessId?: (ctx: OrSubProcessIdContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.orSubProcessId`.
	 * @param ctx the parse tree
	 */
	exitOrSubProcessId?: (ctx: OrSubProcessIdContext) => void;

	/**
	 * Enter a parse tree produced by `MScGrammarParser.role`.
	 * @param ctx the parse tree
	 */
	enterRole?: (ctx: RoleContext) => void;
	/**
	 * Exit a parse tree produced by `MScGrammarParser.role`.
	 * @param ctx the parse tree
	 */
	exitRole?: (ctx: RoleContext) => void;
}

