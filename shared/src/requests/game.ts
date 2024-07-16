import { GameType } from "../models/gameType"

export interface CreateGameRequest {
   type: GameType
   gameLobbyId: string
}

export interface CreateGameResponse {
   gameId: string
}

export interface JoinGameRequest {
   gameId: string
   userId: string
}

export interface JoinGameResponse {
   joined: boolean
}
