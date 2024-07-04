import { CreateGameRequest, CreateGameResponse } from "shared/requests"
import { GenericRequest, GenericResponse } from "shared/shared"
import { RequestHandler } from "@/mediation"
import { createGame } from "../services/gameDataService"

export class CreateGameHandler implements RequestHandler<CreateGameRequest, CreateGameResponse> {
   async handle(
      request: GenericRequest<CreateGameRequest>
   ): Promise<GenericResponse<CreateGameResponse>> {
      var newGameId = await createGame(request.payload)
      if (!newGameId) {
         return { success: false, error: "Failed to create game" }
      }
      return { success: true, payload: { gameId: newGameId } }
   }
}
