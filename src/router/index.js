import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import ServiceView from '../views/ServiceView.vue'
import WorkView from '../views/WorkView.vue'
import { applyRouteSeo } from '../utils/seo'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/o-kompanii',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/uslugi/:slug',
      name: 'service',
      component: ServiceView,
    },
    {
      path: '/raboty/:slug',
      name: 'work',
      component: WorkView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 96,
      }
    }
    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  applyRouteSeo(to)
})

export default router
