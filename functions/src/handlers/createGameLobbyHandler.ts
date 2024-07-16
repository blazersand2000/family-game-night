import { GenericResponse } from "shared/shared"
import { ReceivedRequest, RequestHandler } from "@/mediation"
import { createGameLobby } from "../services/gameDataService"
import { CreateGameLobbyRequest, CreateGameLobbyResponse } from "shared/requests/gameLobby"

export class CreateGameLobbyHandler
   implements RequestHandler<CreateGameLobbyRequest, CreateGameLobbyResponse>
{
   async handle(
      request: ReceivedRequest<CreateGameLobbyRequest>
   ): Promise<GenericResponse<CreateGameLobbyResponse>> {
      try {
         var newGameLobbyId = await createGameLobby(request)
         return { success: true, payload: { gameLobbyId: newGameLobbyId } }
      } catch (error) {
         console.log(error)
         return {
            success: false,
            error: "Failed to create game lobby",
         }
      }
   }
}
