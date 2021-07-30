import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '@/views/MainPage'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage
    },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
