import { GameType } from "./gameType"

export interface Game {
   title: string
   type: GameType
   createdAt: Date // Use FieldValue for writes, Date for reads
   // Add other fields as necessary
}
