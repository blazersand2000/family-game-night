<template>
  <v-container>
    <v-row justify-center>
      <v-col>
        <div><h1>Game Lobby</h1></div>
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
    <!-- <v-row>
      <v-col>
        <GameBoard :gameId="gameId" />
      </v-col>
    </v-row> -->
    <v-row>
      <v-col
        ><InviteToGame v-if="gameLobby" :inviterName="inviterName" :gameLobbyId="gameLobbyId"
      /></v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import InviteToGame from '@/components/InviteToGame.vue'
import { useGameLobbyStore } from '@/stores/useGameLobbyStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useDateFormat } from '@vueuse/core'
import { computed } from 'vue'

const props = defineProps<{
  gameLobbyId: string
}>()

const authStore = useAuthStore()
const gameLobbyStore = useGameLobbyStore()
const gameLobby = gameLobbyStore.gameLobby(props.gameLobbyId)
const inviterName = computed(() => authStore.currentUser?.displayName ?? 'Someone')
const createdAt = computed(() => useDateFormat(gameLobby.value?.createdAt, 'YYYY-MM-DD HH:mm:ss'))
const isADate = computed(() => gameLobby.value?.createdAt instanceof Date)
</script>
