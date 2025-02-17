<template>
	<v-app>
		<!-- Topbar -->
		<v-toolbar color="primary">
			<v-toolbar-title>
				<v-row align="center" no-gutters>
					<img :src="'dtu.png'" class="mr-1" alt="DTU" height="40" />
					<v-app-bar-title>BeePath</v-app-bar-title>
				</v-row>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn text @click="this.$router.push({ name: 'home' })">
				<v-icon class="mr-1" icon="mdi-home" />
				Home
			</v-btn>
			<v-btn text @click="this.$router.push({ name: 'business-process' })">
				<v-icon class="mr-1" icon="mdi-chart-sankey-variant" />
				Business Processes
			</v-btn>
			<!-- <v-btn text @click="this.$router.push({ name: 'attack-tree' })">
				<v-icon class="mr-1" icon="mdi-sitemap" />
				Attack Trees
			</v-btn> -->
			<v-menu >
				<template v-slot:activator="{ props }">
					<v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
				</template>
				<v-list>
					<v-list-item @click="this.ChatGPTDialogVisible = true">
						<v-list-item-title>Configure ChatGPT API Key</v-list-item-title>
					</v-list-item>
					<v-list-item :to="{ name: 'about' }">
						<v-list-item-title>
							<v-icon class="mr-1" icon="mdi-information-outline" />
							About BeePath
						</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-toolbar>

		<v-main class="d-flex flex-fill" style="height: 100%;">
			<v-container>
				<router-view></router-view>
			</v-container>
		</v-main>

		<ChatGPTDialog v-model="ChatGPTDialogVisible" />
	</v-app>
</template>

<script>
import ChatGPTDialog from './dialogs/ChatGPTDialog.vue'

export default {
	name: 'App',
	components: {
		ChatGPTDialog
	},
	data: () => ({
		ChatGPTDialogVisible: false,
	})
}
</script>