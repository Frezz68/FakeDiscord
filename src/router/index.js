import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../view/LoginView.vue'
import NotFoundView from '../views/404View.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
        path: '/',
        name: 'login',
        component: LoginView
        },
        {
        path: '/user',
        name: 'user',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/UserView.vue')
        },
        {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: NotFoundView
        }
    ]
})

export default router
