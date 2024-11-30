import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/HomeView.vue'),
		},
		{
			path: '/levels',
			name: 'levels',
			component: () => import('../views/LevelsView.vue'),
		},
		{
			path: '/question',
			name: 'question',
			component: () => import('../views/QuestionView.vue'),
		},
	],
})

export default router
