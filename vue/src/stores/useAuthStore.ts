import { defineStore } from 'pinia'
import { useFirebaseAuth, useCurrentUser } from 'vuefire'
import { ref } from 'vue'
import { signInAnonymously } from 'firebase/auth'
import type { AuthError } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()!
  const currentUser = useCurrentUser()
  const error = ref<{ code: string; message: string } | null>(null)

  const initAuth = () => {
    auth.onAuthStateChanged(async () => {
      if (currentUser.value) {
        return
      }
      try {
        await signInAnonymously(auth)
        error.value = null
      } catch (e) {
        const ae = e as AuthError
        error.value = { code: ae.code, message: ae.message }
        console.error(ae)
      }
    })
  }

  return { auth, currentUser, error, initAuth }
})
