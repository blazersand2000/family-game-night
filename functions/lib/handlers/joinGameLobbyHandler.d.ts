import { GenericResponse } from "shared/shared";
import { ReceivedRequest, RequestHandler } from "@/mediation";
import { JoinGameLobbyRequest, JoinGameLobbyResponse } from "shared/requests/gameLobby";
export declare class JoinGameLobbyHandler implements RequestHandler<JoinGameLobbyRequest, JoinGameLobbyResponse> {
    handle(request: ReceivedRequest<JoinGameLobbyRequest>): Promise<GenericResponse<JoinGameLobbyResponse>>;
    private joinGameLobby;
}
