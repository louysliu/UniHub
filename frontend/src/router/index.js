import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HelloView from '../views/HelloView.vue'
import UnihubHome from '../views/UnihubHome.vue'
import LogIn from '../views/LogIn.vue'
import NewRegister from '../views/NewRegister.vue'
import UserHome from '../views/UserHome.vue'
import HomeLoading from '../views/HomeLoading.vue'
import FileManager from '../views/FileManager.vue'
import DdlManager from '../views/DdlManager.vue'

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
  {path: '/home/login', name: 'login', component: LogIn},
  {path: '/home/newregister', name: 'newregister', component : NewRegister},
  {path: '/home/userhome', name: 'userhome', component : UserHome},
  {path: '/home/homeloading', name: 'homeloading', component : HomeLoading},
  {path: '/home/file-manager', name: 'file-manager', component : FileManager},
  {path: '/home/ddl-manager', name: 'ddl-manager', component : DdlManager},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
