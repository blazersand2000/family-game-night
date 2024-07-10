import { JoinGameRequest, JoinGameResponse } from "shared/requests/game"
import { GenericResponse } from "shared/shared"
import { ReceivedRequest, RequestHandler } from "src/mediation"

export class JoinGameHandler implements RequestHandler<JoinGameRequest, JoinGameResponse> {
   async handle(
      request: ReceivedRequest<JoinGameRequest>
   ): Promise<GenericResponse<JoinGameResponse>> {
      // Handle the request
      return { success: true, payload: { joined: true } }
   }
}
