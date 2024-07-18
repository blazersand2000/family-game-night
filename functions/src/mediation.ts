import * as functions from "firebase-functions"
import { AllRequests, GenericRequest, GenericResponse, RequestId } from "shared/shared"
import { CreateGameHandler } from "./handlers/createGameHandler"
import { JoinGameHandler } from "./handlers/joinGameHandler"
import { TicTacToe_MakeMoveHandler } from "./handlers/tictactoe/makeMoveHandler"
import { CreateGameLobbyHandler } from "./handlers/createGameLobbyHandler"
import { JoinGameLobbyHandler } from "./handlers/joinGameLobbyHandler"
import { UpdateProfileHandler } from "./handlers/updateProfileHandler"

// Request with context
export interface ReceivedRequest<TRequest> extends GenericRequest<TRequest> {
   context: functions.https.CallableContext
}

// Define a base handler interface
export interface RequestHandler<TRequest, TResponse> {
   handle(request: ReceivedRequest<TRequest>): Promise<GenericResponse<TResponse>>
}

// Map request IDs to their handlers
export const handlers: Record<RequestId, RequestHandler<AllRequests, any>> = {
   UpdateProfile: new UpdateProfileHandler(),
   CreateGameLobby: new CreateGameLobbyHandler(),
   JoinGameLobby: new JoinGameLobbyHandler(),
   CreateGame: new CreateGameHandler(),
   JoinGame: new JoinGameHandler(),
   TicTacToe_MakeMove: new TicTacToe_MakeMoveHandler(),
}

// Function to route requests to the correct handler
export async function routeRequest(request: ReceivedRequest<AllRequests>): Promise<any> {
   const handler = handlers[request.type]
   if (!handler) {
      throw new Error(`Handler for request type '${request.type}' not found.`)
   }
   console.log(`${handler.constructor.name} handling request of type '${request.type}'`)
   return handler.handle(request)
}
