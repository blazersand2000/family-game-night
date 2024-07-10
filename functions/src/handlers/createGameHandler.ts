import { GenericResponse } from "shared/shared"
import { ReceivedRequest, RequestHandler } from "@/mediation"
import { createGame } from "../services/gameDataService"
import { TicTacToe } from "shared/models/games/tictactoe"
import { CreateGameRequest, CreateGameResponse } from "shared/requests/game"
import { GameType } from "shared/models/gameType"

export class CreateGameHandler implements RequestHandler<CreateGameRequest, CreateGameResponse> {
   async handle(
      request: ReceivedRequest<CreateGameRequest>
   ): Promise<GenericResponse<CreateGameResponse>> {
      if (request.payload.type === GameType.TicTacToe) {
         // TODO: get rid of nested arrays firestore doesn't support them
         const gameData: TicTacToe = {
            board: {
               0: [null, null, null],
               1: [null, null, null],
               2: [null, null, null],
            },
            playerTurn: "X",
            winner: null,
         }

         try {
            var newGameId = await createGame(request, gameData)
            return { success: true, payload: { gameId: newGameId } }
         } catch (error) {
            console.log(error)
            return {
               success: false,
               error: "Failed to create game",
            }
         }
      }

      return { success: false, error: "Invalid game type" }
   }
}
