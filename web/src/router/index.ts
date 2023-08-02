import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: LandingPage,
  },
  {
    path: '/supervisor',
    component: () => import('@/views/supervisor/WithSideMenu.vue'),
    children: [
      {
        name: 'supervisor',
        path: '',
        redirect: '/supervisor/operator'
      },
      {
        path: 'operator',
        component: () => import('@/views/supervisor/operator/MainPage.vue'),
        children: [
          {
            name: 'operator',
            path: '',
            component: () => import('@/views/supervisor/operator/ListPage.vue'),
          },
          {
            name: 'operatorDetail',
            path: ':id',
            component: () => import('@/views/supervisor/operator/DetailPage.vue')
          }
        ]
      },
      {
        path: 'franchisee',
        component: () => import('@/views/supervisor/franchisee/MainPage.vue'),
        children: [
          {
            name: 'franchisee',
            path: '',
            component: () => import('@/views/supervisor/franchisee/ListPage.vue'),
          },
          {
            name: 'franchiseeDetail',
            path: ':id',
            component: () => import('@/views/supervisor/franchisee/DetailPage.vue')
          }
        ]
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
