<template>
  <v-card class="mx-auto" width="300" title="Hello there!" subtitle="Enter your name to continue">
    <v-form @submit.prevent="handleSubmit">
      <v-text-field v-model="firstName" :rules="rules" variant="outlined"></v-text-field>
      <v-btn
        :loading="isSubmitting"
        :disabled="isSubmitting"
        class="mt-2"
        type="submit"
        variant="tonal"
        block
      >
        Save
      </v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

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
  await userStore.updateName(firstName.value)
  router.push((route.query.redirect as string) || '/')
  isSubmitting.value = false
}
</script>
