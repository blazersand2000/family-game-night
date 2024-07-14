<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4">
        <div class="tic-tac-toe-board">
          <button
            v-for="(cell, index) in cells"
            :key="index"
            class="tic-tac-toe-cell"
            @click="makeMove(index)"
          >
            <!-- Display X or O based on the cell's state -->
            {{ cell }}
          </button>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 v-if="gameData?.winner">{{ gameData.winner }} wins!</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/useGameStore'
import { useTicTacToeStore } from '@/stores/useTicTacToeStore'
import { computed } from 'vue'

const props = defineProps<{
  gameId: string
}>()

const gameStore = useGameStore()
const ticTacToeStore = useTicTacToeStore()
const gameData = ticTacToeStore.gameData(props.gameId)

const cells = computed(() => {
  if (!gameData.value) return []
  return gameData.value.board[0].concat(gameData.value.board[1], gameData.value.board[2])
})

const makeMove = async (cell: number) => {
  if (!gameData.value) return
  if (gameData.value.winner) return
  const row = Math.floor(cell / 3)
  const col = cell % 3

  await ticTacToeStore.makeMove({
    gameId: props.gameId,
    location: { row, col },
    player: gameData.value?.playerTurn
  })
}

//const created =
</script>

<style scoped>
.tic-tac-toe-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0; /* Remove gap to use borders for separation */
}

.tic-tac-toe-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  border-right: 2px solid grey; /* Add right border to cells */
  border-bottom: 2px solid grey; /* Add bottom border to cells */
}

.tic-tac-toe-cell:nth-child(3n) {
  border-right: none; /* Remove right border for cells in the last column */
}

.tic-tac-toe-cell:nth-last-child(-n + 3) {
  border-bottom: none; /* Remove bottom border for cells in the last row */
}

.tic-tac-toe-cell::before {
  content: '';
  display: block;
  padding-top: 100%; /* Maintains the square aspect ratio */
}

.tic-tac-toe-cell:hover {
  background-color: rgba(255, 255, 255, 0.1); /* Light grey background on hover */
}

.tic-tac-toe-cell > * {
  position: absolute;
}
</style>
