import { GameType } from "./models/gameType"
import type { RequestResponsePair } from "./shared"

export interface CreateGameRequest {
   title: string
   type: GameType
}

export interface CreateGameResponse {
   gameId: string
}

// // Define interfaces for each request and response type
// export interface CreateGameRequest {
//    gameId: string
//    type: string
// }

// export interface CreateGameResponse {
//    success: boolean
// }

export interface JoinGameRequest {
   gameId: string
   userId: string
}

export interface JoinGameResponse {
   joined: boolean
}

export type RequestResponseMapping = {
   CreateGame: RequestResponsePair<CreateGameRequest, CreateGameResponse>
   JoinGame: RequestResponsePair<JoinGameRequest, JoinGameResponse>
}
