import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useLogger } from '@/composables/useLogger'
import { useFirestore } from '@/composables/useFirestore'

export const useTodoStore = defineStore('todo', () => {
  const logger = useLogger()
  const firestore = useFirestore()
  //const todos = ref<Todo[]>([])

  const todos = firestore.todos

  const addTodo = async (text: string) => {
    logger.log('Adding todo:', text)
    try {
      const todo = await firestore.createTodo({ text })
      logger.log('Document written with ID: ', todo.id)
    } catch (e) {
      logger.log('Error adding document: ', e)
    }
  }

  return { todos, addTodo }
})
