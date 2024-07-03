import { AllRequests, GenericRequest, GenericResponse, RequestId } from "shared/shared"
import { CreateGameHandler } from "./handlers/createGameHandler"
import { JoinGameHandler } from "./handlers/joinGameHandler"

// Define a base handler interface
export interface RequestHandler<TRequest, TResponse> {
   handle(request: GenericRequest<TRequest>): Promise<GenericResponse<TResponse>>
}

// Map request IDs to their handlers
export const handlers: Record<RequestId, RequestHandler<AllRequests, any>> = {
   CreateGame: new CreateGameHandler(),
   JoinGame: new JoinGameHandler(),
}

// Function to route requests to the correct handler
export async function routeRequest(genericRequest: GenericRequest<AllRequests>): Promise<any> {
   const handler = handlers[genericRequest.type]
   if (!handler) {
      throw new Error(`Handler for request type '${genericRequest.type}' not found.`)
   }
   console.log(`${handler.constructor.name} handling request of type '${genericRequest.type}'`)
   return handler.handle(genericRequest)
}
