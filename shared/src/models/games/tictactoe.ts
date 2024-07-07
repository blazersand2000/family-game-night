export interface TicTacToe {
   board: Record<number, (Player | null)[]> // Changed Map to Record and undefined to null
   playerTurn: Player
   winner: Player | null
}

export type Player = "X" | "O"
