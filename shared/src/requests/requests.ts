import type { RequestResponsePair } from "../shared"
import type {
   CreateGameRequest,
   CreateGameResponse,
   JoinGameRequest,
   JoinGameResponse,
} from "./game"
import type { TicTacToe_MakeMoveRequest, TicTacToe_MakeMoveResponse } from "./tictactoe"

export type RequestResponseMapping = {
   CreateGame: RequestResponsePair<CreateGameRequest, CreateGameResponse>
   JoinGame: RequestResponsePair<JoinGameRequest, JoinGameResponse>
   TicTacToe_MakeMove: RequestResponsePair<TicTacToe_MakeMoveRequest, TicTacToe_MakeMoveResponse>
}
