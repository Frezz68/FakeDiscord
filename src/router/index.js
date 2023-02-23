import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import NotFoundView from '../views/404View.vue'
import UserList from "@/components/UserList.vue";
import HomePage from "@/components/HomePage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView,
            beforeEnter: (to, from) => {
                if(localStorage.getItem('token') == null){
                    return true;
                }
                else{
                    router.push("/channels");
                }
            },
        },
        {
            path: '/channels',
            name: 'channels',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: HomePage,
            beforeEnter: (to, from) => {
                // reject the navigation
                if(localStorage.getItem('token') == null){
                    router.replace("/");
                }
            },
        },
        {
            path: '/channels/:id',
            name: 'channelsId',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: HomePage,
            beforeEnter: (to, from) => {
                // reject the navigation
                if(localStorage.getItem('token') == null){
                    router.replace("/");
                }
            },
        },
        {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: NotFoundView
        }
    ]
})

export default router
