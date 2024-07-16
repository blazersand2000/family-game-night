import { GameType } from "./gameType"

export interface Game {
   type: GameType
   gameLobbyId: string
   createdAt: Date
   gameManagerId: string
}
