// Generated from app/grammar/MScGrammar.g4 by ANTLR 4.9.0-SNAPSHOT


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

import type { MScGrammarListener } from "./MScGrammarListener";

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
	public static readonly WORD = 24;
	public static readonly SPACE = 25;
	public static readonly NEWLINE = 26;
	public static readonly RULE_description = 0;
	public static readonly RULE_leadingText = 1;
	public static readonly RULE_statementList = 2;
	public static readonly RULE_initialStatement = 3;
	public static readonly RULE_statement = 4;
	public static readonly RULE_closingStatement = 5;
	public static readonly RULE_afterStatement = 6;
	public static readonly RULE_andSubProcess = 7;
	public static readonly RULE_orSubProcess = 8;
	public static readonly RULE_immediatelyExpression = 9;
	public static readonly RULE_eventuallyExpression = 10;
	public static readonly RULE_sequenceStartActivityExpression = 11;
	public static readonly RULE_andStartActivityExpression = 12;
	public static readonly RULE_orStartActivityExpression = 13;
	public static readonly RULE_repeatSinceStartActivityExpression = 14;
	public static readonly RULE_endActivityExpression = 15;
	public static readonly RULE_sequenceEndActivityExpression = 16;
	public static readonly RULE_andEndActivityExpression = 17;
	public static readonly RULE_orEndActivityExpression = 18;
	public static readonly RULE_activity = 19;
	public static readonly RULE_andSubProcessId = 20;
	public static readonly RULE_orSubProcessId = 21;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"description", "leadingText", "statementList", "initialStatement", "statement", 
		"closingStatement", "afterStatement", "andSubProcess", "orSubProcess", 
		"immediatelyExpression", "eventuallyExpression", "sequenceStartActivityExpression", 
		"andStartActivityExpression", "orStartActivityExpression", "repeatSinceStartActivityExpression", 
		"endActivityExpression", "sequenceEndActivityExpression", "andEndActivityExpression", 
		"orEndActivityExpression", "activity", "andSubProcessId", "orSubProcessId",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'The following textual description follows the closed-world assumption, meaning that only the activities specified can be executed in the specified order. Any possible activity and execution that is not specified is considered impossible.'", 
		"'Initially start '", "'.'", "'After '", "', the process finishes.'", 
		"', '", "': '", "' and '", "' or '", "'immediately '", "'eventually '", 
		"'start '", "' and start '", "'either start '", "' or start '", "'repeat since '", 
		"' ends'", "' ends and '", "'either '", "' ends or '", "'\"'", "'('", 
		"')'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, "WORD", "SPACE", "NEWLINE",
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
			this.state = 44;
			this.leadingText();
			this.state = 45;
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
			this.state = 47;
			this.match(MScGrammarParser.T__0);
			this.state = 51;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === MScGrammarParser.NEWLINE) {
				{
				{
				this.state = 48;
				this.match(MScGrammarParser.NEWLINE);
				}
				}
				this.state = 53;
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
			this.state = 54;
			this.initialStatement();
			this.state = 58;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 1, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 55;
					this.statement();
					}
					}
				}
				this.state = 60;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 1, this._ctx);
			}
			this.state = 61;
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
			this.state = 63;
			this.match(MScGrammarParser.T__1);
			this.state = 64;
			this.activity();
			this.state = 65;
			this.match(MScGrammarParser.T__2);
			this.state = 69;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === MScGrammarParser.NEWLINE) {
				{
				{
				this.state = 66;
				this.match(MScGrammarParser.NEWLINE);
				}
				}
				this.state = 71;
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
			this.state = 76;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				{
				this.state = 72;
				this.afterStatement();
				}
				break;

			case 2:
				{
				this.state = 73;
				this.closingStatement();
				}
				break;

			case 3:
				{
				this.state = 74;
				this.andSubProcess();
				}
				break;

			case 4:
				{
				this.state = 75;
				this.orSubProcess();
				}
				break;
			}
			this.state = 81;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === MScGrammarParser.NEWLINE) {
				{
				{
				this.state = 78;
				this.match(MScGrammarParser.NEWLINE);
				}
				}
				this.state = 83;
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
			this.state = 84;
			this.match(MScGrammarParser.T__3);
			this.state = 85;
			this.endActivityExpression();
			this.state = 86;
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
			this.state = 88;
			this.match(MScGrammarParser.T__3);
			this.state = 89;
			this.endActivityExpression();
			this.state = 90;
			this.match(MScGrammarParser.T__5);
			this.state = 93;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__9:
				{
				this.state = 91;
				this.immediatelyExpression();
				}
				break;
			case MScGrammarParser.T__10:
				{
				this.state = 92;
				this.eventuallyExpression();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 95;
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
			this.state = 97;
			this.andSubProcessId();
			this.state = 98;
			this.match(MScGrammarParser.T__6);
			this.state = 99;
			this.activity();
			this.state = 100;
			this.match(MScGrammarParser.T__7);
			this.state = 101;
			this.activity();
			this.state = 106;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 102;
					this.match(MScGrammarParser.T__7);
					this.state = 103;
					this.activity();
					}
					}
				}
				this.state = 108;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
			}
			this.state = 109;
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
			this.state = 111;
			this.orSubProcessId();
			this.state = 112;
			this.match(MScGrammarParser.T__6);
			this.state = 113;
			this.activity();
			this.state = 114;
			this.match(MScGrammarParser.T__8);
			this.state = 115;
			this.activity();
			this.state = 120;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 116;
					this.match(MScGrammarParser.T__8);
					this.state = 117;
					this.activity();
					}
					}
				}
				this.state = 122;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
			}
			this.state = 123;
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
		this.enterRule(_localctx, 18, MScGrammarParser.RULE_immediatelyExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 125;
			this.match(MScGrammarParser.T__9);
			this.state = 130;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				{
				this.state = 126;
				this.sequenceStartActivityExpression();
				}
				break;

			case 2:
				{
				this.state = 127;
				this.andStartActivityExpression();
				}
				break;

			case 3:
				{
				this.state = 128;
				this.orStartActivityExpression();
				}
				break;

			case 4:
				{
				this.state = 129;
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
		this.enterRule(_localctx, 20, MScGrammarParser.RULE_eventuallyExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 132;
			this.match(MScGrammarParser.T__10);
			this.state = 133;
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
		this.enterRule(_localctx, 22, MScGrammarParser.RULE_sequenceStartActivityExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 135;
			this.match(MScGrammarParser.T__11);
			this.state = 136;
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
		this.enterRule(_localctx, 24, MScGrammarParser.RULE_andStartActivityExpression);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 138;
			this.match(MScGrammarParser.T__11);
			this.state = 141;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__20:
				{
				this.state = 139;
				this.activity();
				}
				break;
			case MScGrammarParser.T__21:
				{
				this.state = 140;
				this.orSubProcessId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 143;
			this.match(MScGrammarParser.T__12);
			this.state = 146;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__20:
				{
				this.state = 144;
				this.activity();
				}
				break;
			case MScGrammarParser.T__21:
				{
				this.state = 145;
				this.orSubProcessId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 155;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 148;
					this.match(MScGrammarParser.T__12);
					this.state = 151;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case MScGrammarParser.T__20:
						{
						this.state = 149;
						this.activity();
						}
						break;
					case MScGrammarParser.T__21:
						{
						this.state = 150;
						this.orSubProcessId();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					}
				}
				this.state = 157;
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
		this.enterRule(_localctx, 26, MScGrammarParser.RULE_orStartActivityExpression);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 158;
			this.match(MScGrammarParser.T__13);
			this.state = 161;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__20:
				{
				this.state = 159;
				this.activity();
				}
				break;
			case MScGrammarParser.T__21:
				{
				this.state = 160;
				this.andSubProcessId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 163;
			this.match(MScGrammarParser.T__14);
			this.state = 166;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__20:
				{
				this.state = 164;
				this.activity();
				}
				break;
			case MScGrammarParser.T__21:
				{
				this.state = 165;
				this.andSubProcessId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 175;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 16, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 168;
					this.match(MScGrammarParser.T__14);
					this.state = 171;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case MScGrammarParser.T__20:
						{
						this.state = 169;
						this.activity();
						}
						break;
					case MScGrammarParser.T__21:
						{
						this.state = 170;
						this.andSubProcessId();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					}
				}
				this.state = 177;
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
		this.enterRule(_localctx, 28, MScGrammarParser.RULE_repeatSinceStartActivityExpression);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 178;
			this.match(MScGrammarParser.T__15);
			this.state = 179;
			this.activity();
			this.state = 187;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 180;
					this.match(MScGrammarParser.T__14);
					this.state = 183;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case MScGrammarParser.T__20:
						{
						this.state = 181;
						this.activity();
						}
						break;
					case MScGrammarParser.T__21:
						{
						this.state = 182;
						this.andSubProcessId();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					}
				}
				this.state = 189;
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
		this.enterRule(_localctx, 30, MScGrammarParser.RULE_endActivityExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 193;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 19, this._ctx) ) {
			case 1:
				{
				this.state = 190;
				this.sequenceEndActivityExpression();
				}
				break;

			case 2:
				{
				this.state = 191;
				this.andEndActivityExpression();
				}
				break;

			case 3:
				{
				this.state = 192;
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
		this.enterRule(_localctx, 32, MScGrammarParser.RULE_sequenceEndActivityExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 195;
			this.activity();
			this.state = 196;
			this.match(MScGrammarParser.T__16);
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
		this.enterRule(_localctx, 34, MScGrammarParser.RULE_andEndActivityExpression);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 200;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__20:
				{
				this.state = 198;
				this.activity();
				}
				break;
			case MScGrammarParser.T__21:
				{
				this.state = 199;
				this.orSubProcessId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 202;
			this.match(MScGrammarParser.T__17);
			this.state = 211;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 22, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 205;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case MScGrammarParser.T__20:
						{
						this.state = 203;
						this.activity();
						}
						break;
					case MScGrammarParser.T__21:
						{
						this.state = 204;
						this.orSubProcessId();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 207;
					this.match(MScGrammarParser.T__17);
					}
					}
				}
				this.state = 213;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 22, this._ctx);
			}
			this.state = 216;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__20:
				{
				this.state = 214;
				this.activity();
				}
				break;
			case MScGrammarParser.T__21:
				{
				this.state = 215;
				this.orSubProcessId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 218;
			this.match(MScGrammarParser.T__16);
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
		this.enterRule(_localctx, 36, MScGrammarParser.RULE_orEndActivityExpression);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 220;
			this.match(MScGrammarParser.T__18);
			this.state = 223;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__20:
				{
				this.state = 221;
				this.activity();
				}
				break;
			case MScGrammarParser.T__21:
				{
				this.state = 222;
				this.andSubProcessId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 225;
			this.match(MScGrammarParser.T__19);
			this.state = 234;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 26, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 228;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case MScGrammarParser.T__20:
						{
						this.state = 226;
						this.activity();
						}
						break;
					case MScGrammarParser.T__21:
						{
						this.state = 227;
						this.andSubProcessId();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 230;
					this.match(MScGrammarParser.T__19);
					}
					}
				}
				this.state = 236;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 26, this._ctx);
			}
			this.state = 239;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case MScGrammarParser.T__20:
				{
				this.state = 237;
				this.activity();
				}
				break;
			case MScGrammarParser.T__21:
				{
				this.state = 238;
				this.andSubProcessId();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 241;
			this.match(MScGrammarParser.T__16);
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
		this.enterRule(_localctx, 38, MScGrammarParser.RULE_activity);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 243;
			this.match(MScGrammarParser.T__20);
			this.state = 244;
			this.match(MScGrammarParser.WORD);
			this.state = 249;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 28, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 245;
					this.match(MScGrammarParser.SPACE);
					this.state = 246;
					this.match(MScGrammarParser.WORD);
					}
					}
				}
				this.state = 251;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 28, this._ctx);
			}
			this.state = 252;
			this.match(MScGrammarParser.T__20);
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
		this.enterRule(_localctx, 40, MScGrammarParser.RULE_andSubProcessId);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 254;
			this.match(MScGrammarParser.T__21);
			this.state = 255;
			this.match(MScGrammarParser.WORD);
			this.state = 260;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 29, this._ctx);
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
				_alt = this.interpreter.adaptivePredict(this._input, 29, this._ctx);
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
	public orSubProcessId(): OrSubProcessIdContext {
		let _localctx: OrSubProcessIdContext = new OrSubProcessIdContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, MScGrammarParser.RULE_orSubProcessId);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 265;
			this.match(MScGrammarParser.T__21);
			this.state = 266;
			this.match(MScGrammarParser.WORD);
			this.state = 271;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 30, this._ctx);
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
				_alt = this.interpreter.adaptivePredict(this._input, 30, this._ctx);
			}
			this.state = 274;
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
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x1C\u0117\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r" +
		"\x04\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12" +
		"\x04\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17" +
		"\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x07\x034\n\x03\f\x03\x0E\x03" +
		"7\v\x03\x03\x04\x03\x04\x07\x04;\n\x04\f\x04\x0E\x04>\v\x04\x03\x04\x03" +
		"\x04\x03\x05\x03\x05\x03\x05\x03\x05\x07\x05F\n\x05\f\x05\x0E\x05I\v\x05" +
		"\x03\x06\x03\x06\x03\x06\x03\x06\x05\x06O\n\x06\x03\x06\x07\x06R\n\x06" +
		"\f\x06\x0E\x06U\v\x06\x03\x07\x03\x07\x03\x07\x03\x07\x03\b\x03\b\x03" +
		"\b\x03\b\x03\b\x05\b`\n\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03" +
		"\t\x03\t\x07\tk\n\t\f\t\x0E\tn\v\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\n" +
		"\x03\n\x03\n\x03\n\x07\ny\n\n\f\n\x0E\n|\v\n\x03\n\x03\n\x03\v\x03\v\x03" +
		"\v\x03\v\x03\v\x05\v\x85\n\v\x03\f\x03\f\x03\f\x03\r\x03\r\x03\r\x03\x0E" +
		"\x03\x0E\x03\x0E\x05\x0E\x90\n\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\x95" +
		"\n\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\x9A\n\x0E\x07\x0E\x9C\n\x0E\f\x0E" +
		"\x0E\x0E\x9F\v\x0E\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xA4\n\x0F\x03\x0F\x03" +
		"\x0F\x03\x0F\x05\x0F\xA9\n\x0F\x03\x0F\x03\x0F\x03\x0F\x05\x0F\xAE\n\x0F" +
		"\x07\x0F\xB0\n\x0F\f\x0F\x0E\x0F\xB3\v\x0F\x03\x10\x03\x10\x03\x10\x03" +
		"\x10\x03\x10\x05\x10\xBA\n\x10\x07\x10\xBC\n\x10\f\x10\x0E\x10\xBF\v\x10" +
		"\x03\x11\x03\x11\x03\x11\x05\x11\xC4\n\x11\x03\x12\x03\x12\x03\x12\x03" +
		"\x13\x03\x13\x05\x13\xCB\n\x13\x03\x13\x03\x13\x03\x13\x05\x13\xD0\n\x13" +
		"\x03\x13\x03\x13\x07\x13\xD4\n\x13\f\x13\x0E\x13\xD7\v\x13\x03\x13\x03" +
		"\x13\x05\x13\xDB\n\x13\x03\x13\x03\x13\x03\x14\x03\x14\x03\x14\x05\x14" +
		"\xE2\n\x14\x03\x14\x03\x14\x03\x14\x05\x14\xE7\n\x14\x03\x14\x03\x14\x07" +
		"\x14\xEB\n\x14\f\x14\x0E\x14\xEE\v\x14\x03\x14\x03\x14\x05\x14\xF2\n\x14" +
		"\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15\x03\x15\x07\x15\xFA\n\x15\f\x15" +
		"\x0E\x15\xFD\v\x15\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x03\x16\x07" +
		"\x16\u0105\n\x16\f\x16\x0E\x16\u0108\v\x16\x03\x16\x03\x16\x03\x17\x03" +
		"\x17\x03\x17\x03\x17\x07\x17\u0110\n\x17\f\x17\x0E\x17\u0113\v\x17\x03" +
		"\x17\x03\x17\x03\x17\r<lz\x9D\xB1\xBD\xD5\xEC\xFB\u0106\u0111\x02\x02" +
		"\x18\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02" +
		"\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02$\x02&\x02" +
		"(\x02*\x02,\x02\x02\x02\x02\u0124\x02.\x03\x02\x02\x02\x041\x03\x02\x02" +
		"\x02\x068\x03\x02\x02\x02\bA\x03\x02\x02\x02\nN\x03\x02\x02\x02\fV\x03" +
		"\x02\x02\x02\x0EZ\x03\x02\x02\x02\x10c\x03\x02\x02\x02\x12q\x03\x02\x02" +
		"\x02\x14\x7F\x03\x02\x02\x02\x16\x86\x03\x02\x02\x02\x18\x89\x03\x02\x02" +
		"\x02\x1A\x8C\x03\x02\x02\x02\x1C\xA0\x03\x02\x02\x02\x1E\xB4\x03\x02\x02" +
		"\x02 \xC3\x03\x02\x02\x02\"\xC5\x03\x02\x02\x02$\xCA\x03\x02\x02\x02&" +
		"\xDE\x03\x02\x02\x02(\xF5\x03\x02\x02\x02*\u0100\x03\x02\x02\x02,\u010B" +
		"\x03\x02\x02\x02./\x05\x04\x03\x02/0\x05\x06\x04\x020\x03\x03\x02\x02" +
		"\x0215\x07\x03\x02\x0224\x07\x1C\x02\x0232\x03\x02\x02\x0247\x03\x02\x02" +
		"\x0253\x03\x02\x02\x0256\x03\x02\x02\x026\x05\x03\x02\x02\x0275\x03\x02" +
		"\x02\x028<\x05\b\x05\x029;\x05\n\x06\x02:9\x03\x02\x02\x02;>\x03\x02\x02" +
		"\x02<=\x03\x02\x02\x02<:\x03\x02\x02\x02=?\x03\x02\x02\x02><\x03\x02\x02" +
		"\x02?@\x05\f\x07\x02@\x07\x03\x02\x02\x02AB\x07\x04\x02\x02BC\x05(\x15" +
		"\x02CG\x07\x05\x02\x02DF\x07\x1C\x02\x02ED\x03\x02\x02\x02FI\x03\x02\x02" +
		"\x02GE\x03\x02\x02\x02GH\x03\x02\x02\x02H\t\x03\x02\x02\x02IG\x03\x02" +
		"\x02\x02JO\x05\x0E\b\x02KO\x05\f\x07\x02LO\x05\x10\t\x02MO\x05\x12\n\x02" +
		"NJ\x03\x02\x02\x02NK\x03\x02\x02\x02NL\x03\x02\x02\x02NM\x03\x02\x02\x02" +
		"OS\x03\x02\x02\x02PR\x07\x1C\x02\x02QP\x03\x02\x02\x02RU\x03\x02\x02\x02" +
		"SQ\x03\x02\x02\x02ST\x03\x02\x02\x02T\v\x03\x02\x02\x02US\x03\x02\x02" +
		"\x02VW\x07\x06\x02\x02WX\x05 \x11\x02XY\x07\x07\x02\x02Y\r\x03\x02\x02" +
		"\x02Z[\x07\x06\x02\x02[\\\x05 \x11\x02\\_\x07\b\x02\x02]`\x05\x14\v\x02" +
		"^`\x05\x16\f\x02_]\x03\x02\x02\x02_^\x03\x02\x02\x02`a\x03\x02\x02\x02" +
		"ab\x07\x05\x02\x02b\x0F\x03\x02\x02\x02cd\x05*\x16\x02de\x07\t\x02\x02" +
		"ef\x05(\x15\x02fg\x07\n\x02\x02gl\x05(\x15\x02hi\x07\n\x02\x02ik\x05(" +
		"\x15\x02jh\x03\x02\x02\x02kn\x03\x02\x02\x02lm\x03\x02\x02\x02lj\x03\x02" +
		"\x02\x02mo\x03\x02\x02\x02nl\x03\x02\x02\x02op\x07\x05\x02\x02p\x11\x03" +
		"\x02\x02\x02qr\x05,\x17\x02rs\x07\t\x02\x02st\x05(\x15\x02tu\x07\v\x02" +
		"\x02uz\x05(\x15\x02vw\x07\v\x02\x02wy\x05(\x15\x02xv\x03\x02\x02\x02y" +
		"|\x03\x02\x02\x02z{\x03\x02\x02\x02zx\x03\x02\x02\x02{}\x03\x02\x02\x02" +
		"|z\x03\x02\x02\x02}~\x07\x05\x02\x02~\x13\x03\x02\x02\x02\x7F\x84\x07" +
		"\f\x02\x02\x80\x85\x05\x18\r\x02\x81\x85\x05\x1A\x0E\x02\x82\x85\x05\x1C" +
		"\x0F\x02\x83\x85\x05\x1E\x10\x02\x84\x80\x03\x02\x02\x02\x84\x81\x03\x02" +
		"\x02\x02\x84\x82\x03\x02\x02\x02\x84\x83\x03\x02\x02\x02\x85\x15\x03\x02" +
		"\x02\x02\x86\x87\x07\r\x02\x02\x87\x88\x05\x18\r\x02\x88\x17\x03\x02\x02" +
		"\x02\x89\x8A\x07\x0E\x02\x02\x8A\x8B\x05(\x15\x02\x8B\x19\x03\x02\x02" +
		"\x02\x8C\x8F\x07\x0E\x02\x02\x8D\x90\x05(\x15\x02\x8E\x90\x05,\x17\x02" +
		"\x8F\x8D\x03\x02\x02\x02\x8F\x8E\x03\x02\x02\x02\x90\x91\x03\x02\x02\x02" +
		"\x91\x94\x07\x0F\x02\x02\x92\x95\x05(\x15\x02\x93\x95\x05,\x17\x02\x94" +
		"\x92\x03\x02\x02\x02\x94\x93\x03\x02\x02\x02\x95\x9D\x03\x02\x02\x02\x96" +
		"\x99\x07\x0F\x02\x02\x97\x9A\x05(\x15\x02\x98\x9A\x05,\x17\x02\x99\x97" +
		"\x03\x02\x02\x02\x99\x98\x03\x02\x02\x02\x9A\x9C\x03\x02\x02\x02\x9B\x96" +
		"\x03\x02\x02\x02\x9C\x9F\x03\x02\x02\x02\x9D\x9E\x03\x02\x02\x02\x9D\x9B" +
		"\x03\x02\x02\x02\x9E\x1B\x03\x02\x02\x02\x9F\x9D\x03\x02\x02\x02\xA0\xA3" +
		"\x07\x10\x02\x02\xA1\xA4\x05(\x15\x02\xA2\xA4\x05*\x16\x02\xA3\xA1\x03" +
		"\x02\x02\x02\xA3\xA2\x03\x02\x02\x02\xA4\xA5\x03\x02\x02\x02\xA5\xA8\x07" +
		"\x11\x02\x02\xA6\xA9\x05(\x15\x02\xA7\xA9\x05*\x16\x02\xA8\xA6\x03\x02" +
		"\x02\x02\xA8\xA7\x03\x02\x02\x02\xA9\xB1\x03\x02\x02\x02\xAA\xAD\x07\x11" +
		"\x02\x02\xAB\xAE\x05(\x15\x02\xAC\xAE\x05*\x16\x02\xAD\xAB\x03\x02\x02" +
		"\x02\xAD\xAC\x03\x02\x02\x02\xAE\xB0\x03\x02\x02\x02\xAF\xAA\x03\x02\x02" +
		"\x02\xB0\xB3\x03\x02\x02\x02\xB1\xB2\x03\x02\x02\x02\xB1\xAF\x03\x02\x02" +
		"\x02\xB2\x1D\x03\x02\x02\x02\xB3\xB1\x03\x02\x02\x02\xB4\xB5\x07\x12\x02" +
		"\x02\xB5\xBD\x05(\x15\x02\xB6\xB9\x07\x11\x02\x02\xB7\xBA\x05(\x15\x02" +
		"\xB8\xBA\x05*\x16\x02\xB9\xB7\x03\x02\x02\x02\xB9\xB8\x03\x02\x02\x02" +
		"\xBA\xBC\x03\x02\x02\x02\xBB\xB6\x03\x02\x02\x02\xBC\xBF\x03\x02\x02\x02" +
		"\xBD\xBE\x03\x02\x02\x02\xBD\xBB\x03\x02\x02\x02\xBE\x1F\x03\x02\x02\x02" +
		"\xBF\xBD\x03\x02\x02\x02\xC0\xC4\x05\"\x12\x02\xC1\xC4\x05$\x13\x02\xC2" +
		"\xC4\x05&\x14\x02\xC3\xC0\x03\x02\x02\x02\xC3\xC1\x03\x02\x02\x02\xC3" +
		"\xC2\x03\x02\x02\x02\xC4!\x03\x02\x02\x02\xC5\xC6\x05(\x15\x02\xC6\xC7" +
		"\x07\x13\x02\x02\xC7#\x03\x02\x02\x02\xC8\xCB\x05(\x15\x02\xC9\xCB\x05" +
		",\x17\x02\xCA\xC8\x03\x02\x02\x02\xCA\xC9\x03\x02\x02\x02\xCB\xCC\x03" +
		"\x02\x02\x02\xCC\xD5\x07\x14\x02\x02\xCD\xD0\x05(\x15\x02\xCE\xD0\x05" +
		",\x17\x02\xCF\xCD\x03\x02\x02\x02\xCF\xCE\x03\x02\x02\x02\xD0\xD1\x03" +
		"\x02\x02\x02\xD1\xD2\x07\x14\x02\x02\xD2\xD4\x03\x02\x02\x02\xD3\xCF\x03" +
		"\x02\x02\x02\xD4\xD7\x03\x02\x02\x02\xD5\xD6\x03\x02\x02\x02\xD5\xD3\x03" +
		"\x02\x02\x02\xD6\xDA\x03\x02\x02\x02\xD7\xD5\x03\x02\x02\x02\xD8\xDB\x05" +
		"(\x15\x02\xD9\xDB\x05,\x17\x02\xDA\xD8\x03\x02\x02\x02\xDA\xD9\x03\x02" +
		"\x02\x02\xDB\xDC\x03\x02\x02\x02\xDC\xDD\x07\x13\x02\x02\xDD%\x03\x02" +
		"\x02\x02\xDE\xE1\x07\x15\x02\x02\xDF\xE2\x05(\x15\x02\xE0\xE2\x05*\x16" +
		"\x02\xE1\xDF\x03\x02\x02\x02\xE1\xE0\x03\x02\x02\x02\xE2\xE3\x03\x02\x02" +
		"\x02\xE3\xEC\x07\x16\x02\x02\xE4\xE7\x05(\x15\x02\xE5\xE7\x05*\x16\x02" +
		"\xE6\xE4\x03\x02\x02\x02\xE6\xE5\x03\x02\x02\x02\xE7\xE8\x03\x02\x02\x02" +
		"\xE8\xE9\x07\x16\x02\x02\xE9\xEB\x03\x02\x02\x02\xEA\xE6\x03\x02\x02\x02" +
		"\xEB\xEE\x03\x02\x02\x02\xEC\xED\x03\x02\x02\x02\xEC\xEA\x03\x02\x02\x02" +
		"\xED\xF1\x03\x02\x02\x02\xEE\xEC\x03\x02\x02\x02\xEF\xF2\x05(\x15\x02" +
		"\xF0\xF2\x05*\x16\x02\xF1\xEF\x03\x02\x02\x02\xF1\xF0\x03\x02\x02\x02" +
		"\xF2\xF3\x03\x02\x02\x02\xF3\xF4\x07\x13\x02\x02\xF4\'\x03\x02\x02\x02" +
		"\xF5\xF6\x07\x17\x02\x02\xF6\xFB\x07\x1A\x02\x02\xF7\xF8\x07\x1B\x02\x02" +
		"\xF8\xFA\x07\x1A\x02\x02\xF9\xF7\x03\x02\x02\x02\xFA\xFD\x03\x02\x02\x02" +
		"\xFB\xFC\x03\x02\x02\x02\xFB\xF9\x03\x02\x02\x02\xFC\xFE\x03\x02\x02\x02" +
		"\xFD\xFB\x03\x02\x02\x02\xFE\xFF\x07\x17\x02\x02\xFF)\x03\x02\x02\x02" +
		"\u0100\u0101\x07\x18\x02\x02\u0101\u0106\x07\x1A\x02\x02\u0102\u0103\x07" +
		"\x1B\x02\x02\u0103\u0105\x07\x1A\x02\x02\u0104\u0102\x03\x02\x02\x02\u0105" +
		"\u0108\x03\x02\x02\x02\u0106\u0107\x03\x02\x02\x02\u0106\u0104\x03\x02" +
		"\x02\x02\u0107\u0109\x03\x02\x02\x02\u0108\u0106\x03\x02\x02\x02\u0109" +
		"\u010A\x07\x19\x02\x02\u010A+\x03\x02\x02\x02\u010B\u010C\x07\x18\x02" +
		"\x02\u010C\u0111\x07\x1A\x02\x02\u010D\u010E\x07\x1B\x02\x02\u010E\u0110" +
		"\x07\x1A\x02\x02\u010F\u010D\x03\x02\x02\x02\u0110\u0113\x03\x02\x02\x02" +
		"\u0111\u0112\x03\x02\x02\x02\u0111\u010F\x03\x02\x02\x02\u0112\u0114\x03" +
		"\x02\x02\x02\u0113\u0111\x03\x02\x02\x02\u0114\u0115\x07\x19\x02\x02\u0115" +
		"-\x03\x02\x02\x02!5<GNS_lz\x84\x8F\x94\x99\x9D\xA3\xA8\xAD\xB1\xB9\xBD" +
		"\xC3\xCA\xCF\xD5\xDA\xE1\xE6\xEC\xF1\xFB\u0106\u0111";
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


