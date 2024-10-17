import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";
import { useUserAuthStore } from "@/stores/UserAuthStore";
import FirebaseSigninView from "@/views/FirebaseSigninView.vue";
import FirebaseRegisterView from "@/views/FirebaseRegisterView.vue";
import AddBookView from "@/views/AddBookView.vue";
import GetBookCountView from "@/views/GetBookCountView.vue";
import WeatherView from "@/views/WeatherView.vue";
import CountBookAPI from "@/views/CountBookAPI.vue";
import GetAllBookAPI from "@/views/GetAllBookAPI.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/GetBookCount',
        name: 'GetBookCount',
        component: GetBookCountView
    },
    {
        path: '/WeatherCheck',
        name: 'WeatherCheck',
        component: WeatherView
    },
    {
        path: '/CountBookAPI',
        name: 'CountBookAPI',
        component: CountBookAPI
    },
    {
        path: '/GetAllBookAPI',
        name: 'GetAllBookAPI',
        component: GetAllBookAPI
    },
    {
        path: '/addbook',
        name: 'AddBook',
        component: AddBookView
    },
    {
        path: '/about',
        name: 'About',
        component: AboutView,
        beforeEnter: (to, from, next) => {

            if (useUserAuthStore().isUserLoggedIn) {
                next();
            }
            else {
                next({ name: 'Login' })
            }
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/FireLogin',
        name: 'FireLogin',
        component: FirebaseSigninView
    },
    {
        path: '/FireRegister',
        name: 'FireRegister',
        component: FirebaseRegisterView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes 
})

export default router