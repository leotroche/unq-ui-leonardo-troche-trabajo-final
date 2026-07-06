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

// --------------------------------------------------------------------------------

const TURN_TIME = 15

export const initialState: GameState = {
  status: 'IDLE',
  words: [],
  score: 0,
  timeLeft: TURN_TIME,
  error: null,
}

// --------------------------------------------------------------------------------

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_WORD': {
      if (state.status === 'GAME_OVER') {
        return state
      }
      const word = action.payload
      return {
        ...state,
        status: 'PLAYING',
        words: [...state.words, word],
        score: state.score + word.length,
        timeLeft: TURN_TIME,
        error: null,
      }
    }
    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
      }
    }
    case 'TICK': {
      if (state.status !== 'PLAYING') {
        return state
      }
      const nextTime = Math.max(0, state.timeLeft - 1)
      return {
        ...state,
        timeLeft: nextTime,
        status: nextTime > 0 ? 'PLAYING' : 'GAME_OVER',
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
