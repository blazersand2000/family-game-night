import { defineStore } from 'pinia'
import { useFirebaseAuth, useCurrentUser } from 'vuefire'
import { ref, watch } from 'vue'
import { signInAnonymously, updateProfile } from 'firebase/auth'
import type { AuthError } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()!
  const currentUser = useCurrentUser()
  const error = ref<{ code: string; message: string } | null>(null)

  watch(
    () => error,
    (newValue) => {
      if (newValue) {
        console.error(newValue)
      }
    },
    { immediate: false, deep: false }
  )

  const initAuth = async () => {
    await new Promise((resolve) => auth.onAuthStateChanged(resolve))
    if (!currentUser.value) {
      try {
        await signInAnonymously(auth)
        error.value = null
      } catch (e) {
        const ae = e as AuthError
        error.value = { code: ae.code, message: ae.message }
      }
    }
  }

  const updateName = async (name: string) => {
    if (currentUser.value) {
      await updateProfile(currentUser.value, {
        displayName: name
      })
    }
  }

  return { auth, currentUser, error, initAuth, updateName }
})
