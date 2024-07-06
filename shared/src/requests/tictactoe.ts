import type { Player } from "../models/games/tictactoe"

export interface TicTacToe_MakeMoveRequest {
   gameId: string
   location: { x: number; y: number }
   player: Player
}

export interface TicTacToe_MakeMoveResponse {}
