import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import type { ErrorViewProps } from '@/types/errorViewProps'
import { computed } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/welcome',
      name: 'enterUserDetails',
      component: () => import('../views/EnterUserDetailsView.vue')
    },
    {
      path: '/games/:gameId',
      name: 'game',
      component: () => import('../views/GameView.vue'),
      props: true
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('../views/ErrorView.vue'),
      props: (): ErrorViewProps => ({
        title: 'Error',
        text: 'An unexpected error occured. Try refreshing.'
      })
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/ErrorView.vue'),
      props: (): ErrorViewProps => ({
        title: '404 - Game Not Found',
        text: "Oops! There's no game here."
      })
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const currentUser = computed(() => authStore.currentUser)

  if (!currentUser.value) {
    if (to.name !== 'error') {
      console.log('User is not authenticated, redirecting to error')
      return next({ name: 'error' })
    } else {
      return
    }
  }
  if (!currentUser.value.displayName && to.name !== 'enterUserDetails') {
    console.log('User has no name, redirecting to enterUserDetails')
    return next({ name: 'enterUserDetails', query: { redirect: to.fullPath } })
  }
  return next()
})

export default router
