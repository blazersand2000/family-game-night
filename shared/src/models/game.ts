import { GameType } from "./gameType"

export interface Game {
   type: GameType
   createdAt: Date
   gameManagerId: string
   playerIds: string[]
}
