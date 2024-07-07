<template>
  <v-row justify-center>
    <v-col>
      <div><h1>Current Game: Tic Tac Toe</h1></div>
      <div>
        <h3>Name: {{ game?.title }}</h3>
      </div>
      <div>
        <h3>Created: {{ createdAt }}</h3>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/useGameStore'
import { useDateFormat } from '@vueuse/core'

const props = defineProps<{
  gameId: string
}>()

const gameStore = useGameStore()
const game = gameStore.game(props.gameId)
const createdAt = useDateFormat(game.value?.createdAt, 'YYYY-MM-DD HH:mm:ss')
</script>
