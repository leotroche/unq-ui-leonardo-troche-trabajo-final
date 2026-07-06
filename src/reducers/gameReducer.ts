type GameStatus = 'IDLE' | 'PLAYING' | 'GAME_OVER'

type GameError = 'ALREADY_USED' | 'INVALID_CHAIN' | 'INVALID_WORD' | 'SERVER_ERROR'

interface GameState {
  status: GameStatus
  words: string[]
  score: number
  timeLeft: number
  error: GameError | null
}

type GameAction =
  | { type: 'ADD_WORD'; payload: string }
  | { type: 'SET_ERROR'; payload: GameError }
  | { type: 'TICK' }
  | { type: 'RESET_GAME' }

export const initialState: GameState = {
  status: 'IDLE',
  words: [],
  score: 0,
  timeLeft: 15,
  error: null,
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_WORD': {
      const word = action.payload
      return {
        ...state,
        status: 'PLAYING',
        words: [...state.words, word],
        score: state.score + word.length,
        error: null,
        timeLeft: 15,
      }
    }
    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
      }
    }
    case 'TICK': {
      const nextTimeLeft = state.timeLeft - 1
      return {
        ...state,
        status: nextTimeLeft <= 0 ? 'GAME_OVER' : state.status,
        timeLeft: Math.max(0, nextTimeLeft),
      }
    }
    case 'RESET_GAME': {
      return initialState
    }
    default: {
      return state
    }
  }
}
