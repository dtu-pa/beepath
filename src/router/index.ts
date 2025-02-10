import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import BusinessProcessView from '../views/BusinessProcessView.vue';
import AttackTreeView from '../views/AttackTreeView.vue';
import AboutView from '../views/AboutView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL), // Use Vite's public path
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/business-process',
			name: 'business-process',
			component: BusinessProcessView
		},
		{
			path: '/attack-tree',
			name: 'attack-tree',
			component: AttackTreeView
		},
		{
			path: '/about',
			name: 'about',
			component: AboutView
		},
	]
})

export default router
