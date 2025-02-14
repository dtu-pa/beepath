// Generated from src/converters/grammar/MScGrammar.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { MScGrammarListener } from "./MScGrammarListener";

export class MScGrammarParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly T__23 = 24;
	public static readonly T__24 = 25;
	public static readonly WORD = 26;
	public static readonly SPACE = 27;
	public static readonly NEWLINE = 28;
	public static readonly RULE_description = 0;
	public static readonly RULE_leadingText = 1;
	public static readonly RULE_statementList = 2;
	public static readonly RULE_initialStatement = 3;
	public static readonly RULE_statement = 4;
	public static readonly RULE_closingStatement = 5;
	public static readonly RULE_afterStatement = 6;
	public static readonly RULE_andSubProcess = 7;
	public static readonly RULE_orSubProcess = 8;
	public static readonly RULE_belongStatement = 9;
	public static readonly RULE_immediatelyExpression = 10;
	public static readonly RULE_eventuallyExpression = 11;
	public static readonly RULE_sequenceStartActivityExpression = 12;
	public static readonly RULE_andStartActivityExpression = 13;
	public static readonly RULE_orStartActivityExpression = 14;
	public static readonly RULE_repeatSinceStartActivityExpression = 15;
	public static readonly RULE_endActivityExpression = 16;
	public static readonly RULE_sequenceEndActivityExpression = 17;
	public static readonly RULE_andEndActivityExpression = 18;
	public static readonly RULE_orEndActivityExpression = 19;
	public static readonly RULE_activity = 20;
	public static readonly RULE_andSubProcessId = 21;
	public static readonly RULE_orSubProcessId = 22;
	public static readonly RULE_role = 23;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"description", "leadingText", "statementList", "initialStatement", "statement", 
		"closingStatement", "afterStatement", "andSubProcess", "orSubProcess", 
		"belongStatement", "immediatelyExpression", "eventuallyExpression", "sequenceStartActivityExpression", 
		"andStartActivityExpression", "orStartActivityExpression", "repeatSinceStartActivityExpression", 
		"endActivityExpression", "sequenceEndActivityExpression", "andEndActivityExpression", 
		"orEndActivityExpression", "activity", "andSubProcessId", "orSubProcessId", 
		"role",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'The following textual description follows the closed-world assumption, meaning that only the activities specified can be executed in the specified order. Any possible activity and execution that is not specified is considered impossible.'", 
		"'Initially start '", "'.'", "'After '", "', the process finishes.'", 
		"', '", "': '", "' and '", "' or '", "'Activity '", "' is performed by '", 
		"'immediately '", "'eventually '", "'start '", "' and start '", "'either start '", 
		"' or start '", "'repeat since '", "' ends'", "' ends and '", "'either '", 
		"' ends or '", "'\"'", "'('", "')'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, "WORD", "SPACE", 
		"NEWLINE",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(MScGrammarParser._LITERAL_NAMES, MScGrammarParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return MScGrammarParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "MScGrammar.g4"; }

	// @Override
	public get ruleNames(): string[] { return MScGrammarParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return MScGrammarParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(MScGrammarParser._ATN, this);
	}
	// @RuleVersion(0)
	public description(): DescriptionContext {
		let _localctx: DescriptionContext = new DescriptionContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, MScGrammarParser.RULE_description);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 48;
			this.leadingText();
			this.state = 49;
			this.statementList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public leadingText(): LeadingTextContext {
		let _localctx: LeadingTextContext = new LeadingTextContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, MScGrammarParser.RULE_leadingText);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 51;
			this.match(MScGrammarParser.T__0);
			this.state = 55;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === MScGrammarParser.NEWLINE) {
				{
				{
				this.state = 52;
				this.match(MScGrammarParser.NEWLINE);
				}
				}
				this.state = 57;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statementList(): StatementListContext {
		let _localctx: StatementListContext = new StatementListContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, MScGrammarParser.RULE_statementList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 58;
			this.initialStatement();
			this.state = 62;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 1, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 59;
					this.statement();
					}
					}
				}
				this.state = 64;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 1, this._ctx);
			}
			this.state = 65;
			this.closingStatement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public initialStatement(): InitialStatementContext {
		let _localctx: InitialStatementContext = new InitialStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, MScGrammarParser.RULE_initialStatement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 67;
			this.match(MScGrammarParser.T__1);
			this.state = 68;
			this.activity();
			this.state = 69;
			this.match(MScGrammarParser.T__2);
			this.state = 73;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === MScGrammarParser.NEWLINE) {
				{
				{
				this.state = 70;
				this.match(MScGrammarParser.NEWLINE);
				}
				}
				this.state = 75;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, MScGrammarParser.RULE_statement);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 81;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				{
				this.state = 76;
				this.afterStatement();
				}
				break;

			case 2:
				{
				this.state = 77;
				this.closingStatement();
				}
				break;

			case 3:
				{
				this.state = 78;
				this.andSubProcess();
				}
				break;

			case 4:
				{
				this.state = 79;
				this.orSubProcess();
				}
				break;

			case 5:
				{
				this.state = 80;
				this.belongStatement();
				}
				break;
			}
			this.state = 86;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === MScGrammarParser.NEWLINE) {
				{
				{
				this.state = 83;
				this.match(MScGrammarParser.NEWLINE);
				}
				}
				this.state = 88;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public closingStatement(): ClosingStatementContext {
		let _localctx: ClosingStatementContext = new ClosingStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, MScGrammarParser.RULE_closingStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 89;
			this.match(MScGrammarParser.T__3);
			this.state = 90;
			this.endActivityExpression();
			this.state = 91;
			this.match(MScGrammarParser.T__4);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public afterStatement(): AfterStatementContext {
		let _localctx: AfterStatementContext = new AfterStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, MScGrammarParser.RULE_afterStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 93;
			this.match(MScGrammarParser.T__3);
			this.state = 94;
			this.endActivityExpression();
			this.state = 95;
			this.match(MScGrammarParser.T__5);
			this.state = 98;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__11:
				{
				this.state = 96;
				this.immediatelyExpression();
				}
				break;
			case MScGrammarParser.T__12:
				{
				this.state = 97;
				this.eventuallyExpression();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 100;
			this.match(MScGrammarParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public andSubProcess(): AndSubProcessContext {
		let _localctx: AndSubProcessContext = new AndSubProcessContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, MScGrammarParser.RULE_andSubProcess);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 102;
			this.andSubProcessId();
			this.state = 103;
			this.match(MScGrammarParser.T__6);
			this.state = 104;
			this.activity();
			this.state = 105;
			this.match(MScGrammarParser.T__7);
			this.state = 106;
			this.activity();
			this.state = 111;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 107;
					this.match(MScGrammarParser.T__7);
					this.state = 108;
					this.activity();
					}
					}
				}
				this.state = 113;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
			}
			this.state = 114;
			this.match(MScGrammarParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public orSubProcess(): OrSubProcessContext {
		let _localctx: OrSubProcessContext = new OrSubProcessContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, MScGrammarParser.RULE_orSubProcess);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 116;
			this.orSubProcessId();
			this.state = 117;
			this.match(MScGrammarParser.T__6);
			this.state = 118;
			this.activity();
			this.state = 119;
			this.match(MScGrammarParser.T__8);
			this.state = 120;
			this.activity();
			this.state = 125;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 121;
					this.match(MScGrammarParser.T__8);
					this.state = 122;
					this.activity();
					}
					}
				}
				this.state = 127;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
			}
			this.state = 128;
			this.match(MScGrammarParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public belongStatement(): BelongStatementContext {
		let _localctx: BelongStatementContext = new BelongStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, MScGrammarParser.RULE_belongStatement);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 130;
			this.match(MScGrammarParser.T__9);
			this.state = 131;
			this.activity();
			this.state = 132;
			this.match(MScGrammarParser.T__10);
			this.state = 133;
			this.role();
			this.state = 134;
			this.match(MScGrammarParser.T__2);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public immediatelyExpression(): ImmediatelyExpressionContext {
		let _localctx: ImmediatelyExpressionContext = new ImmediatelyExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, MScGrammarParser.RULE_immediatelyExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 136;
			this.match(MScGrammarParser.T__11);
			this.state = 141;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				{
				this.state = 137;
				this.sequenceStartActivityExpression();
				}
				break;

			case 2:
				{
				this.state = 138;
				this.andStartActivityExpression();
				}
				break;

			case 3:
				{
				this.state = 139;
				this.orStartActivityExpression();
				}
				break;

			case 4:
				{
				this.state = 140;
				this.repeatSinceStartActivityExpression();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public eventuallyExpression(): EventuallyExpressionContext {
		let _localctx: EventuallyExpressionContext = new EventuallyExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, MScGrammarParser.RULE_eventuallyExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 143;
			this.match(MScGrammarParser.T__12);
			this.state = 144;
			this.sequenceStartActivityExpression();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sequenceStartActivityExpression(): SequenceStartActivityExpressionContext {
		let _localctx: SequenceStartActivityExpressionContext = new SequenceStartActivityExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, MScGrammarParser.RULE_sequenceStartActivityExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 146;
			this.match(MScGrammarParser.T__13);
			this.state = 147;
			this.activity();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public andStartActivityExpression(): AndStartActivityExpressionContext {
		let _localctx: AndStartActivityExpressionContext = new AndStartActivityExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, MScGrammarParser.RULE_andStartActivityExpression);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 149;
			this.match(MScGrammarParser.T__13);
			this.state = 152;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__22:
				{
				this.state = 150;
				this.activity();
				}
				break;
			case MScGrammarParser.T__23:
				{
				this.state = 151;
				this.orSubProcessId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 154;
			this.match(MScGrammarParser.T__14);
			this.state = 157;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__22:
				{
				this.state = 155;
				this.activity();
				}
				break;
			case MScGrammarParser.T__23:
				{
				this.state = 156;
				this.orSubProcessId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 166;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 159;
					this.match(MScGrammarParser.T__14);
					this.state = 162;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case MScGrammarParser.T__22:
						{
						this.state = 160;
						this.activity();
						}
						break;
					case MScGrammarParser.T__23:
						{
						this.state = 161;
						this.orSubProcessId();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					}
				}
				this.state = 168;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public orStartActivityExpression(): OrStartActivityExpressionContext {
		let _localctx: OrStartActivityExpressionContext = new OrStartActivityExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, MScGrammarParser.RULE_orStartActivityExpression);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 169;
			this.match(MScGrammarParser.T__15);
			this.state = 172;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__22:
				{
				this.state = 170;
				this.activity();
				}
				break;
			case MScGrammarParser.T__23:
				{
				this.state = 171;
				this.andSubProcessId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 174;
			this.match(MScGrammarParser.T__16);
			this.state = 177;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__22:
				{
				this.state = 175;
				this.activity();
				}
				break;
			case MScGrammarParser.T__23:
				{
				this.state = 176;
				this.andSubProcessId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 186;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 16, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 179;
					this.match(MScGrammarParser.T__16);
					this.state = 182;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case MScGrammarParser.T__22:
						{
						this.state = 180;
						this.activity();
						}
						break;
					case MScGrammarParser.T__23:
						{
						this.state = 181;
						this.andSubProcessId();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					}
				}
				this.state = 188;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 16, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public repeatSinceStartActivityExpression(): RepeatSinceStartActivityExpressionContext {
		let _localctx: RepeatSinceStartActivityExpressionContext = new RepeatSinceStartActivityExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, MScGrammarParser.RULE_repeatSinceStartActivityExpression);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 189;
			this.match(MScGrammarParser.T__17);
			this.state = 190;
			this.activity();
			this.state = 198;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 191;
					this.match(MScGrammarParser.T__16);
					this.state = 194;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case MScGrammarParser.T__22:
						{
						this.state = 192;
						this.activity();
						}
						break;
					case MScGrammarParser.T__23:
						{
						this.state = 193;
						this.andSubProcessId();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					}
				}
				this.state = 200;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public endActivityExpression(): EndActivityExpressionContext {
		let _localctx: EndActivityExpressionContext = new EndActivityExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, MScGrammarParser.RULE_endActivityExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 204;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 19, this._ctx) ) {
			case 1:
				{
				this.state = 201;
				this.sequenceEndActivityExpression();
				}
				break;

			case 2:
				{
				this.state = 202;
				this.andEndActivityExpression();
				}
				break;

			case 3:
				{
				this.state = 203;
				this.orEndActivityExpression();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sequenceEndActivityExpression(): SequenceEndActivityExpressionContext {
		let _localctx: SequenceEndActivityExpressionContext = new SequenceEndActivityExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, MScGrammarParser.RULE_sequenceEndActivityExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 206;
			this.activity();
			this.state = 207;
			this.match(MScGrammarParser.T__18);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public andEndActivityExpression(): AndEndActivityExpressionContext {
		let _localctx: AndEndActivityExpressionContext = new AndEndActivityExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, MScGrammarParser.RULE_andEndActivityExpression);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 211;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__22:
				{
				this.state = 209;
				this.activity();
				}
				break;
			case MScGrammarParser.T__23:
				{
				this.state = 210;
				this.orSubProcessId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 213;
			this.match(MScGrammarParser.T__19);
			this.state = 222;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 22, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 216;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case MScGrammarParser.T__22:
						{
						this.state = 214;
						this.activity();
						}
						break;
					case MScGrammarParser.T__23:
						{
						this.state = 215;
						this.orSubProcessId();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 218;
					this.match(MScGrammarParser.T__19);
					}
					}
				}
				this.state = 224;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 22, this._ctx);
			}
			this.state = 227;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__22:
				{
				this.state = 225;
				this.activity();
				}
				break;
			case MScGrammarParser.T__23:
				{
				this.state = 226;
				this.orSubProcessId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 229;
			this.match(MScGrammarParser.T__18);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public orEndActivityExpression(): OrEndActivityExpressionContext {
		let _localctx: OrEndActivityExpressionContext = new OrEndActivityExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, MScGrammarParser.RULE_orEndActivityExpression);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 231;
			this.match(MScGrammarParser.T__20);
			this.state = 234;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__22:
				{
				this.state = 232;
				this.activity();
				}
				break;
			case MScGrammarParser.T__23:
				{
				this.state = 233;
				this.andSubProcessId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 236;
			this.match(MScGrammarParser.T__21);
			this.state = 245;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 26, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 239;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case MScGrammarParser.T__22:
						{
						this.state = 237;
						this.activity();
						}
						break;
					case MScGrammarParser.T__23:
						{
						this.state = 238;
						this.andSubProcessId();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 241;
					this.match(MScGrammarParser.T__21);
					}
					}
				}
				this.state = 247;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 26, this._ctx);
			}
			this.state = 250;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__22:
				{
				this.state = 248;
				this.activity();
				}
				break;
			case MScGrammarParser.T__23:
				{
				this.state = 249;
				this.andSubProcessId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 252;
			this.match(MScGrammarParser.T__18);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public activity(): ActivityContext {
		let _localctx: ActivityContext = new ActivityContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, MScGrammarParser.RULE_activity);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 254;
			this.match(MScGrammarParser.T__22);
			this.state = 255;
			this.match(MScGrammarParser.WORD);
			this.state = 260;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 28, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 256;
					this.match(MScGrammarParser.SPACE);
					this.state = 257;
					this.match(MScGrammarParser.WORD);
					}
					}
				}
				this.state = 262;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 28, this._ctx);
			}
			this.state = 263;
			this.match(MScGrammarParser.T__22);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public andSubProcessId(): AndSubProcessIdContext {
		let _localctx: AndSubProcessIdContext = new AndSubProcessIdContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, MScGrammarParser.RULE_andSubProcessId);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 265;
			this.match(MScGrammarParser.T__23);
			this.state = 266;
			this.match(MScGrammarParser.WORD);
			this.state = 271;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 29, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 267;
					this.match(MScGrammarParser.SPACE);
					this.state = 268;
					this.match(MScGrammarParser.WORD);
					}
					}
				}
				this.state = 273;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 29, this._ctx);
			}
			this.state = 274;
			this.match(MScGrammarParser.T__24);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public orSubProcessId(): OrSubProcessIdContext {
		let _localctx: OrSubProcessIdContext = new OrSubProcessIdContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, MScGrammarParser.RULE_orSubProcessId);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 276;
			this.match(MScGrammarParser.T__23);
			this.state = 277;
			this.match(MScGrammarParser.WORD);
			this.state = 282;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 30, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 278;
					this.match(MScGrammarParser.SPACE);
					this.state = 279;
					this.match(MScGrammarParser.WORD);
					}
					}
				}
				this.state = 284;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 30, this._ctx);
			}
			this.state = 285;
			this.match(MScGrammarParser.T__24);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public role(): RoleContext {
		let _localctx: RoleContext = new RoleContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, MScGrammarParser.RULE_role);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 287;
			this.match(MScGrammarParser.T__22);
			this.state = 288;
			this.match(MScGrammarParser.WORD);
			this.state = 293;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 31, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 289;
					this.match(MScGrammarParser.SPACE);
					this.state = 290;
					this.match(MScGrammarParser.WORD);
					}
					}
				}
				this.state = 295;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 31, this._ctx);
			}
			this.state = 296;
			this.match(MScGrammarParser.T__22);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x1E\u012D\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
		"\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12" +
		"\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17" +
		"\x04\x18\t\x18\x04\x19\t\x19\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x07" +
		"\x038\n\x03\f\x03\x0E\x03;\v\x03\x03\x04\x03\x04\x07\x04?\n\x04\f\x04" +
		"\x0E\x04B\v\x04\x03\x04\x03\x04\x03\x05\x03\x05\x03\x05\x03\x05\x07\x05" +
		"J\n\x05\f\x05\x0E\x05M\v\x05\x03\x06\x03\x06\x03\x06\x03\x06\x03\x06\x05" +
		"\x06T\n\x06\x03\x06\x07\x06W\n\x06\f\x06\x0E\x06Z\v\x06\x03\x07\x03\x07" +
		"\x03\x07\x03\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x05\be\n\b\x03\b\x03\b" +
		"\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x07\tp\n\t\f\t\x0E\ts\v\t\x03" +
		"\t\x03\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x07\n~\n\n\f\n\x0E" +
		"\n\x81\v\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x03\f\x03\f" +
		"\x03\f\x03\f\x03\f\x05\f\x90\n\f\x03\r\x03\r\x03\r\x03\x0E\x03\x0E\x03" +
		"\x0E\x03\x0F\x03\x0F\x03\x0F\x05\x0F\x9B\n\x0F\x03\x0F\x03\x0F\x03\x0F" +
		"\x05\x0F\xA0\n\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xA5\n\x0F\x07\x0F\xA7" +
		"\n\x0F\f\x0F\x0E\x0F\xAA\v\x0F\x03\x10\x03\x10\x03\x10\x05\x10\xAF\n\x10" +
		"\x03\x10\x03\x10\x03\x10\x05\x10\xB4\n\x10\x03\x10\x03\x10\x03\x10\x05" +
		"\x10\xB9\n\x10\x07\x10\xBB\n\x10\f\x10\x0E\x10\xBE\v\x10\x03\x11\x03\x11" +
		"\x03\x11\x03\x11\x03\x11\x05\x11\xC5\n\x11\x07\x11\xC7\n\x11\f\x11\x0E" +
		"\x11\xCA\v\x11\x03\x12\x03\x12\x03\x12\x05\x12\xCF\n\x12\x03\x13\x03\x13" +
		"\x03\x13\x03\x14\x03\x14\x05\x14\xD6\n\x14\x03\x14\x03\x14\x03\x14\x05" +
		"\x14\xDB\n\x14\x03\x14\x03\x14\x07\x14\xDF\n\x14\f\x14\x0E\x14\xE2\v\x14" +
		"\x03\x14\x03\x14\x05\x14\xE6\n\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03" +
		"\x15\x05\x15\xED\n\x15\x03\x15\x03\x15\x03\x15\x05\x15\xF2\n\x15\x03\x15" +
		"\x03\x15\x07\x15\xF6\n\x15\f\x15\x0E\x15\xF9\v\x15\x03\x15\x03\x15\x05" +
		"\x15\xFD\n\x15\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x03\x16\x07\x16" +
		"\u0105\n\x16\f\x16\x0E\x16\u0108\v\x16\x03\x16\x03\x16\x03\x17\x03\x17" +
		"\x03\x17\x03\x17\x07\x17\u0110\n\x17\f\x17\x0E\x17\u0113\v\x17\x03\x17" +
		"\x03\x17\x03\x18\x03\x18\x03\x18\x03\x18\x07\x18\u011B\n\x18\f\x18\x0E" +
		"\x18\u011E\v\x18\x03\x18\x03\x18\x03\x19\x03\x19\x03\x19\x03\x19\x07\x19" +
		"\u0126\n\x19\f\x19\x0E\x19\u0129\v\x19\x03\x19\x03\x19\x03\x19\x0E@q\x7F" +
		"\xA8\xBC\xC8\xE0\xF7\u0106\u0111\u011C\u0127\x02\x02\x1A\x02\x02\x04\x02" +
		"\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18" +
		"\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x02" +
		"0\x02\x02\x02\x02\u013A\x022\x03\x02\x02\x02\x045\x03\x02\x02\x02\x06" +
		"<\x03\x02\x02\x02\bE\x03\x02\x02\x02\nS\x03\x02\x02\x02\f[\x03\x02\x02" +
		"\x02\x0E_\x03\x02\x02\x02\x10h\x03\x02\x02\x02\x12v\x03\x02\x02\x02\x14" +
		"\x84\x03\x02\x02\x02\x16\x8A\x03\x02\x02\x02\x18\x91\x03\x02\x02\x02\x1A" +
		"\x94\x03\x02\x02\x02\x1C\x97\x03\x02\x02\x02\x1E\xAB\x03\x02\x02\x02 " +
		"\xBF\x03\x02\x02\x02\"\xCE\x03\x02\x02\x02$\xD0\x03\x02\x02\x02&\xD5\x03" +
		"\x02\x02\x02(\xE9\x03\x02\x02\x02*\u0100\x03\x02\x02\x02,\u010B\x03\x02" +
		"\x02\x02.\u0116\x03\x02\x02\x020\u0121\x03\x02\x02\x0223\x05\x04\x03\x02" +
		"34\x05\x06\x04\x024\x03\x03\x02\x02\x0259\x07\x03\x02\x0268\x07\x1E\x02" +
		"\x0276\x03\x02\x02\x028;\x03\x02\x02\x0297\x03\x02\x02\x029:\x03\x02\x02" +
		"\x02:\x05\x03\x02\x02\x02;9\x03\x02\x02\x02<@\x05\b\x05\x02=?\x05\n\x06" +
		"\x02>=\x03\x02\x02\x02?B\x03\x02\x02\x02@A\x03\x02\x02\x02@>\x03\x02\x02" +
		"\x02AC\x03\x02\x02\x02B@\x03\x02\x02\x02CD\x05\f\x07\x02D\x07\x03\x02" +
		"\x02\x02EF\x07\x04\x02\x02FG\x05*\x16\x02GK\x07\x05\x02\x02HJ\x07\x1E" +
		"\x02\x02IH\x03\x02\x02\x02JM\x03\x02\x02\x02KI\x03\x02\x02\x02KL\x03\x02" +
		"\x02\x02L\t\x03\x02\x02\x02MK\x03\x02\x02\x02NT\x05\x0E\b\x02OT\x05\f" +
		"\x07\x02PT\x05\x10\t\x02QT\x05\x12\n\x02RT\x05\x14\v\x02SN\x03\x02\x02" +
		"\x02SO\x03\x02\x02\x02SP\x03\x02\x02\x02SQ\x03\x02\x02\x02SR\x03\x02\x02" +
		"\x02TX\x03\x02\x02\x02UW\x07\x1E\x02\x02VU\x03\x02\x02\x02WZ\x03\x02\x02" +
		"\x02XV\x03\x02\x02\x02XY\x03\x02\x02\x02Y\v\x03\x02\x02\x02ZX\x03\x02" +
		"\x02\x02[\\\x07\x06\x02\x02\\]\x05\"\x12\x02]^\x07\x07\x02\x02^\r\x03" +
		"\x02\x02\x02_`\x07\x06\x02\x02`a\x05\"\x12\x02ad\x07\b\x02\x02be\x05\x16" +
		"\f\x02ce\x05\x18\r\x02db\x03\x02\x02\x02dc\x03\x02\x02\x02ef\x03\x02\x02" +
		"\x02fg\x07\x05\x02\x02g\x0F\x03\x02\x02\x02hi\x05,\x17\x02ij\x07\t\x02" +
		"\x02jk\x05*\x16\x02kl\x07\n\x02\x02lq\x05*\x16\x02mn\x07\n\x02\x02np\x05" +
		"*\x16\x02om\x03\x02\x02\x02ps\x03\x02\x02\x02qr\x03\x02\x02\x02qo\x03" +
		"\x02\x02\x02rt\x03\x02\x02\x02sq\x03\x02\x02\x02tu\x07\x05\x02\x02u\x11" +
		"\x03\x02\x02\x02vw\x05.\x18\x02wx\x07\t\x02\x02xy\x05*\x16\x02yz\x07\v" +
		"\x02\x02z\x7F\x05*\x16\x02{|\x07\v\x02\x02|~\x05*\x16\x02}{\x03\x02\x02" +
		"\x02~\x81\x03\x02\x02\x02\x7F\x80\x03\x02\x02\x02\x7F}\x03\x02\x02\x02" +
		"\x80\x82\x03\x02\x02\x02\x81\x7F\x03\x02\x02\x02\x82\x83\x07\x05\x02\x02" +
		"\x83\x13\x03\x02\x02\x02\x84\x85\x07\f\x02\x02\x85\x86\x05*\x16\x02\x86" +
		"\x87\x07\r\x02\x02\x87\x88\x050\x19\x02\x88\x89\x07\x05\x02\x02\x89\x15" +
		"\x03\x02\x02\x02\x8A\x8F\x07\x0E\x02\x02\x8B\x90\x05\x1A\x0E\x02\x8C\x90" +
		"\x05\x1C\x0F\x02\x8D\x90\x05\x1E\x10\x02\x8E\x90\x05 \x11\x02\x8F\x8B" +
		"\x03\x02\x02\x02\x8F\x8C\x03\x02\x02\x02\x8F\x8D\x03\x02\x02\x02\x8F\x8E" +
		"\x03\x02\x02\x02\x90\x17\x03\x02\x02\x02\x91\x92\x07\x0F\x02\x02\x92\x93" +
		"\x05\x1A\x0E\x02\x93\x19\x03\x02\x02\x02\x94\x95\x07\x10\x02\x02\x95\x96" +
		"\x05*\x16\x02\x96\x1B\x03\x02\x02\x02\x97\x9A\x07\x10\x02\x02\x98\x9B" +
		"\x05*\x16\x02\x99\x9B\x05.\x18\x02\x9A\x98\x03\x02\x02\x02\x9A\x99\x03" +
		"\x02\x02\x02\x9B\x9C\x03\x02\x02\x02\x9C\x9F\x07\x11\x02\x02\x9D\xA0\x05" +
		"*\x16\x02\x9E\xA0\x05.\x18\x02\x9F\x9D\x03\x02\x02\x02\x9F\x9E\x03\x02" +
		"\x02\x02\xA0\xA8\x03\x02\x02\x02\xA1\xA4\x07\x11\x02\x02\xA2\xA5\x05*" +
		"\x16\x02\xA3\xA5\x05.\x18\x02\xA4\xA2\x03\x02\x02\x02\xA4\xA3\x03\x02" +
		"\x02\x02\xA5\xA7\x03\x02\x02\x02\xA6\xA1\x03\x02\x02\x02\xA7\xAA\x03\x02" +
		"\x02\x02\xA8\xA9\x03\x02\x02\x02\xA8\xA6\x03\x02\x02\x02\xA9\x1D\x03\x02" +
		"\x02\x02\xAA\xA8\x03\x02\x02\x02\xAB\xAE\x07\x12\x02\x02\xAC\xAF\x05*" +
		"\x16\x02\xAD\xAF\x05,\x17\x02\xAE\xAC\x03\x02\x02\x02\xAE\xAD\x03\x02" +
		"\x02\x02\xAF\xB0\x03\x02\x02\x02\xB0\xB3\x07\x13\x02\x02\xB1\xB4\x05*" +
		"\x16\x02\xB2\xB4\x05,\x17\x02\xB3\xB1\x03\x02\x02\x02\xB3\xB2\x03\x02" +
		"\x02\x02\xB4\xBC\x03\x02\x02\x02\xB5\xB8\x07\x13\x02\x02\xB6\xB9\x05*" +
		"\x16\x02\xB7\xB9\x05,\x17\x02\xB8\xB6\x03\x02\x02\x02\xB8\xB7\x03\x02" +
		"\x02\x02\xB9\xBB\x03\x02\x02\x02\xBA\xB5\x03\x02\x02\x02\xBB\xBE\x03\x02" +
		"\x02\x02\xBC\xBD\x03\x02\x02\x02\xBC\xBA\x03\x02\x02\x02\xBD\x1F\x03\x02" +
		"\x02\x02\xBE\xBC\x03\x02\x02\x02\xBF\xC0\x07\x14\x02\x02\xC0\xC8\x05*" +
		"\x16\x02\xC1\xC4\x07\x13\x02\x02\xC2\xC5\x05*\x16\x02\xC3\xC5\x05,\x17" +
		"\x02\xC4\xC2\x03\x02\x02\x02\xC4\xC3\x03\x02\x02\x02\xC5\xC7\x03\x02\x02" +
		"\x02\xC6\xC1\x03\x02\x02\x02\xC7\xCA\x03\x02\x02\x02\xC8\xC9\x03\x02\x02" +
		"\x02\xC8\xC6\x03\x02\x02\x02\xC9!\x03\x02\x02\x02\xCA\xC8\x03\x02\x02" +
		"\x02\xCB\xCF\x05$\x13\x02\xCC\xCF\x05&\x14\x02\xCD\xCF\x05(\x15\x02\xCE" +
		"\xCB\x03\x02\x02\x02\xCE\xCC\x03\x02\x02\x02\xCE\xCD\x03\x02\x02\x02\xCF" +
		"#\x03\x02\x02\x02\xD0\xD1\x05*\x16\x02\xD1\xD2\x07\x15\x02\x02\xD2%\x03" +
		"\x02\x02\x02\xD3\xD6\x05*\x16\x02\xD4\xD6\x05.\x18\x02\xD5\xD3\x03\x02" +
		"\x02\x02\xD5\xD4\x03\x02\x02\x02\xD6\xD7\x03\x02\x02\x02\xD7\xE0\x07\x16" +
		"\x02\x02\xD8\xDB\x05*\x16\x02\xD9\xDB\x05.\x18\x02\xDA\xD8\x03\x02\x02" +
		"\x02\xDA\xD9\x03\x02\x02\x02\xDB\xDC\x03\x02\x02\x02\xDC\xDD\x07\x16\x02" +
		"\x02\xDD\xDF\x03\x02\x02\x02\xDE\xDA\x03\x02\x02\x02\xDF\xE2\x03\x02\x02" +
		"\x02\xE0\xE1\x03\x02\x02\x02\xE0\xDE\x03\x02\x02\x02\xE1\xE5\x03\x02\x02" +
		"\x02\xE2\xE0\x03\x02\x02\x02\xE3\xE6\x05*\x16\x02\xE4\xE6\x05.\x18\x02" +
		"\xE5\xE3\x03\x02\x02\x02\xE5\xE4\x03\x02\x02\x02\xE6\xE7\x03\x02\x02\x02" +
		"\xE7\xE8\x07\x15\x02\x02\xE8\'\x03\x02\x02\x02\xE9\xEC\x07\x17\x02\x02" +
		"\xEA\xED\x05*\x16\x02\xEB\xED\x05,\x17\x02\xEC\xEA\x03\x02\x02\x02\xEC" +
		"\xEB\x03\x02\x02\x02\xED\xEE\x03\x02\x02\x02\xEE\xF7\x07\x18\x02\x02\xEF" +
		"\xF2\x05*\x16\x02\xF0\xF2\x05,\x17\x02\xF1\xEF\x03\x02\x02\x02\xF1\xF0" +
		"\x03\x02\x02\x02\xF2\xF3\x03\x02\x02\x02\xF3\xF4\x07\x18\x02\x02\xF4\xF6" +
		"\x03\x02\x02\x02\xF5\xF1\x03\x02\x02\x02\xF6\xF9\x03\x02\x02\x02\xF7\xF8" +
		"\x03\x02\x02\x02\xF7\xF5\x03\x02\x02\x02\xF8\xFC\x03\x02\x02\x02\xF9\xF7" +
		"\x03\x02\x02\x02\xFA\xFD\x05*\x16\x02\xFB\xFD\x05,\x17\x02\xFC\xFA\x03" +
		"\x02\x02\x02\xFC\xFB\x03\x02\x02\x02\xFD\xFE\x03\x02\x02\x02\xFE\xFF\x07" +
		"\x15\x02\x02\xFF)\x03\x02\x02\x02\u0100\u0101\x07\x19\x02\x02\u0101\u0106" +
		"\x07\x1C\x02\x02\u0102\u0103\x07\x1D\x02\x02\u0103\u0105\x07\x1C\x02\x02" +
		"\u0104\u0102\x03\x02\x02\x02\u0105\u0108\x03\x02\x02\x02\u0106\u0107\x03" +
		"\x02\x02\x02\u0106\u0104\x03\x02\x02\x02\u0107\u0109\x03\x02\x02\x02\u0108" +
		"\u0106\x03\x02\x02\x02\u0109\u010A\x07\x19\x02\x02\u010A+\x03\x02\x02" +
		"\x02\u010B\u010C\x07\x1A\x02\x02\u010C\u0111\x07\x1C\x02\x02\u010D\u010E" +
		"\x07\x1D\x02\x02\u010E\u0110\x07\x1C\x02\x02\u010F\u010D\x03\x02\x02\x02" +
		"\u0110\u0113\x03\x02\x02\x02\u0111\u0112\x03\x02\x02\x02\u0111\u010F\x03" +
		"\x02\x02\x02\u0112\u0114\x03\x02\x02\x02\u0113\u0111\x03\x02\x02\x02\u0114" +
		"\u0115\x07\x1B\x02\x02\u0115-\x03\x02\x02\x02\u0116\u0117\x07\x1A\x02" +
		"\x02\u0117\u011C\x07\x1C\x02\x02\u0118\u0119\x07\x1D\x02\x02\u0119\u011B" +
		"\x07\x1C\x02\x02\u011A\u0118\x03\x02\x02\x02\u011B\u011E\x03\x02\x02\x02" +
		"\u011C\u011D\x03\x02\x02\x02\u011C\u011A\x03\x02\x02\x02\u011D\u011F\x03" +
		"\x02\x02\x02\u011E\u011C\x03\x02\x02\x02\u011F\u0120\x07\x1B\x02\x02\u0120" +
		"/\x03\x02\x02\x02\u0121\u0122\x07\x19\x02\x02\u0122\u0127\x07\x1C\x02" +
		"\x02\u0123\u0124\x07\x1D\x02\x02\u0124\u0126\x07\x1C\x02\x02\u0125\u0123" +
		"\x03\x02\x02\x02\u0126\u0129\x03\x02\x02\x02\u0127\u0128\x03\x02\x02\x02" +
		"\u0127\u0125\x03\x02\x02\x02\u0128\u012A\x03\x02\x02\x02\u0129\u0127\x03" +
		"\x02\x02\x02\u012A\u012B\x07\x19\x02\x02\u012B1\x03\x02\x02\x02\"9@KS" +
		"Xdq\x7F\x8F\x9A\x9F\xA4\xA8\xAE\xB3\xB8\xBC\xC4\xC8\xCE\xD5\xDA\xE0\xE5" +
		"\xEC\xF1\xF7\xFC\u0106\u0111\u011C\u0127";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!MScGrammarParser.__ATN) {
			MScGrammarParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(MScGrammarParser._serializedATN));
		}

		return MScGrammarParser.__ATN;
	}

}

export class DescriptionContext extends ParserRuleContext {
	public leadingText(): LeadingTextContext {
		return this.getRuleContext(0, LeadingTextContext);
	}
	public statementList(): StatementListContext {
		return this.getRuleContext(0, StatementListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_description; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterDescription) {
			listener.enterDescription(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitDescription) {
			listener.exitDescription(this);
		}
	}
}


export class LeadingTextContext extends ParserRuleContext {
	public NEWLINE(): TerminalNode[];
	public NEWLINE(i: number): TerminalNode;
	public NEWLINE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MScGrammarParser.NEWLINE);
		} else {
			return this.getToken(MScGrammarParser.NEWLINE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_leadingText; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterLeadingText) {
			listener.enterLeadingText(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitLeadingText) {
			listener.exitLeadingText(this);
		}
	}
}


export class StatementListContext extends ParserRuleContext {
	public initialStatement(): InitialStatementContext {
		return this.getRuleContext(0, InitialStatementContext);
	}
	public closingStatement(): ClosingStatementContext {
		return this.getRuleContext(0, ClosingStatementContext);
	}
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_statementList; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterStatementList) {
			listener.enterStatementList(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitStatementList) {
			listener.exitStatementList(this);
		}
	}
}


export class InitialStatementContext extends ParserRuleContext {
	public activity(): ActivityContext {
		return this.getRuleContext(0, ActivityContext);
	}
	public NEWLINE(): TerminalNode[];
	public NEWLINE(i: number): TerminalNode;
	public NEWLINE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MScGrammarParser.NEWLINE);
		} else {
			return this.getToken(MScGrammarParser.NEWLINE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_initialStatement; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterInitialStatement) {
			listener.enterInitialStatement(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitInitialStatement) {
			listener.exitInitialStatement(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	public afterStatement(): AfterStatementContext | undefined {
		return this.tryGetRuleContext(0, AfterStatementContext);
	}
	public closingStatement(): ClosingStatementContext | undefined {
		return this.tryGetRuleContext(0, ClosingStatementContext);
	}
	public andSubProcess(): AndSubProcessContext | undefined {
		return this.tryGetRuleContext(0, AndSubProcessContext);
	}
	public orSubProcess(): OrSubProcessContext | undefined {
		return this.tryGetRuleContext(0, OrSubProcessContext);
	}
	public belongStatement(): BelongStatementContext | undefined {
		return this.tryGetRuleContext(0, BelongStatementContext);
	}
	public NEWLINE(): TerminalNode[];
	public NEWLINE(i: number): TerminalNode;
	public NEWLINE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MScGrammarParser.NEWLINE);
		} else {
			return this.getToken(MScGrammarParser.NEWLINE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_statement; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterStatement) {
			listener.enterStatement(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitStatement) {
			listener.exitStatement(this);
		}
	}
}


export class ClosingStatementContext extends ParserRuleContext {
	public endActivityExpression(): EndActivityExpressionContext {
		return this.getRuleContext(0, EndActivityExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_closingStatement; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterClosingStatement) {
			listener.enterClosingStatement(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitClosingStatement) {
			listener.exitClosingStatement(this);
		}
	}
}


export class AfterStatementContext extends ParserRuleContext {
	public endActivityExpression(): EndActivityExpressionContext {
		return this.getRuleContext(0, EndActivityExpressionContext);
	}
	public immediatelyExpression(): ImmediatelyExpressionContext | undefined {
		return this.tryGetRuleContext(0, ImmediatelyExpressionContext);
	}
	public eventuallyExpression(): EventuallyExpressionContext | undefined {
		return this.tryGetRuleContext(0, EventuallyExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_afterStatement; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterAfterStatement) {
			listener.enterAfterStatement(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitAfterStatement) {
			listener.exitAfterStatement(this);
		}
	}
}


export class AndSubProcessContext extends ParserRuleContext {
	public andSubProcessId(): AndSubProcessIdContext {
		return this.getRuleContext(0, AndSubProcessIdContext);
	}
	public activity(): ActivityContext[];
	public activity(i: number): ActivityContext;
	public activity(i?: number): ActivityContext | ActivityContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ActivityContext);
		} else {
			return this.getRuleContext(i, ActivityContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_andSubProcess; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterAndSubProcess) {
			listener.enterAndSubProcess(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitAndSubProcess) {
			listener.exitAndSubProcess(this);
		}
	}
}


export class OrSubProcessContext extends ParserRuleContext {
	public orSubProcessId(): OrSubProcessIdContext {
		return this.getRuleContext(0, OrSubProcessIdContext);
	}
	public activity(): ActivityContext[];
	public activity(i: number): ActivityContext;
	public activity(i?: number): ActivityContext | ActivityContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ActivityContext);
		} else {
			return this.getRuleContext(i, ActivityContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_orSubProcess; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterOrSubProcess) {
			listener.enterOrSubProcess(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitOrSubProcess) {
			listener.exitOrSubProcess(this);
		}
	}
}


export class BelongStatementContext extends ParserRuleContext {
	public activity(): ActivityContext {
		return this.getRuleContext(0, ActivityContext);
	}
	public role(): RoleContext {
		return this.getRuleContext(0, RoleContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_belongStatement; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterBelongStatement) {
			listener.enterBelongStatement(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitBelongStatement) {
			listener.exitBelongStatement(this);
		}
	}
}


export class ImmediatelyExpressionContext extends ParserRuleContext {
	public sequenceStartActivityExpression(): SequenceStartActivityExpressionContext | undefined {
		return this.tryGetRuleContext(0, SequenceStartActivityExpressionContext);
	}
	public andStartActivityExpression(): AndStartActivityExpressionContext | undefined {
		return this.tryGetRuleContext(0, AndStartActivityExpressionContext);
	}
	public orStartActivityExpression(): OrStartActivityExpressionContext | undefined {
		return this.tryGetRuleContext(0, OrStartActivityExpressionContext);
	}
	public repeatSinceStartActivityExpression(): RepeatSinceStartActivityExpressionContext | undefined {
		return this.tryGetRuleContext(0, RepeatSinceStartActivityExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_immediatelyExpression; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterImmediatelyExpression) {
			listener.enterImmediatelyExpression(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitImmediatelyExpression) {
			listener.exitImmediatelyExpression(this);
		}
	}
}


export class EventuallyExpressionContext extends ParserRuleContext {
	public sequenceStartActivityExpression(): SequenceStartActivityExpressionContext {
		return this.getRuleContext(0, SequenceStartActivityExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_eventuallyExpression; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterEventuallyExpression) {
			listener.enterEventuallyExpression(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitEventuallyExpression) {
			listener.exitEventuallyExpression(this);
		}
	}
}


export class SequenceStartActivityExpressionContext extends ParserRuleContext {
	public activity(): ActivityContext {
		return this.getRuleContext(0, ActivityContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_sequenceStartActivityExpression; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterSequenceStartActivityExpression) {
			listener.enterSequenceStartActivityExpression(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitSequenceStartActivityExpression) {
			listener.exitSequenceStartActivityExpression(this);
		}
	}
}


export class AndStartActivityExpressionContext extends ParserRuleContext {
	public activity(): ActivityContext[];
	public activity(i: number): ActivityContext;
	public activity(i?: number): ActivityContext | ActivityContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ActivityContext);
		} else {
			return this.getRuleContext(i, ActivityContext);
		}
	}
	public orSubProcessId(): OrSubProcessIdContext[];
	public orSubProcessId(i: number): OrSubProcessIdContext;
	public orSubProcessId(i?: number): OrSubProcessIdContext | OrSubProcessIdContext[] {
		if (i === undefined) {
			return this.getRuleContexts(OrSubProcessIdContext);
		} else {
			return this.getRuleContext(i, OrSubProcessIdContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_andStartActivityExpression; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterAndStartActivityExpression) {
			listener.enterAndStartActivityExpression(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitAndStartActivityExpression) {
			listener.exitAndStartActivityExpression(this);
		}
	}
}


export class OrStartActivityExpressionContext extends ParserRuleContext {
	public activity(): ActivityContext[];
	public activity(i: number): ActivityContext;
	public activity(i?: number): ActivityContext | ActivityContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ActivityContext);
		} else {
			return this.getRuleContext(i, ActivityContext);
		}
	}
	public andSubProcessId(): AndSubProcessIdContext[];
	public andSubProcessId(i: number): AndSubProcessIdContext;
	public andSubProcessId(i?: number): AndSubProcessIdContext | AndSubProcessIdContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AndSubProcessIdContext);
		} else {
			return this.getRuleContext(i, AndSubProcessIdContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_orStartActivityExpression; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterOrStartActivityExpression) {
			listener.enterOrStartActivityExpression(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitOrStartActivityExpression) {
			listener.exitOrStartActivityExpression(this);
		}
	}
}


export class RepeatSinceStartActivityExpressionContext extends ParserRuleContext {
	public activity(): ActivityContext[];
	public activity(i: number): ActivityContext;
	public activity(i?: number): ActivityContext | ActivityContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ActivityContext);
		} else {
			return this.getRuleContext(i, ActivityContext);
		}
	}
	public andSubProcessId(): AndSubProcessIdContext[];
	public andSubProcessId(i: number): AndSubProcessIdContext;
	public andSubProcessId(i?: number): AndSubProcessIdContext | AndSubProcessIdContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AndSubProcessIdContext);
		} else {
			return this.getRuleContext(i, AndSubProcessIdContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_repeatSinceStartActivityExpression; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterRepeatSinceStartActivityExpression) {
			listener.enterRepeatSinceStartActivityExpression(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitRepeatSinceStartActivityExpression) {
			listener.exitRepeatSinceStartActivityExpression(this);
		}
	}
}


export class EndActivityExpressionContext extends ParserRuleContext {
	public sequenceEndActivityExpression(): SequenceEndActivityExpressionContext | undefined {
		return this.tryGetRuleContext(0, SequenceEndActivityExpressionContext);
	}
	public andEndActivityExpression(): AndEndActivityExpressionContext | undefined {
		return this.tryGetRuleContext(0, AndEndActivityExpressionContext);
	}
	public orEndActivityExpression(): OrEndActivityExpressionContext | undefined {
		return this.tryGetRuleContext(0, OrEndActivityExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_endActivityExpression; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterEndActivityExpression) {
			listener.enterEndActivityExpression(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitEndActivityExpression) {
			listener.exitEndActivityExpression(this);
		}
	}
}


export class SequenceEndActivityExpressionContext extends ParserRuleContext {
	public activity(): ActivityContext {
		return this.getRuleContext(0, ActivityContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_sequenceEndActivityExpression; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterSequenceEndActivityExpression) {
			listener.enterSequenceEndActivityExpression(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitSequenceEndActivityExpression) {
			listener.exitSequenceEndActivityExpression(this);
		}
	}
}


export class AndEndActivityExpressionContext extends ParserRuleContext {
	public activity(): ActivityContext[];
	public activity(i: number): ActivityContext;
	public activity(i?: number): ActivityContext | ActivityContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ActivityContext);
		} else {
			return this.getRuleContext(i, ActivityContext);
		}
	}
	public orSubProcessId(): OrSubProcessIdContext[];
	public orSubProcessId(i: number): OrSubProcessIdContext;
	public orSubProcessId(i?: number): OrSubProcessIdContext | OrSubProcessIdContext[] {
		if (i === undefined) {
			return this.getRuleContexts(OrSubProcessIdContext);
		} else {
			return this.getRuleContext(i, OrSubProcessIdContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_andEndActivityExpression; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterAndEndActivityExpression) {
			listener.enterAndEndActivityExpression(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitAndEndActivityExpression) {
			listener.exitAndEndActivityExpression(this);
		}
	}
}


export class OrEndActivityExpressionContext extends ParserRuleContext {
	public activity(): ActivityContext[];
	public activity(i: number): ActivityContext;
	public activity(i?: number): ActivityContext | ActivityContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ActivityContext);
		} else {
			return this.getRuleContext(i, ActivityContext);
		}
	}
	public andSubProcessId(): AndSubProcessIdContext[];
	public andSubProcessId(i: number): AndSubProcessIdContext;
	public andSubProcessId(i?: number): AndSubProcessIdContext | AndSubProcessIdContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AndSubProcessIdContext);
		} else {
			return this.getRuleContext(i, AndSubProcessIdContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_orEndActivityExpression; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterOrEndActivityExpression) {
			listener.enterOrEndActivityExpression(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitOrEndActivityExpression) {
			listener.exitOrEndActivityExpression(this);
		}
	}
}


export class ActivityContext extends ParserRuleContext {
	public WORD(): TerminalNode[];
	public WORD(i: number): TerminalNode;
	public WORD(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MScGrammarParser.WORD);
		} else {
			return this.getToken(MScGrammarParser.WORD, i);
		}
	}
	public SPACE(): TerminalNode[];
	public SPACE(i: number): TerminalNode;
	public SPACE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MScGrammarParser.SPACE);
		} else {
			return this.getToken(MScGrammarParser.SPACE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_activity; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterActivity) {
			listener.enterActivity(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitActivity) {
			listener.exitActivity(this);
		}
	}
}


export class AndSubProcessIdContext extends ParserRuleContext {
	public WORD(): TerminalNode[];
	public WORD(i: number): TerminalNode;
	public WORD(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MScGrammarParser.WORD);
		} else {
			return this.getToken(MScGrammarParser.WORD, i);
		}
	}
	public SPACE(): TerminalNode[];
	public SPACE(i: number): TerminalNode;
	public SPACE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MScGrammarParser.SPACE);
		} else {
			return this.getToken(MScGrammarParser.SPACE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_andSubProcessId; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterAndSubProcessId) {
			listener.enterAndSubProcessId(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitAndSubProcessId) {
			listener.exitAndSubProcessId(this);
		}
	}
}


export class OrSubProcessIdContext extends ParserRuleContext {
	public WORD(): TerminalNode[];
	public WORD(i: number): TerminalNode;
	public WORD(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MScGrammarParser.WORD);
		} else {
			return this.getToken(MScGrammarParser.WORD, i);
		}
	}
	public SPACE(): TerminalNode[];
	public SPACE(i: number): TerminalNode;
	public SPACE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MScGrammarParser.SPACE);
		} else {
			return this.getToken(MScGrammarParser.SPACE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_orSubProcessId; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterOrSubProcessId) {
			listener.enterOrSubProcessId(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitOrSubProcessId) {
			listener.exitOrSubProcessId(this);
		}
	}
}


export class RoleContext extends ParserRuleContext {
	public WORD(): TerminalNode[];
	public WORD(i: number): TerminalNode;
	public WORD(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MScGrammarParser.WORD);
		} else {
			return this.getToken(MScGrammarParser.WORD, i);
		}
	}
	public SPACE(): TerminalNode[];
	public SPACE(i: number): TerminalNode;
	public SPACE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(MScGrammarParser.SPACE);
		} else {
			return this.getToken(MScGrammarParser.SPACE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return MScGrammarParser.RULE_role; }
	// @Override
	public enterRule(listener: MScGrammarListener): void {
		if (listener.enterRole) {
			listener.enterRole(this);
		}
	}
	// @Override
	public exitRule(listener: MScGrammarListener): void {
		if (listener.exitRole) {
			listener.exitRole(this);
		}
	}
}


