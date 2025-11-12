<template>
	<h1 class="mb-3">Modelling of Business Processes</h1>

	<div class="d-flex flex-row flex-fill">
		<v-tabs v-model="tab" class="mr-3" direction="vertical" bg-color="surface-light">
			<v-tab disabled class="header">
				Wizard
			</v-tab>
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
			<v-tab disabled class="header">
				Modeler
			</v-tab>
			<v-tab :value="'modeler'">
				<v-icon class="mr-1" icon="mdi-file-edit-outline" />
				Modeler
			</v-tab>
		</v-tabs>

		<v-tabs-window v-model="tab" class="w-100">
			<v-tabs-window-item value="nl" class="">
				<v-alert v-if="!isTokenConfigured" closable
					text="Configure the ChatGPT API Token and reload the page in order to use the system." type="error"
					variant="tonal" class="mb-3"></v-alert>
				<v-container>
					<v-select
						label="Select an example description"
						:items="examples"
						item-title="name"
						item-value="description"
						v-model="textualDescription"
						class="mb-2"
						clearable
					></v-select>
					<p class="mb-2">Natural language description of the process:</p>
					<v-textarea v-model="textualDescription" auto-grow rows="10"></v-textarea>
					<v-btn class="float-right" color="primary" @click="processNaturalLanguage">
						Convert to Restricted language
						<v-icon class="ml-1" icon="mdi-arrow-right" />
					</v-btn>
				</v-container>
			</v-tabs-window-item>

			<v-tabs-window-item value="restricted" class="flex-fill">
				<v-container>
					<p class="mb-2">Restricted natural language:</p>
						<RestrictedLanguageVisualizer
						v-model="restrictedLanguage"
					></RestrictedLanguageVisualizer>
					<v-alert v-if="syntaxErrors.length > 0"
						border="top"
      					type="error"
      					variant="outlined"
						class="mb-3"
						title="Syntax Error"
						>
						<pre v-html="syntaxErrors.join('\n')"></pre>
					</v-alert>
					<v-btn class="float-right" color="primary" @click="processRestrictedNaturalLanguage">
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

			<v-tabs-window-item value="modeler" class="flex-fill">
				<v-container>
					<v-card class="mb-10" elevation="5" variant="tonal">
						<template v-slot:title>
							<span>Restricted Natural Language</span>
							<v-btn
								prepend-icon="mdi-file-edit-outline"
								class="float-right"
								variant="tonal"
								@click="this.addRuleDialogVisible = true"
							>Add rule</v-btn>
						</template>
						<RestrictedLanguageVisualizer
							v-model="modelerRestrictedLanguage"
							style="border: 0;"
						></RestrictedLanguageVisualizer>
						<v-alert v-if="modelerSyntaxErrors.length > 0"
							border="top"
							type="error"
							variant="outlined"
							class="mb-3 ml-3 mr-3"
							title="Syntax Error"
							>
							<pre v-html="modelerSyntaxErrors.join('\n')"></pre>
						</v-alert>
						<AddProcessRuleDialog
							v-model="addRuleDialogVisible"
							:activityNames="modelerActivityNames"
							@newRule="(e) => addNewRuleToModeler(e)"
						></AddProcessRuleDialog>
					</v-card>
					
					<v-card title="Process Model" elevation="5">
						<ProcessVisualizer
							:petrinet="modelerPetriNetTpn" 
							:declare="modelerDeclare" 
							:declare_js = "modelerDeclare_js"
							:bpmn="modelerBpmn"
							:bpmn_xml="modelerBpmnXml" />
					</v-card>
				</v-container>
			</v-tabs-window-item>
		</v-tabs-window>
	</div>
	<v-overlay :model-value="loading" persistent class="align-center justify-center">
		<v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
	</v-overlay>
</template>

<script>
import AddProcessRuleDialog from '../dialogs/AddProcessRuleDialog.vue';
import ProcessVisualizer from '../components/ProcessVisualizer.vue'
import RestrictedLanguageVisualizer from '../components/RestrictedLanguageVisualizer.vue';

import { getNlTextConvertedToDialect, getConvertedText, checkSyntax } from '../converters/businessprocesses';

export default {
	name: 'BusinessProcess',
	components: {
		ProcessVisualizer, RestrictedLanguageVisualizer, AddProcessRuleDialog
	},
	data: () => ({
		tab: null,
		addRuleDialogVisible: false,

		// wizards data
		textualDescription: '',
		restrictedLanguage: 'The following textual description follows the closed-world assumption, meaning that only the activities specified can be executed in the specified order. Any possible activity and execution that is not specified is considered impossible.\n\nInitially start \"receive order\".\n\nAfter \"receive order\" ends, immediately start \"pick items\" and start \"send invoice\".\nAfter \"pick items\" ends and \"send invoice\" ends, immediately start \"close order\".\n\nActivity \"send invoice\" is performed by \"crm\".\nActivity \"pick items\" is performed by \"crm\".\nActivity \"close order\" is performed by \"email system\".\n\nAfter \"close order\" ends, the process finishes.',
		petriNetTpn: '',
		declare: '',
		declare_js: '',
		bpmn: '',
		bpmn_xml: '',
		loading: false,
		syntaxErrors: [],
		isTokenConfigured: localStorage.getItem("chatgpt-token"),
		examples: [
			{ name: "Bike Rent", description: "The process starts when a customer wants to rent a bike, this is requested online through their website. In the first step, the customer will write an email asking if there are any bikes available at that time. Swapfiets online customer service will receive the email and contact the Swapfiets store employees, those are the ones who check the availability of the bikes. If no bikes are available, Swapfiets online customer service will notify the customer, and the service will not be supported.\n\nOtherwise, if bikes are available, the customer must fill in all the required information and pay the first fee while the Swapfiets store employees prepare the bike. Once they have completed everything, they can get the bike from the shop and the contract will be started.\n\nIn case something is wrong, maintenance will be requested, and it will be the Swapfiets store employees who will fix or swap the bike. The customer will proceed to take the bike to the nearest Swapfiets store or also, the staff will pick up the bike at the customer's place, so that the store employees can check that it is something wrong. The bike will be analyzed, and depending on the damage, it will be swapped for another one, or fixed.\n\nOnce the bike is ready to be used, the customer will pick it up at the store and start using it again. The maintenance process can be performed as many times as the bike requires. Once the customer wants to terminate the contract, provided that at least two months have passed since the beginning of the contract, he must send a warning message to Swapfiets employees saying that he wants to terminate the contract. The customer must take the bike to the shop, and the employees will check it and if everything is correct, they will register it as available and ready for a new rental contract."},
			{ name: "Computer repair shop", description: "The workflow of a computer repair service (CRS) can be described as follows.\n\nA customer brings in a defective computer and the CRS checks the defect and hands out a repair cost calculation back. If the customer decides that the costs are acceptable, the process continues, otherwise she takes her computer home unrepaired.\n\nThe ongoing repair consists of two activities, which are executed, in an arbitrary order. The first activity is to check and repair the hardware, whereas the second activity checks and configures the software. After each of these activities, the proper system functionality is tested. If an error is detected another arbitrary repair activity is executed, otherwise the repair is finished."},
			{ name: "Expense report", description: "When an employee creates an expense report the money must be paid out within one week.\n\nAfter creating the expense report a manager should approve the expense report. If a manager approves the expense report the money can be paid out by finance. If the case is awaiting manager approval payout cannot happen. If the manager rejects the expense report he must later approve the expense report in order to payout to happen. The employee can redraw the expense report. Doing so will close the case.\n\nOnce payout has been done the case is closed."},
			{ name: "Quality control", description: "The process starts when the storage facility used by Puori sends a product sample to Ellipse.\n\nEllipse then notifies Puori of the new sample. Before testing can begin, Puori then request a test of a sample through Ellipse. Ellipse must then test the product, as well as have additional testing done through Eurofarms.\n\nWhen all testing is done, results will be compiled into a report before sending the report to Puori for approval. This enables Puori to evaluate the results. If the results are different than expected, Puori may ask Ellipse for re-testing. If the results of the re-testing do not live up to Puoris standards, the batch will be discarded. If the results are sound Ellipse must send the results to Clean Label, who must then publish the results.\n\nPuori then checks whether all is in order and either approves of the publication, or compiles a list of possible errors. If errors are found, Clean Label must correct the errors before publishing the results again."},
			{ name: "Order fulfillment", description: "The process starts when the warehouse receives an order. After that, an employee picks all items from the order while another one sends the invoice.\n\nWhen both the picking and the invoicing are done, the manager closes the order.\n\nAfter the order is closed, the process finishes."},
		],

		// modeler data
		modelerRestrictedLanguage: 'The following textual description follows the closed-world assumption, meaning that only the activities specified can be executed in the specified order. Any possible activity and execution that is not specified is considered impossible.\n\n',
		modelerBpmn: '',
		modelerBpmnXml: '',
		modelerPetriNetTpn: '',
		modelerDeclare: '',
		modelerDeclare_js: '',
		modelerSyntaxErrors: [],
		modelerActivityNames: [],
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
		addNewRuleToModeler(newRule) {
			if (newRule.startsWith('Initially start')) {
				// initial rule
				let edited = false;
				for (let i = 0; i < this.modelerRestrictedLanguage.split('\n').length; i++) {
					if (this.modelerRestrictedLanguage.split('\n')[i].startsWith('Initially start')) {
						let lines = this.modelerRestrictedLanguage.split('\n');
						lines[i] = newRule;
						this.modelerRestrictedLanguage = lines.join('\n');
						edited = true;
						break;
					}
				}
				if (!edited) {
					this.modelerRestrictedLanguage += '\n' + newRule;
				}
			} else if (newRule.endsWith('the process finishes.')) {
				// check if the new rule is a final rule
				let edited = false;
				for (let i = 0; i < this.modelerRestrictedLanguage.split('\n').length; i++) {
					if (this.modelerRestrictedLanguage.split('\n')[i].endsWith('the process finishes.')) {
						let lines = this.modelerRestrictedLanguage.split('\n');
						lines[i] = newRule;
						this.modelerRestrictedLanguage = lines.join('\n');
						edited = true;
						break;
					}
				}
				if (!edited) {
					this.modelerRestrictedLanguage += '\n' + newRule;
				}
			} else {
				// other rules
				// add the new rule just before the final rule
				let lines = this.modelerRestrictedLanguage.split('\n');
				let finalRuleIndex = lines.findIndex(line => line.endsWith('the process finishes.'));
				if (finalRuleIndex !== -1) {
					lines.splice(finalRuleIndex, 0, newRule);
				} else {
					lines.push(newRule);
				}
				this.modelerRestrictedLanguage = lines.join('\n');
			}
		}
	},
	watch: {
		modelerRestrictedLanguage(newValue) {
			// extract all activity names from the restricted language
			const matches = newValue.match(/"([^"]*)"/g) || [];
			this.modelerActivityNames = [...new Set(matches.map(s => s.slice(1, -1)))];

			this.modelerSyntaxErrors = [];
			let result = checkSyntax(newValue);
			if (!result.state) {
				this.modelerSyntaxErrors = result.errors;
				return;
			}

			this.loading = true;
			getConvertedText(newValue).then(response => {
				this.modelerPetriNetTpn = response[0][0];
				this.modelerDeclare = response[1][0];
				this.modelerDeclare_js = response[1][1];
				this.modelerBpmn = response[2][0];
				this.modelerBpmnXml = response[2][1];
				this.loading = false;
			});
		}	
	}
}
</script>
<style>
.header {
	background-color: rgb(var(--v-theme-primary));
	color: white;
	opacity: 0.5;
}
</style>
