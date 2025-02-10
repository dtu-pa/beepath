<template>
	<v-tabs v-model="tab">
		<v-tab value="petri">Petri net</v-tab>
		<v-tab value="declare">Declare</v-tab>
	</v-tabs>

	<v-tabs-window v-model="tab" class="flex-fill" style="height: 100%;">
		<v-tabs-window-item value="petri" class="flex-fill">
			<v-container class="d-flex flex-column" style="height: 90%;">
				<v-btn class="align-self-end" elevation="0" outlined @click="handleDownloadFile('PETRI_NET')">
					<v-icon class="mr-2" icon="mdi-download" />
					Download .tpn
				</v-btn>
				<div class="flex-grow-1 img-container mt-3" v-html="petrinet_img"></div>
			</v-container>
		</v-tabs-window-item>
		<v-tabs-window-item value="declare" class="flex-fill">
			<v-container class="d-flex flex-column" style="height: 90%;">
				<v-btn class="align-self-end" elevation="0" outlined @click="handleDownloadFile('DECLARE')">
					<v-icon class="mr-2" icon="mdi-download" />
					Download .decl
				</v-btn>
				<pre class="flex-grow-1 img-container mt-3" v-html="declare_img"></pre>
			</v-container>
		</v-tabs-window-item>
	</v-tabs-window>

</template>

<script>
import { instance } from "@viz-js/viz";
import { tpn2graphviz } from '../converters/businessprocesses';

export default {
	props: {
		petrinet: {
			type: String,
			required: true
		},
		declare: {
			type: String,
			required: true
		}
	},
	data: () => ({
		tab: null,
		petrinet_graphviz: '',
		petrinet_img: '',
		declare_img: ''
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

			// render declare
			// instance().then(viz => {
			// 	this.declare_img = viz.renderSVGElement(this.declare).outerHTML;
			// }).catch((err) => {
			// 	console.error(err);
			// 	this.declare_img = null;
			// });
			this.declare_img = this.declare;
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
		}
	},
	watch: {
		petrinet: {
			immediate: true,
			handler() {
				if (this.petrinet !== '' && this.declare !== '') {
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