<template>
	<v-tabs v-model="tab" @update:modelValue="onTabChange">
		<v-tab value="bpmn" v-if="bpmn_img !== ''">BPMN</v-tab>
		<v-tab value="petri" v-if="petrinet_img !== ''">Petri net</v-tab>
		<v-tab value="declare" v-if="declare">Declare</v-tab>
	</v-tabs>

	<v-tabs-window v-model="tab" class="flex-fill" style="height: 100%;">
		<v-tabs-window-item value="petri" class="flex-fill" v-if="petrinet_img !== ''">
			<v-container class="d-flex flex-column" style="height: 100%;">
				<v-btn class="align-self-end" elevation="0" outlined @click="handleDownloadFile('PETRI_NET')">
					<v-icon class="mr-2" icon="mdi-download" />
					Download .tpn
				</v-btn>
				<div class="flex-grow-1 img-container mt-3" v-html="petrinet_img"></div>
			</v-container>
		</v-tabs-window-item>
		<v-tabs-window-item value="bpmn" class="flex-fill" v-if="bpmn_img !== ''">
			<v-container class="d-flex flex-column" style="height: 100%;">
				<v-btn class="align-self-end" elevation="0" outlined @click="handleDownloadFile('BPMN')">
					<v-icon class="mr-2" icon="mdi-download" />
					Download .bpmn
				</v-btn>
				<div class="flex-grow-1 img-container mt-3" v-html="bpmn_img"></div>
			</v-container>
		</v-tabs-window-item>
		<v-tabs-window-item value="declare" class="flex-fill" style="" v-if="declare">
			<v-container class="d-flex flex-column flex-fill" style="height: 800px;">
				<v-btn class="align-self-end" elevation="0" outlined @click="handleDownloadFile('DECLARE')">
					<v-icon class="mr-2" icon="mdi-download" />
					Download .decl
				</v-btn>
				<div id="declareContainer" class="flex-fill"></div>
			</v-container>
		</v-tabs-window-item>
	</v-tabs-window>

</template>

<script>
import { instance } from "@viz-js/viz";
import { tpn2graphviz } from '../converters/businessprocesses';
import { DeclareContainer } from '../libs/declare-js/main.js';

export default {
	props: {
		petrinet: {
			type: String,
			required: true
		},
		declare: {
			type: String,
			required: true
		},
		declare_js: {
			type: String,
			required: true
		},
		bpmn: {
			type: String,
			required: true
		},
		bpmn_xml: {
			type: String,
			required: true
		}
	},
	data: () => ({
		tab: 'bpmn',
		petrinet_graphviz: '',
		petrinet_img: '',
		declare_img: '',
		bpmn_img: '',
	}),

	methods: {
		process() {
			// render petrinet
			this.petrinet_graphviz = tpn2graphviz(this.petrinet);
			instance().then(viz => {
				this.petrinet_img = viz.renderSVGElement(this.petrinet_graphviz).outerHTML;
			}).catch((err) => {
				console.error(err);
				this.petrinet_img = null;
			});

			// render bpmn
			instance().then(viz => {
				// console.log(this.bpmn);
				this.bpmn_img = viz.renderSVGElement(this.bpmn).outerHTML;
			}).catch((err) => {
				console.error(err);
				console.error(this.bpmn);
				this.bpmn_img = null;
			});

			// render declare
			// this.declare_img = this.declare;
		},
		handleDownloadFile(type) {
			let model = "";
			let fileName = "";
			if (type === 'PETRI_NET') {
				model = this.petrinet;
				fileName = "PetriNet.tpn";
			} else if (type === 'DECLARE') {
				model = this.declare;
				fileName = "DeclareModel.decl";
			} else if (type === 'BPMN') {
				model = this.bpmn_xml;
				fileName = "process.bpmn";
			}

			const fileBlob = new Blob([model], {
				type: "text/plain",
			});
			const url = window.URL.createObjectURL(fileBlob);
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", fileName);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
		},
		onTabChange() {
			if (this.tab === 'declare' && this.declare_js) {
				setTimeout(() => {
					new DeclareContainer(this.declare_js);
				}, 100);
			}
		}
	},
	watch: {
		bpmn: {
			immediate: true,
			handler() {
				if (this.petrinet !== '' && this.declare !== '' && this.bpmn !== '') {
					this.process();
				}
			}
		}
	}
}
</script>

<style scoped>
.img-container {
	overflow: auto;
}
</style>