import { CreateGameRequest, CreateGameResponse } from "shared/requests"
import { GenericRequest, GenericResponse } from "shared/shared"
import { RequestHandler } from "src/mediation"

export class CreateGameHandler implements RequestHandler<CreateGameRequest, CreateGameResponse> {
   async handle(
      request: GenericRequest<CreateGameRequest>
   ): Promise<GenericResponse<CreateGameResponse>> {
      // Handle the request
      return { success: true, payload: { gameId: "12345" } }
   }
}
