import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import QuizzesView from "@/views/QuizzesView.vue";
import SectionView from "@/views/SectionView.vue";
import EditQuizView from "@/views/EditQuizView.vue";

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
            path: "/quizzes",
            name: "quizzes",
            component: QuizzesView
        },
        {
            path: "/section/:moduleid",
            name: "section",
            component: SectionView
        },
        {
            path: "/editquiz",
            name: "editquiz",
            component: EditQuizView
        }
    ]
});

export default router;