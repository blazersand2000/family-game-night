import { CreateGameRequest } from "shared/requests"

interface RequestHandler<T> {
   canHandle(request: any): request is T
   handle(request: T): Promise<any>
}

class CreateGameHandler implements RequestHandler<CreateGameRequest> {
   canHandle(request: any): request is CreateGameRequest {
      return request.type === "createGame"
   }

   async handle(request: CreateGameRequest): Promise<any> {
      // Handle create game logic
      return { result: "Game created, yayh!" }
   }
}

export const handlers: RequestHandler<any>[] = [
   new CreateGameHandler(),
   // Add other handlers here
]
