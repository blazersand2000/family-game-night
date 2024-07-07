import type { Player } from "../models/games/tictactoe"

export interface TicTacToe_MakeMoveRequest {
   gameId: string
   location: { row: number; col: number }
   player: Player
}

export interface TicTacToe_MakeMoveResponse {}
