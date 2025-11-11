<template>
	<v-dialog v-model="visible" max-width="600">
		<v-card prepend-icon="mdi-file-edit-outline" title="Add Process Rule">
			<v-card-text>
				<TemplateBuilder
					v-model="output"
					:templates="templates"
				/>
			</v-card-text>
			<v-divider></v-divider>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn text="Close" variant="plain" @click="closeDialog"></v-btn>
				<v-btn color="primary" text="Add Rule" variant="tonal" @click="addRule"></v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

</template>

<script setup>
import { ref, defineModel } from "vue";
// import { computed, reactive, watch, ref } from 'vue'
import TemplateBuilder from '../components/TemplateBuilder.vue';

const emit = defineEmits(['newRule']);

const visible = defineModel();
const output = ref('');

const templates = [
	{
		id: 'start',
		label: 'Initial activity',
		render: 'text',
		escapeForRegex: true, // make user input safe in a regex
		format: 'Initially start "{{A}}".',
		fields: [
			{ key: 'A', label: 'First activity', type: 'text', required: true, placeholder: 'Activity name' },
		]
	},
	{
		id: 'end',
		label: 'Final activity',
		render: 'text',
		escapeForRegex: true, // make user input safe in a regex
		format: 'After "{{A}}" ends, the process finishes.',
		fields: [
			{ key: 'A', label: 'Final activity', type: 'text', required: true, placeholder: 'Activity name' },
		]
	},
	{
		id: 'role',
		label: 'Activity performed by',
		render: 'text',
		escapeForRegex: true, // make user input safe in a regex
		format: 'Activity "{{A}}" is performed by "{{role}}".',
		fields: [
			{ key: 'A', label: 'Activity', type: 'text', required: true, placeholder: 'Activity name' },
			{ key: 'role', label: 'Role', type: 'text', required: true, placeholder: 'Role name' },
		]
	},
	{
		id: 'seq',
		label: 'Sequence(A, B)',
		render: 'text',
		escapeForRegex: true, // make user input safe in a regex
		format: 'After "{{A}}" ends, immediately start "{{B}}".',
		fields: [
			{ key: 'A', label: 'Activity A', type: 'text', required: true, placeholder: 'Activity name' },
			{ key: 'B', label: 'Activity B', type: 'text', required: true, placeholder: 'Activity name' },
		]
	},{
		id: 'eventually',
		label: 'Eventual sequence(A, B)',
		render: 'text',
		escapeForRegex: true, // make user input safe in a regex
		format: 'After "{{A}}" ends, eventually start "{{B}}".',
		fields: [
			{ key: 'A', label: 'Activity A', type: 'text', required: true, placeholder: 'Activity name' },
			{ key: 'B', label: 'Activity B', type: 'text', required: true, placeholder: 'Activity name' },
		]
	},
	{
		id: 'parallel',
		label: 'Parallel Split(A, B, C)',
		render: 'text',
		escapeForRegex: true, // make user input safe in a regex
		format: 'After "{{A}}" ends, immediately start "{{B}}" and start "{{C}}".',
		fields: [
			{ key: 'A', label: 'Activity A', type: 'text', required: true, placeholder: 'Activity name' },
			{ key: 'B', label: 'Activity B', type: 'text', required: true, placeholder: 'Activity name' },
			{ key: 'C', label: 'Activity C', type: 'text', required: true, placeholder: 'Activity name' },
		]
	},
	{
		id: 'synch',
		label: 'Synchronization(A, B, C)',
		render: 'text',
		escapeForRegex: true, // make user input safe in a regex
		format: 'After "{{A}}" ends and "{{B}}" ends, immediately start "{{C}}".',
		fields: [
			{ key: 'A', label: 'Activity A', type: 'text', required: true, placeholder: 'Activity name' },
			{ key: 'B', label: 'Activity B', type: 'text', required: true, placeholder: 'Activity name' },
			{ key: 'C', label: 'Activity C', type: 'text', required: true, placeholder: 'Activity name' },
		]
	},
	{
		id: 'ex-choice',
		label: 'Exclusive Choice(A, B, C)',
		render: 'text',
		escapeForRegex: true, // make user input safe in a regex
		format: 'After "{{A}}" ends, immediately either start "{{B}}" or start "{{C}}".',
		fields: [
			{ key: 'A', label: 'Activity A', type: 'text', required: true, placeholder: 'Activity name' },
			{ key: 'B', label: 'Activity B', type: 'text', required: true, placeholder: 'Activity name' },
			{ key: 'C', label: 'Activity C', type: 'text', required: true, placeholder: 'Activity name' },
		]
	},
	{
		id: 'simple-merge',
		label: 'Simple Merge(A, B, C)',
		render: 'text',
		escapeForRegex: true, // make user input safe in a regex
		format: 'After either "{{A}}" ends or "{{B}}" ends, immediately start "{{C}}".',
		fields: [
			{ key: 'A', label: 'Activity A', type: 'text', required: true, placeholder: 'Activity name' },
			{ key: 'B', label: 'Activity B', type: 'text', required: true, placeholder: 'Activity name' },
			{ key: 'C', label: 'Activity C', type: 'text', required: true, placeholder: 'Activity name' },
		]
	},
	{
		id: 'repeat-since',
		label: 'Repeat Since(A, B, C)',
		render: 'text',
		escapeForRegex: true, // make user input safe in a regex
		format: 'After "{{A}}" ends, immediately repeat since "{{B}}" or start "{{C}}".',
		fields: [
			{ key: 'A', label: 'Activity A', type: 'text', required: true, placeholder: 'Activity name' },
			{ key: 'B', label: 'Activity B', type: 'text', required: true, placeholder: 'Activity name' },
			{ key: 'C', label: 'Activity C', type: 'text', required: true, placeholder: 'Activity name' },
		]
	},

]

const closeDialog = () => {
	visible.value = false;
};

const addRule = () => {
	if (output.value) {
		emit('newRule', output.value)
		closeDialog();
	}
};
</script>
