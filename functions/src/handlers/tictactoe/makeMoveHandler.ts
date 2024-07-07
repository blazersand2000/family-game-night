import { GenericRequest, GenericResponse } from "shared/shared"
import { RequestHandler } from "@/mediation"
import { TicTacToe_MakeMoveRequest, TicTacToe_MakeMoveResponse } from "shared/requests/tictactoe"
import { Player, TicTacToe } from "shared/models/games/tictactoe"
import { updateGameData } from "@/services/gameDataService"

export class TicTacToe_MakeMoveHandler
   implements RequestHandler<TicTacToe_MakeMoveRequest, TicTacToe_MakeMoveResponse>
{
   async handle(
      request: GenericRequest<TicTacToe_MakeMoveRequest>
   ): Promise<GenericResponse<TicTacToe_MakeMoveResponse>> {
      try {
         var result = await this.makeMove(request)
         return result
      } catch (error) {
         return {
            success: false,
            error: "Failed to make move",
         }
      }
   }

   private async makeMove(request: GenericRequest<TicTacToe_MakeMoveRequest>) {
      return await updateGameData<TicTacToe, GenericResponse<TicTacToe_MakeMoveResponse>>(
         request.payload.gameId,
         (current, update) => {
            if (!current) {
               return {
                  success: false,
                  error: "Game not found",
               }
            }

            if (current.winner) {
               return {
                  success: false,
                  error: "Game is already over",
               }
            }

            if (!this.isPlayerTurn(current, request.payload)) {
               return {
                  success: false,
                  error: "Not your turn",
               }
            }

            if (!this.isInBounds(request.payload)) {
               return {
                  success: false,
                  error: "Location out of bounds",
               }
            }

            if (!this.isLocationEmpty(current, request.payload)) {
               return {
                  success: false,
                  error: "Location already taken",
               }
            }

            current.board[request.payload.location.row][request.payload.location.col] =
               request.payload.player
            current.playerTurn = current.playerTurn === "X" ? "O" : "X"
            current.winner = this.getWinner(current)

            // feels like we should make a copy of current and update the copy, but I expect that will get tedious when updating larger entities
            update(current)

            return {
               success: true,
               payload: {
                  /* response data */
               },
            }
         }
      )
   }

   isPlayerTurn(gameData: TicTacToe, move: TicTacToe_MakeMoveRequest): boolean {
      // TODO: Get the current player from the request and compare it to the playerTurn in gameData
      return true
   }

   isInBounds(move: TicTacToe_MakeMoveRequest): boolean {
      return (
         move.location.col >= 0 &&
         move.location.col < 3 &&
         move.location.row >= 0 &&
         move.location.row < 3
      )
   }

   isLocationEmpty(gameData: TicTacToe, move: TicTacToe_MakeMoveRequest): boolean {
      return !gameData.board[move.location.row][move.location.col]
   }

   getWinner(gameData: TicTacToe): Player | null {
      // check if any player got 3 in a row
      const board = gameData.board
      const winningCombinations = [
         // rows
         [board[0][0], board[0][1], board[0][2]],
         [board[1][0], board[1][1], board[1][2]],
         [board[2][0], board[2][1], board[2][2]],
         // columns
         [board[0][0], board[1][0], board[2][0]],
         [board[0][1], board[1][1], board[2][1]],
         [board[0][2], board[1][2], board[2][2]],
         // diagonals
         [board[0][0], board[1][1], board[2][2]],
         [board[0][2], board[1][1], board[2][0]],
      ]

      for (const combination of winningCombinations) {
         if (combination.every((cell) => cell === "X")) {
            return "X"
         }
         if (combination.every((cell) => cell === "O")) {
            return "O"
         }
      }

      return null
   }
}
