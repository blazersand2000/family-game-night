<template>
  <v-container>
    <v-row justify-center>
      <v-col>
        <div><h1>Current Game: Tic Tac Toe</h1></div>
        <!-- <div>
        <h3>Name: {{ game?.title }}</h3>
      </div> -->
        <div>
          <h3>Created: {{ createdAt }}</h3>
        </div>
        <div>
          <h3>Is date: {{ isADate }}</h3>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <GameBoard :gameId="gameId" />
      </v-col>
    </v-row>
    <v-row>
      <v-col><InviteToGame /></v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import GameBoard from '@/components/GameBoard.vue'
import InviteToGame from '@/components/InviteToGame.vue'
import { useGameStore } from '@/stores/useGameStore'
import { useDateFormat } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps<{
  gameId: string
}>()

const gameStore = useGameStore()
const game = gameStore.game(props.gameId)
const createdAt = computed(() => useDateFormat(game.value?.createdAt, 'YYYY-MM-DD HH:mm:ss'))
const isADate = computed(() => game.value?.createdAt instanceof Date)
</script>
