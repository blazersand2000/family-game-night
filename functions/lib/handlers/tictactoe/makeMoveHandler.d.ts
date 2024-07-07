import { GenericRequest, GenericResponse } from "shared/shared";
import { RequestHandler } from "@/mediation";
import { TicTacToe_MakeMoveRequest, TicTacToe_MakeMoveResponse } from "shared/requests/tictactoe";
import { Player, TicTacToe } from "shared/models/games/tictactoe";
export declare class TicTacToe_MakeMoveHandler implements RequestHandler<TicTacToe_MakeMoveRequest, TicTacToe_MakeMoveResponse> {
    handle(request: GenericRequest<TicTacToe_MakeMoveRequest>): Promise<GenericResponse<TicTacToe_MakeMoveResponse>>;
    private makeMove;
    isPlayerTurn(gameData: TicTacToe, move: TicTacToe_MakeMoveRequest): boolean;
    isInBounds(move: TicTacToe_MakeMoveRequest): boolean;
    isLocationEmpty(gameData: TicTacToe, move: TicTacToe_MakeMoveRequest): boolean;
    getWinner(gameData: TicTacToe): Player | null;
}
