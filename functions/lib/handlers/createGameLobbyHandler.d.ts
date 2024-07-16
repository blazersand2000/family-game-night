import { GenericResponse } from "shared/shared";
import { ReceivedRequest, RequestHandler } from "@/mediation";
import { CreateGameLobbyRequest, CreateGameLobbyResponse } from "shared/requests/gameLobby";
export declare class CreateGameLobbyHandler implements RequestHandler<CreateGameLobbyRequest, CreateGameLobbyResponse> {
    handle(request: ReceivedRequest<CreateGameLobbyRequest>): Promise<GenericResponse<CreateGameLobbyResponse>>;
}
