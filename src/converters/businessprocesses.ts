import { ANTLRInputStream, CharStreams, CommonTokenStream } from "antlr4ts";
import { ParseTreeWalker } from "antlr4ts/tree/ParseTreeWalker";
import { MScGrammarLexer } from "./grammar/generated/MScGrammarLexer";
import { MScGrammarParser } from "./grammar/generated/MScGrammarParser";
import { SentenceParser } from "./grammar/SentenceParser";
import { PetriNetListener } from "./grammar/PetriNetListener";
import { DeclareListener } from "./grammar/DeclareListener";
import { ContextListener } from "./grammar/ContextListener";
import { SharedModelStorage } from "./grammar/SharedModelStorage";
import { SYSTEM_TEXT } from "./grammar/systemText";
import { createOpenAI } from "@ai-sdk/openai";
import { jsonSchema, generateObject } from "ai";
import { BPMNListener } from "./grammar/BPMNListener";

const ERROR_MESSAGE = "ERROR generating the model:\n";

export function checkSyntax(text: string) {
	let inputStream = CharStreams.fromString(text);
	let lexer = new MScGrammarLexer(inputStream);
	let tokenStream = new CommonTokenStream(lexer);
	let parser = new MScGrammarParser(tokenStream);

	const errorListener = {
        syntaxErrors: [] as string[], // Store errors

        syntaxError: function (recognizer: any, offendingSymbol: any, line: number, charPositionInLine: number, msg: string, e: any) {
            this.syntaxErrors.push(`Syntax error at line ${line}:${charPositionInLine} - ${msg}`);
        }
    };
	parser.removeErrorListeners();
	parser.addErrorListener(errorListener);

	parser.description();
	if (errorListener.syntaxErrors.length > 0) {
		return { state: false, errors: errorListener.syntaxErrors };
	} else {
		return { state: true };
	}
}

// Function written by Ana Maria Sima and Antonio Grama for their master thesis
// entitled "Optimization of natural language descriptions of business processes"
// source code at https://github.com/Toni751/Thesis-WebApp
export async function getConvertedText(text: string): Promise<string[][]> {
	const modelStorage = SharedModelStorage.getInstance();
	const conversions: string[][] = [];
	const sentenceParsers: SentenceParser[] = [];
	sentenceParsers.push(new PetriNetListener());
	sentenceParsers.push(new DeclareListener());
	sentenceParsers.push(new BPMNListener());

	for (const sentenceParser of sentenceParsers) {
		modelStorage.clear();
		try {
			let inputStream = new ANTLRInputStream(text);
			let lexer = new MScGrammarLexer(inputStream);
			let tokenStream = new CommonTokenStream(lexer);
			let parser = new MScGrammarParser(tokenStream);

			const listener = new ContextListener(sentenceParser);
			let tree = parser.description();
			ParseTreeWalker.DEFAULT.walk(listener, tree);
			conversions.push(modelStorage.getOutputTexts());
		} catch (error) {
			conversions.push([ERROR_MESSAGE + error]);
		}
	}

	return conversions;
}

// Function written by Ana Maria Sima and Antonio Grama for their master thesis
// entitled "Optimization of natural language descriptions of business processes"
// source code at https://github.com/Toni751/Thesis-WebApp
export async function getNlTextConvertedToDialect(nlText: string): Promise<any> {
	const shallowSchema = {
		type: "object",
		properties: {
			convertedText: {
				type: "string",
				description: "The conversion of the input text to the target grammar.",
			},
		},
		required: ["convertedText"],
		additionalProperties: false,
	};

	const mySchema = jsonSchema<any>(shallowSchema);
	// TODO: this is for the complex schema which tries to guarantee output syntactical correctness
	// const mySchema = jsonSchema<any>(schema);

	const openai = createOpenAI({
		apiKey: localStorage.getItem("chatgpt-token"),
	});

	const result = await generateObject({
		model: openai(localStorage.getItem("chatgpt-model") || 'gpt-5-mini', {
			structuredOutputs: true,
		}),
		schemaName: "dialect",
		schemaDescription: "Representation of a text in the dialect described by the grammar",
		schema: mySchema,
		messages: [
			{ role: "system", content: SYSTEM_TEXT },
			{
				role: "user",
				content: nlText,
			},
		],
	});

	// console.log(result.object);
	return result.object;
}

export function tpn2graphviz(tpnData: string): string {
	// Array to store DOT output lines
	let dotOutput = [
		"digraph PetriNet {",
		`\tranksep=".3";`,
		`\tfontsize="10";`,
		"\tremincross=true;",
		`\tmargin="0.0,0.0";`,
		`\tfontname="Arial";`,
		`\trankdir="LR";`,
		`\tedge [arrowsize="0.5"];`,
		`\tnode [height=".2",width=".2",fontname="Arial",fontsize="10"];`,
	];

	// Regular expressions to match places, transitions, and arcs
	const placePattern = /^place\s+"?(\w+)"?(?:\s+init\s+(\d+))?;/;
	// const transitionPattern = /^trans\s+"([\w\s]+)"~"([\w\s]*)"\s+in\s+(["\w\s]+)\s+out\s+(["\w\s]+)"/;
	const transitionPattern = /^trans\s+(.+)\s+in\s+(.*)\s+out\s+(.*);/;
	const transitionLabelWithIdPattern = /"(\w+)"\s*~\s*"([\w\s]*)"/;

	// Process each line of the TPN data
	const lines = tpnData.split("\n");
	for (let line of lines) {
		line = line.trim();
		if (line.length == 0) continue;

		// Match a place definition
		const placeMatch = line.match(placePattern);
		if (placeMatch) {
			const placeId = placeMatch[1];
			const placeTokens: any = placeMatch[2];
			if (placeTokens >= 1) {
				if (placeTokens == 1) {
					dotOutput.push(
						`\t"${placeId}" [shape="circle",label="",height=".1",width=".1",style="filled",fillcolor="black",peripheries="2"];`
					);
				} else if (placeTokens > 1) {
					dotOutput.push(`\t"${placeId}" [shape="circle",label="${placeTokens}",height=".1",width=".1"];`);
				}
			} else {
				dotOutput.push(`\t"${placeId}" [shape="circle",label=""];`);
			}
			continue;
		}

		// Match a transition definition
		const transitionMatch = line.match(transitionPattern);
		if (transitionMatch) {
			const transIDLabel = transitionMatch[1].trim();
			var transId = transIDLabel.replace(/["']/g, "");
			var transLabel = transIDLabel.replace(/["']/g, "");

			const labelIDMatch = transIDLabel.match(transitionLabelWithIdPattern);
			if (labelIDMatch) {
				transId = labelIDMatch[1].trim();
				transLabel = labelIDMatch[2].trim();
			}

			const inputPlaces = transitionMatch[2].trim().replace(/["']/g, "").split(/\s+/);
			const outputPlaces = transitionMatch[3].trim().replace(/["']/g, "").split(/\s+/);

			if (transLabel == "" || transLabel.startsWith("silent__")) {
				dotOutput.push(
					`\t"${transId}" [shape="box",label="",height=".4",width=".1",style="filled",fillcolor="black"];`
				);
			} else {
				dotOutput.push(`\t"${transId}" [shape="box",label="${transLabel}"];`);
			}
			// Add arcs (in -> out)
			inputPlaces.forEach((inputPlace) => {
				dotOutput.push(`\t"${inputPlace}" -> "${transId}";`);
			});
			outputPlaces.forEach((outputPlace) => {
				dotOutput.push(`\t"${transId}" -> "${outputPlace}";`);
			});
			continue;
		}
	}

	// Close the DOT graph
	dotOutput.push("}");

	// Return the final DOT representation as a string
	const out = dotOutput.join("\n");
	return out;
}
