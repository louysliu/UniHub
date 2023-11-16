import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HelloView from '../views/HelloView.vue'
import UnihubHome from '../views/UnihubHome.vue'
import UserLogin from '../views/UserLogin.vue'
import NewRegister from '../views/NewRegister.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/test/hello',
    name: 'hello',
    component: HelloView
  },
  {path: '/home/unihubhome', name: 'unihubhome',component: UnihubHome},
  {path: '/home/userlogin', name: 'userlogin', component: UserLogin},
  {path: '/home/newregister', name: 'newregister', component : NewRegister},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
