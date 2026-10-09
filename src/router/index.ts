import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', redirect: '/movies' },
    { path: '/movies', name: 'Movies', component: () => import('@/pages/Movies.vue') },
    { path: '/movies/:id', name: 'Movie', component: () => import('@/pages/Movie.vue') },
    { path: '/search', name: 'Search', component: () => import('@/pages/Search.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/movies' },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router