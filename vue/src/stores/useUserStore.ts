import { defineStore } from 'pinia'
import { useCollection, useCurrentUser, useDocument } from 'vuefire'
import { computed, ref, watch } from 'vue'
import type { User } from 'shared/models/user'
import {
  collection,
  doc,
  DocumentReference,
  getFirestore,
  query,
  where,
  type DocumentData
} from 'firebase/firestore'
import { useUserApi } from '@/composables/useUserApi'

export const useUserStore = defineStore('user', () => {
  const currentAuthUser = useCurrentUser() // This should be a reactive reference

  // Step 1: Expose useDocument Hook
  // Convert uid to a reactive reference that can be watched
  const uid = computed(() => currentAuthUser.value?.uid)

  // Initially, currentUserDocRef is null and will be updated by the watcher
  const currentUserDocRef = ref(doc(collection(getFirestore(), 'users'), uid.value))

  //   // Step 2: Watch UID Changes
  //   watch(
  //     uid,
  //     (newUid, oldUid) => {
  //       if (newUid) {
  //         // Log the change for debugging purposes
  //         console.log('User UID changed from', oldUid, 'to', newUid)
  //         // Step 3: Update useDocument on UID Change
  //         // Update the document reference based on the new UID
  //         currentUserDocRef.value = doc(collection(getFirestore(), 'users'), newUid)
  //       } else {
  //         // Handle cases where UID is not available or user is logged out
  //         currentUserDocRef.value = null
  //       }
  //     },
  //     { immediate: true }
  //   ) // Execute immediately on setup

  // Use the useDocument hook with the reactive currentUserDocRef
  const currentUser = ref(useDocument<User>(doc(collection(getFirestore(), 'users'), uid.value)))

  // Watch the uid ref for changes
  watch(
    uid,
    (newUid, oldUid) => {
      console.log('User UID changed from', oldUid, 'to', newUid)
      // Whenever uid changes, update currentUserDoc with a new useDocument call
      currentUser.value = useDocument<User>(doc(collection(getFirestore(), 'users'), newUid)).value
    },
    { immediate: true }
  ) // Execute immediately on setup

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

  // Inside your useUserStore definition
  const isCurrentUserLoaded = ref(false)

  // Function to wait for currentUser to be populated
  const awaitCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const stop = watch(
        currentUser,
        (newValue) => {
          if (newValue) {
            isCurrentUserLoaded.value = true
            stop() // Stop watching once we have the data
            resolve(newValue)
          }
        },
        {
          immediate: true // Start checking immediately
        }
      )

      // Optional: reject the promise if currentUser is not loaded within a timeout
      setTimeout(() => {
        if (!isCurrentUserLoaded.value) {
          stop() // Stop watching to clean up
          reject(new Error('Timeout waiting for currentUser to load'))
        }
      }, 5000) // Timeout after 5 seconds, adjust as needed
    })
  }

  return { currentUser, updateName, getUsersByIds, awaitCurrentUser }
})
