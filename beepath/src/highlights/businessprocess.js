import { languages } from "prismjs/components/prism-core";

languages.businessprocess = {
	// 'comment': //,
	'string': /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
	'keyword': /\b(?:start|after|ends|and|initially|immediately start|the process finishes|The following textual description follows the closed-world assumption, meaning that only the activities specified can be executed in the specified order. Any possible activity and execution that is not specified is considered impossible)\b/i,
	'boolean': /\b(?:true|false)\b/,
	'number': /\b\d+(\.\d+)?\b/,
	'operator': /[-+*/=<>!]+/,
	'punctuation': /[{}[\];(),.:]/,
  };