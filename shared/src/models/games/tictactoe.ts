export interface TicTacToe {
   board: (Player | undefined)[][]
   playerTurn: Player
   winner: Player | undefined
}

export type Player = "X" | "O"
