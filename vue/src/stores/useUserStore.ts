import { defineStore } from 'pinia'
import { useCollection, useCurrentUser, useDocument } from 'vuefire'
import { computed, ref, watch, type WatchStopHandle } from 'vue'
import type { User } from 'shared/models/user'
import { collection, doc, getFirestore, query, where } from 'firebase/firestore'
import { useUserApi } from '@/composables/useUserApi'

export const useUserStore = defineStore('user', () => {
  const currentAuthUser = useCurrentUser()

  const uid = computed(() => currentAuthUser.value?.uid)

  const currentUser = ref(useDocument<User>(doc(collection(getFirestore(), 'users'), uid.value)))

  watch(
    uid,
    (newUid, oldUid) => {
      console.log('User UID changed from', oldUid, 'to', newUid)
      currentUser.value = useDocument<User>(doc(collection(getFirestore(), 'users'), newUid)).value
    },
    { immediate: true }
  )

  const updateName = async (name: string) => {
    await useUserApi().updateProfile({
      displayName: name
    })
  }

  const getUsersByIds = (userIds: string[]) => {
    const firestore = getFirestore()
    const usersCollection = collection(firestore, 'users')
    const filteredUsersCollection = query(usersCollection, where('id', 'in', userIds))

    return useCollection<User>(filteredUsersCollection)
  }

  const isCurrentUserLoaded = ref(false)
  const awaitCurrentUser = () => {
    if (currentUser.value) {
      return Promise.resolve(currentUser.value)
    }

    return new Promise((resolve) => {
      const stop = watch(
        currentUser,
        (newValue) => {
          isCurrentUserLoaded.value = true
          stop()
          resolve(newValue)
        },
        {
          immediate: false
        }
      )
    })
  }

  return { currentUser, updateName, getUsersByIds, awaitCurrentUser }
})
