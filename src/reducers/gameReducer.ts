export type GameStatus = 'IDLE' | 'PLAYING' | 'GAME_OVER'

export type GameError = 'ALREADY_USED' | 'INVALID_CHAIN' | 'INVALID_WORD' | 'SERVER_ERROR'

export interface GameState {
  status: GameStatus
  words: string[]
  score: number
  timeLeft: number
  error: GameError | null
}

type GameAction =
  | { type: 'ADD_WORD'; payload: string }
  | { type: 'SET_ERROR'; payload: GameError }
  | { type: 'CLEAR_ERROR' }
  | { type: 'TICK' }
  | { type: 'RESET_GAME' }

// --------------------------------------------------------------------------------

const TURN_DURATION_SECONDS = 15

export const initialState: GameState = {
  status: 'IDLE',
  words: [],
  score: 0,
  timeLeft: TURN_DURATION_SECONDS,
  error: null,
}

// --------------------------------------------------------------------------------

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    // ----------------------------------------

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
        timeLeft: TURN_DURATION_SECONDS,
        error: null,
      }
    }

    // ----------------------------------------

    case 'SET_ERROR': {
      if (state.error === action.payload) {
        return state
      }
      return {
        ...state,
        error: action.payload,
      }
    }

    // ----------------------------------------

    case 'CLEAR_ERROR': {
      if (state.error === null) {
        return state
      }
      return {
        ...state,
        error: null,
      }
    }

    // ----------------------------------------

    case 'TICK': {
      if (state.status !== 'PLAYING') {
        return state
      }
      const nextTime = Math.max(0, state.timeLeft - 1)
      const isGameOver = nextTime === 0
      return {
        ...state,
        timeLeft: nextTime,
        status: isGameOver ? 'GAME_OVER' : 'PLAYING',
        error: isGameOver ? null : state.error,
      }
    }

    // ----------------------------------------

    case 'RESET_GAME': {
      return initialState
    }

    // ----------------------------------------

    default: {
      return state
    }
  }
}
