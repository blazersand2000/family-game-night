<template>
  <div>
    <input v-model="newTodo" @keyup.enter="addNewTodo" placeholder="Add a new todo" />
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTodoStore } from '@/stores/useTodoStore'

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
</script>
