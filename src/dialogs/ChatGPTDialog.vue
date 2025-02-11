<template>
	<v-dialog v-model="visible" max-width="600">
		<v-card prepend-icon="mdi-lock" title="Configure ChatGPT API Key">
			<v-card-text>
				<v-textarea label="Enter your API Key" v-model="token" outlined></v-textarea>
				<v-select v-model="model" label="GPT Model"
					:items="['gpt-4o', 'gpt-4o-mini', 'gpt-4o-2024-08-06', 'gpt-4o-mini-2024-07-18']"></v-select>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text="Close" variant="plain" @click="closeDialog"></v-btn>
				<v-btn color="primary" text="Save" variant="tonal" @click="saveToken"></v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

</template>

<script setup>
import { ref, defineModel } from "vue";

const visible = defineModel();
const token = ref(localStorage.getItem("chatgpt-token") || "");
const model = ref(localStorage.getItem("chatgpt-model") || "gpt-4o");

const closeDialog = () => {
	visible.value = false;
};

const saveToken = () => {
	console.log("Token saved:", token.value);
	localStorage.setItem("chatgpt-token", token.value);
	localStorage.setItem("chatgpt-model", model.value);
	closeDialog();
};
</script>
