<template>
  <div>
    <input v-model="newTodo" @keyup.enter="addNewTodo" placeholder="Add a new todo" />
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
      </li>
    </ul>
    <button @click="Test">Test Function</button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTodoStore } from '@/stores/useTodoStore'
import { useGameApi } from '@/composables/useGameApi'
import { useLogger } from './composables/useLogger'

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
const Test = async () => {
  var result = await gameApi.createGame({ text: 'Test Game' })
  logger.log(result)
}
</script>
