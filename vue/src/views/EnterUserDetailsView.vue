<template>
  <v-sheet class="mx-auto" width="300">
    <v-form @submit.prevent="handleSubmit">
      <v-text-field v-model="firstName" :rules="rules" label="First name"></v-text-field>
      <v-btn :loading="isSubmitting" :disabled="isSubmitting" class="mt-2" type="submit" block>
        Save
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/useAuthStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const firstName = ref('')
const isSubmitting = ref(false)

const rules = [
  (value: string) => {
    if (value) return true
    return 'First name required!'
  }
]

const handleSubmit = async () => {
  if (!firstName.value) {
    return
  }

  isSubmitting.value = true
  await authStore.updateName(firstName.value)
  router.push((route.query.redirect as string) || '/')
  isSubmitting.value = false
}
</script>
