import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import type { ErrorViewProps } from '@/types/errorViewProps'
import { watch, watchEffect } from 'vue'

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

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore()

  await waitForAuthInitialization()

  if (!authStore.currentUser) {
    if (to.name !== 'error') {
      return { name: 'error' }
    }
    return true
  }

  if (!authStore.currentUser.displayName && to.name !== 'enterUserDetails') {
    return { name: 'enterUserDetails', query: { redirect: to.fullPath } }
  }

  if (authStore.currentUser.displayName && to.name === 'enterUserDetails') {
    return false
  }
})

async function waitForAuthInitialization() {
  const authStore = useAuthStore()

  if (authStore.isAuthInitialized) {
    return true
  }

  return new Promise((resolve) => {
    const stop = watch(
      () => authStore.isAuthInitialized,
      (isInitialized) => {
        if (isInitialized) {
          stop()
          resolve(true)
        }
      }
    )
  })
}

export default router
