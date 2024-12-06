import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import QuizzesView from "@/views/QuizzesView.vue";
import ProfileView from "@/views/ProfileView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/register",
            name: "register",
            component: Register
        },
        {
            path: "/profile",
            name: "profile",
            component: ProfileView
        },
        {
            path: "/quizzes",
            name: "quizzes",
            component: QuizzesView
        }
    ]
});

export default router;