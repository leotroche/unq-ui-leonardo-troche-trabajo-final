type GameError = 'USED' | 'CHAIN' | 'NOT_FOUND' | 'NETWORK'

interface GameState {
  words: string[]
  error: GameError | null
}

type GameAction =
  | { type: 'ADD_WORD'; payload: string }
  | { type: 'SET_ERROR'; payload: GameError | null }

export const initialState: GameState = {
  words: [],
  error: null,
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_WORD': {
      return {
        ...state,
        words: [...state.words, action.payload],
        error: null,
      }
    }
    case 'SET_ERROR': {
      return {
        ...state,
        error: action.payload,
      }
    }
    default: {
      return state
    }
  }
}
