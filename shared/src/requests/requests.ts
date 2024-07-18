import type { RequestResponsePair } from "../shared"
import type {
   CreateGameRequest,
   CreateGameResponse,
   JoinGameRequest,
   JoinGameResponse,
} from "./game"
import {
   CreateGameLobbyRequest,
   CreateGameLobbyResponse,
   JoinGameLobbyRequest,
   JoinGameLobbyResponse,
} from "./gameLobby"
import type { TicTacToe_MakeMoveRequest, TicTacToe_MakeMoveResponse } from "./tictactoe"
import { UpdateProfileRequest, UpdateProfileResponse } from "./user"

export type RequestResponseMapping = {
   UpdateProfile: RequestResponsePair<UpdateProfileRequest, UpdateProfileResponse>
   CreateGameLobby: RequestResponsePair<CreateGameLobbyRequest, CreateGameLobbyResponse>
   JoinGameLobby: RequestResponsePair<JoinGameLobbyRequest, JoinGameLobbyResponse>
   CreateGame: RequestResponsePair<CreateGameRequest, CreateGameResponse>
   JoinGame: RequestResponsePair<JoinGameRequest, JoinGameResponse>
   TicTacToe_MakeMove: RequestResponsePair<TicTacToe_MakeMoveRequest, TicTacToe_MakeMoveResponse>
}
