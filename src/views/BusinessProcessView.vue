<template>
	<h1 class="mb-3">Modelling of Business Processes</h1>

	<div class="d-flex flex-row flex-fill" style="height: 90%;">
		<v-tabs v-model="tab" class="mr-3" direction="vertical" bg-color="surface-light">
			<v-tab :value="'nl'">
				<v-icon class="mr-1" icon="mdi-chat-outline" />
				1. Natural Language
			</v-tab>
			<v-tab :value="'restricted'">
				<v-icon class="mr-1" icon="mdi-robot-outline" />
				2. Restricted Language
			</v-tab>
			<v-tab :value="'model'">
				<v-icon class="mr-1" icon="mdi-chart-sankey-variant" />
				3. Model
			</v-tab>
		</v-tabs>

		<v-tabs-window v-model="tab" class="flex-fill" style="height: 100%;">
			<v-tabs-window-item value="nl" class="flex-fill">
				<v-alert v-if="!isTokenConfigured" closable
					text="Configure the ChatGPT API Token and reload the page in order to use the system." type="error"
					variant="tonal" class="mb-3"></v-alert>
				<v-container class="d-flex flex-column" style="height: 100%;">
					<p class="mb-2">Natural language description of the process:</p>
					<v-textarea v-model="textualDescription" class="flex-grow-1"></v-textarea>
					<v-btn class="align-self-end" color="primary" @click="processNaturalLanguage">
						Convert to Restricted language
						<v-icon class="ml-1" icon="mdi-arrow-right" />
					</v-btn>
				</v-container>
			</v-tabs-window-item>

			<v-tabs-window-item value="restricted" class="flex-fill">
				<v-container class="d-flex flex-column" style="height: 100%;">
					<p class="mb-2">Restricted natural language:</p>
					<prism-editor class="editor flex-grow-1 line-numbers" v-model="restrictedLanguage"
						:highlight="highlighter" :line-numbers="false"></prism-editor>
					<div v-if="syntaxErrors.length > 0">
						<p class="text-h6">Syntax Error</p>
						<pre v-html="syntaxErrors.join('\n')"></pre>
					</div>
					<v-btn class="align-self-end" color="primary" @click="processRestrictedNaturalLanguage">
						Convert to model
						<v-icon class="ml-1" icon="mdi-arrow-right" />
					</v-btn>
				</v-container>
			</v-tabs-window-item>

			<v-tabs-window-item value="model" class="flex-fill">
				<v-container class="d-flex flex-column" style="height: 100%;">
					<ProcessVisualizer
						:petrinet="petriNetTpn" 
						:declare="declare" 
						:declare_js = "declare_js"
						:bpmn="bpmn"
						:bpmn_xml="bpmn_xml" />
				</v-container>
			</v-tabs-window-item>
		</v-tabs-window>
	</div>
	<v-overlay :model-value="loading" persistent class="align-center justify-center">
		<v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
	</v-overlay>
</template>

<script>
import ProcessVisualizer from '../components/ProcessVisualizer.vue'

import { PrismEditor } from "vue-prism-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import "vue-prism-editor/dist/prismeditor.min.css";
import "../highlights/prism-vs.css";
import "../highlights/businessprocess.js";

import { getNlTextConvertedToDialect, getConvertedText, checkSyntax } from '../converters/businessprocesses';

export default {
	name: 'BusinessProcess',
	components: {
		ProcessVisualizer, PrismEditor
	},
	data: () => ({
		tab: null,
		textualDescription: 'The process starts when the warehouse receives an order. \nAfter that, an employee picks all items from the order while another one sends the invoice. \nWhen both the picking and the invoicing are done, the manager closes the order.\nAfter the order is closed, the process finishes.',
		restrictedLanguage: 'The following textual description follows the closed-world assumption, meaning that only the activities specified can be executed in the specified order. Any possible activity and execution that is not specified is considered impossible.\n\nInitially start \"receive order\".\n\nAfter \"receive order\" ends, immediately start \"pick items\" and start \"send invoice\".\nAfter \"pick items\" ends and \"send invoice\" ends, immediately start \"close order\".\n\nActivity \"send invoice\" is performed by \"crm\".\nActivity \"pick items\" is performed by \"crm\".\nActivity \"close order\" is performed by \"email system\".\n\nAfter \"close order\" ends, the process finishes.',
		petriNetTpn: '',
		declare: '',
		declare_js: '',
		bpmn: '',
		bpmn_xml: '',
		loading: false,
		syntaxErrors: [],
		isTokenConfigured: localStorage.getItem("chatgpt-token")
	}),
	methods: {
		processNaturalLanguage() {
			if (!this.checkAPITokenAvailable()) {
				return;
			}
			this.loading = true;
			getNlTextConvertedToDialect(this.textualDescription).then(response => {
				this.restrictedLanguage = response.convertedText;
				this.loading = false;
				this.tab = 'restricted';
			});
		},
		processRestrictedNaturalLanguage() {
			this.syntaxErrors = [];
			let result = checkSyntax(this.restrictedLanguage);
			if (!result.state) {
				this.syntaxErrors = result.errors;
				return;
			}
			
			this.loading = true;
			getConvertedText(this.restrictedLanguage).then(response => {
				this.petriNetTpn = response[0][0];
				this.declare = response[1][0];
				this.declare_js = response[1][1];
				this.bpmn = response[2][0];
				this.bpmn_xml = response[2][1];
				this.loading = false;
				this.tab = 'model';
			});
		},
		highlighter(code) {
			return highlight(code, languages.businessprocess); //returns html
		},
		checkAPITokenAvailable() {
			if (!localStorage.getItem("chatgpt-token")) {
				console.log("API Key not set. Please set the API Key first.");
				this.isErrorOpen = true;
				return false;
			}
			return true;
		},
	}
}
</script>

<style>
.editor {
	background: #f6f6f6;
	font-family: Roboto, sans-serif;
	font-size: 16px;
	line-height: 1.5;
	padding: 16px;
	margin-bottom: 20px;
	border-bottom: 1px solid #A5A5A5;
}

.prism-editor__textarea:focus {
	outline: none;
}

.prism-editor__line-number {
	font-style: normal !important;
	color: #23799373 !important;
}
</style>
