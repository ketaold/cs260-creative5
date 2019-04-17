import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import MyRecipes from './views/MyRecipes.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
    },
        {
            path: '/myrecipes',
            name: 'myrecipes',
            component: MyRecipes,
    },
        {
            path: '/register',
            name: 'register',
            component: Register
    },
        {
            path: '/login',
            name: 'login',
            component: Login
    }

  ]
})
