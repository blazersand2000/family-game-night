<!-- <template>
  <div>
    <input v-model="newTodo" @keyup.enter="addNewTodo" placeholder="Add a new todo" />
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
      </li>
    </ul>
    <button @click="Create">Test Create Game</button>
    <button @click="Join">Test Join Game</button>
  </div>
</template> -->

<template>
  <div>
    <ThemeManager />
    <v-layout class="rounded rounded-md">
      <v-app-bar title="Application bar"></v-app-bar>

      <v-navigation-drawer>
        <v-list>
          <v-list-item title="Navigation drawer"
            >Auth initialized: {{ authStore.isAuthInitialized }}</v-list-item
          >
          <v-list-item title="Navigation drawer"
            >Logged in? {{ !!authStore.currentUser }}</v-list-item
          >
          <v-list-item title="Navigation drawer">Name: {{ userStore.currentUser }}</v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main class="d-flex align-center justify-center" style="min-height: 300px">
        <RouterView />
      </v-main>
    </v-layout>
  </div>
</template>

<script setup lang="ts">
import ThemeManager from './components/ThemeManager.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useUserStore } from '@/stores/useUserStore'

const authStore = useAuthStore()
const userStore = useUserStore()
</script>
