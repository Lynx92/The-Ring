import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/peticiones',
    name: 'Peticiones',
    component: () => import('@/views/Peticiones.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
