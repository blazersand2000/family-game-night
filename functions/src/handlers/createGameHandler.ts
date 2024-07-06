import { GenericRequest, GenericResponse } from "shared/shared"
import { RequestHandler } from "@/mediation"
import { createGame } from "../services/gameDataService"
import { GameType } from "shared/models/gameType"
import { TicTacToe } from "shared/models/games/tictactoe"
import { CreateGameRequest, CreateGameResponse } from "shared/requests/game"

export class CreateGameHandler implements RequestHandler<CreateGameRequest, CreateGameResponse> {
   async handle(
      request: GenericRequest<CreateGameRequest>
   ): Promise<GenericResponse<CreateGameResponse>> {
      if (request.payload.type === GameType.TicTacToe) {
         const gameData: TicTacToe = {
            board: [
               [undefined, undefined, undefined],
               [undefined, undefined, undefined],
               [undefined, undefined, undefined],
            ],
            playerTurn: "X",
            winner: undefined,
         }

         try {
            var newGameId = await createGame(request.payload, gameData)
            return { success: true, payload: { gameId: newGameId } }
         } catch (error) {
            return {
               success: false,
               error: "Failed to create game",
            }
         }
      }

      return { success: false, error: "Invalid game type" }
   }
}
