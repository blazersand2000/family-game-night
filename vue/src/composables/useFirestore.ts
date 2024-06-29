// useFirestore.ts
import { computed, onUnmounted, ref } from 'vue'
import { db } from '@/firebaseConfig' // Adjust this path to your Firebase config
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  onSnapshot
} from 'firebase/firestore'
import type { Todo } from '@/types/types' // Adjust this path to where your types are defined

export function useFirestore() {
  const error = ref<any>(null)
  const todosRef = ref<Todo[]>([])

  // Subscribe to Firestore and automatically update todos
  const unsubscribe = onSnapshot(
    collection(db, 'todos'),
    (querySnapshot) => {
      todosRef.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Todo[]
    },
    (err) => {
      error.value = err
    }
  )

  // Provide a way to manually unsubscribe to prevent memory leaks
  onUnmounted(() => {
    unsubscribe()
  })

  // Expose todos as a computed property for reactivity
  const todos = computed(() => todosRef.value)

  // Create a new todo
  async function createTodo(todo: Omit<Todo, 'id'>) {
    error.value = null
    try {
      const docRef = await addDoc(collection(db, 'todos'), todo)
      return { id: docRef.id, ...todo }
    } catch (err) {
      error.value = err
      return {} as Todo
    }
  }

  // Update a todo
  async function updateTodo(todo: Todo) {
    error.value = null
    try {
      const docRef = doc(db, 'todos', todo.id)
      await updateDoc(docRef, { text: todo.text })
      return todo
    } catch (err) {
      error.value = err
      return null
    }
  }

  // Delete a todo
  async function deleteTodo(id: string) {
    error.value = null
    try {
      await deleteDoc(doc(db, 'todos', id))
      return true
    } catch (err) {
      error.value = err
      return false
    }
  }

  return { createTodo, todos, updateTodo, deleteTodo, error }
}
