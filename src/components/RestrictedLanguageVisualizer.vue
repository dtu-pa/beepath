<template>
	<prism-editor
		class="editor mb-3"
		v-model="restrictedLanguage"
		:highlight="highlighter"
		:line-numbers="true">
	</prism-editor>
</template>

<script>
import { PrismEditor } from "vue-prism-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import "vue-prism-editor/dist/prismeditor.min.css";
import "../highlights/prism-vs.css";
import "../highlights/businessprocess.js";

export default {
	name: 'RestrictedLanguageVisualizer',
	components: {
		PrismEditor
	},
	data: () => ({
		restrictedLanguage: '',
	}),
	methods: {
		highlighter(code) {
			return highlight(code, languages.businessprocess); //returns html
		},
	},
}
</script>

<style>
.editor {
	background: #f6f6f6;
	/* font-family: Roboto, sans-serif; */
	font-family: Fira code, Fira Mono, Consolas, monospace;
	font-size: 14px;
	padding: 16px 0;
	/* margin-bottom: 20px; */
	border-bottom: 1px solid #A5A5A5;
}

.prism-editor-wrapper .prism-editor__container {
	overflow-x: auto;
}

.prism-editor-wrapper .prism-editor__editor, .prism-editor-wrapper .prism-editor__textarea { 
	white-space: pre !important; /* Changed from pre-wrap to pre */
    word-break: normal; /* Prevents long words from breaking unnaturally */
}

.prism-editor__textarea:focus {
	outline: none;
}

.prism-editor__line-number {
	font-style: normal !important;
	color: #23799373 !important;
}
</style>