import { GameType } from "../models/gameType"

export interface CreateGameRequest {
   title: string
   type: GameType
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
