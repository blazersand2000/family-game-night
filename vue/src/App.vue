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
        </v-list>
      </v-navigation-drawer>

      <v-main class="d-flex align-center justify-center" style="min-height: 300px">
        <RouterView />
      </v-main>
    </v-layout>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTodoStore } from '@/stores/useTodoStore'
import { useGameApi } from '@/composables/useGameApi'
import { useLogger } from './composables/useLogger'
import ThemeManager from './components/ThemeManager.vue'
import { GameType } from 'shared/models/gameType'
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()
const logger = useLogger()
const todoStore = useTodoStore()
// Use computed to create a computedRef for todos
const todos = computed(() => todoStore.todos)
const { addTodo } = todoStore // Destructure methods directly from the store
const newTodo = ref('')

const addNewTodo = () => {
  if (newTodo.value.trim()) {
    addTodo(newTodo.value.trim())
    newTodo.value = ''
  }
}

const gameApi = useGameApi()

const Create = async () => {
  var createResult = await gameApi.createGame({
    type: GameType.TicTacToe
  })
  logger.log(createResult)
}

const Join = async () => {
  var joinResult = await gameApi.joinGame({
    gameId: '123',
    userId: 'user789'
  })
  logger.log(joinResult)
}
</script>
