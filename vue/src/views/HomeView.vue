<template>
  <div>
    <v-card class="mx-auto" max-width="300">
      <v-list :items="gamesList"></v-list>
    </v-card>

    <div>
      <button @click="Create">Test Create Game</button>
      <button @click="Join">Test Join Game</button>
    </div>
    <div>
      {{ currentUser === null ? 'Not logged in' : 'Logged in' }}
    </div>

    <div v-if="error">Error: {{ error.message }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useGameApi } from '@/composables/useGameApi'
import { useLogger } from '@/composables/useLogger'
import { useGameStore } from '@/stores/useGameStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { GameType } from 'shared/models/gameType'

const logger = useLogger()
const gameApi = useGameApi()
const { games } = toRefs(useGameStore())
const { auth, currentUser, error } = toRefs(useAuthStore())

const gamesList = computed(() => {
  return games.value.map((game) => ({
    title: game.id,
    value: game.id,
    props: { to: { name: 'game', params: { gameId: game.id } } }
  }))
})

const Create = async () => {
  var createResult = await gameApi.createGame({
    title: 'Tic Tac Toe',
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
