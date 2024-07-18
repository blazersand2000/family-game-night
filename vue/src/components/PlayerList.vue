<template>
  <v-card class="mx-auto" max-width="300">
    <v-list density="compact" title="hi">
      <v-list-header>REPORTS</v-list-header>

      <v-list-item v-for="user in props.users" :key="user.id" :value="user" color="primary">
        <v-list-item-title>{{ user.displayName }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import type { User } from 'shared/models/user'

const props = defineProps<{
  users: (User & { id: string })[]
}>()
</script>

<style scoped></style>
