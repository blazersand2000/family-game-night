<template>
  <div>
    <v-card class="mx-auto" max-width="300">
      <v-list :items="gameLobbiesList"></v-list>
    </v-card>

    <div>
      <button @click="Create">Create Game</button>
    </div>

    <div v-if="error">Error: {{ error.message }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue'
import { useGameLobbyApi } from '@/composables/useGameLobbyApi'
import { useLogger } from '@/composables/useLogger'
import { useGameLobbyStore } from '@/stores/useGameLobbyStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { storeToRefs } from 'pinia'

const logger = useLogger()
const gameLobbyApi = useGameLobbyApi()
const { error } = toRefs(useAuthStore())
const { myGameLobbies } = storeToRefs(useGameLobbyStore())

const gameLobbiesList = computed(() => {
  return myGameLobbies.value.map((lobby) => ({
    title: lobby.id,
    value: lobby.id,
    props: { to: { name: 'gameLobby', params: { gameLobbyId: lobby.id } } }
  }))
})

const Create = async () => {
  var createResult = await gameLobbyApi.createGameLobby({})
  logger.log(createResult)
  if (!createResult) {
    return
  }
}
</script>
