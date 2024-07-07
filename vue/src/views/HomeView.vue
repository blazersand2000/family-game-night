<template>
  <main>
    <v-card class="mx-auto" max-width="300">
      <v-list :items="games" item-title="title" item-value="id"></v-list>
    </v-card>
    <div>
      <button @click="Create">Test Create Game</button>
      <button @click="Join">Test Join Game</button>
      <div>
        <v-btn variant="tonal" @click="login">Login</v-btn>
      </div>
    </div>
    <div>
      {{ currentUser === null ? 'Not logged in' : 'Logged in' }}
    </div>
    <!-- <v-card width="300">
      <v-card-title>Game</v-card-title>
      <v-card-text> {{ currentUser }} </v-card-text>
    </v-card> -->

    <div v-if="error">Error: {{ error.message }}</div>
  </main>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { useGameApi } from '@/composables/useGameApi'
import { useLogger } from '@/composables/useLogger'
import { useGameStore } from '@/stores/useGameStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { GameType } from 'shared/models/gameType'

const logger = useLogger()
const gameApi = useGameApi()
const { games } = toRefs(useGameStore())
const { auth, currentUser, login: anonymousLogin, error } = toRefs(useAuthStore())

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

const login = async () => {
  await anonymousLogin.value()
}
</script>
