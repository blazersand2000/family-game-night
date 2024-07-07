import callFunction from '@/FunctionCaller'
import type { TicTacToe_MakeMoveRequest } from 'shared/requests/tictactoe'

export function useTicTacToeApi() {
  async function makeMove(request: TicTacToe_MakeMoveRequest) {
    const response = await callFunction('TicTacToe_MakeMove', request)
    return response
  }

  return {
    makeMove
  }
}
