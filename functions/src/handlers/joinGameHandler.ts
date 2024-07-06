import { JoinGameRequest, JoinGameResponse } from "shared/requests/game"
import { GenericRequest, GenericResponse } from "shared/shared"
import { RequestHandler } from "src/mediation"

export class JoinGameHandler implements RequestHandler<JoinGameRequest, JoinGameResponse> {
   async handle(
      request: GenericRequest<JoinGameRequest>
   ): Promise<GenericResponse<JoinGameResponse>> {
      // Handle the request
      return { success: true, payload: { joined: true } }
   }
}
