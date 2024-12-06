import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import QuizzesView from "@/views/QuizzesView.vue";
import SectionView from "@/views/SectionView.vue";
import EditQuizView from "@/views/EditQuizView.vue";
import ProfileView from "@/views/ProfileView.vue";
import LoginForm from "@/components/Auth/LoginForm.vue";
import RegisterForm from "@/components/Auth/RegisterForm.vue";

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
            component: LoginForm
        },
        {
            path: "/register",
            name: "register",
            component: RegisterForm
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