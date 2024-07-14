import { defineStore } from 'pinia'
import { useFirebaseAuth, useCurrentUser } from 'vuefire'
import { computed, ref, watch } from 'vue'
import { signInAnonymously, updateProfile } from 'firebase/auth'
import type { AuthError } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const _isAuthInitialized = ref(false)
  const isAuthInitialized = computed(() => _isAuthInitialized.value)
  const auth = useFirebaseAuth()!
  const currentUser = useCurrentUser()
  const _error = ref<{ code: string; message: string } | null>(null)
  const error = computed(() => _error.value)

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
        _error.value = null
      } catch (e) {
        const ae = e as AuthError
        _error.value = { code: ae.code, message: ae.message }
      }
    }
    _isAuthInitialized.value = true
  }

  const updateName = async (name: string) => {
    if (currentUser.value) {
      await updateProfile(currentUser.value, {
        displayName: name
      })
    }
  }

  return { auth, currentUser, isAuthInitialized, error, initAuth, updateName }
})
