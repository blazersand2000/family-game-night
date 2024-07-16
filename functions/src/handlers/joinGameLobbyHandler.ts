import { GenericResponse } from "shared/shared"
import { ReceivedRequest, RequestHandler } from "@/mediation"
import { joinGameLobby } from "../services/gameDataService"
import { JoinGameLobbyRequest, JoinGameLobbyResponse } from "shared/requests/gameLobby"

export class JoinGameLobbyHandler
   implements RequestHandler<JoinGameLobbyRequest, JoinGameLobbyResponse>
{
   async handle(
      request: ReceivedRequest<JoinGameLobbyRequest>
   ): Promise<GenericResponse<JoinGameLobbyResponse>> {
      try {
         var result = await this.joinGameLobby(request)
         return result
      } catch (error) {
         return {
            success: false,
            error: "Failed to join game lobby",
         }
      }
   }

   private async joinGameLobby(request: ReceivedRequest<JoinGameLobbyRequest>) {
      return await joinGameLobby(request.payload.gameLobbyId, (current, update) => {
         if (!current) {
            return {
               success: false,
               error: "Game lobby not found",
            }
         }

         if (current.playerIds.includes(request.context.auth!.uid)) {
            return {
               success: false,
               error: "Player is already in the game lobby",
            }
         }

         current.playerIds.push(request.context.auth!.uid)

         update(current)

         return {
            success: true,
            payload: {},
         }
      })
   }
}
